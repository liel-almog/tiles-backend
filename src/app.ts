import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import { connectToDatabase } from "./utils/database";
import { usersRouter } from "./routes/user.route";
import { tilesRouter } from "./routes/tile.route";
import { authRouter } from "./routes/auth.route";
import cookieParser from "cookie-parser";
import "reflect-metadata";
import { checkJwt } from "./middleware/auth";

const app = express();
const port = 8080;

const corsOptions = { origin: "http://localhost:3000", credentials: true }
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use("/auth", authRouter);

app.use(checkJwt)
app.use("/user", usersRouter);
app.use("/tile", tilesRouter);

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
