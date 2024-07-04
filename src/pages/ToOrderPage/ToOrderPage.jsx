import "./ToOrderPage.css";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useState, useContext } from "react";
import tshirtImg from "../../assets/white_tshirt.png";
import mugImg from "../../assets/mug.png";
import toeBagImg from "../../assets/toe_bag.png";
import beaniImg from "../../assets/beani.png";
import { AuthContext } from "../../context/auth.context";
import axios from "axios";
import { SERVER_URL } from "../../config";
import { useNavigate } from "react-router-dom";
import productsImg from "../../assets/products.jpeg";

export default function ToOrderPage({ currentOrder, setCurrentOrder }) {
  const { currentUser } = useContext(AuthContext);
  const [product, setProduct] = useState("tshirt");
  const nav = useNavigate();

  const handleChange = (event) => {
    setProduct(event.target.value);
  };

  const handlePreview = (e) => {
    e.preventDefault();
    const requestBody = {
      order: currentOrder?._id,
      user: currentUser?._id,
      drawing: currentOrder?.drawing,
      product,
      shippingAddress: "",
    };
    axios
      .put(`${SERVER_URL}/api/orders`, requestBody)
      .then(({ data }) => {
        console.log("Order updated!");
        setCurrentOrder(data);
      })
      .catch((err) => console.log(err));
    nav("/preview");
  };

  return (
    <div className="order-form">
      <form onSubmit={handlePreview}>
        <Box sx={{ minWidth: 50, maxWidth: 300 }}>
          <FormControl fullWidth>
            <InputLabel id="product-select-label">Product</InputLabel>
            <Select
              labelId="product-select-label"
              id="product-select"
              value={product}
              label="Product"
              onChange={handleChange}
            >
              <MenuItem value={"tshirt"}>Tshirt</MenuItem>
              <MenuItem value={"mug"}>Mug</MenuItem>
              <MenuItem value={"toe_bag"}>Tote Bag</MenuItem>
              <MenuItem value={"beani"}>Beanie</MenuItem>
            </Select>
          </FormControl>
        </Box>
        {product === "tshirt" ? (
          <div className="which-product">
            <img src={tshirtImg} style={{ width: "370px" }}/>
            <div className="tshirt">
              <h3>Product price: € 19.50 </h3>
              <button type="submit">Preview</button>
            </div>
          </div>
        ) : product === "mug" ? (
          <div className="which-product">
            <img src={mugImg} style={{ width: "300px" }} />
            <div>
              <h3>Product price: € 7.50 </h3>
              <button type="submit">Preview</button>
            </div>
          </div>
        ) : product === "toe_bag" ? (
          <div className="which-product">
            <img src={toeBagImg} style={{ width: "400px" }} />
            <div>
              <h3>Product price: € 11.50 </h3>
              <button type="submit">Preview</button>
            </div>
          </div>
        ) : product === "beani" ? (
          <div className="which-product">
            <img src={beaniImg} style={{ width: "370px" }} />
            <div>
              <h3>Product price: € 11.30 </h3>
              <button type="submit">Preview</button>
            </div>
          </div>
        ) : null}
      </form>
    </div>
  );
}
