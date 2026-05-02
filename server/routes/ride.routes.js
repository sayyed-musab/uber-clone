import express from "express";
const router = express.Router();
import { body } from "express-validator";
import { createRideController } from "../controllers/ride.controller.js";
import { authUser } from "../middlewares/auth.middleware.js";

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

export default router;
