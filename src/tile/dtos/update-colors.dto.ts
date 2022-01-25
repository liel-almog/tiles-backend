import { IsArray, ValidateNested } from "class-validator";
import { TileDto } from "./tile.dto";

export class UpdateColors {
  @IsArray()
  @ValidateNested({ each: true })
  changed: TileDto[];
}
