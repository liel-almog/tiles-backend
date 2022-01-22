import { Injectable } from "@nestjs/common";
import { UserService } from "./user.service";

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}
  login() {
    console.log("hello");
  }

  signup() {
    console.log("signup");
  }
}
