import { ObjectId } from "mongodb";
import { IsEmail, IsEnum, IsNotEmpty } from "class-validator";
import { Role } from "../types/enum.role";
import { ExposeId } from "../utils/ExposeId";
import { Exclude } from "class-transformer";

export default class User {
  @Exclude()
  public _id?: ObjectId;
  @IsNotEmpty()
  public name: string;
  @IsEmail()
  public email: string;
  public password: string;
  @IsEnum(Role)
  public role: Role;
  // @ExposeId()
  constructor(
    name: string,
    email: string,
    password: string,
    role = Role.Viewer,
  ) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.role = role;
  }
}
