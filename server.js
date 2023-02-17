require('dotenv').config();
const express = require("express");
const path = require("path");
const app = express();
const port = process.env.PORT || 8080;
const Bug = require("./mongoose");
const mongoose = require("mongoose");
const fakeDataGenerator = require("./fakeData");
const bodyParser = require("body-parser");
const cors = require("cors");

app.use(express.static(path.join(__dirname, "./client/build")));

app.use(cors());
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', '*');
    res.setHeader('Access-Control-Allow-Headers', '*');
    res.setHeader('Access-Control-Allow-Credentials', false);
    next();
});

app.use(bodyParser.urlencoded({
    extended: true
  }));

try {
    app.get("/retrieveBugs", (req, res) => {
        Bug.find((err, foundBugs) => {
            if (err) {
                res.send(err);
                console.log(err);
            }
            else {
                res.send(foundBugs);
            }
        });
    })
}
catch (error) { console.log(error.message) };

  app.get("/newBugId",(req, res) => {
    Bug.find().sort("-id").limit(1).exec((err, result) => {
        if(err)
            res.send(err);
        else
            result.length !==0 ? res.send((result[0].id).toString()) : res.send("0");
    });
})

.post("/addBug", (req, res) => {

    const requestedBug = req.body;
    const newBug = new Bug(requestedBug);
    newBug.save((err) => {
        if(err){
            res.send(err);
        }
        else{
            res.send("Bug added successfully");
        }
    });
})

.delete("/deleteBug/:id", (req, res) => {
    const bugId = req.params.id;

    Bug.deleteOne({id: bugId}, (err, response) => {
        if(err)
            res.send(err);
        else
            res.send("Success");
    });
})

.patch("/updateBug", (req, res) => {
    const newData = req.body;

    Bug.updateOne(
        {id: newData.id}, 
        {$set:req.body},
        (err, result) => {
        if(err)
            res.send(err);
        else
            res.send(result);
    })
});

// This route serves the React app
app.get('*', (req, res) => res.sendFile(path.join(__dirname, "./client/build/index.html")));

mongoose.connection.once('open', () => {
    app.emit('ready');
});

app.on('ready', function() { 
    
    Bug.find((err, foundBugs) => {
        if(err){
            console.log("Error Retrieving Data");
        }
        else if(foundBugs.length === 0){
            const fakeBugs = fakeDataGenerator();
            Bug.insertMany(fakeBugs, function(err){
                if(err){
                    console.log(err);
                }
            })
        }
    });

    app.listen(port, () => console.log(`Server listening on port ${port}`));
}); 

