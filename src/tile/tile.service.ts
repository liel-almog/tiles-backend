import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Tile, TileDocument } from "src/schemas/tile.schema";

@Injectable()
export class TileService {
  constructor(
    @InjectModel(Tile.name) private readonly tileModel: Model<TileDocument>,
  ) {}

  find() {
    return this.tileModel.find({});
  }

  test() {
    return this.tileModel.create({ color: "#FEF1E6" });
  }

  // modifyAll(updateTiles: UpdateTiles) {
  //   return this.repo.modifyAll(updateTiles);
  // }

  // updateColors(colors: UpdateColors) {
  //   return this.repo.updateColors(colors);
  // }
}
