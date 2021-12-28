import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import { connectToDatabase } from "./utils/database";
import { usersRouter } from "./routes/route.users";
import { tilesRouter } from "./routes/route.tiles";

const app = express();
const port = 8080;

connectToDatabase();

app.use(cors());

app.use("/user", usersRouter);
app.use("/tile", tilesRouter);

app.get("/", (_req, res) => {
  res.send("Hello World");
});

app.post("/signup", (_req, res) => {
  res.send({ hello: "world" });
});
app.post("/login", (_req, res) => {
  res.send({ login: "liel" });
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({ message: err.message });
});

app.listen(port, () => {
  // tslint:disable-next-line: no-console
  console.log("Welcome to node with type script");
});
