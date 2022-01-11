import dotenv from 'dotenv';
import * as mongoDB from "mongodb";
import Tile from '../models/tile.model';
import User from '../models/user.model';

if (process.env.NODE_ENV === "DEV") {
  dotenv.config();
}

export const collections: {
  users?: mongoDB.Collection<User>;
  tiles?: mongoDB.Collection<Tile>;
} = {};

export async function connectToDatabase() {
  const client: mongoDB.MongoClient = new mongoDB.MongoClient(
    process.env.DB_CONN_STRING!
  );

  await client.connect();

  const db: mongoDB.Db = client.db(process.env.DB_NAME);

  // Two different ways to indicate collection type
  const usersCollection: mongoDB.Collection<User> = db.collection(
    process.env.USERS_COLLECTION_NAME!
  );

  const tilesCollection = db.collection<Tile>(process.env.TILES_COLLECTION_NAME!);

  collections.users = usersCollection;
  collections.tiles = tilesCollection;

  // tslint:disable-next-line: no-console
  console.log(
    `Successfully connected to database: ${db.databaseName}`
  );
}
