import { Body, Controller, Get, Param, Patch, Post } from "@nestjs/common";
import { Role } from "@prisma/client";
import { Serialize } from "src/interceprors/serialize.interceptor";
import { AuthService } from "./auth.service";
import { CreateUserDto } from "./dtos/create-user.dto";
import { LoginUserDto } from "./dtos/login-user.dto";
import { LoginDto } from "./dtos/serializeDto/login.dto";
import { UserDto } from "./dtos/serializeDto/user.dto";
import { UpdateRolesDto } from "./dtos/update-role.dto";
import { UserService } from "./user.service";

@Controller("user")
export class UserController {
  constructor(private service: UserService, private authService: AuthService) {}

  @Serialize(UserDto)
  @Get()
  getAll() {
    return this.service.getAll({});
  }

  @Serialize(UserDto)
  @Get("role/:role")
  getByRole(@Param("role") role: Role) {
    return this.service.getByRole(role);
  }

  @Serialize(UserDto)
  @Patch("/role")
  changeRoles(@Body() roles: UpdateRolesDto) {
    return this.service.updateRoles(roles);
  }

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
