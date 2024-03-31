import mongoose from "mongoose";

export async function connect() {
  try {
    mongoose.connect(process.env.MONGO_URL!);

    const connect = mongoose.connection;

    connect.on("connected", () => {
      console.log("Mongo DB is connected");
    });

    connect.on("error", (err) => {
      console.log(
        "Mongo connection error: please make sure db is running: " + err
      );

      process.exit();
    });
  } catch (error) {
    console.log("Something went wrong db is not connected");
    console.log(error);
  }
}
