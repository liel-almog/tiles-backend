import { Body, Controller, Get, Patch, UseGuards } from "@nestjs/common";
import { AuthJwtGuard } from "src/guards/jwt.guard";
import { UpdateTiles } from "./dtos/update-tiles.dto";
import { TileService } from "./tile.service";

@UseGuards(AuthJwtGuard)
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
