import { ObjectID } from "bson";
import { Type } from "class-transformer";
import { IsArray, ValidateNested } from "class-validator";
import { TileDto } from "./tile.dto";

export class UpdateTiles {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TileDto)
  added: TileDto[];
  @IsArray()
  @ValidateNested()
  @Type(() => TileDto)
  changed: TileDto[];
  @IsArray()
  @Type(() => ObjectID)
  deleted: string[];
}
