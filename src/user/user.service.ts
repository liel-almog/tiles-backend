import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User, UserDocument } from "src/schemas/user.schema";

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly tileModel: Model<UserDocument>,
  ) {}

  getAll() {
    return this.tileModel.find({}, { password: false });
  }

  getByRole(role: string) {
    return this.tileModel.find({ role }, { password: false });
  }

  updateRole() {
    const update = [].map(() => {});
    return this.tileModel.bulkWrite(update);
  }
}
