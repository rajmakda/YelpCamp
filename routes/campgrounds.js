var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var middleware = require("../middleware");

//INDEX ROUTE - show all campgrounds
router.get("/", function(req, res)  {

    //Get all campgrounds from db and then render file
    Campground.find({}, function(err, allCampgrounds) {
        if(err) {
            console.log(err);
        }
        else {
            res.render("campgrounds/index",{campgrounds: allCampgrounds});
        }
    });
});

//CREATE ROUTE - save a campground to the database
router.post("/", middleware.isLoggedIn ,function(req, res) {
   //get data from form and add to campgrounds array
   //redirect back to to campgrounds page
   var name = req.body.name;
   var image = req.body.image;
   var description = req.body.description;
   var author = {
       id: req.user._id,
       username: req.user.username
   }
   var price = req.body.price;
   var newCampGround = {name: name, price: price ,img: image, description: description, author: author};
    //create new campground and save to database
    Campground.create(newCampGround, function(err, campground) {
        if(err) {
            console.log(err);
        } else {
            res.redirect("/campgrounds");
        }
    });
});


//NEW ROUTE - form to add new campground to database
router.get("/new", middleware.isLoggedIn ,function(req, res)  {
   res.render("campgrounds/new");
});


//SHOW ROUTE - shows more information about a particular campground
router.get("/:id", function(req, res) {
    //find campground with provided id
    //render show template with that campground
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground) {
       if(err || !foundCampground) {
           req.flash("error", "Campground not found");
           res.redirect("back");
       } else {
          res.render("campgrounds/show", {campground: foundCampground});
       }
    });
});

//EDIT Campground
router.get("/:id/edit", middleware.checkCampgroundOwnership ,function(req, res) {
       Campground.findById(req.params.id, function(err, foundCampground) {
           if(err) {
                req.flash("error","Campground not found");
           } else {
                res.render("campgrounds/edit", {campground: foundCampground});
           }
    });
});

//UPDATE Campground route
router.put("/:id", middleware.checkCampgroundOwnership ,function(req, res) {
   //find and update the correct campground
   Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground) {
       if(err) {
           res.redirect("/campgrounds");
       } else {
           res.redirect("/campgrounds/" + updatedCampground._id);
       }
   });
   //redirect to show page
});

//DESTROY ROUTE
router.delete("/:id", middleware.checkCampgroundOwnership, function(req, res) {
   Campground.findByIdAndRemove(req.params.id, function(err) {
       if(err) {
           res.redirect("/campgrounds");
       } else {
           res.redirect("/campgrounds");
       }
   });
});

module.exports = router;