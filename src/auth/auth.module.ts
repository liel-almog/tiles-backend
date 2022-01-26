import { Module } from "@nestjs/common";
import { PrismaService } from "prisma/prisma.service";
import { UserModule } from "src/user/user.module";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";

@Module({
  controllers: [AuthController],
  providers: [PrismaService, AuthService],
  imports: [UserModule],
})
export class AuthModule {}
