const mongoose = require("mongoose");
mongoose.set('strictQuery', false);

const DB_URL = process.env.DB_URL;
// mongoose.connect(DB_URL);

const intialDbConnection = () => {
    mongoose.connect(DB_URL, {
        useNewUrlParser: true
    })
        .then(conn => {
            console.log(`db connected`);
        })
        .catch(err => {
            console.log(`Error connecting to Database ${err}`);
        })
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