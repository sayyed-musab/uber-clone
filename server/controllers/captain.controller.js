import { captainModel, blacklistTokenModel } from "../models/index.js";
import { createCaptain } from "../services/captain.service.js";
import { validationResult } from "express-validator";

export const registerCaptain = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { fullName, email, password, vehicle } = req.body;
  const isCaptainAlreadyRegistered = await captainModel.findOne({ email });

  if (isCaptainAlreadyRegistered) {
    return res
      .status(400)
      .json({ error: "Captain with this email already exists" });
  }

  const hashedPassword = await captainModel.hashPassword(password);

  try {
    const captain = await createCaptain({
      firstName: fullName.firstName,
      lastName: fullName.lastName,
      email,
      password: hashedPassword,
      color: vehicle.color,
      plate: vehicle.plate,
      capacity: vehicle.capacity,
      vehicleType: vehicle.vehicleType,
    });

    const token = captain.generateAuthToken();
    res.status(201).json({ token, captain });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const loginCaptain = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;
  try {
    const captain = await captainModel.findOne({ email }).select("+password");
    if (!captain) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const isMatch = await captain.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = captain.generateAuthToken();

    res.cookie("token", token);
    res.json({ token, captain });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const getCaptainProfile = async (req, res) => {
  res.json({ captain: req.captain });
};

export const logoutCaptain = async (req, res) => {
  res.clearCookie("token");
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
  await blacklistTokenModel.create({ token });

  res.status(200).json({ message: "Logged out successfully" });
};
