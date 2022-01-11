import { Exclude } from "class-transformer";
import { IsEmail, IsEnum, IsNotEmpty } from "class-validator";
import { ObjectId } from "mongodb";
import { Role } from "../types/role.enum";

export default class User {
  @Exclude()
  public _id?: ObjectId;
  @IsNotEmpty({message: "Name can`t be empty"})
  public name: string;
  @IsEmail({}, {message: "Must be an email"})
  public email: string;
  public password: string;
  @IsEnum(Role, {message: "Role must be one of specified roles"})
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
