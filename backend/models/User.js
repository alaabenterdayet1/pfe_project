import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    trim: true,
    unique: [true, "Name is already taken"]
  },
  age : {
    type: Number,
    required: [true, "Age is required"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true
  }
});

const UserModel = mongoose.model("User", userSchema);

export { UserModel };
