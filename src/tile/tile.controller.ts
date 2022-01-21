import { Body, Controller, Get, Patch } from "@nestjs/common";
import { UpdateTiles } from "./dtos/update-tiles.dto";
import { TileService } from "./tile.service";

@Controller("tile")
export class TileController {
  constructor(private service: TileService) {}

  @Get()
  getAll() {
    return this.service.find();
  }

  @Patch()
  modifyAll(@Body() updateTiles: UpdateTiles) {
    return this.service.modifyAll(updateTiles);
  }

}
