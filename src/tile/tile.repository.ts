import {
  BulkWriteDeleteManyOperation,
  BulkWriteInsertOneOperation,
  BulkWriteUpdateOneOperation,
  ObjectId
} from "mongodb";
import { EntityRepository, MongoRepository } from "typeorm";
import { Tile } from "../models/tile.entity";
import { UpdateColors } from "./dtos/update-colors.dto";
import { UpdateTiles } from "./dtos/update-tiles.dto";

@EntityRepository(Tile)
export class TileRepository extends MongoRepository<Tile> {
  async modifyAll({ added, changed, deleted }: UpdateTiles) {
    const insert: BulkWriteInsertOneOperation<Tile>[] = added.map(
      (plainTile) => {
        const tile = this.create(plainTile);
        tile._id = new ObjectId(tile._id);
        return {
          insertOne: { document: tile },
        };
      },
    );

    const update: BulkWriteUpdateOneOperation<Tile>[] = changed.map(
      ({ color, _id: plainId }) => {
        const updatedAt = new Date().toUTCString();
        const _id = new ObjectId(plainId);
        return {
          updateOne: {
            filter: { _id },
            update: { $set: { color, updatedAt } },
          },
        };
      },
    );

    const deletedIds = deleted.map((_id) => new ObjectId(_id));
    const del: BulkWriteDeleteManyOperation<Tile> = {
      deleteMany: { filter: { _id: { $in: deletedIds } } },
    };

    return await this.bulkWrite([...insert, ...update, del]);
  }

  async updateColors({ changed }: UpdateColors) {
    const update: BulkWriteUpdateOneOperation<Tile>[] = changed.map(
      ({ color, _id: plainId }) => {
        const updatedAt = new Date().toUTCString();
        const _id = new ObjectId(plainId);
        return {
          updateOne: {
            filter: { _id },
            update: { $set: { color, updatedAt } },
          },
        };
      },
    );

    return this.bulkWrite(update);
  }
}
