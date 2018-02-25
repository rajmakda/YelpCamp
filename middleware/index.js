//all the middleware goes here
var middlewareObj = {};
var Campground = require("../models/campground");
var Comment = require("../models/comment");

middlewareObj.checkCampgroundOwnership = function(req, res, next) {
            if(req.isAuthenticated()) {
       Campground.findById(req.params.id, function(err, foundCampground) {
            if(err || !foundCampground) {
                req.flash("error","Campground not found");
                res.redirect("back");
            } else {
                //does user own campground
                if(foundCampground.author.id.equals(req.user._id)) {
                    next();
                } else {
                     //if not then redirect
                    req.flash("error","You dont have permission to do that");
                    res.redirect("/campgrounds/"+foundCampground._id);
                }
            }
        });
    } else {
        req.flash("error", "You need to log in to do that");
        res.redirect("back");
    }
}

middlewareObj.checkCommentsOwnership = function(req, res, next) {
        if(req.isAuthenticated()) {
       Comment.findById(req.params.comment_id, function(err, foundComment) {
            if(err || !foundComment) {
                req.flash("error","Comment not found");
                res.redirect("back");
            } else {
                //does user own comment
                if(foundComment.author.id.equals(req.user._id)) {
                    next();
                } else {
                     //if not then redirect
                    req.flash("error","You dont have permission to do that");
                    res.redirect("back");
                }
            }
        });
    } else {
        req.flash("error", "You need to log in to do that");
        res.redirect("back");
    }
}

middlewareObj.isLoggedIn = function(req, res, next) {
    if(req.isAuthenticated()) {
        return next();
    }
    req.flash("error", "You need to log in to do that");
    res.redirect("/login");
}

module.exports = middlewareObj;