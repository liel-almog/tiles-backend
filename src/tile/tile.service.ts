import { Injectable } from "@nestjs/common";
import { UpdateColors } from "./dtos/update-colors.dto";
import { UpdateTiles } from "./dtos/update-tiles.dto";
import { TileRepository } from "./tile.repository";

@Injectable()
export class TileService {
  constructor(private repo: TileRepository) {}

  test() {
    const tile = this.repo.create({
      _id: "61e94c6963c0c2e1429c64c1",
      color: "#FFB085",
    });

    return this.repo.save(tile);
  }

  find() {
    return this.repo.find({});
  }

  modifyAll(updateTiles: UpdateTiles) {
    return this.repo.modifyAll(updateTiles);
  }

  updateColors(colors: UpdateColors) {
    return this.repo.updateColors(colors);
  }
}
