import { BadRequestException, Injectable } from "@nestjs/common";
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from "src/auth/dtos/create-user.dto";
import { UserService } from "src/user/user.service";
import { LoginUserDto } from "./dtos/login-user.dto";

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}
  async login({ email, password }: LoginUserDto) {
    const user = await this.userService.getUser({ email });
    if (!user) {
      throw new BadRequestException({
        message: "Email or password is incorrect",
      });
    }
    const matchPass = await bcrypt.compare(password, user.password);
    if (matchPass) {
      return user;
    }

    throw new BadRequestException({
      message: "Email or password is incorrect",
    });
  }

  signup(createUser: CreateUserDto) {
    return this.userService.createUser(createUser);
  }
}
