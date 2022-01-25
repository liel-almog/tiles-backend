import { Injectable } from "@nestjs/common";
import { PrismaPromise, Tile } from "@prisma/client";
import { PrismaService } from "prisma/prisma.service";
import { TileDto } from "./dtos/tile.dto";
import { UpdateColors } from "./dtos/update-colors.dto";
import { UpdateTiles } from "./dtos/update-tiles.dto";

@Injectable()
export class TileService {
  constructor(private prisma: PrismaService) {}

  private insertMany(tiles: TileDto[]): PrismaPromise<Tile>[] {
    return tiles.map((data) => this.prisma.tile.create({ data }));
  }
  private updateMany(tiles: TileDto[]): PrismaPromise<Tile>[] {
    return tiles.map(({ id, color }) =>
      this.prisma.tile.update({
        where: { id },
        data: { color },
      }),
    );
  }

  private deleteMany(ids: string[]) {
    return this.prisma.tile.deleteMany({ where: { id: { in: ids } } });
  }

  find() {
    return this.prisma.tile.findMany({});
  }

  modifyAll({ added, changed, deleted }: UpdateTiles) {
    const addPromise = this.insertMany(added);
    const updatePromise = this.updateMany(changed);
    const deletePromise = this.deleteMany(deleted);

    return this.prisma.$transaction([
      ...addPromise,
      ...updatePromise,
      deletePromise,
    ]);
  }

  updateColors({ changed }: UpdateColors) {
    const updatePromise = this.updateMany(changed);
    return this.prisma.$transaction(updatePromise);
  }
}
