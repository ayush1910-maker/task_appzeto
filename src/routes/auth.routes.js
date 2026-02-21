import express from "express"

import { login, register_user } from "../controllers/auth.controller.js"

const router = express.Router()

router.post("/register-user" , register_user)

router.post("/login" , login)

export default router