import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TileController } from "./tile.controller";
import { TileRepository } from "./tile.repository";
import { TileService } from "./tile.service";

@Module({
  imports: [TypeOrmModule.forFeature([TileRepository])],
  controllers: [TileController],
  providers: [TileService],
})
export class TileModule {}
