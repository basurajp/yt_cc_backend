import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      lowercase: true,
      required: true,
      trim: true,
      index: true,
    },
    email: {
      type: String,
      unique: true,
      lowercase: true,
      required: true,
      trim: true,
    },
    fullname: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },

    avatar: {
      type: String, // cloundary image
      required: true,
    },
    coverImage: {
      type: String, // cloundary image
    },
    watchhistory: [{ type: Schema.Types.ObjectId, ref: "Video" }],

    password: {
      type: String,
      required: [true, "password is required "],
    },
    refreshToken: {
      type: String,
    },
  },

  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.ispasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password)

}



export const User = mongoose.model("User", userSchema);
