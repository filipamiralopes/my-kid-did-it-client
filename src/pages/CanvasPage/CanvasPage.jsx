import "./CanvasPage.css";
import { useContext, useRef, useState } from "react";
import { ReactSketchCanvas } from "react-sketch-canvas";
import { AuthContext } from "../../context/auth.context";
import { useNavigate, Navigate } from "react-router-dom";
import axios from "axios";
import { SERVER_URL } from "../../config";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUndo, faRedo, faRotate } from "@fortawesome/free-solid-svg-icons";

const styles = {
  border: "0.0625rem solid #9c9c9c",
  borderRadius: "0.25rem",
};

function CanvasPage() {
  const { currentUser, isLoggedIn } = useContext(AuthContext);
  const [title, setTitle] = useState("");
  const [error, setError] = useState(null);
  const [strokeColor, setStrokeColor] = useState("#000000");
  const [canvasColor, setCanvasColor] = useState("#FFFFFF");

  const canvas = useRef();
  const nav = useNavigate();

  if (!isLoggedIn || !currentUser) {
    return <Navigate to="/login" />;
  }

  const handleTitle = (e) => setTitle(e.target.value);
  const handleUploadDrawing = (e) => {
    e.preventDefault();

    if (!title) {
      setError("Give a title to your kiddo's work of art");
    }

    canvas.current.exportImage("png").then((file) => {
      const requestBody = { title, author: currentUser._id, drawingData: file };
      axios
        .post(`${SERVER_URL}/api/drawings/upload`, requestBody)
        .then(() => {
          nav("/drawings");
          console.log("Drawing uploaded!");
        })
        .catch((err) => console.log(err));
    });
  };

  const handleStrokeColorChange = (e) => {
    setStrokeColor(e.target.value);
  };

  const handleCanvasColorChange = (e) => {
    setCanvasColor(e.target.value);
  };

  const handleResetClick = () => {
    setCanvasColor("#FFFFFF");
    canvas.current?.resetCanvas();
  };

  const handleUndoClick = () => {
    canvas.current?.undo();
  };

  const handleRedoClick = () => {
    canvas.current?.redo();
  };

  return (
    <>
      <div className="canvas-container">
        <div className="canvas-headers">
          <h1>
            Let the pencil <br />
            flow
          </h1>
          <p>
            Use the tools next to the canvas to control pencil and
            background color.
          </p>
          <div className="title-save">
            <label>Title:</label>
            <input
              type="text"
              name="title"
              value={title}
              onChange={handleTitle}
            />
            <button onClick={handleUploadDrawing}>Save</button>
            
          </div>
          {error && <p style={{ color: "red", fontSize: "16px", marginLeft: "15px" }}>{error}</p>}
        </div>
        <ReactSketchCanvas
          id="canvas"
          ref={canvas}
          style={styles}
          width="70vh"
          height="70vh"
          strokeColor={strokeColor}
          canvasColor={canvasColor === "#FFFFFF" ? "transparent" : canvasColor}
        />
        <div className="canvas-tools">
          <label htmlFor="color"></label>
          <input
            title="Stroke color"
            className="stroke-color"
            type="color"
            value={strokeColor}
            onChange={handleStrokeColorChange}
          />
          <label htmlFor="color"></label>
          <input
            title="Canvas color"
            className="canvas-color"
            type="color"
            value={canvasColor}
            onChange={handleCanvasColorChange}
          />
          <button
            title="Undo"
            onClick={handleUndoClick}
          >
            <FontAwesomeIcon icon={faUndo} />
          </button>
          <button title="Redo" onClick={handleRedoClick}>
            <FontAwesomeIcon icon={faRedo} />
          </button>
          <button title="Clear" onClick={handleResetClick}>
            <FontAwesomeIcon icon={faRotate} />
          </button>
        </div>
      </div>
    </>
  );
}

export default CanvasPage;
