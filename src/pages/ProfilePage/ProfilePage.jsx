import "./ProfilePage.css";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/auth.context";
import Spinner from "../../components/Spinner/Spinner";

function ProfilePage({ profileUser }) {
  if (!profileUser) {
    return <Spinner />;
  }

  const parsedDate = new Date(profileUser.createdAt).toDateString().slice(3)

  return (
    <div className="profile">
      <h1>Profile page of {profileUser?.username}</h1>
      <img
        src={profileUser?.userImage}
        alt={profileUser?.username}
        style={{ height: "250px" }}
      />
      <p><span id="make-it-bold">Username:</span> {profileUser.username}</p>
      <p><span id="make-it-bold">Email:</span> {profileUser.email}</p>
      <p><span id="make-it-bold">Joined:</span> {parsedDate}</p>
      <p><span id="make-it-bold"># Drawings:</span> {profileUser.drawings}</p>
      <p><span id="make-it-bold"># Orders:</span> {profileUser.orders}</p>
    </div>
  );
}

export default ProfilePage;