import { Long, ObjectId, Timestamp } from "mongodb";

export default class Tile {
  public _id?: ObjectId;
  public color: string;
  public createdAt = new Date();
  public updatedAt = new Date();

  constructor(color: string, _id?: ObjectId) {
    this._id = _id;
    this.color = color;
  }
}
