import "./WallOfLovePage.css";
import elijah1 from "../../assets/elijah1.png";
import ian1 from "../../assets/ian1.png";
import ian2 from "../../assets/ian2.jpeg";
import orlando1 from "../../assets/orlando1.png";
import sean1 from "../../assets/sean1.png";
import viggo1 from "../../assets/viggo1.png";
import liv1 from "../../assets/liv1.png";
import cate1 from "../../assets/cate1.png";
import elijah2 from "../../assets/elijah2.png";
import seanBean from "../../assets/sean-bean.png";
import orlando2 from "../../assets/orlando2.png";
import hobbits from "../../assets/hobbits.png";
import eomer from "../../assets/eomer.png";
import liv2 from "../../assets/liv2.png";
import viggo2 from "../../assets/viggo2.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTruckFast } from "@fortawesome/free-solid-svg-icons";
import Button from "@mui/material/Button";
import { Navigate } from "react-router-dom";

const reviews = [
  ian1,
  liv1,
  orlando1,
  elijah2,
  cate1,
  sean1,
  viggo1,
  ian2,
  viggo2,
  hobbits,
  elijah1,
  seanBean,
  orlando2,
  eomer,
  liv2
];

const WallOfLovePage = ({ currentOrder }) => {
  return (
    <div>
      <div className="order-on-the-way">
        <h2>Your order is on the way!</h2>
        <FontAwesomeIcon icon={faTruckFast} fontSize={"130px"} />
        <p>Order number: #11996578 </p>
        <button
          onClick={() =>
            window.open(
              "https://www.dhl.de/en/privatkunden/dhl-sendungsverfolgung.html",
              "_blank"
            )
          }
        >
          Track my package
        </button>
      </div>

      <div>
        <hr />
      </div>

      <div className="wall-of-love">
        <h1>
          Their kids <br />
          did it
        </h1>
        {reviews.map((img) => {
          return <img src={img} key={img} style={{ width: "330px" }} />;
        })}
      </div>
    </div>
  );
};

export default WallOfLovePage;
