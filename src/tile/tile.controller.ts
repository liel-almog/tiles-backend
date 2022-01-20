import { Controller, Get, Post } from "@nestjs/common";
import { TileService } from "./tile.service";

@Controller("tile")
export class TileController {
  constructor(private service: TileService) {}

  @Get()
  getAll() {
    return this.service.find();
  }

  @Post()
  test() {
    return this.service.test();
  }

  // @Patch()
  // modifyAll(@Body() updateTiles: UpdateTiles) {
  //   return this.service.modifyAll(updateTiles);
  // }

}
