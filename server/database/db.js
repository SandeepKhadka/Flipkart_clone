import mongoose from "mongoose";

export const Connection = async (username, password) => {
  const URL = `mongodb+srv://${username}:${password}@cluster0.yz3kqxs.mongodb.net/?retryWrites=true&w=majority`;

  try {
    const connect = await mongoose.connect(URL, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });

    if (connect) {
      console.log("Connection Successful");
    }
  } catch (err) {
    console.log("Cannot connect to the database. ", err.message);
  }
};
