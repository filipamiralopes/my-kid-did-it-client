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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDownload,
  faTrash,
  faCartShopping,
} from "@fortawesome/free-solid-svg-icons";

export default function Drawingcard({
  drawing,
  setCurrentOrder,
  handleDelete,
}) {
  const { currentUser } = useContext(AuthContext);
  const parsedDate = new Date(drawing.createdAt);
  const nav = useNavigate();

  const onDownload = (fileUrl, fileName) => {
    const a = document.createElement("a");
    a.href = fileUrl;
    a.setAttribute("download", fileName);
    a.click();
  };

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
      .then(({ data }) => {
        setCurrentOrder(data);
        console.log("Order created!");
      })
      .catch((err) => console.log(err));
    nav("/products");
  };

  return (
    <Card
      sx={{ maxWidth: 300, width: 300, maxHeight: 300, p: 1 }}
      id="drawing-card"
    >
      <CardMedia
        component="img"
        alt={`${drawing.title} drawing`}
        height="140"
        image={drawing.file}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div" align="left">
          {drawing.title}
        </Typography>
        <Typography variant="body2" color="text.secondary" align="left">
          {`CREATED ON ${parsedDate.toDateString().toUpperCase().slice(3)}`}
        </Typography>
      </CardContent>
      <CardActions sx={{ display: "inline-flex" }}>
        <Button
          title="Order"
          size="medium"
          style={{ fontSize: "18px" }}
          sx={{ color: "#242424" }}
          onClick={handleChooseProduct}
        >
          <FontAwesomeIcon icon={faCartShopping} />
        </Button>
        <Button
          title="Download"
          size="medium"
          style={{ fontSize: "18px" }}
          sx={{ color: "#242424" }}
          onClick={() =>
            onDownload(
              drawing.file.replace("/upload/", "/upload/fl_attachment/"),
              `${drawing.title}.png`
            )
          }
        >
          <FontAwesomeIcon icon={faDownload} />
        </Button>
        <Button
          title="Trash"
          style={{ fontSize: "18px" }}
          sx={{ color: "#C40617" }}
          onClick={() => handleDelete(drawing._id)}
        >
          <FontAwesomeIcon icon={faTrash} />
        </Button>
      </CardActions>
    </Card>
  );
}
