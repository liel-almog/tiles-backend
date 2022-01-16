import { Module } from "@nestjs/common";
import { TileController } from './tile.controller';
import { TileService } from './tile.service';

@Module({
  controllers: [TileController],
  providers: [TileService]
})
export class TileModule {}
