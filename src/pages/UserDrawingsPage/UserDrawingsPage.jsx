import "./UserDrawingsPage.css";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/auth.context";
import Drawingcard from "../../components/DrawingCard/DrawingCard";
import { Link } from "react-router-dom";

function UserDrawingsPage({ drawings, currentOrder, setCurrentOrder }) {
  return (
    <div>
      {drawings.length === 0 ? (
        <h1>
          No drawings yet
          <br />
          <Link to="/canvas">
            <span>Start Drawing!</span>
          </Link>
        </h1>
      ) : (
        <>
          <h1>Your Kid Did It </h1>
          <div className="drawings-container">
            {drawings &&
              drawings.map((oneDraw) => {
                return <Drawingcard key={oneDraw._id} drawing={oneDraw} currentOrder={currentOrder} setCurrentOrder={setCurrentOrder}/>;
              })}
          </div>
        </>
      )}
    </div>
  );
}

export default UserDrawingsPage;
