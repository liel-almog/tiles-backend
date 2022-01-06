import { RequestHandler, Request, Response } from "express";
import { plainToInstance } from "class-transformer";
import { validateOrReject } from "class-validator";
import { collections } from "../utils/database";
import { AnyBulkWriteOperation, ObjectId } from "mongodb";
import Tile from "../models/tile.model";

export const getAll: RequestHandler = async (_req, res, _next) => {
  try {
    const tiles = (await collections.tiles?.find({}).toArray()) as Tile[];
    res.status(200).send(tiles);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
};

export const getById: RequestHandler<{ id: string }> = async (req, res) => {
  const { id } = req?.params;

  try {
    const query = { _id: new ObjectId(id) };
    const tile = (await collections.tiles?.findOne(query)) as Tile;

    if (tile) {
      res.status(200).send(tile);
    }
  } catch (error) {
    res
      .status(404)
      .send(`Unable to find matching document with id: ${req.params.id}`);
  }
};

export const insertOne: RequestHandler<any, any, Tile> = async (req, res) => {
  try {
    const newTile = plainToInstance(Tile, req.body);
    await validateOrReject(newTile);
    const result = await collections.tiles?.insertOne(newTile);

    result
      ? res
          .status(201)
          .send(`Successfully created a new tile with id ${result.insertedId}`)
      : res.status(500).send("Failed to create a new tile.");
  } catch (error: any) {
    // tslint:disable-next-line: no-console
    console.error(error);
    res.status(400).send(error.message);
  }
};

export const insertMany: RequestHandler<any, any, Tile[]> = async (
  req,
  res
) => {
  try {
    const newTiles = plainToInstance(Tile, req.body);
    await validateOrReject(newTiles);
    const result = await collections.tiles?.insertMany(newTiles);

    result
      ? res
          .status(201)
          .send(`Successfully created ${result.insertedCount} tiles`)
      : res.status(500).send(`Failed to create ${req.body.length} new tiles.`);
  } catch (error: any) {
    // tslint:disable-next-line: no-console
    console.error(error);
    res.status(400).send(error.message);
  }
};

type updatedTiles = { added: Tile[]; changed: Tile[]; deleted: ObjectId[] };
export const updateTiles: RequestHandler<any, any, updatedTiles> = async (
  req,
  res
) => {
  const { added, changed, deleted } = req.body;
  const insert: AnyBulkWriteOperation<Tile>[] = added.map((tile) => {
    return {
      insertOne: { document: tile },
    };
  });

  const update: AnyBulkWriteOperation<Tile>[] = changed.map(
    ({ color, _id }) => {
      return {
        updateOne: { filter: { _id }, update: { $set: { color } } },
      };
    }
  );

  const del: AnyBulkWriteOperation<Tile> = {
    deleteMany: { filter: { _id: { $in: deleted } } },
  };
  const result = await collections.tiles?.bulkWrite([
    ...insert,
    ...update,
    del,
  ]);
  res
    .status(200)
    .send(
      `Inserted ${result?.nInserted}, updated ${result?.nModified}, deleted ${result?.nRemoved}`
    );
};

export const replace: RequestHandler<{ id: string }> = async (req, res) => {
  const { id } = req?.params;

  try {
    const _id = new ObjectId(id);
    const updatedTile = plainToInstance(Tile, req.body as Tile);
    await validateOrReject(updatedTile);

    const query = { _id };
    const result = await collections.tiles?.updateOne(query, {
      $set: updatedTile,
    });

    result
      ? res.status(200).send(`Successfully updated tile with id ${id}`)
      : res.status(304).send(`Tile with id: ${id} not updated`);
  } catch (error: any) {
    // tslint:disable-next-line: no-console
    console.error(error.message);
    res.status(400).send(error.message);
  }
};

export const deleteOne: RequestHandler<{ id: string }> = async (req, res) => {
  const { id } = req?.params;

  try {
    const query = { _id: new ObjectId(id) };
    const result = await collections.tiles?.deleteOne(query);

    if (result && result.deletedCount) {
      res.status(202).send(`Successfully removed tile with id ${id}`);
    } else if (!result) {
      res.status(400).send(`Failed to remove tile with id ${id}`);
    } else if (!result.deletedCount) {
      res.status(404).send(`Tile with id ${id} does not exist`);
    }
  } catch (error: any) {
    // tslint:disable-next-line: no-console
    console.error(error.message);
    res.status(400).send(error.message);
  }
};
