import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type TileDocument = Tile & Document;

@Schema({ timestamps: { createdAt: true, updatedAt: true } })
export class Tile {
  @Prop({ required: true })
  color: string;
}

export const TileSchema = SchemaFactory.createForClass(Tile)
  .pre("save", () => {
    console.log("save");
  })
  .pre("deleteOne", () => {
    console.log("deleted");
  });
