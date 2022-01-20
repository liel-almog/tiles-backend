import { Body, Controller, Get, Patch, Post } from "@nestjs/common";
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

  @Post()
  test() {
    return this.service.test();
  }
}
