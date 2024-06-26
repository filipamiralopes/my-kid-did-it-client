import "./CanvasPage.css";
import * as React from "react";
import { ReactSketchCanvas } from "react-sketch-canvas";

const styles = {
  border: "0.0625rem solid #9c9c9c",
  borderRadius: "0.25rem",
};

const CanvasPage = class extends React.Component {
  constructor(props) {
    super(props);

    this.canvas = React.createRef();
  }

  render() {
    return (
      <div className="canvas-container">
        <h1>Draw here!</h1>
        <ReactSketchCanvas
          ref={this.canvas}
          style={styles}
          width="40%"
          height="350px"
          canvasColor="transparent"
          strokeColor="#a855f7"
        />
        <button
          onClick={() => {
            this.canvas.current
              .exportImage("png")
              .then((data) => {
                console.log(data);
                // axios call to BE endpoint that saves image to user? or just push to profileUser (send props or set in AuthContext)
                console.log()
              })
              .catch((e) => {
                console.log(e);
              });
          }}
        >
          Get Image
        </button>
      </div>
    );
  }
};

export default CanvasPage;
