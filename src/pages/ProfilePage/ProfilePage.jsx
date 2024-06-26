import "./ProfilePage.css";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/auth.context";
import axios from "axios";
import { SERVER_URL } from "../../config";

function ProfilePage() {
  const [profileUser, setProfileUser] = useState(null);
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    axios
      .get(`${SERVER_URL}/auth/profile/${currentUser._id}`)
      .then((res) => {
        setProfileUser(res.data);
      })
      .catch((err) => console.log(err));
  }, [currentUser]);

  if (!profileUser) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>Profile page of {profileUser?.username}</h1>
      <img
        src={profileUser?.userImage}
        alt={profileUser?.username}
        style={{ height: "250px" }}
      />
    </div>
  );
}

export default ProfilePage;

// profileUser && profileUser.username
