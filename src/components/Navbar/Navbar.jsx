import { useContext } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";

function Navbar() {
  const { handleLogout, currentUser } = useContext(AuthContext);

  return (
    <nav>
      <Link to="/">
        <button>Home</button>
      </Link>

      {currentUser ? (
        <>
          <button onClick={handleLogout}>Logout</button>
          <h2>{currentUser?.username}</h2>
        </>
      ) : (
        <>
          <Link to="/signup">
            <button>Signup</button>
          </Link>
          <Link to="/login">
            <button>Login</button>
          </Link>
        </>
      )}
    </nav>
  );
}

export default Navbar;
