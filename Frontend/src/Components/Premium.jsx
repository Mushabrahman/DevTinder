import axios from "axios";
import { useEffect, useState } from "react";

export default function Premium() {
  const [isUserPremium, setIsUserPremium] = useState(false);

  const plans = [
    {
      name: "Silver",
      price: "₹300",
      per: "INR / month (inclusive of GST)",
      description: "More access to popular features",
      features: [
        "Chat with other people",
        "100 connections request per day",
        "Blue Tick",
        "Duration is 3 months",
      ],
      button: "Upgrade to Silver",
      color: "bg-gray-200 text-gray-900",
      badgeColor: "badge-gray-500",
      buttonColor: "btn-gray-400",
    },
    {
      name: "Gold",
      price: "₹500",
      per: "INR / month (inclusive of GST)",
      description: "More access to advanced features",
      features: [
        "Chat with other people",
        "Infinite connections request per day",
        "Blue Tick",
        "Duration is 6 months",
      ],
      button: "Upgrade to Gold",
      tag: "NEW",
      color: "bg-yellow-400 text-yellow-900",
      badgeColor: "badge-yellow-600",
      buttonColor: "btn-yellow-500",
    },
  ];

  useEffect(() => {
    verifyPremiumUser();
  }, []);

  const verifyPremiumUser = async () => {
    try {
      const res = await axios("/api/verifyPremiumUser", { withCredentials: true });
      if (res.data.isPremium) setIsUserPremium(true);
    } catch (err) {
      console.error("Error verifying premium user:", err);
    }
  };

  const handleClickPremium = async (type) => {
    try {
      const order = await axios.post(
        "/api/payment/create",
        { membershipType: type },
        { withCredentials: true }
      );

      const { amount, currency, notes, razorpay_order_id } = order.data.payment;

      const options = {
        key: order.data.keyId,
        amount,
        currency,
        order_id: razorpay_order_id,
        prefill: {
          name: `${notes.firstName} ${notes.lastName}`,
          email: notes.emailId,
        },
        theme: { color: "#3399cc" },
        handler: verifyPremiumUser,
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Error fetching payment order:", error);
    }
  };

  return (
    <div>
      {isUserPremium ? (
        <div className="flex justify-center mt-10 text-xl font-semibold text-green-500">
          🎉 You are already a Premium User
        </div>
      ) : (
        <div className="flex justify-center p-6 mt-9 mb-32 sm:mb-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl w-full">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`card shadow-xl border hover:scale-105 transition-transform duration-300 ${plan.color}`}
              >
                <div className="card-body">
                  <div className="flex items-center justify-between">
                    <h2 className="card-title">{plan.name}</h2>
                    {plan.tag && (
                      <div className={`badge ${plan.badgeColor}`}>{plan.tag}</div>
                    )}
                  </div>
                  <p className="text-2xl font-bold">{plan.price}</p>
                  <p className="text-sm text-gray-700">{plan.per}</p>
                  <p className="mt-2 text-sm">{plan.description}</p>

                  <ul className="mt-4 space-y-2 text-sm">
                    {plan.features.map((f, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-green-600">✔</span>
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="card-actions mt-6">
                    <button
                      className={`w-full ${plan.buttonColor} btn`}
                      onClick={() => handleClickPremium(plan.name)}
                    >
                      {plan.button}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
