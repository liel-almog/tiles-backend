import { INestApplication, Injectable, OnModuleInit } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import * as bcrypt from "bcrypt";

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor() {
    super();
  }

  async onModuleInit() {
    await this.$connect();

    this.$use(async (params, next) => {
      const hashRound = 12;

      if (
        params.model === "User" &&
        (params.action === "create" || params.action === "update")
      ) {
        if (params.args.data.password) {
          const hashPass = await bcrypt.hash(
            params.args.data.password,
            hashRound,
          );
          params.args.data.password = hashPass;
        }
      }
      return next(params);
    });
  }

  async enableShutdownHooks(app: INestApplication) {
    this.$on("beforeExit", async () => {
      await app.close();
    });
  }
}
