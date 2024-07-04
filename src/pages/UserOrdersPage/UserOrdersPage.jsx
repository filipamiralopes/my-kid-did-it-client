import "./UserOrdersPage.css";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";
import { SERVER_URL } from "../../config";
import axios from "axios";
import OrderCard from "../../components/OrderCard/OrderCard";

const UserOrdersPage = () => {
  const { currentUser } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchUserOrders = async () => {
      try {
        const { data } = await axios.get(
          `${SERVER_URL}/api/orders/user/${currentUser?._id}`
        );
        setOrders(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUserOrders();
  }, [currentUser]);

  return (
    <div >
      {orders.length === 0 ? (
        <>
          <h1>
            No orders yet
            <br />
          </h1>
          <Link to="/drawings">
            <button>Choose a Drawing</button>
          </Link>
        </>
      ) : (
        <>
          <h1>Your orders</h1>
          <div className="orders-container">
            {orders &&
              orders.map((oneOrder) => {
                return <OrderCard key={oneOrder._id} order={oneOrder} />;
              })}
          </div>
        </>
      )}
    </div>
  );
};

export default UserOrdersPage;
