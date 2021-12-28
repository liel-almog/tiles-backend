import express, { Request, Response } from "express";
import { collections } from "../utils/database";
import {
  deleteOne,
  getAll,
  getById,
  insertOne,
  replace,
} from "../controllers/controller.users";

export const usersRouter = express.Router();

usersRouter.use(express.json());

usersRouter.use((_req, _res, next) => {
  if (!collections.users) {
    throw new Error("We could not find the user object");
  }
  next();
});

usersRouter.get("/", getAll);

usersRouter.get("/:id", getById);

usersRouter.post("/", insertOne);

usersRouter.put("/:id", replace);

usersRouter.delete("/:id", deleteOne);
