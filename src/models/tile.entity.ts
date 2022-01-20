import { Type } from "class-transformer";
import { ObjectId } from "mongodb";
import {
  AfterInsert,
  AfterRemove,
  AfterUpdate,
  Column,
  Entity,
  ObjectID,
  ObjectIdColumn
} from "typeorm";

@Entity()
export class Tile {
  @ObjectIdColumn()
  @Type(() => ObjectID)
  _id: ObjectId;

  @Column()
  color: string;

  @Column()
  createdAt = new Date().toUTCString();

  @Column()
  updatedAt = new Date().toUTCString();

  @AfterInsert()
  logInsert() {
    console.log("Insert");
  }

  @AfterRemove()
  logRemove() {
    console.log("Remove");
  }

  @AfterUpdate()
  logUpdate() {
    console.log("Insert");
  }
}
