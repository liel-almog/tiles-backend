import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "../models/user.entity";
import { LoginUserDto } from "./dtos/login-user.dto";

@Injectable()
export class AuthService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  signup(plainUser: User) {
    const user = this.repo.create(plainUser);

    this.repo.save(user);
  }

  login(loginUser: LoginUserDto) {
  }
}
