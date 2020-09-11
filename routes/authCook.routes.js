const { Router } = require("express");
const router = new Router();
const bcryptjs = require("bcryptjs");
const saltRounds = 10;
const Cook = require("../models/Cook.model");
const mongoose = require("mongoose");

///////////////////////////SIGNUP///////////////////////////

//get route and display signup form.
router.get("/signupCook", (req, res) => {
  res.render("authCook/signup");
});

//post route with inputs from form.
router.post("/signupCook", (req, res, next) => {
  //destructure input data
  const {
    cookname,
    email,
    password2,
    fullName,
    birthday,
    zipcode,
    address,
    region,
    phone,
    motivation,
    certification,
    foodhHandlingNumber,
    kitchenNumber,
    deliveryTime,
    status,
  } = req.body;

  //check if both fields are completed
  if (!cookname || !password2) {
    res.render("authCook/signup", { errorMessage: "Both field are mandatory" });

    //else => stop code with empty return
    return;
  }

  //Checks that a password has a minimum of 6 characters, at least 1 uppercase letter, 1 lowercase letter, and 1 number with no spaces.
  const regex = /^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{6,})\S$/;

  if (!regex.test(password2)) {
    res.status(500).render("authCook/signup", {
      errorMessage:
        "Password must have a minimum of 6 characters, at least 1 uppercase letter, 1 lowercase letter, and 1 number with no spaces.",
    });

    //else => stop code with empty return
    return;
  }

  //encrypt password
  bcryptjs
    .genSalt(saltRounds)
    .then((salt) => bcryptjs.hash(password2, salt))
    .then((hashedPassword2) => {
      return Cook.create({
        cookname,
        email,
        passwordHash2: hashedPassword2,
        fullName,
        birthday,
        zipcode,
        address,
        region,
        phone,
        motivation,
        certification,
        foodhHandlingNumber,
        kitchenNumber,
        deliveryTime,
        status,
      });
    })
    .then((cookFromDb) => {
      console.log("Newly created user is: ", cookFromDb);
      //req.session.currentCook = cookFromDb;
      res.redirect("/loginCook");
    })
    .catch((error) => {
      if (error instanceof mongoose.Error.ValidationError) {
        res
          .status(500)
          .render("authCook/signup", { errorMessage: error.message });
      } else if (error.code === 11000) {
        res.status(500).render("authCook/signup", {
          errorMessage:
            "Username and email need to be unique. Either username or email is already used.",
        });
      } else {
        next(error);
      }
    });
});

///////////////////////////LOG-IN///////////////////////////

router.get("/loginCook", (req, res) => res.render("authCook/login"));

router.post("/loginCook", (req, res, next) => {
  const { cookname, password2 } = req.body;

  if (cookname === "" || password2 === "") {
    res.render("authCook/login", {
      errorMessage: "Please enter both, username and password to login.",
    });
    return;
  }

  Cook.findOne({ cookname })
    .then((cook) => {
      if (!cook) {
        res.render("authCook/login", {
          errorMessage: "Username is not registered. Try with other email.",
        });
        return;
      } else if (bcryptjs.compareSync(password2, cook.passwordHash2)) {
        //******* SAVE THE USER IN THE SESSION ********//
        req.session.currentCook = cook;
        console.log("¨REDIRECT");
        res.redirect("/private");
      } else {
        res.render("auth/login", { errorMessage: "Incorrect password." });
      }
    })
    .catch((error) => next(error));
});

///////////////////////////// LOGOUT ///////////////////////////////////

router.post("/logoutCook", (req, res) => {
  req.session.destroy();
  res.redirect("/");
});

router.get("/cookProfile", (req, res) => {
  console.log(req.session);
  if (!req.session.currentCook) {
    res.redirect("/signupCook");
  } else {
    res.render("cooks/cook-profile", {
      cookInSession: req.session.currentCook,
    });
  }
});

module.exports = router;
