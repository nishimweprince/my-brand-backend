import express from "express"
import blogRoute from "./blogRoute.js"
import signupRoute from "./signupRoute.js"
import loginRoute from "./loginRoute.js"

const router = express.Router()

// ALL ROUTES


// BLOG ROUTE
router.use("/blogs", blogRoute)

// SIGNUP ROUTE
router.use("/signup", signupRoute)

// LOGIN ROUTE
router.use("/login", loginRoute)

export default router