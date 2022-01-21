import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Tile, TileSchema } from "src/schemas/tile.schema";
import { TileController } from "./tile.controller";
import { TileService } from "./tile.service";

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Tile.name,
        schema: TileSchema
      },
    ]),
  ],
  controllers: [TileController],
  providers: [TileService],
})
export class TileModule {}
