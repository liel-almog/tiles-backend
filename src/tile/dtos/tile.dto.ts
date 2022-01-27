import { IsMongoId, IsString } from "class-validator";

export class TileDto {
  @IsMongoId()
  id: string;

  @IsString()
  color: string;
}
