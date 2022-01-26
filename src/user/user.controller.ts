import { Body, Controller, Get, Param, Patch, UseGuards } from "@nestjs/common";
import { Role } from "@prisma/client";
import { Roles } from "src/decorators/role.decorator";
import { AuthJwtGuard } from "src/guards/jwt.guard";
import { RolesGuard } from "src/guards/role.guard";
import { Serialize } from "src/interceprors/serialize.interceptor";
import { UserDto } from "./dtos/serializeDto/user.dto";
import { UpdateRolesDto } from "./dtos/update-role.dto";
import { UserService } from "./user.service";

@UseGuards(AuthJwtGuard, RolesGuard)
@Roles(Role.Admin)
@Controller("user")
export class UserController {
  constructor(private service: UserService) {}

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
}
