import "./LoginPage.css";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../context/auth.context";
import { SERVER_URL } from "../../config";

function LoginPage() {
  const { storeToken, authenticateUser } = useContext(AuthContext);
  const nav = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const requestBody = { email, password };
    const login = async () => {
      try {
        const { data } = await axios.post(
          `${SERVER_URL}/auth/login`,
          requestBody
        );
        console.log("Response from login: ", data);
        storeToken(data.authToken);
        await authenticateUser();
        nav("/drawings");
      } catch (error) {
        const errorDescription = error.response.data.errorMessage;
        setErrorMessage(errorDescription);
      }
    };
    login();
  };

  return (
    <div className="login-page">
      <h1>Login</h1>

      <div className="login-form">
        <form onSubmit={handleLoginSubmit}>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={handleEmail}
          />

          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={handlePassword}
          />

          <button type="submit">Login</button>
        </form>
      </div>
      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <p>Don't have an account yet?</p>
      <Link to={"/signup"}> Sign Up</Link>
    </div>
  );
}

export default LoginPage;
