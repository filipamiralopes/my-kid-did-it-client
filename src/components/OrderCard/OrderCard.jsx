import React, { useState, useEffect, useContext } from 'react';
import { Card, CardMedia, CardContent, CardActions, Typography, Button } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTruck, faBan } from '@fortawesome/free-solid-svg-icons';
import axios from "axios";
import { AuthContext } from "../../context/auth.context";
import { SERVER_URL } from "../../config";

const YourComponent = ({ order }) => {
  const { currentUser } = useContext(AuthContext);
  const [isCancelled, setIsCancelled] = useState(false);
  const [drawing, setDrawing] = useState(null);
  const parsedDate = new Date(order.createdAt);

  useEffect(() => {
    axios
      .get(`${SERVER_URL}/api/drawings/${order.drawing}`)
      .then((res) => {
        setDrawing(res.data);
      })
      .catch((err) => console.log(err));
  }, [currentUser]);

  const handleCancel = () => {
    setIsCancelled(true);
    // Add any other logic you need for cancellation
  };

  return (
    <Card 
      sx={{ 
        maxWidth: 300, 
        width: 300, 
        p: 1,
        backgroundColor: isCancelled ? 'darkgray' : 'inherit'
      }} 
    >
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
        <Typography 
          variant="body2" 
          color={isCancelled ? 'black' : '#1876D1'} 
          sx={{ mt: "8px", mr: "8px" }}
        >
          {isCancelled ? 'ORDER CANCELED' : 'DISPATCHED'} 
          {!isCancelled && <FontAwesomeIcon icon={faTruck} style={{ marginLeft: '5px' }} />}
        </Typography>
        {!isCancelled && (
          <Button onClick={handleCancel}>
            <Typography variant="body2" color="#C40617" >
              Cancel <FontAwesomeIcon icon={faBan} />
            </Typography>
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

export default YourComponent;