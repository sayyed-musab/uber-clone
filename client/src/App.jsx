import React from "react";
import { Route, Routes } from "react-router-dom";
import {
  Start,
  UserLogin,
  UserSignup,
  CaptainLogin,
  CaptainSignup,
  UserProtectWrapper,
  Home,
} from "./pages/index.js";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Start />} />
        <Route path="/login" element={<UserLogin />} />
        <Route path="/signup" element={<UserSignup />} />
        <Route path="/captain-login" element={<CaptainLogin />} />
        <Route path="/captain-signup" element={<CaptainSignup />} />
        <Route
          path="/home"
          element={
            <UserProtectWrapper>
              <Home />
            </UserProtectWrapper>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
