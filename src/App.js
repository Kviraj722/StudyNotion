import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/common/Navbar";
import Login from "../src/pages/Login";
import Signup from "../src/pages/Signup";

import OpenRoute from "./components/core/Auth/openRoute";

function App() {
  return (
    <div className="w-screen min-h-screen flex flex-col font-inter">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="signup"
          element={
            <OpenRoute>
              <Signup />
            </OpenRoute>
          }
        />
        <Route
          path="login"
          element={
            <OpenRoute>
              <Login />
            </OpenRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
