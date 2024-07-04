import "./HomePage.css";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const nav = useNavigate();
  return (
    <>
      <div className="home-page-container">
        <div className="headers">
          <h1>Customize</h1>
          <p>
            Make your kid's masterpieces unforgettable <br />
            with custom prints
          </p>
        </div>
        <div className="carousel">
          <h1>
            CAROUSEL <br />
            PLACEHOLDER
          </h1>
        </div>
      </div>
      <div>
        <button onClick={() => nav("/canvas")}>Start drawing!</button>
      </div>
    </>
  );
};

export default HomePage;
