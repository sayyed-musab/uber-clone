import React from "react";
import { Route, Routes } from "react-router-dom";
import {
  Start,
  UserLogin,
  UserSignup,
  CaptainLogin,
  CaptainSignup,
  UserProtectWrapper,
  UserHome,
  UserLogout,
  CaptainHome,
  CaptainLogout,
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
              <UserHome />
            </UserProtectWrapper>
          }
        />
        <Route
          path="/captain-home"
          element={
            <UserProtectWrapper>
              <CaptainHome />
            </UserProtectWrapper>
          }
        />
        <Route
          path="/user/logout"
          element={
            <UserProtectWrapper>
              <UserLogout />
            </UserProtectWrapper>
          }
        />
        <Route
          path="/captain/logout"
          element={
            <UserProtectWrapper>
              <CaptainLogout />
            </UserProtectWrapper>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
