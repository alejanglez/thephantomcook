const express = require("express");
const router = express.Router();
const Cook = require("../models/Cook.model");
const Menu = require("../models/Menu.model");

const isLoggedMiddleware = (req, res, next) => {
  if (!req.session.currentUser) {
    return res.redirect("/login");
  }
  next();
};

/* GET home page */
router.get("/", (req, res, next) => res.render("index"));

/* GET private routes */

router.get("/main", (req, res, next) => {
  res.render("users/main", { userInSession: req.session.currentUser });
});

router.get("/private", (req, res, next) => {
  res.render("users/private", { cookInSession: req.session.currentCook });
});

router.get("/menu", (req, res, next) => res.render("menu/menu-layout"));

// .Controller to render all cooks
const getAllCooks = (req, res) => {
  Cook.find()
    .then((cooksFromDB) => {
      console.log(cooksFromDB);
      res.render("explore", { cooks: cooksFromDB, scriptName: "explore" });
    })
    .catch((err) => console.log(`error while getting the cooks page ${err}`));
};

router.get("/", (req, res) => {
  Movie.find()
    .then((moviesFromDB) => {
      console.log(moviesFromDB);
      res.render("menu/menu-list", { movies: moviesFromDB });
    })
    .catch((err) =>
      console.log(`Error while getting the movies from the DB: ${err}`)
    );
});
/* GET Explore page */
router.get("/explore", getAllCooks);

router.get("/explore/search", (req, res, next) => {
  Cook.find()
    .populate("menus")
    .then((cooks) => {
      res.json(cooks);
    })
    .catch((err) => console.log(`error while getting the spots page ${err}`));
});

// //res.json

// ****************************************************************************************
// GET details of a specific cook (primarily their menu)
// ****************************************************************************************

// router.get("/cooks/:cookId/menus", (req, res) => {
//   const { cookId } = req.params;
//   const { menuOwnerRef } = req.params;
//   Cook.findById(cookId) // <-- .findById() method gives us always an OBJECT back
//     .populate("menu")
//     .then((menus) => res.render("cooks/details", menus))
//     .catch((err) =>
//       console.log(`Error while getting user details from the DB: ${err}`)
//     );
// });

router.get("/cooks/:cookId/menus", isLoggedMiddleware, (req, res) => {
  const { cookId } = req.params;
  const { menuOwnerRef } = req.body;
  console.log(cookId);
  console.log(menuOwnerRef);

  Menu.find({ menuOwnerRef: cookId })
    .populate("menuOwnerRef")
    .then((menus) => {
      console.log(menus);
      res.render("cooks/details", { menus: menus });
    })
    .catch((err) => console.log(`error while getting the spots page ${err}`));
});

// router.get("/cooks/:cookId/menus", (req, res, next) => {
//   const {cookId} = req.params
//   Menu.findById(cookId)
//       .then((menus) => {
//         console.log(menus);
//         res.render("cooks/details", { menus: menus});
//       })
//       .catch((err) => console.log(`error while getting the spots page ${err}`));
//   });

module.exports = router;
