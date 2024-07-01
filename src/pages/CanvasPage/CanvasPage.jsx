import "./CanvasPage.css";
import { useContext, useRef, useState } from "react";
import { ReactSketchCanvas } from "react-sketch-canvas";
import { AuthContext } from "../../context/auth.context";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { SERVER_URL } from "../../config";

const styles = {
  border: "0.0625rem solid #9c9c9c",
  borderRadius: "0.25rem",
};

function CanvasPage() {
  const { currentUser } = useContext(AuthContext);
  const [title, setTitle] = useState("");
  const canvas = useRef();
  const nav = useNavigate();

  const handleTitle = (e) => setTitle(e.target.value);
  const handleUploadDrawing = (e) => {
    e.preventDefault();

    canvas.current
      .exportImage("png")
      .then((file) => {
        const requestBody = { title, author:currentUser._id, drawingData: file};
        axios
          .post(`${SERVER_URL}/api/drawings/upload`, requestBody)
          .then(() => {
            nav("/drawings");
            console.log("Drawing uploaded!");
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="canvas-container">
      <h1>Draw here!</h1>
      <ReactSketchCanvas
        ref={canvas}
        style={styles}
        width="350px"
        height="350px"
        canvasColor="transparent"
        strokeColor="#a855f7"
      />
      <label>Title:</label>
      <input type="text" name="title" value={title} onChange={handleTitle} />
      <button onClick={handleUploadDrawing}>Save</button>
    </div>
  );
}

export default CanvasPage;
