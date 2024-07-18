import "./UserDrawingsPage.css";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/auth.context";
import Drawingcard from "../../components/DrawingCard/DrawingCard";
import { Link } from "react-router-dom";
import axios from "axios";
import { SERVER_URL } from "../../config";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";

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

  const handleUploadFile = async (e) => {
    e.preventDefault();

    const file = e.target.files[0];
    const fileFormData = new FormData();
    fileFormData.append("title", "uploaded"); // TODO
    fileFormData.append("fileUrl", file);
    fileFormData.append("author", currentUser._id);

    try {
      await axios.post(`${SERVER_URL}/api/drawings/upload-file`, fileFormData);
      // Refresh the drawings list after upload
      const { data } = await axios.get(
        `${SERVER_URL}/api/drawings/user/${currentUser._id}`
      );
      setDrawings(data);
    } catch (error) {
      const errorDescription =
        error.response?.data?.errorMessage || error.message;
      setErrorMessage(errorDescription);
    }
  };

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
              <div className="add-buttons">
                <Link to="/canvas">
                  <button>+ Add new drawing</button>
                </Link>
                <div>
                  <label className="choose-file">
                    <input type="file" name="file" onChange={handleUploadFile} />
                    <FontAwesomeIcon icon={faUpload} />
                    &nbsp; Or upload a file
                  </label>
                </div>
              </div>
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
