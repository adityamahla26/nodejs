import { model, Schema } from "mongoose";

const urlSchema = new Schema(
  {
    shortId: { type: String, required: true, unique: true },
    redirectUrl: { type: String, required: true },
    visitHistory: [{ timestamp: { type: Number, required: true } }],
    createdBy: { type: Schema.Types.ObjectId, ref: "users", required: true },
  },
  { timestamps: true }
);

export const Url = model("Url", urlSchema);
