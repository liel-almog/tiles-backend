import { Injectable } from "@nestjs/common";
import { UpdateColors } from "./dtos/update-colors.dto";
import { UpdateTiles } from "./dtos/update-tiles.dto";

@Injectable()
export class TileService {
  constructor() {}

  find() {}

  modifyAll({ added, changed, deleted }: UpdateTiles) {}

  updateColors({ changed }: UpdateColors) {}
}
