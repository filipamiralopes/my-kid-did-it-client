import "./WallOfLovePage.css";
import elijah1 from "../../assets/elijah1.png";
import ian1 from "../../assets/ian1.png";
import ian2 from "../../assets/ian2.jpeg";
import orlando1 from "../../assets/orlando1.png";
import sean1 from "../../assets/sean1.png";
import viggo1 from "../../assets/viggo1.png";
import liv1 from "../../assets/liv1.png";
import cate1 from "../../assets/cate1.png";

const reviews = [elijah1, ian1, liv1, ian2, orlando1, sean1, viggo1, cate1]

const WallOfLovePage = () => {
  return (
    <div>
      <div className="order-on-the-way">

      </div>
      
      <div className="wall-of-love">
        <h1> Their kids <br/>did it</h1>
        {reviews.map(img =>{
          return <img src={img} style={{width: "330px"}}/>
        })}
      </div>
    </div>
  );
};

export default WallOfLovePage;
