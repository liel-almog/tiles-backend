import { ObjectId } from "bson";
import { IsMongoId, IsString } from "class-validator";

export class TileDto {
  @IsMongoId()
  id: ObjectId;

  @IsString()
  color: string;
}