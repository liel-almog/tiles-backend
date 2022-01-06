import * as dotenv from "dotenv";

dotenv.config();

export default {
  DB_CONN_STRING: process.env.DB_CONN_STRING ?? "",
  USERS_COLLECTION_NAME: process.env.USERS_COLLECTION_NAME ?? "",
  TILES_COLLECTION_NAME: process.env.TILES_COLLECTION_NAME ?? "",
  JWT_SECRET: process.env.JWT_SECRET as string
};
