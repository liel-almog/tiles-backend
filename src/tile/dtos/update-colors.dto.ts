import { IsMongoId, IsString } from "class-validator";
import { ObjectId } from "mongodb";

class TileDTO {
  @IsMongoId()
  _id: ObjectId;

  @IsString()
  color: string;
}
export class UpdateColors {
  changed: TileDTO[];
}
