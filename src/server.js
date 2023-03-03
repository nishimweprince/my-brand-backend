import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";
import morgan from "morgan";


// MONGOOSE STRICT QUERY
mongoose.set("strictQuery", false);

// CONFIGURE DOTENV
dotenv.config();

// CREATE AN APP INSTANCE FROM EXPRESS FRAMEWORK
const app = express();

// USE AN APP INSTANCE
app.use(cors());
app.use(bodyParser.json());

// MORGAN FOR LOGS
if (process.env.NODE_ENV === "development") app.use(morgan());

// DEFINING PORT AND HOST
const port = process.env.PORT || 4000;
const host = process.env.HOST || "localhost";

// CONNECT TO MONGODB
const con = () => mongoose.connect(process.env.MONGODB_URL, {

    useNewurlparser: true,
    useUnifiedTopology: true

});

// LISTENING TO SERVER INSTANCE
const server = app.listen(port);

// PROMISE TO AWAIT FOR SERVER AND MONGODB CONNECTION

Promise.all([con(), server])
.then(() => {
    console.log(`MongoDB connected...`);
    console.log(`Server running at http://${host}:${port}`);
})
.catch((err) => {
    console.log(err);
});