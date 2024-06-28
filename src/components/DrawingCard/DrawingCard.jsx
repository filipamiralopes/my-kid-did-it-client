import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export default function Drawingcard({ drawing }) {
  const parsedDate = new Date(drawing.createdAt);
  return (
    <Card sx={{ maxWidth: 260 }}>
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
        <Button size="small">Order</Button>
        <Button size="small">Download</Button>
      </CardActions>
    </Card>
  );
}
