import { RequestHandler } from "express";
import { plainToInstance } from "class-transformer";
import { validateOrReject } from "class-validator";
import { collections } from "../utils/database";
import { ObjectId } from "mongodb";
import User from "../models/user.model";
import { Role } from "../types/role.enum";

export const getAll: RequestHandler = async (_req, res, _next) => {
  try {
    const users = (await collections.users
      ?.find({})
      .project({ password: false })
      .toArray()) as User[];

    res.status(200).send(users);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
};

export const getByRole: RequestHandler<{ role: Role | "All" }> = async (
  req,
  res,
  next
) => {
  const { role } = req.params;

  try {
    if (role === "All") {
      return getAll(req, res, next);
    }

    // role on can be either Role | 'All'
    const query = { role } as { role: Role };
    const users = (await collections.users?.find(query).toArray()) as User[];

    res.status(200).send(users);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
};

type userDetails = { _id: ObjectId; role: Role };
export const changeRoles: RequestHandler<any, any, userDetails[]> = async (
  req,
  res
) => {
  try {
    const bulkWrite = req.body.map(({ _id, role }) => {
      return {
        updateOne: {
          filter: {
            _id: new ObjectId(_id),
          },
          update: { $set: { role } },
        },
      };
    });

    const result = await collections.users?.bulkWrite(bulkWrite);
    const updatedUsers = result?.nModified;
    res.status(200).send({
      message: `Updated ${updatedUsers} ${
        updatedUsers === 1 ? "user" : "users"
      }`,
    });
  } catch (error: any) {
    res.status(400).send({ message: error.message });
    throw new Error(error.message);
  }
};

export const getById: RequestHandler<{ id: string }> = async (req, res) => {
  const { id } = req?.params;

  try {
    const query = { _id: new ObjectId(id) };
    const user = (await collections.users?.findOne(query)) as User;

    if (user) {
      res.status(200).send(user);
    }
  } catch (error) {
    res
      .status(404)
      .send({
        message: `Unable to find matching document with id: ${req.params.id}`,
      });
  }
};

export const replace: RequestHandler<{ id: string }> = async (req, res) => {
  const { id } = req?.params;

  try {
    const _id = new ObjectId(id);
    const updatedUser = plainToInstance(User, req.body as User);
    await validateOrReject(updatedUser);

    const query = { _id };

    const result = await collections.users?.updateOne(query, {
      $set: updatedUser,
    });

    result
      ? res.status(200).send(`Successfully updated user with id ${id}`)
      : res.status(304).send(`User with id: ${id} not updated`);
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
