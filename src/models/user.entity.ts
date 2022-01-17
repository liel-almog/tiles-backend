import { Column, Entity, ObjectID, ObjectIdColumn } from "typeorm";

@Entity()
export class User {
  @ObjectIdColumn()
  _id: ObjectID;

  @Column()
  name: string;

  @Column()
  password: string;

  @Column()
  email: string;
}
