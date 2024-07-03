import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";
import axios from "axios";
import { SERVER_URL } from "../../config";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTruck, faBan } from "@fortawesome/free-solid-svg-icons";

export default function OrderCard({ order }) {
  const { currentUser } = useContext(AuthContext);
  const [drawing, setDrawing] = useState(null);
  const parsedDate = new Date(order.createdAt);
  const nav = useNavigate();

  useEffect(() => {
    axios
      .get(`${SERVER_URL}/api/drawings/${order.drawing}`)
      .then((res) => {
        setDrawing(res.data);
      })
      .catch((err) => console.log(err));
  }, [currentUser]);

  return (
    <Card sx={{ maxWidth: 300, width: 300, maxHeight: 300, p: 1}} >
      <CardMedia
        component="img"
        alt={`${order.product}`}
        height="140"
        image={order.mergedImg}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div" align="left">
          {`${order.product} with ${drawing?.title}`}
        </Typography>
        <Typography variant="body2" color="text.secondary" align="left">
          {`ORDER PLACED ${parsedDate.toDateString().toUpperCase().slice(3)}`}
        </Typography>
        <Typography variant="body2" color="text.secondary" align="left">
          {`TOTAL ${order.price}0 €`}
        </Typography>
      </CardContent>
      <CardActions sx={{ display: 'inline-flex' }}>
        <Typography variant="body2" color="#1876D1">
          DISPATCHED <FontAwesomeIcon icon={faTruck} />
        </Typography>
        {/* <Button onClick={() => handleCancel()}> */}
        <Button>
          <Typography variant="body2" color="#C40617" >
            Cancel <FontAwesomeIcon icon={faBan} />
          </Typography>
        </Button>
      </CardActions>
    </Card>
  );
}
