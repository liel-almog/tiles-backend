import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { AnyBulkWriteOperation } from "mongodb";
import { Model } from "mongoose";
import { Tile, TileDocument } from "src/schemas/tile.schema";
import { UpdateColors } from "./dtos/update-colors.dto";
import { UpdateTiles } from "./dtos/update-tiles.dto";

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

  modifyAll({ added, changed, deleted }: UpdateTiles) {
    const insert: AnyBulkWriteOperation<Tile>[] = added.map((tile) => {
      return {
        insertOne: { document: tile },
      };
    });

    const update: AnyBulkWriteOperation<Tile>[] = changed.map(
      ({ color, _id }) => {
        const updatedAt = new Date().toUTCString();
        return {
          updateOne: {
            filter: { _id },
            update: { $set: { color, updatedAt } },
          },
        };
      },
    );

    const del: AnyBulkWriteOperation<Tile> = {
      deleteMany: { filter: { _id: { $in: deleted } } },
    };

    return this.tileModel.bulkWrite([...insert, ...update, del]);
  }

  updateColors({ changed }: UpdateColors) {
    const update: AnyBulkWriteOperation<Tile>[] = changed.map(
      ({ color, _id }) => {
        const updatedAt = new Date().toUTCString();
        return {
          updateOne: {
            filter: { _id },
            update: { $set: { color, updatedAt } },
          },
        };
      },
    );

    return this.tileModel.bulkWrite(update);
  }
}
