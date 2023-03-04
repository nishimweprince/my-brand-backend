import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import errorFunc from "../utils/errors.js";
import mongoose from "mongoose";
import dotenv from "dotenv";

// CONFIGURE DOTENV
dotenv.config();

const secret = process.env.USER_SECRET;

const loginController = async (req, res) => {

  const { email, password } = req.body;

  try {

    // FIND USER BY EMAIL
    const user = await User.findOne({ email });

    // CHECK IF USER EXISTS
    if (!user) {
      return res.status(404).json({
        message: "Invalid credentials",
      });
    } else {
      // COMPARE PASSWORD
      const passwordMatch = await bcrypt.compare(password, user.password);

      // COMPARE PASSWORD CONDITIONS
      if (!passwordMatch) {
        return res.status(404).json({
          message: "Invalid credentials",
        });
      } else {
        // CREATE AND SIGN A TOKEN
        const token = jwt.sign({ id: user._id }, secret, {expiresIn: "1w"});

        // SET COOKIE
        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
        });

        // SEND RESPONSE
        res.status(200).json({
            message: "User logged in successfully",
            token: token,
        });

        let cookie = res.getHeaders()["set-cookie"].split(";")[0].split("=")[1];
        console.log(cookie);

      }

    }
  } catch (error) {
    const message = error.message;
    const status = 500;
    errorFunc(res, message, status);
  }

};

export default loginController;