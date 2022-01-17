import { Body, Controller, Post } from "@nestjs/common";
import { CreateUserDto } from "./dtos/create-user.dto";

@Controller("auth")
export class AuthController {
  @Post("/signup")
  createUser(@Body() user: CreateUserDto) {
    console.log(user);
  }
}
