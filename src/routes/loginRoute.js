import express from "express";
import loginController from "../controllers/loginController.js";
import passportLogin from "../strategies/passport-jwt.js";
import passport from "passport";
import { Strategy, ExtractJwt } from "passport-jwt";

const router = express.Router();

router.post("/", loginController);
router.post("/auth", passportLogin);
export default router;