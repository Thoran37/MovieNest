import { useState } from "react";
import { useNavigate } from "react-router-dom";

const PaymentGateway = () => {
  const [paymentMethod, setPaymentMethod] = useState("");
  let navigate = useNavigate();
  const [details, setDetails] = useState({
    upiId: "",
    cardNumber: "",
    cardHolder: "",
    expiry: "",
    cvv: "",
  });

  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const handleInputChange = (e) => {
    setDetails({ ...details, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (paymentMethod === "upi") {
      console.log("Processing UPI Payment with:", details.upiId);
      // Call UPI payment gateway here
    } else if (paymentMethod === "card") {
      console.log("Processing Card Payment with:", details.cardNumber);
      // Call Card payment gateway here
    }
  };

  function done() {
    navigate("over");
  }

  return (
    <div className="max-w-md mx-auto p-6 border rounded-lg shadow-lg mt-10">
      <h2 className="text-2xl font-bold text-center mb-6">Order Payment</h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <h3 className="text-xl mb-2">Select Payment Method:</h3>
          <div className="flex items-center space-x-4">
            <label className="flex items-center">
              <input
                type="radio"
                name="paymentMethod"
                value="upi"
                checked={paymentMethod === "upi"}
                onChange={handlePaymentMethodChange}
                className="mr-2"
              />
              UPI
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="paymentMethod"
                value="card"
                checked={paymentMethod === "card"}
                onChange={handlePaymentMethodChange}
                className="mr-2"
              />
              Credit/Debit Card
            </label>
          </div>
        </div>

        {paymentMethod === "upi" && (
          <div className="mb-4">
            <label className="block text-lg mb-1">Enter UPI ID:</label>
            <input
              type="text"
              name="upiId"
              value={details.upiId}
              onChange={handleInputChange}
              placeholder="Enter UPI ID"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
        )}

        {paymentMethod === "card" && (
          <div className="mb-4">
            <label className="block text-lg mb-1">Enter Card Details:</label>
            <input
              type="text"
              name="cardNumber"
              value={details.cardNumber}
              onChange={handleInputChange}
              placeholder="Card Number"
              className="w-full mb-3 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
            <input
              type="text"
              name="cardHolder"
              value={details.cardHolder}
              onChange={handleInputChange}
              placeholder="Card Holder Name"
              className="w-full mb-3 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
            <div className="flex space-x-4">
              <input
                type="text"
                name="expiry"
                value={details.expiry}
                onChange={handleInputChange}
                placeholder="Expiry Date (MM/YY)"
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
              <input
                type="text"
                name="cvv"
                value={details.cvv}
                onChange={handleInputChange}
                placeholder="CVV"
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>
          </div>
        )}

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition duration-200"
          onClick={done}
        >
          Pay Now
        </button>
      </form>
    </div>
  );
};

export default PaymentGateway;
