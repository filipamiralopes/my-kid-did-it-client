import usImg from "../../assets/us.png";

const AboutUs = () => {
  return (
    <div className="home-page-container">
      <div className="headers">
        <h1>About Us</h1>
        <p>
          Teacher, leave them kids alone! <br />
          All in all, it's just another brick in the wall.
        </p>
      </div>
      <div className="carousel">
        <img src={usImg} alt="founders picture" style={{ width: "330px" }} />
      </div>
    </div>
  );
};

export default AboutUs;
