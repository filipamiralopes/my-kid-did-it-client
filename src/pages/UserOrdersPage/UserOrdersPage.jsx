import React from "react";
import { Link } from "react-router-dom";

const UserOrdersPage = ({ orders }) => {
  return (
    <div>
      {orders.length === 0 ? (
        <h1>
          No orders yet<br/>
          <Link to="/drawings">
            <span>Choose a Drawing</span>
          </Link>
        </h1>
      ) : (
        <h1>Your orders</h1>
      )}
    </div>
  );
};

export default UserOrdersPage;
