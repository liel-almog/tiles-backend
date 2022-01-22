import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { TileModule } from "./tile/tile.module";
import { UserModule } from "./user/user.module";

@Module({
  imports: [
    TileModule,
    UserModule,
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.DB_CONN_STRING, { dbName: process.env.DB_NAME    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

// type: "mongodb",
// synchronize: true,
// url: process.env.DB_CONN_STRING,
// database: "tilesDB",
// entities: [User, Tile],
// useUnifiedTopology: true,
// useNewUrlParser: true,
