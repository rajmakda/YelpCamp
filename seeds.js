var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [
        {
            name: "Cloud's Rest",
            img: "http://blog.visafirst.com/wp-content/uploads/2013/06/camping-in-scotland.jpg",
            description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
        },
        {
            name: "Granite Creek",
            img: "https://i.pinimg.com/originals/54/37/8f/54378fedff07b025b28e93959cabe58d.jpg",
            description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
        },
        {
            name: "Mountain Hills",
            img: "https://static.tripzilla.com/thumb/3/6/37942_700x.jpg",
            description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
        }
    ];

function seedDB() {
    Comment.remove({}, function(err) {
       if(err) {
           console.log(err);
       } else {
               //remove all campgrounds
                Campground.remove({}, function(err) {
                    if(err) {
                        console.log(err);
                    } else {
                        console.log("removed campgrounds");
                        //add a few campgrounds
                        data.forEach(function(seed) {
                            Campground.create(seed, function(err, campground) {
                                if(err){
                                    console.log(err);
                                } else {
                                    console.log("Added campground");
                                    //add comments
                                    Comment.create(
                                        {
                                            text: "this is great but i there was internet",
                                            author: "Homer"
                                        }, function(err, comment) {
                                          if(err) {
                                              console.log(err);
                                          } else {
                                              campground.comments.push(comment._id);
                                              campground.save();
                                              console.log("created new comment");
                                          }
                                        });
                                }
                            });
                         });
                    }
                });
             }
    });

}
module.exports = seedDB;