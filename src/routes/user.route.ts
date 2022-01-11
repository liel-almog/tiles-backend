import express, { Router } from "express";
import { collections } from "../utils/database";
import {
  deleteOne,
  getAll,
  getById,
  replace,
  getByRole,
  changeRoles,
} from "../controllers/user.controller";
import { checkPermissions } from "../middleware/permissions.middleware";
import { Role } from "../types/role.enum";

export const usersRouter = express.Router();

usersRouter.use((_req, _res, next) => {
  if (!collections.users) {
    throw new Error("We could not find the user object");
  }
  next();
});

usersRouter.use(checkPermissions([Role.Admin]));

usersRouter.get("/", getAll);

// usersRouter.route("/:id").get(getById).put(replace).delete(deleteOne);

usersRouter.route("/role/:role").get(getByRole);

usersRouter.route("/role").patch(changeRoles);
