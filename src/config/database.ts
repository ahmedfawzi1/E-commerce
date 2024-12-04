import mongoose from "mongoose";

const dbConnection = () => {
  mongoose
    .connect(process.env.DB!) 
    .then(() => {
      console.log("connected to database");
    })
    .catch((err) => {
      console.log(err);
    });
};

export default dbConnection;
