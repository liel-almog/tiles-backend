import express from "express";
import { collections } from "../utils/database";
import {
  deleteOne,
  getAll,
  getById,
  insertOne,
  replace,
} from "../controllers/controllers.tiles";

export const tilesRouter = express.Router();

tilesRouter.use(express.json());

tilesRouter.use((_req, _res, next) => {
  if (!collections.tiles) {
    throw new Error("We could not find the tile object");
  }
  next();
});

tilesRouter.get("/", getAll);

tilesRouter.get("/:id", getById);

tilesRouter.post("/", insertOne);

tilesRouter.put("/:id", replace);

tilesRouter.delete("/:id", deleteOne);
