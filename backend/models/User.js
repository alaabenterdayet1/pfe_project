import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Username is required"],
    trim: true,
    unique: [true, "Name is already taken"]
  },

  firstname: {
    type: String,
    required: [true, "Name is required"],
    trim: true,
  },
  lastname: {
    type: String,
    required: [true, "Name is required"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  phone:{
    type: String,
    required: [true, "Phone is required"],
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  profile:{
    type: String

  }

}
, {timestamps: true}
  
);

const UserModel = mongoose.model("users", userSchema);

export { UserModel };
