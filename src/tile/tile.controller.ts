import { Body, Controller, Get, Patch, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { UpdateTiles } from "./dtos/update-tiles.dto";
import { TileService } from "./tile.service";

@UseGuards(JwtAuthGuard)
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
