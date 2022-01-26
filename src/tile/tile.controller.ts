import { Body, Controller, Get, Patch, Req, UseGuards } from "@nestjs/common";
import { Role, User } from "@prisma/client";
import { Request } from "express";
import { Roles } from "src/decorators/role.decorator";
import { AuthJwtGuard } from "src/guards/jwt.guard";
import { RolesGuard } from "src/guards/role.guard";
import { UpdateTiles } from "./dtos/update-tiles.dto";
import { TileService } from "./tile.service";

@UseGuards(AuthJwtGuard, RolesGuard)
@Controller("tile")
export class TileController {
  constructor(private service: TileService) {}

  @Get()
  getAll() {
    return this.service.find();
  }

  @Roles(Role.Admin, Role.Moderator, Role.Editor)
  @Patch()
  updateaTiles(@Req() request: Request, @Body() updateTiles: UpdateTiles) {
    if ((request.user as User).role === Role.Editor) {
      return this.service.updateColors({ changed: updateTiles.changed });
    }

    return this.service.modifyAll(updateTiles);
  }
}
