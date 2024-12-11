import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const STRIPE_KEY = import.meta.env.VITE_STRIPE_KEY;

const stripePromise = loadStripe(STRIPE_KEY);

const CheckOut = () => {
  const submitHandler = async (e) => {
    e.preventDefault();
    axios
      .post(`${BASE_URL}carts/checkout`, {
        name: e.target.name.value,
        email: e.target.email.value,
      })
      .then(async function (res) {
        const sessionId = res.data.data.sessionId;
        const stripe = await stripePromise;
        await stripe.redirectToCheckout({ sessionId });
        console.log(res);
      })
      .catch(function (error) {
        console.log(error);
      });
    console.log(e.target.name.value);
  };

  const containerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    backgroundColor: "#ffffff",
    padding: "2rem",
  };

  const formStyle = {
    backgroundColor: "#cccccc",
    color: "#f5f5f5",
    padding: "2rem",
    borderRadius: "8px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    width: "100%",
    maxWidth: "400px",
  };

  const inputStyle = {
    fontSize: "16px",
    padding: "10px",
    margin: "10px 0",
    width: "100%",
    borderRadius: "4px",
    border: "1px solid #cccccc",
    backgroundColor: "#f3f4f6",
    color: "#2e2e38",
  };

  const buttonStyle = {
    fontSize: "16px",
    padding: "10px 15px",
    width: "100%",
    backgroundColor: "#0078d7",
    color: "#ffffff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    marginTop: "10px",
    transition: "background-color 0.3s ease",
  };

  const buttonHoverStyle = {
    backgroundColor: "#005a9e",
  };

  return (
    <div style={containerStyle}>
      <form
        onSubmit={submitHandler}
        style={formStyle}
        onMouseEnter={(e) => {
          if (e.target.tagName === "BUTTON") {
            e.target.style.backgroundColor = buttonHoverStyle.backgroundColor;
          }
        }}
        onMouseLeave={(e) => {
          if (e.target.tagName === "BUTTON") {
            e.target.style.backgroundColor = buttonStyle.backgroundColor;
          }
        }}
      >
        <h2
          style={{ textAlign: "center", marginBottom: "1rem", color: "black" }}
        >
          Enter Your Details
        </h2>
        <input
          style={inputStyle}
          type="text"
          placeholder="Name"
          required
          name="name"
        />
        <input
          style={inputStyle}
          type="email"
          placeholder="Email"
          required
          name="email"
        />
        <button type="submit" style={buttonStyle}>
          Proceed To Checkout
        </button>
      </form>
    </div>
  );
};

export default CheckOut;
