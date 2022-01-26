import { Body, Controller, Post } from "@nestjs/common";
import { Serialize } from "src/interceprors/serialize.interceptor";
import { AuthService } from "./auth.service";
import { CreateUserDto } from "./dtos/create-user.dto";
import { LoginUserDto } from "./dtos/login-user.dto";
import { LoginDto } from "./dtos/serializeDto/login.dto";
import { UserDto } from "./dtos/serializeDto/user.dto";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  
  @Serialize(LoginDto)
  @Post("/login")
  async login(@Body() loginUser: LoginUserDto) {
    const user = await this.authService.login(loginUser);
    return { user, token: "123" };
  }

  @Serialize(UserDto)
  @Post("/signup")
  signup(@Body() createUser: CreateUserDto) {
    return this.authService.signup(createUser);
  }
}
