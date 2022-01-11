import * as mongoDB from "mongodb";
import Tile from '../models/tile.model';
import User from '../models/user.model';
import env from './dotenv';

export const collections: {
  users?: mongoDB.Collection<User>;
  tiles?: mongoDB.Collection<Tile>;
} = {};

export async function connectToDatabase() {
  const client: mongoDB.MongoClient = new mongoDB.MongoClient(
    env.DB_CONN_STRING
  );

  await client.connect();

  const db: mongoDB.Db = client.db(process.env.DB_NAME);

  // Two different ways to indicate collection type
  const usersCollection: mongoDB.Collection<User> = db.collection(
    env.USERS_COLLECTION_NAME
  );

  const tilesCollection = db.collection<Tile>(env.TILES_COLLECTION_NAME);

  collections.users = usersCollection;
  collections.tiles = tilesCollection;

  // tslint:disable-next-line: no-console
  console.log(
    `Successfully connected to database: ${db.databaseName}`
  );
}
