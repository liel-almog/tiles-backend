import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { TileModule } from "./tile/tile.module";
import { UserModule } from "./user/user.module";

@Module({
  imports: [
    TileModule,
    UserModule,
    ConfigModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

