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

function App() {
  const {currentUser} = useContext(AuthContext)
  const [drawings, setDrawings] = useState([]); // move to profile page?

  useEffect(() => { // move to profile page?
    const fetchUserDrawings = async () => {
      try {
        const { data } = await axios.get(`${SERVER_URL}/api/drawings//user/${currentUser?._id}`);
        setDrawings(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUserDrawings();
  }, [currentUser]);

  return (
    <div className="App">
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/profile"
          element={
            <IsPrivate>
              <ProfilePage drawings={drawings}/>
            </IsPrivate>
          }
        />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/canvas" element={<IsPrivate><CanvasPage /></IsPrivate>} />
      </Routes>
    </div>
  );
}

export default App;
