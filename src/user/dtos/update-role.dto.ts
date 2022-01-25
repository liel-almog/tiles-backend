import { Role } from "@prisma/client";
import { ObjectId } from "bson";
import { Type } from "class-transformer";
import { IsArray, IsEnum, IsMongoId, ValidateNested } from "class-validator";

class UpdateRoles {
  @IsMongoId()
  _id: ObjectId;

  @IsEnum(Role)
  role: Role;
}

export class UpdateRolesDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateRoles)
  updateRoles: UpdateRoles[];
}