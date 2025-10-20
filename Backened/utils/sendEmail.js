// sendEmail.js
const { SendEmailCommand } = require("@aws-sdk/client-ses");
const { sesClient } = require("./sesClient.js");

/**
 * Send an email via SES
 * @param {string} toAddress Recipient email
 * @param {string} fromAddress Verified sender email
 * @param {string} subject Email subject
 * @param {string} bodyHtml HTML body
 * @param {string} bodyText Text/plain body
 */
async function sendEmail({ toAddress, fromAddress, subject, bodyHtml, bodyText }) {
  const params = {
    Destination: {
      ToAddresses: [toAddress],
    },
    Message: {
      Body: {
        Html: {
          Charset: "UTF-8",
          Data: bodyHtml,
        },
        Text: {
          Charset: "UTF-8",
          Data: bodyText,
        },
      },
      Subject: {
        Charset: "UTF-8",
        Data: subject,
      },
    },
    Source: fromAddress,
    ReplyToAddresses: [ fromAddress ]
  };

  try {
    const command = new SendEmailCommand(params);
    const response = await sesClient.send(command);
    return response;
  } catch (err) {
    throw err;
  }
}

module.exports = { sendEmail };
