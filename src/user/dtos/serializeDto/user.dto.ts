import { Role } from "@prisma/client";
import { ObjectId } from "bson";
import { Expose } from "class-transformer";

export class UserDto {
  @Expose()
  id: ObjectId;
  @Expose()
  email: string;
  @Expose()
  role: Role;
  @Expose()
  name: string;
}
