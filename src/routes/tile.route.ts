import express from "express";
import { collections } from "../utils/database";
import {
  deleteOne,
  getAll,
  getById,
  insertMany,
  replace,
  updateTiles,
} from "../controllers/tile.controller";
import { checkPermissions } from "../middleware/permissions.middleware";
import { Role } from "../types/role.enum";

export const tilesRouter = express.Router();

tilesRouter.use((_req, _res, next) => {
  if (!collections.tiles) {
    throw new Error("We could not find the tile object");
  }
  next();
});

tilesRouter
  .route("/")
  .get(checkPermissions([...Object.values(Role)]), getAll)
  // .post(insertMany)
  .patch(
    checkPermissions([Role.Admin, Role.Moderator, Role.Editor]),
    updateTiles
  );

// tilesRouter.route("/:id").get(getById).put(replace).delete(deleteOne);
