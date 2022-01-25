import { Controller, Get, Param } from "@nestjs/common";
import { UserService } from "./user.service";

@Controller("user")
export class UserController {
  constructor(private service: UserService) {}
  @Get()
  getAll() {
    this.service.getAll();
  }

  @Get("role/:role")
  getByRole(@Param("role") role: string) {
    return this.service.getByRole(role);
  }
}
