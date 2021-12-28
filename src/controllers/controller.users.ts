import { RequestHandler, Request, Response } from "express";
import { collections } from "../utils/database";
import { ObjectId } from "mongodb";
import User from "../models/model.users";

export const getAll: RequestHandler = async (_req, res, _next) => {
  try {
    const users = (await collections.users
      ?.find({})
      .toArray()) as unknown as User[];

    res.status(200).send(users);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
};

export const getById: RequestHandler<{ id: string }> = async (req, res) => {
  const id = req?.params?.id;

  try {
    const query = { _id: new ObjectId(id) };
    const user = (await collections.users?.findOne(query)) as unknown as User;

    if (user) {
      res.status(200).send(user);
    }
  } catch (error) {
    res
      .status(404)
      .send(`Unable to find matching document with id: ${req.params.id}`);
  }
};

export const insertOne: RequestHandler = async (req, res) => {
  try {
    const newGame = req.body as User;
    const result = await collections.users?.insertOne(newGame);

    result
      ? res
          .status(201)
          .send(`Successfully created a new user with id ${result.insertedId}`)
      : res.status(500).send("Failed to create a new user.");
  } catch (error: any) {
    // tslint:disable-next-line: no-console
    console.error(error);
    res.status(400).send(error.message);
  }
};

export const replace: RequestHandler<{ id: string }> = async (req, res) => {
  const id = req?.params?.id;

  try {
    const updatedUser: User = req.body as User;
    const query = { _id: new ObjectId(id) };

    const result = await collections.users?.updateOne(query, {
      $set: updatedUser,
    });

    result
      ? res.status(200).send(`Successfully updated user with id ${id}`)
      : res.status(304).send(`Game with id: ${id} not updated`);
  } catch (error: any) {
    // tslint:disable-next-line: no-console
    console.error(error.message);
    res.status(400).send(error.message);
  }
};

export const deleteOne: RequestHandler<{ id: string }> = async (req, res) => {
  const id = req?.params?.id;

  try {
    const query = { _id: new ObjectId(id) };
    const result = await collections.users?.deleteOne(query);

    if (result && result.deletedCount) {
      res.status(202).send(`Successfully removed user with id ${id}`);
    } else if (!result) {
      res.status(400).send(`Failed to remove user with id ${id}`);
    } else if (!result.deletedCount) {
      res.status(404).send(`Game with id ${id} does not exist`);
    }
  } catch (error: any) {
    // tslint:disable-next-line: no-console
    console.error(error.message);
    res.status(400).send(error.message);
  }
};
