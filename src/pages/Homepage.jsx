import React from "react";
import useAuthStore from "../store/useAuthStore.js";
import Login from "../auth/login.jsx";

function Homepage() {
  const { user, token } = useAuthStore();

  return (
    <>
      {token && user ? (
        <div>{`Welcome to the Homepage! ${user.name}`}</div>
      ) : (
        <><Login /></>
      )}
    </>
  );
}

export default Homepage;
