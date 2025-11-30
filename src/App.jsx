import {  Routes, Route, BrowserRouter } from "react-router-dom";
import Login from "./auth/login.jsx";
import Register from "./auth/register.jsx";
import Homepage from "./pages/homepage.jsx";

function App() {
  return (

   <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/" element={<Homepage />} />
    </Routes>


  );
}

export default App;
