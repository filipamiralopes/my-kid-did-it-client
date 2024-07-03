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

export default function OrderCard({ order }) {
  const { currentUser } = useContext(AuthContext);
  const parsedDate = new Date(order.createdAt);
  const nav = useNavigate();



  return (
    <Card sx={{ maxWidth: 260, width: 300 }} id="order-card">
      <CardMedia
        component="img"
        alt={`${order.product}`}
        height="140"
        image={order.mergedImg}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {order.product}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {`Ordered on ${parsedDate.toDateString()}`}
        </Typography>
      </CardContent>
      <CardActions>
        {/* <Button onClick={() => handleCancel()}> */}
        <Button>
          Cancel
        </Button>
      </CardActions>
    </Card>
  );
}
