import mongoose from "mongoose";

export const dbConnect = async () => {
  const db_Uri = process.env.MONGODB_URI;
  // "mongodb+srv://shreedpanchal1999:Aknath@123@todo-mern.066nc9y.mongodb.net/?retryWrites=true&w=majority&appName=Todo-MERN"
  // `mongodb+srv://shreedpanchal1999:shreedpanchal1999@todo-mern.066nc9y.mongodb.net/?retryWrites=true&w=majority&appName=Todo-MERN`
  // "mongodb+srv://shreedpanchal1999:Aknath@123@todo-mern.066nc9y.mongodb.net/?retryWrites=true&w=majority&appName=Todo-MERN"
  // process.env.MONGODB_URI;
  try {
    console.log(db_Uri)
    mongoose.connect(db_Uri);
    console.log("Connected to Database");
  } catch (error) {
    console.log(
      "Something went wrong while connecting to database  error:",
      error
    );
  }
};