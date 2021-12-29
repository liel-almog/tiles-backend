import { ObjectId } from "mongodb";
import { IsEmail, IsEnum, IsNotEmpty } from "class-validator";
import { Role } from "../types/enum.role";

export default class User {
  @IsNotEmpty()
  public name: string;
  @IsEmail()
  public email: string;
  public password: string;
  @IsEnum(Role)
  public role: Role;
  public _id?: ObjectId;
  constructor(
    name: string,
    email: string,
    password: string,
    role = Role.Viewer,
    _id?: ObjectId
  ) {
    this.name = name;
    this.email = email;
    this.password = password;
    this._id = _id;
    this.role = role;
  }
}
