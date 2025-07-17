import { useState } from "react";
import API from "../api/api";
import { useNavigate } from "react-router-dom";

export default function PayFees() {
  const nav = useNavigate();
  const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    expiry: "",
    cvv: "",
    name: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setCardDetails({ ...cardDetails, [e.target.name]: e.target.value });
  };

  const handlePay = async () => {
    setLoading(true);
    setTimeout(async () => {
      API.put("/students/pay")
        .then()
        .catch(() => nav("/login"));
      nav("/profile");
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-6">
      <div className="bg-gray-800 p-6 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-3xl text-center text-cyan-400 font-bold mb-6">
          Simulate Payment
        </h2>

        {loading ? (
          <div className="text-center">
            <div className="animate-spin h-10 w-10 mx-auto border-4 border-cyan-400 border-t-transparent rounded-full mb-4"></div>
            <p className="text-cyan-300 font-medium">Processing Payment...</p>
          </div>
        ) : (
          <>
            <div className="space-y-4">
              <input
                type="text"
                name="name"
                placeholder="Cardholder Name"
                value={cardDetails.name}
                onChange={handleChange}
                className="w-full p-2 rounded bg-gray-700 text-white placeholder-gray-400 outline-none"
              />
              <input
                type="text"
                name="cardNumber"
                placeholder="Card Number"
                maxLength={16}
                value={cardDetails.cardNumber}
                onChange={handleChange}
                className="w-full p-2 rounded bg-gray-700 text-white placeholder-gray-400 outline-none"
              />
              <div className="flex gap-4">
                <input
                  type="text"
                  name="expiry"
                  placeholder="MM/YY"
                  maxLength={5}
                  value={cardDetails.expiry}
                  onChange={handleChange}
                  className="w-full p-2 rounded bg-gray-700 text-white placeholder-gray-400 outline-none"
                />
                <input
                  type="text"
                  name="cvv"
                  placeholder="CVV"
                  maxLength={3}
                  value={cardDetails.cvv}
                  onChange={handleChange}
                  className="w-full p-2 rounded bg-gray-700 text-white placeholder-gray-400 outline-none"
                />
              </div>
            </div>

            <button
              onClick={handlePay}
              className="mt-6 w-full bg-cyan-500 hover:bg-cyan-600 transition text-white font-semibold py-2 px-4 rounded-xl"
            >
              Pay Now
            </button>
          </>
        )}
      </div>
    </div>
  );
}
