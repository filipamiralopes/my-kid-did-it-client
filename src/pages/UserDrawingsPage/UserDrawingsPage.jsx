import "./UserDrawingsPage.css";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/auth.context";
import Drawingcard from "../../components/DrawingCard/DrawingCard";
import { Link } from "react-router-dom";
import axios from "axios";
import { SERVER_URL } from "../../config";

function UserDrawingsPage({ currentOrder, setCurrentOrder }) {
  const [drawings, setDrawings] = useState([]);
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const fetchUserDrawings = async () => {
      try {
        const { data } = await axios.get(
          `${SERVER_URL}/api/drawings/user/${currentUser?._id}`
        );
        setDrawings(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUserDrawings();
  }, [currentUser]);
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
