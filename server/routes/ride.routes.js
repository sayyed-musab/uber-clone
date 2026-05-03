import express from "express";
const router = express.Router();
import { body, query } from "express-validator";
import {
  createRideController,
  getFareController,
  confirmRideController,
  startRideController,
  endRideController,
} from "../controllers/ride.controller.js";
import { authUser, authCaptain } from "../middlewares/auth.middleware.js";

router.post(
  "/create",
  body("pickup")
    .isString()
    .isLength({ min: 3 })
    .withMessage("Invalid pickup address"),
  body("destination")
    .isString()
    .isLength({ min: 3 })
    .withMessage("Invalid destination address"),
  body("vehicleType")
    .isString()
    .isIn(["auto", "car", "motorcycle"])
    .withMessage("Invalid vehicle type"),
  authUser,
  createRideController,
);

router.get(
  "/get-fare",
  query("pickup")
    .isString()
    .isLength({ min: 3 })
    .withMessage("Invalid pickup address"),
  query("destination")
    .isString()
    .isLength({ min: 3 })
    .withMessage("Invalid destination address"),
  authUser,
  getFareController,
);

router.post(
  "/confirm",
  authCaptain,
  body("rideId").isMongoId().withMessage("Invalid ride id"),
  confirmRideController,
);

router.get(
  "/start-ride",
  authCaptain,
  query("rideId").isMongoId().withMessage("Invalid ride id"),
  query("otp")
    .isString()
    .isLength({ min: 6, max: 6 })
    .withMessage("Invalid OTP"),
  startRideController,
);

router.post(
  "/end-ride",
  authCaptain,
  body("rideId").isMongoId().withMessage("Invalid ride id"),
  endRideController,
);

export default router;
