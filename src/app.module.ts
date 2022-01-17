import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "./auth/auth.module";
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
      database: "nest",
      entities: ["src/models/*.ts"],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
