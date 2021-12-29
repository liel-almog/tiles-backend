import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import { connectToDatabase } from "./utils/database";
import { usersRouter } from "./routes/route.users";
import { tilesRouter } from "./routes/route.tiles";
import { authRouter } from "./routes/route.auth";
import 'reflect-metadata';

const app = express();
const port = 8080;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/user", usersRouter);
app.use("/tile", tilesRouter);
app.use("/auth", authRouter)

app.get("/", (_req, res) => {
  res.send("Hello World😜");
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({ message: err.message });
});

connectToDatabase()
  .then(() => {
    app.listen(port, () => {
      // tslint:disable-next-line: no-console
      console.log("Welcome to node with type script");
    });
  })
  .catch((error: Error) => {
    // tslint:disable-next-line: no-console
    console.error("Database connection failed", error);
    process.exit();
  });
