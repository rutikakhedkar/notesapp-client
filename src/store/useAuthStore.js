// useAuthStore.js

import { create } from "zustand";

const useAuthStore = create((set) => ({
  user: null,
  token: null,

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
    } catch (err) {
      console.log("Register Error:", err);
    }
  },
}));

export default useAuthStore;
