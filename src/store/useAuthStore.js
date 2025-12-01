// useAuthStore.js

import { create } from "zustand";


// 🔍 Check if token expired (helper function)
export function isTokenExpired(token) {
  if (!token) return true;

  const payload = JSON.parse(atob(token.split(".")[1])); // decode JWT
  const expiryTime = payload.exp * 1000;
  return Date.now() > expiryTime; // true = expired
}

const useAuthStore = create((set) => ({
  user: JSON.parse(localStorage.getItem("user")) || null,  // Restore user
  token: localStorage.getItem("token") || null, 

  // 🔹 LOGIN FUNCTION
  loginFunction: async (user) => {
    try {
      const res = await fetch("http://localhost:8000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: user.email,
          password: user.password,
        }),
      });

      const data = await res.json();
      console.log("Login Response:", data);

      if (!res.ok) {
        return alert(data.message || "Login failed");
      }

      // 🔥 Save user & token in Zustand
      set({ user: data.data, token: data.token });
      localStorage.setItem("user", JSON.stringify(data.data));
      localStorage.setItem("token", data.token);

    } catch (err) {
      console.log("Login Error:", err);
    }
  },

  // 🔹 REGISTER FUNCTION
  registerFunction: async (user) => {
    try {
      const res = await fetch("http://localhost:8000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: user.name,
          email: user.email,
          password: user.password,
        }),
      });

      const data = await res.json();
      console.log("Register Response:", data);

      if (!res.ok) {
        return alert(data.message || "Registration failed");
      }

      set({ user: data.data, token: data.token }); // ✔ save user & token
      localStorage.setItem("user", JSON.stringify(data.data));
      localStorage.setItem("token", data.token);
    } catch (err) {
      console.log("Register Error:", err);
    }
  },


  //logout function
   logout: () => {
    set({ user: null, token: null });
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  },


}));

const token = localStorage.getItem("token");
if (token && isTokenExpired(token)) {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
}

export default useAuthStore;
