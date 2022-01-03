import express from "express";
import { collections } from "../utils/database";
import {
  deleteOne,
  getAll,
  getById,
  replace,
  getByRole
} from "../controllers/user.controller";

export const usersRouter = express.Router();

usersRouter.use((_req, _res, next) => {
  if (!collections.users) {
    throw new Error("We could not find the user object");
  }
  next();
});

usersRouter.get("/", getAll);

usersRouter.route('/:role').get(getByRole)

usersRouter.route("/:id").get(getById).put(replace).delete(deleteOne);
