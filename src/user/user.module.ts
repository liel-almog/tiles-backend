import { Module } from "@nestjs/common";
import { PrismaService } from "prisma/prisma.service";
import { AuthService } from "./auth.service";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";

@Module({
  controllers: [UserController],
  providers: [UserService, AuthService, PrismaService],
})
export class UserModule {}
