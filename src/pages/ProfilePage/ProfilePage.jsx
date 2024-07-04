import "./ProfilePage.css";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/auth.context";
import Spinner from "../../components/Spinner/Spinner";

function ProfilePage({ profileUser }) {
  if (!profileUser) {
    return <Spinner />;
  }

  const parsedDate = new Date(profileUser.createdAt).toDateString().slice(3);

  return (
    <div className="profile-page">
      <div className="profile-headers">
        <h1>{profileUser?.username.charAt(0).toUpperCase() + profileUser?.username.slice(1)}</h1>
        <p>This is your space</p>
      </div>
      <div className="profile-container">
        <img
          src={profileUser?.userImage}
          alt={profileUser?.username}
          style={{ height: "200px" }}
        />
        <div className="profile-details">
          <p>
            <span id="make-it-bold">Username:</span> {profileUser.username}
          </p>
          <p>
            <span id="make-it-bold">Email:</span> {profileUser.email}
          </p>
          <p>
            <span id="make-it-bold">Joined:</span> {parsedDate}
          </p>
          <p>
            <span id="make-it-bold"># Drawings:</span> {profileUser.drawings}
          </p>
          <p>
            <span id="make-it-bold"># Orders:</span> {profileUser.orders}
          </p>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
