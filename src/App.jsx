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
import UserDrawingsPage from "./pages/UserDrawingsPage/UserDrawingsPage";
import UserOrdersPage from "./pages/UserOrdersPage/UserOrdersPage";
import ToOrderPage from "./pages/ToOrderPage/ToOrderPage";
import PreviewPage from "./pages/PreviewPage/PreviewPage";
import WallOfLovePage from "./pages/WallOfLovePage/WallOfLovePage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";

function App() {
  const { currentUser } = useContext(AuthContext);
  const [currentOrder, setCurrentOrder] = useState(null);
  const [profileUser, setProfileUser] = useState(null);

  useEffect(() => {
    if (currentUser?._id) {
      axios
        .get(`${SERVER_URL}/auth/profile/${currentUser?._id}`)
        .then((res) => {
          setProfileUser(res.data);
        })
        .catch((err) => console.log(err));
    }
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
              <UserDrawingsPage
                currentOrder={currentOrder}
                setCurrentOrder={setCurrentOrder}
              />
            </IsPrivate>
          }
        />
        <Route
          path="/orders"
          element={
            <IsPrivate>
              <UserOrdersPage />
            </IsPrivate>
          }
        />
        <Route
          path="/products"
          element={
            <IsPrivate>
              <ToOrderPage
                currentOrder={currentOrder}
                setCurrentOrder={setCurrentOrder}
              />
            </IsPrivate>
          }
        />
        <Route
          path="/preview"
          element={
            <IsPrivate>
              <PreviewPage currentOrder={currentOrder} />
            </IsPrivate>
          }
        />
        <Route
          path="/wall-of-love"
          element={
            <IsPrivate>
              <WallOfLovePage currentOrder={currentOrder} />
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
        <Route path="*" element={<NotFoundPage/>}/>
      </Routes>
    </div>
  );
}

export default App;
