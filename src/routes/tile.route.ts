import express from "express";
import { collections } from "../utils/database";
import {
  deleteOne,
  getAll,
  getById,
  insertMany,
  replace,
  updateTiles
} from "../controllers/tile.controller";

export const tilesRouter = express.Router();

tilesRouter.use((_req, _res, next) => {
  if (!collections.tiles) {
    throw new Error("We could not find the tile object");
  }
  next();
});

tilesRouter.route("/").get(getAll).post(insertMany);

tilesRouter.route("/:id").get(getById).put(replace).delete(deleteOne);

tilesRouter.route('/all').patch(updateTiles)
