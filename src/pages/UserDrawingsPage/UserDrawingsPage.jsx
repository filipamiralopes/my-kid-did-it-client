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

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${SERVER_URL}/api/drawings/${id}`);
      setDrawings(drawings.filter((drawing) => drawing._id !== id));
      console.log(`Drawing with id ${id} was deleted`);
    } catch (error) {
      console.log(error);
    }
  };

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
        <>
          <h1>No drawings yet</h1>
          <Link to="/canvas">
            <button>Start Drawing</button>
          </Link>
        </>
      ) : (
        <>
          <div className="drawings-container">
            <div className="drawings-container-headers">
              <h1>
                Your kid did <br />
                these
              </h1>
              <Link to="/canvas">
                <button>+ Add new drawing</button>
              </Link>
            </div>
            {drawings &&
              drawings.map((oneDraw) => {
                return (
                  <Drawingcard
                    key={oneDraw._id}
                    drawing={oneDraw}
                    currentOrder={currentOrder}
                    setCurrentOrder={setCurrentOrder}
                    handleDelete={handleDelete}
                  />
                );
              })}
          </div>
        </>
      )}
    </div>
  );
}

export default UserDrawingsPage;
