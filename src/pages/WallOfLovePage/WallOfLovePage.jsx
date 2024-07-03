import "./WallOfLovePage.css";
import elijah1 from "../../assets/elijah1.png";
import ian1 from "../../assets/ian1.png";
import ian2 from "../../assets/ian2.jpeg";
import orlando1 from "../../assets/orlando1.png";
import sean1 from "../../assets/sean1.png";
import viggo1 from "../../assets/viggo1.png";
import liv1 from "../../assets/liv1.png";
import cate1 from "../../assets/cate1.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTruckFast } from "@fortawesome/free-solid-svg-icons";
import Button from "@mui/material/Button";
import { Navigate } from "react-router-dom";

const reviews = [elijah1, ian1, liv1, ian2, orlando1, sean1, viggo1, cate1];

const WallOfLovePage = ({ currentOrder }) => {
  return (
    <div>
      <div className="order-on-the-way">
        <h2>Your order is on the way!</h2>
        <FontAwesomeIcon icon={faTruckFast} fontSize={"130px"} />
        <p>Order number: #11996578 </p>
        <Button variant="contained" type="submit" onClick={() => window.open("https://www.dhl.de/en/privatkunden/dhl-sendungsverfolgung.html", '_blank')} >
          Track my package
        </Button>
      </div>

      <div className="wall-of-love">
        <h1>
          {" "}
          Their kids <br />
          did it
        </h1>
        {reviews.map((img) => {
          return <img src={img} style={{ width: "330px" }} />;
        })}
      </div>
    </div>
  );
};

export default WallOfLovePage;
