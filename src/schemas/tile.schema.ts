import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type TileDocument = Tile & Document;

@Schema()
export class Tile {
  @Prop({ required: true })
  color: string;

  @Prop({ default: new Date().toUTCString() })
  createdAt: string;

  @Prop({ default: new Date().toUTCString() })
  updatedAt: string;
}

export const TileSchema = SchemaFactory.createForClass(Tile)
  .pre("save", () => {
    console.log("save");
  })
  .pre("deleteOne", () => {
    console.log("deleted");
  });
