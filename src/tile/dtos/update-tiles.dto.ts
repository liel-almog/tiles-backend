import { ObjectID } from "bson";
import { Type } from "class-transformer";
import { IsArray, IsMongoId, IsString, ValidateNested } from "class-validator";

class TileDTO {
  @IsMongoId()
  _id: ObjectID;

  @IsString()
  color: string;
}

export class UpdateTiles {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TileDTO)
  added: TileDTO[];
  @IsArray()
  @ValidateNested()
  @Type(() => TileDTO)
  changed: TileDTO[];
  @IsArray()
  @Type(() => ObjectID)
  deleted: ObjectID[];
}
