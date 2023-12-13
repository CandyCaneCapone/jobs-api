const mongoose = require("mongoose");

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_CONNECTION_URI);
    console.log("Connected");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

module.exports = connect;
