import express from "express";
import { signup, login } from "../controllers/controller.auth";

export const authRouter = express.Router();

authRouter.post("/signup", signup);

authRouter.post("/login", login)
