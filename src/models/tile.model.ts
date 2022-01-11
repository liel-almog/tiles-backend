import { ObjectId } from "mongodb";
import { ExposeId } from "../utils/ExposeId";

export default class Tile {
  @ExposeId()
  // @Exclude()
  public _id?: ObjectId;
  public color: string;
  public createdAt = new Date().toUTCString();
  public updatedAt = new Date().toUTCString();

  constructor(color: string) {
    this.color = color;
  }
}
