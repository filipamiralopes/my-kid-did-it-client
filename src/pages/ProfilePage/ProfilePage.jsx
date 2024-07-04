import "./ProfilePage.css";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/auth.context";
import Spinner from "../../components/Spinner/Spinner";

function ProfilePage({profileUser}) {

  profileUser = null;

  if (!profileUser) {
    return <Spinner/>; 
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