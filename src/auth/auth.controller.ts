import { parse } from "@lukeed/ms";
import { Body, Controller, Post, Res } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Response } from "express";
import { Serialize } from "src/interceprors/serialize.interceptor";
import { AuthService } from "./auth.service";
import { CreateUserDto } from "./dtos/create-user.dto";
import { LoginUserDto } from "./dtos/login-user.dto";
import { LoginDto } from "./dtos/serializeDto/login.dto";
import { UserDto } from "./dtos/serializeDto/user.dto";

@Controller("auth")
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtService: JwtService,
  ) {}

  @Serialize(LoginDto)
  @Post("/login")
  async login(
    @Body() loginUser: LoginUserDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const user = await this.authService.login(loginUser);
    const token = this.jwtService.sign(user);

    response.cookie("token", token, {
      expires: new Date(Date.now() + +parse("2h")),
      secure: process.env.NODE_ENV ? true : false,
      // httpOnly: process.env.NODE_ENV ? true : false,
      httpOnly: false,
      sameSite: "lax",
    });

    return { user, token };
  }

  @Serialize(UserDto)
  @Post("/signup")
  signup(@Body() createUser: CreateUserDto) {
    return this.authService.signup(createUser);
  }
}
