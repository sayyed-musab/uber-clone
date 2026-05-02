import express from "express";
const router = express.Router();
import { authUser } from "../middlewares/auth.middleware.js";
import {
  getCoordinates,
  getDistanceAndTimeController,
  getAutoCompleteSuggestionsController,
} from "../controllers/maps.controller.js";
import { query } from "express-validator";

router.get(
  "/get-coordinates",
  query("address")
    .isLength({ min: 3 })
    .withMessage("Address must be at least 3 characters long"),
  authUser,
  getCoordinates,
);

router.get(
  "/get-distance-and-time",
  query("origin")
    .isString()
    .isLength({ min: 3 })
    .withMessage("Origin must be at least 3 characters long"),
  query("destination")
    .isString()
    .isLength({ min: 3 })
    .withMessage("Destination must be at least 3 characters long"),
  authUser,
  getDistanceAndTimeController,
);

router.get(
  "/get-suggestions",
  query("input").isString().isLength({ min: 3 }),
  authUser,
  getAutoCompleteSuggestionsController,
);

export default router;
