import express from "express"
import verifyJWT from "../middlewares/auth.middleware.js"


import { cancel, fetch_subscription, subscribe, upgrade } from "../controllers/subscription.controller.js"

const router = express.Router()

router.post("/subscribe" ,verifyJWT, subscribe)

router.post("/upgrade" , verifyJWT , upgrade)

router.post("/cancel", verifyJWT, cancel);

router.get("/my-subscription" , verifyJWT , fetch_subscription)

export default router