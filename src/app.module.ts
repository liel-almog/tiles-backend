import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "./auth/auth.module";
import { Tile } from "./models/tile.entity";
import { User } from "./models/user.entity";
import { TileModule } from "./tile/tile.module";
import { UserModule } from "./user/user.module";

@Module({
  imports: [
    TileModule,
    UserModule,
    AuthModule,
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: "mongodb",
      synchronize: true,
      url: process.env.DB_CONN_STRING,
      database: "tilesDB",
      entities: [User, Tile],
      useUnifiedTopology: true,
      useNewUrlParser: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
