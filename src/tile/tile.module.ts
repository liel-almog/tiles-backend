import { Module } from "@nestjs/common";
import { PrismaService } from "prisma/prisma.service";
import { TileController } from "./tile.controller";
import { TileService } from "./tile.service";

@Module({
  controllers: [TileController],
  providers: [TileService, PrismaService],
})
export class TileModule {}
