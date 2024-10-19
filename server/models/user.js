import mongoose from "mongoose";

const UserShema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    passwordHash: {
      type: String,
      required: true,
    },
    avatarUrl: String,
    _id: mongoose.Schema.Types.ObjectId,
  },
  {
    timestamps: true,
  },
);
export default mongoose.model("User", UserShema);
