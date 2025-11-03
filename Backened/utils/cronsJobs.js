const cron = require("node-cron");
const ConnectionRequest = require("../modelSchema/connectionRequestModel");
const User = require("../modelSchema/useModel");
const { sendEmail } = require("./sendEmail");

function scheduleReminderEmails() {
  cron.schedule("0 9 * * *", async () => {

    try {
      const thresholdDate = new Date();
      thresholdDate.setDate(thresholdDate.getDate() - 1);

      const pendingRequests = await ConnectionRequest.find({
        status: "interested",
        createdAt: { $lte: thresholdDate }
      });

      for (const req of pendingRequests) {

        const toUser = await User.findById(req.toUserId);
        const fromUser = await User.findById(req.fromUserId);

        if (!toUser || !fromUser) {
          continue;
        }

        await sendEmail({
          toAddress: toUser.emailId,
          fromAddress: "mushabrahman@webtinder.in",
          subject: `Reminder: You have a pending connection request from ${fromUser.firstName}`,
          bodyHtml: `<p>Hi ${toUser.firstName},</p>
                     <p>You have a pending connection request from ${fromUser.firstName} ${fromUser.lastName}. Please respond to it.</p>`,
          bodyText: `Hi ${toUser.firstName},\nYou have a pending connection request from ${fromUser.firstName} ${fromUser.lastName}. Please respond to it.`
        });
      }

    } catch (err) {
    }

  }, {
    scheduled: true,
    timezone: "Asia/Kolkata"
  });
}

module.exports = { scheduleReminderEmails };
