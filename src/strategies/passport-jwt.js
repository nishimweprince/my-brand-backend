import passport from "passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import User from "../models/user.js";
import bcrypt from "bcrypt";
import errorFunc from "../utils/errors.js";
import getCookie from "../utils/authCookie.js";
import express from "express";

const router = express.Router();

// CONFIGURE DOTENV
dotenv.config();

const passportLogin = (req, res, next) => {

    const secret = process.env.USER_SECRET;

    const { email, password } = req.body;
    const user = User.findOne({ email });

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        if (user){
            done(null, user);
        }
        else {
            done(null, false);
        }
    });

    // CREATE AND SIGN A TOKEN
    const token = jwt.sign({ id: user._id }, secret, {expiresIn: "1w"});

    // SET COOKIE
    res.cookie("token", token, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
    });

    const opts = {
        secretOrKey: process.env.USER_SECRET,
        jwtFromRequest: getCookie(res)
      };
      
      console.log(opts, req.body);
      
      passport.use(
        new Strategy(opts, async (email, password, done) => {

            try {

                if (user) {
                    return done(null, user);
                }
                else {
                    return done(null, false);
                }
                
            } catch (error) {
                return done(error, false);
            }

        })
      );

      router.post("/", passport.authenticate("jwt", { session: false }), (req, res) => {
        res.status(200).json({
            message: "User logged in successfully",
            token: token,
        });
      });

};

export default passportLogin;