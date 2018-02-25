var express                 = require("express"),
    bodyParser              = require("body-parser"),
    mongoose                = require("mongoose"),
    Campground              = require("./models/campground"),
    seedDB                  = require("./seeds"),
    Comment                 = require("./models/comment"),
    passport                = require("passport"),
    localStrategy           = require("passport-local"),
    passportLocalMongoose   = require("passport-local-mongoose"),
    User                    = require("./models/user"),
    methodOverride          = require("method-override"),
    flash                   = require("connect-flash");

//Requiring routes
var campgroundRoutes = require("./routes/campgrounds");
var commentRoutes = require("./routes/comments");
var authRoutes = require("./routes/auth");

var app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine","ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
mongoose.connect("mongodb://localhost/yelp_camp");
//seedDB();
app.use(flash());
//Passport config
app.use(require("express-session")({
    secret: "Indian cricket team won the world cup",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//adds the currentUser to every template as the user who is currently logged in
app.use(function(req, res, next) {
   res.locals.currentUser = req.user;
   res.locals.error = req.flash("error");
   res.locals.success = req.flash("success");
   next();
});

app.use(authRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);

app.listen(process.env.PORT,process.env.IP, function()  {
    console.log("Yelpcamp server has started");
});