import { useNavigate } from "react-router-dom";
import "./NotFoundPage.css";

const NotFoundPage = () => {
  const nav = useNavigate();
  return (
    <div className="not-found-page">
      <h1>404</h1>
      <img src={"https://res.cloudinary.com/dzymhjyvm/image/upload/v1720083986/jyvdxkjtxtz9mxfxfdoj.png"} alt={"404 dead fish"} style={{width: "200px"}}/>
      <h2>Not all who wander are lost</h2>
      <button onClick={() => nav("/")}>BACK TO HOME</button>
    </div>
  );
};

export default NotFoundPage;
