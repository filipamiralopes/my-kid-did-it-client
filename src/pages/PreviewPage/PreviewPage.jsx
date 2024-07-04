import "./PreviewPage.css";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useState } from "react";
import { SERVER_URL } from "../../config";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AnimatedPrice from "../../components/AnimatedPrice/AnimatedPrice";
import Loading from "../../components/Loading/Loading";
import Spinner from "../../components/Spinner/Spinner";

const PreviewPage = ({ currentOrder }) => {
  const [address, setAddress] = useState("");
  const [showAnimation, setShowAnimation] = useState(false);
  const nav = useNavigate();

  const handleAddress = (e) => setAddress(e.target.value);
  const handleOrder = (e) => {
    e.preventDefault();
    const requestBody = {
      order: currentOrder?._id,
      shippingAddress: address,
    };
    axios
      .put(`${SERVER_URL}/api/orders/address`, requestBody)
      .then(() => {
        console.log("Address added to order");
      })
      .catch((err) => console.log(err));

    setTimeout(() => {
      nav("/wall-of-love");
    }, 2000);
  };

  const handlePayment = () => {
    setShowAnimation(true);
    // Add your payment logic here
  };

  if (!currentOrder?.mergedImg) {
    return (
      <>
        <Spinner />
        <p>Merging images...</p>
      </>
    );
  }

  return (
    <form onSubmit={handleOrder}>
      <div className="preview-container">
        <img src={currentOrder?.mergedImg} alt="order to preview" />
        <div className="preview-inputs">
          <h2>Love it? Get it:</h2>
          <Box
            sx={{
              "& > :not(style)": { m: 1, width: "25ch" },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              id="outlined-basic"
              label="Shipping Address"
              variant="outlined"
              onChange={handleAddress}
            />
          </Box>
          <div className="pay-action">
            {address ? (
              <button type="submit" onClick={handlePayment} id="pay-order-btn">
                Pay and Order
              </button>
            ) : null}
            <AnimatedPrice show={showAnimation} price={currentOrder.price} />
          </div>
        </div>
      </div>
    </form>
  );
};

export default PreviewPage;
