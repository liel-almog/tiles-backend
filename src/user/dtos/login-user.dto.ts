import { IsEmail, IsNotEmpty, MinLength } from "class-validator";

export class LoginUserDto {
  @IsEmail({}, { message: "Must be an email" })
  email: string;

  @IsNotEmpty({ message: "Password can`t be empty" })
  @MinLength(6, { message: "Password must be at least 6 characters long" })
  password: string;
}