import mongoose from "mongoose";

const DB = mongoose.connect("mongodb+srv://emailsshubham:Sulli%401406@cluster0.sv9mo.mongodb.net/");
DB.then((result) => {
  console.log("DataBase Connected");
});
DB.catch((err) => {
  console.log("DataBase Not Connected");
});

export default DB;
