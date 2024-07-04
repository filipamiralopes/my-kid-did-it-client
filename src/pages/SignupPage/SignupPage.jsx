import "./SignupPage.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { SERVER_URL } from "../../config";

function SignupPage() {
  const nav = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const handleName = (e) => setUsername(e.target.value);

  const handleSignupSubmit = (e) => {
    e.preventDefault();

    // const image = e.target.image.files[0];
    const userFormData = new FormData();
    // userFormData.append("imageUrl", image);
    userFormData.append("username", username);
    userFormData.append("email", email);
    userFormData.append("password", password);

    axios
      .post(`${SERVER_URL}/auth/signup`, userFormData)
      .then(() => {
        nav("/login");
      })
      .catch((error) => {
        const errorDescription = error.response.data.errorMessage;
        setErrorMessage(errorDescription);
      });
  };

  

  return (
    <div className="signup-page">
      <h1>Sign Up</h1>

      <form onSubmit={handleSignupSubmit}>
        <label>Username:</label>
        <input
          type="text"
          name="username"
          value={username}
          onChange={handleName}
        />

        <label>Email:</label>
        <input type="email" name="email" value={email} onChange={handleEmail} />

        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={handlePassword}
        />
        {/* <label>User Image:</label>
        <input type="file" name="image" /> */}

        <button type="submit">Sign Up</button>
      </form>

      {errorMessage && <p style={{ color: "red" }}className="error-message">{errorMessage}</p>}

      <h4>Already have account?</h4>
      <Link to={"/login"}>
        <button>Login</button>
      </Link>
    </div>
  );
}

export default SignupPage;
