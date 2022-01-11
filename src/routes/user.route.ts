import express from "express";
import {
  changeRoles, getAll, getByRole
} from "../controllers/user.controller";
import { checkPermissions } from "../middleware/permissions.middleware";
import { Role } from "../types/role.enum";
import { collections } from "../utils/database";

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
