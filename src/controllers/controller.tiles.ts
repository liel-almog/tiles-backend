import { RequestHandler, Request, Response } from "express";
import { plainToInstance } from "class-transformer";
import { validateOrReject } from "class-validator";
import { collections } from "../utils/database";
import { ObjectId } from "mongodb";
import Tile from "../models/model.tiles";

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

export const insertOne: RequestHandler = async (req, res) => {
  try {
    const newTile = plainToInstance(Tile, req.body as Tile);
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