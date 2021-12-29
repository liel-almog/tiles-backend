import { RequestHandler } from "express";
import { plainToInstance } from "class-transformer";
import { validateOrReject } from "class-validator";
import bcrypt from "bcrypt";
import User from "../models/model.users";
import { collections } from "../utils/database";

const saltRounds = 10;

export const signup: RequestHandler = async (req, res) => {
  try {
    const newUser = plainToInstance(User, req.body as User);
    await validateOrReject(newUser, { forbidUnknownValues: true });
    const { password } = newUser;
    const hashPass = await bcrypt.hash(password, saltRounds);
    newUser.password = hashPass;

    const result = await collections.users?.insertOne(newUser);

    result
      ? res.status(201).send({
          id: result.insertedId,
          message: `Successfully created a new user`,
        })
      : res.status(500).send("Failed to create a new user.");
  } catch (error: any) {
    // tslint:disable-next-line: no-console
    console.error(error);
    res.status(400).send(error.message);
  }
};

type LoginReqBody = { email: string; password: string };
export const login: RequestHandler<any, any, LoginReqBody> = async (
  req,
  res,
  next
) => {
  try {
    const { email, password } = req.body;
    const query = { email };
    const user = (await collections.users?.findOne(query));
    if (!user) {
      throw new Error("Email or Password is incorrect")
    }

    const userPass = user.password;
    const match = await bcrypt.compare(password, userPass);

    if (match) {
      res.send({ id: user._id, message: "Successfully logged in" });
      return;
    }

    throw new Error("Email or Password is incorrect")
  } catch (error: any) {
    res.status(400).send(error.message);
    // next(error)
  }
};
