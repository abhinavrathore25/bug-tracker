const mongoose = require("mongoose");
mongoose.set('strictQuery', false);
mongoose.connect("mongodb+srv://abhinavrathore:Belfinurslf%4025@cluster0.tw0oyrd.mongodb.net/?retryWrites=true&w=majority");

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