import React, { useEffect } from "react";
import useAuthStore from "../store/useAuthStore.js";
import Login from "../auth/login.jsx";
import FileManager from "../../components/FileManager.jsx";

function Homepage() {
  const logout = useAuthStore((state) => state.logout);
  const token = useAuthStore((state) => state.token);
  const user = useAuthStore((state) => state.user);
  const isTokenExpired = (token) => {
    if (!token) return true;            
    const payload = JSON.parse(atob(token.split(".")[1])); // decode JWT
    const expiryTime = payload.exp * 1000;
    return Date.now() > expiryTime; // true = expired
  }

  

 useEffect(() => {
    if (token && isTokenExpired(token)) {
      logout(); // auto logout if expired
      console.log("Token expired. Logged out.");
    }
  }, [token]);


  return (
    <>
      {token && user ? (
      <FileManager />
      ) : (
        <><Login /></>
      )}
    </>
  );
}

export default Homepage;
