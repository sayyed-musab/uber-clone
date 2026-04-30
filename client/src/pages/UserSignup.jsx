import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { UserDataContext } from "../context/UserContext";

function UserSignup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userData, setUserData] = useState({});

  const navigate = useNavigate();

  const { user, setUser } = useContext(UserDataContext);

  const submitHandler = async (e) => {
    e.preventDefault();
    const newUser = {
      fullName: {
        firstName,
        lastName,
      },
      email: email,
      password: password,
    };
    setUserData(newUser);

    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/api/users/register`,
      newUser,
    );

    if (response.status === 201) {
      const data = response.data;
      setUser(data.user);
      navigate("/home");
    }

    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
  };

  return (
    <div className="p-7 h-screen flex flex-col justify-between">
      <div>
        <img
          className="w-16 mb-10"
          src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
          alt="Uber"
        />
        <form onSubmit={submitHandler}>
          <h3 className="text-lg mb-2 font-medium">What's your name?</h3>
          <div className="flex gap-4 mb-6">
            <input
              className="bg-[#eeeeee] w-1/2 rounded px-4 py-2 text-lg placeholder:text-base"
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="First Name"
              required
            />
            <input
              className="bg-[#eeeeee] w-1/2 rounded px-4 py-2 text-lg placeholder:text-base"
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Last Name"
              required
            />
          </div>
          <h3 className="text-lg mb-2 font-medium">What's your email?</h3>
          <input
            className="bg-[#eeeeee] mb-6 rounded px-4 py-2 w-full text-lg placeholder:text-base"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email@example.com"
            required
          />
          <h3 className="text-lg mb-2 font-medium">Enter Password</h3>
          <input
            className="bg-[#eeeeee] mb-6 rounded px-4 py-2 w-full text-lg placeholder:text-base"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="password"
            required
          />
          <button className="bg-[#111] text-white mb-7 rounded px-4 py-2 w-full text-lg">
            Create Account
          </button>
          <p className="text-center">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600">
              Login
            </Link>
          </p>
        </form>
      </div>
      <div>
        <p className="text-[10px] leading-tight">
          This site is protected by reCAPTCHA and the{" "}
          <span className="underline">Google Privacy Policy</span> and{" "}
          <span className="underline">Terms of Service apply</span>.
        </p>
      </div>
    </div>
  );
}

export default UserSignup;
