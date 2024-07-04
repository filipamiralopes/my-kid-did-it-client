import "./HomePage.css";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const nav = useNavigate();
  return (
    <div>
      <h1>My Kid Did It</h1>
      <h3>Custom Printing</h3>
      <button onClick={() => nav("/canvas")}>Start drawing!</button>
    </div>
  )
}

export default HomePage