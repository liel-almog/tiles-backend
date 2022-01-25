import { Body, Controller, Get, Param, Patch, Post } from "@nestjs/common";
import { Role } from "@prisma/client";
import { AuthService } from "./auth.service";
import { CreateUserDto } from "./dtos/create-user.dto";
import { LoginUserDto } from "./dtos/login-user.dto";
import { UpdateRolesDto } from "./dtos/update-role.dto";
import { UserService } from "./user.service";

@Controller("user")
export class UserController {
  constructor(private service: UserService, private authService: AuthService) {}
  @Get()
  getAll() {
    return this.service.getAll();
  }

  @Get("role/:role")
  getByRole(@Param("role") role: Role) {
    return this.service.getByRole(role);
  }

  @Patch("/role")
  changeRoles(@Body() roles: UpdateRolesDto) {
    return this.service.updateRoles();
  }

  @Post("/login")
  login(@Body() createUser: LoginUserDto) {
    return this.authService.login();
  }

  @Post("/signup")
  signup(@Body() createUser: CreateUserDto) {
    return this.authService.signup();
  }
}
