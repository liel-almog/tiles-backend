import { Expose, Type } from "class-transformer";
import { UserDto } from "./user.dto";

export class LoginDto {
  @Expose()
  @Type(() => UserDto)
  user: UserDto;
  @Expose()
  token: string
}