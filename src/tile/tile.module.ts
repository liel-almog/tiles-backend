import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Tile, TileSchema } from "src/schemas/tile.schema";
import { TileController } from "./tile.controller";
import { TileService } from "./tile.service";

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: Tile.name,
        useFactory: () => {
          const schema = TileSchema;
          schema
          return schema
        },
      },
    ]),
  ],
  controllers: [TileController],
  providers: [TileService],
})
export class TileModule {}
