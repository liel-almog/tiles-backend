import { IsEmail, IsNotEmpty, Min } from "class-validator";

export class CreateUserDto {
  @IsEmail({}, { message: "Must be an email" })
  email: string;

  @IsNotEmpty({ message: "Password can`t be empty" })
  @Min(6, { message: "Password must be at least 6 characters long" })
  password: string;

  @IsNotEmpty({ message: "Name can`t be empty" })
  name: string;
}
