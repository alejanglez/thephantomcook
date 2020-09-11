const express = require("express");
const router = express.Router();
const Cook = require("../models/Cook.model");
const Menu = require("../models/Menu.model");
const fileUploader = require("../configs/cloudinary.config");
// ****************************************************************************************
// GET route to display the form to create a new menu
// ****************************************************************************************
router.get("/create", (req, res) => res.render("menu/menu-create"));
// ****************************************************************************************
// POST route for saving a new movie in the database
// This route has the image upload example 🥳
// ****************************************************************************************
router.post("/create", fileUploader.single("image"), (req, res) => {
  console.log("HIIIIIIIIIIII");
  const { title, description, price } = req.body;
  console.log("HELLOO", req.file);
  Menu.create({
    menuOwnerRef: req.session.currentCook._id,
    title,
    description,
    imageUrl: req.file.path,
    price,
  })
    .then(() => res.redirect("/menus"))
    .catch((error) =>
      console.log(`Error while creating a new movie: ${error}`)
    );
  res.redirect("/menus");
});
// ****************************************************************************************
// GET route for querying a specific movie from the database
// and pre-filling the edit form
// ****************************************************************************************
router.get("/:id/edit", (req, res) => {
  console.log("caca");
  const { id } = req.params;
  Menu.findById(id)
    .then((menuToEdit) => res.render("menu/menu-edit", menuToEdit))
    .catch((error) =>
      console.log(`Error while getting a single movie for edit: ${error}`)
    );
});
// ****************************************************************************************
// POST route to save changes after updates in a specific menu
// ****************************************************************************************
router.post("/:id/edit", fileUploader.single("image"), (req, res) => {
  console.log("caca2");
  const { id } = req.params;
  const { title, description, price } = req.body;
  let imageUrl;
  if (req.file) {
    imageUrl = req.file.path;
  } else {
    imageUrl = req.body.existingImage;
  }
  Menu.findByIdAndUpdate(
    id,
    { title, description, price, imageUrl },
    { new: true }
  )
    .then(() => res.redirect(`/menus`))
    .catch((error) =>
      console.log(`Error while updating a single movie: ${error}`)
    );
});
// ****************************************************************************************
// GET route to display all the menus
// ****************************************************************************************
router.get("/", (req, res) => {
  Menu.find({ menuOwnerRef: req.session.currentCook._id })
    // { menuOwnerRef: { $eq: req.session.currentCook._id }
    .populate("menuOwnerRef")
    .then((menusFromDB) => {
      console.log(menusFromDB);
      res.render("menu/menu-list", { menus: menusFromDB });
    })
    .catch((err) =>
      console.log(`Error while getting the movies from the DB: ${err}`)
    );
});
//delete
router.post("/:id/delete", (req, res, next) => {
  const { id } = req.params;
  Menu.findByIdAndDelete(id)
    .then(() => res.redirect(`/menus`))
    .catch((error) => {
      console.log(`Error while deleting the selected menus: ${error}`);
      next();
    });
});
module.exports = router;
