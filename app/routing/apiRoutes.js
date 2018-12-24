
//A GET route with the "url/api/friends".This will be used to display a JSON of all possible friends.//
//A POST routes "/api/friends". This will be used to handle incoming survey results. This route will also be used to handle the compatibility logic.//

var path = require("path");

//import the list of friends
var friends = require("../data/friends.js");

//routing
module.exports = function (app) {

    //API GET request
    //when a user visits a link
    app.get("/api/friends", function (req, res) {
        res.json(friends);
    })


    //API POST request
    //when a user submits a form and the data to the server.
    //the JSON is pushed to the appropriate Javascript array.
    app.post("/api/friends", function (req, res) {
        var userInput = req.body;

        console.log("userInput = " + JSON.stringify(userInput));

        var userResponses = userInput.scores;
        console.log("userResponses = " + userResponses);

        var bestMatch = {
            name: "",
            photo: "",
            friendDifference: +Infinity
        }

        for (var i = 0; i < friends.length; i++) {
            console.log("friends = " + JSON.stringify(friends[i]));
            var currentFriend = friends[i];
            var totalDifference = 0;

            for (var j = 0; j < currentFriend.scores.length; j++) {
                totalDifference += Math.abs(userInput.scores[j] - currentFriend.scores[j]);
            }

            if (totalDifference <= bestMatch.friendDifference) {
                bestMatch.name = currentFriend.name;
                bestMatch.photo = currentFriend.photo;
                bestMatch.friendDifference = totalDifference;
            }
        }
        // console.log("best match: " + bestMatch);
        friends.push(userInput);
        res.json(bestMatch);
    });

};

