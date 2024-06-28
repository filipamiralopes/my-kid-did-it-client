import "./App.css";
import { Routes, Route } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import Navbar from "./components/Navbar/Navbar";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import IsPrivate from "./components/IsPrivate/IsPrivate";
import SignupPage from "./pages/SignupPage/SignupPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import HomePage from "./pages/HomePage/HomePage";
import CanvasPage from "./pages/CanvasPage/CanvasPage";
import { SERVER_URL } from "./config";
import { AuthContext } from "./context/auth.context";
import DrawingsPage from "./pages/DrawingsPage/DrawingsPage";
import OrdersPage from "./pages/OrdersPage/OrdersPage";

function App() {
  const { currentUser } = useContext(AuthContext);
  const [drawings, setDrawings] = useState([]);
  const [orders, setOrders] = useState([])
  const [profileUser, setProfileUser] = useState(null);

  useEffect(() => {
    axios
      .get(`${SERVER_URL}/auth/profile/${currentUser?._id}`)
      .then((res) => {
        setProfileUser(res.data);
      })
      .catch((err) => console.log(err));
  }, [currentUser]);

  useEffect(() => {
    const fetchUserDrawings = async () => {
      try {
        const { data } = await axios.get(
          `${SERVER_URL}/api/drawings//user/${currentUser?._id}`
        );
        setDrawings(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUserDrawings();
  }, [currentUser]);

  return (
    <div className="App">
      <Navbar profileUser={profileUser} />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/profile"
          element={
            <IsPrivate>
              <ProfilePage profileUser={profileUser} />
            </IsPrivate>
          }
        />
        <Route
          path="/drawings"
          element={
            <IsPrivate>
              <DrawingsPage drawings={drawings} />
            </IsPrivate>
          }
        />
        <Route
          path="/orders"
          element={
            <IsPrivate>
              <OrdersPage orders={orders}/>
            </IsPrivate>
          }
        />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/canvas"
          element={
            <IsPrivate>
              <CanvasPage />
            </IsPrivate>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
