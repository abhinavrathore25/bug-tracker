const mongoose = require("mongoose");
mongoose.set('strictQuery', false);

const DB_URL = process.env.DB_URL;
// mongoose.connect(DB_URL);

const intialDbConnection = async () => {
    try {
      await mongoose.connect(DB_URL, {
        useNewUrlParser: true
      })
      console.log("db connected");
      
    }
    catch (error) {
      console.error(error);
    }
  }

intialDbConnection();

const bug = mongoose.Schema({
    id: Number,
    description: String,
    module: String,
    technology: String,
    platform: String,
    severity: String
});

const Bug = mongoose.model("Bug", bug);

module.exports = Bug;