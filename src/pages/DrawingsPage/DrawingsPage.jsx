import "./DrawingsPage.css";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/auth.context";
import Drawingcard from "../../components/DrawingCard/DrawingCard";

function DrawingsPage({ drawings }) {
  return (
    <div>
        <h1>Your Kiddo's Art</h1>
      <div className="drawings-container">
        {drawings &&
          drawings.map((oneDraw) => {
            return <Drawingcard key={oneDraw._id} drawing={oneDraw} />;
          })}
      </div>
    </div>
  );
}

export default DrawingsPage;
