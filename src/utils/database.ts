import * as mongoDB from "mongodb";
import env from './dotenv'

export const collections: {
  users?: mongoDB.Collection;
  tiles?: mongoDB.Collection;
} = {};

export async function connectToDatabase() {
  const client: mongoDB.MongoClient = new mongoDB.MongoClient(
    env.DB_CONN_STRING
  );

  await client.connect();

  const db: mongoDB.Db = client.db(process.env.DB_NAME);

  const usersCollection: mongoDB.Collection = db.collection(
    env.USERS_COLLECTION_NAME
  );

  const tilesCollection = db.collection(env.TILES_COLLECTION_NAME);

  collections.users = usersCollection;
  collections.tiles = tilesCollection;

  // tslint:disable-next-line: no-console
  console.log(
    `Successfully connected to database: ${db.databaseName}`
  );
}
