import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { Users } from "./users.interface";

const usersSchema = new mongoose.Schema<Users>(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    active: { type: Boolean, default: true },
    password: { type: String },
    role: {
      type: String,
      enum: ["admin", "employee", "user"],
      default: "user",
    },
    googleId: String,
    hasPassword: { type: Boolean, default: true },
    image: { type: String, default: "user-default.png" },
    passwordChangedAt: Date,
    passwordResetCode: String,
    passwordResetCodeExpires: Date,
    passwordResetCodeVerify: Boolean,
  },
  {
    timestamps: true,
  }
);

const imagesUrl = (document: Users) => {
  if (document.image && document.image.startsWith("user"))
    document.image = `${process.env.BASE_URL}/images/users/${document.image}`;
};

// crypt password
usersSchema.pre<Users>("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 13);
  next();
});

usersSchema.post("init", imagesUrl).post("save", imagesUrl);

export default mongoose.model<Users>("users", usersSchema);
