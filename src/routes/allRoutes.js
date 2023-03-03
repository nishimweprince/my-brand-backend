import express from "express"
import blogRoute from "./blogRoute.js"
import signupRoute from "./signupRoute.js"

const router = express.Router()

// ALL ROUTES


// BLOG ROUTE
router.use("/blogs", blogRoute)

// SIGNUP ROUTE
router.use("/signup", signupRoute)

export default router