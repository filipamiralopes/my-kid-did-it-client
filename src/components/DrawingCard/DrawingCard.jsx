import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";
import axios from "axios";
import { SERVER_URL } from "../../config";

export default function Drawingcard({ drawing, setCurrentOrder  }) {
  const { currentUser } = useContext(AuthContext);
  const parsedDate = new Date(drawing.createdAt);
  const nav = useNavigate();

  const handleChooseProduct = (e) => {
    e.preventDefault();
    const requestBody = {
      user: currentUser._id,
      drawing: drawing._id,
      product: "",
      price: 0,
      shippingAddress: "",
    };
    axios
      .post(`${SERVER_URL}/api/orders`, requestBody)
      .then(({data}) => {
        setCurrentOrder(data)
        console.log("Order created!");
      })
      .catch((err) => console.log(err));
    nav("/products");
  };

  return (
    <Card sx={{ maxWidth: 260 }} id="drawing-card">
      <CardMedia
        component="img"
        alt={`${drawing.title} drawing`}
        height="140"
        image={drawing.file}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {drawing.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {`Added on ${parsedDate.toDateString()}`}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={handleChooseProduct}>
          Order
        </Button>
        <Button size="small">Download</Button>
      </CardActions>
    </Card>
  );
}
