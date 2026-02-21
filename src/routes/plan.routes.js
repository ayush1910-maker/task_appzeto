import express from "express"
import verifyJWT from "../middlewares/auth.middleware.js"


import { createPlan } from "../controllers/plan.controller.js"

const router = express.Router()

router.post("/create-plan" ,verifyJWT, createPlan)

export default router