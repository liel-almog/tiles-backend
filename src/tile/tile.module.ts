import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Tile } from "../models/tile.entity";
import { TileController } from "./tile.controller";
import { TileService } from "./tile.service";

@Module({
  imports: [TypeOrmModule.forFeature([Tile])],
  controllers: [TileController],
  providers: [TileService],
})
export class TileModule {}
