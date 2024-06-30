import mongoose, { Schema } from 'mongoose';

// Document interface
interface User {
  title:string,
  desc:string,
  status:string
}

// Schema
const Todoschema = new Schema<User>({
  title: { type: String, required: true },
  desc: { type: String, required: true },
  status: String
});

export const Todo=mongoose.models.Todo || mongoose.model("Todo",Todoschema)