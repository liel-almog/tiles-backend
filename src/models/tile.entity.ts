import { Column, Entity, ObjectID, ObjectIdColumn } from "typeorm";

@Entity()
export class Tile {
  @ObjectIdColumn()
  _id: ObjectID;

  @Column()
  color: string

  @Column()
  createdAt = new Date().toISOString()

  @Column()
  updatedAt = new Date().toISOString()
}