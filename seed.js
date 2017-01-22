var mongoose = require("mongoose"),
    Poll = require("./models/poll.js");
    
var record = [
    {
        title: "Color",
        description: "This poll is used to get which color most voters like.",
        label: ["Red", "Green", "Blue"],
        data: [3, 2, 5]
    },
    {
        title: "Food",
        description: "This poll is used to get which kind of food the voters like.",
        label: ["Sushi", "Noodle", "Tofu", "Burrito"],
        data: [1, 2, 1, 1]
    },
    {
        title: "Movies",
        description: "This poll is used to get which kind of movie the voters like.",
        label: ["Spider man", "The Avengers", "Superman", "Ironman", "The planet of ape"],
        data: [5, 7, 9, 2, 1]
    }
];

function seedDB(){
    Poll.remove({}, function(err){
        if(err){
            console.log("err");
        }
        console.log("removed all polls!!!");
        record.forEach(function(data){
            Poll.create(data, function(err){
                if(err){
                    console.log(err);
                }else{
                    console.log("added a poll!!!");
                }
            });
        });
    });    
}

module.exports = seedDB;