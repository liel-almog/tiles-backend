import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { CreateUserDto } from "./dtos/create-user.dto";
import { LoginUserDto } from "./dtos/login-user.dto";

@Controller("auth")
export class AuthController {
  constructor(private service: AuthService) {}

  @Post("/signup")
  createUser(@Body() user: CreateUserDto) {
    this.service.signup(user)
  }

  @Post("/login")
  login(@Body() user: LoginUserDto) {
    this.service.login(user)
  }
}
