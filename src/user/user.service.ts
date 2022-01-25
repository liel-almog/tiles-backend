import { Injectable } from "@nestjs/common";
import { Prisma, Role, User } from "@prisma/client";
import { PrismaService } from "prisma/prisma.service";
import { UpdateRolesDto } from "./dtos/update-role.dto";
@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.UserWhereUniqueInput;
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput;
  }): Promise<User[]> {
    return this.prisma.user.findMany(params);
  }
  
  getByRole(role: Role) {
    return this.prisma.user.findMany({ where: { role } });
  }

  updateRoles({ updateRoles }: UpdateRolesDto) {
    const update = updateRoles.map(({ _id, role }) =>
      this.prisma.user.update({
        where: { id: _id.toString() },
        data: { role },
      }),
    );

    return this.prisma.$transaction(update);
  }

  async createUser(data: Prisma.UserCreateInput): Promise<User> {
    return this.prisma.user.create({
      data,
    });
  }

  async getUser(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput,
  ): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: userWhereUniqueInput,
    });
  }
}
