const express = require("express");
const router = express.Router();

const Cook = require("../models/Cook.model");
const Menu = require("../models/Menu.model");
const User = require("../models/User.model");
const Order = require("../models/Order.model");

// router.get("/orders-success", (req, res) => res.render("order/orders-success"));

router.post("/order-create", (req, res) => {
  console.log("CREATED ORDER ", req.body);

  const { _id } = req.session.currentUser;

  // for (var i=0, i<req.body.length, i++){ };
  const { quantity } = req.body;
  const { id } = req.body;

  const ordersArr = [];

  if (Array.isArray(id) && Array.isArray(quantity)) {
    for (let i = 0; i < quantity.length; i++) {
      if (quantity[i] > 0) {
        // if (Array.isArray(ordersArr)) {
        ordersArr.push({ menuId: id[i], quantity: quantity[i] });
      }
    }
  } else {
    ordersArr.push({ menuId: id, quantity: quantity });
  }

  // const ordersArr = [{ menuId: `${id}` }, { quantity: `${quantity}` }];

  console.log(ordersArr);
  console.log("QUANITTYY", quantity);
  console.log("ALEJANDRo:", id);

  if (!quantity.length) {
    return res.render("cooks/details", { errorMessage: "Incorrect quantity" });
  }

  Order.create({
    userId: _id,
    orders: ordersArr,
  })
    .then(() => res.redirect("/orders/orders-success"))
    .catch((err) =>
      console.log(`Err while creating the post in the DB: ${err}`)
    );
});

// ****************************************************************************************
// GET route to display all the orders
// ****************************************************************************************

router.get("/orders-success", (req, res) => {
  Order.find()
    .populate("menuOwnerRef")
    .populate("userId")
    .populate({ path: "orders", populate: { path: "menuId" } })

    .then((dbOrders) => {
      console.log("ordenes:", dbOrders[0].orders);
      res.render("order/orders-success", { orders: dbOrders });
    })
    .catch((err) =>
      console.log(`Err while getting the posts from the DB: ${err}`)
    );
});

// ****************************************************************************************
// GET route for displaying the order details page

// ****************************************************************************************
router.get("/orders-success/:orderId", (req, res) => {
  const { orderId } = req.params;
  console.log(orderId);

  Order.findById(orderId)
    .populate("userId")
    .populate({
      path: "orders",
      populate: { path: "menuId", populate: { path: "menuOwnerRef" } },
    })
    .then((foundOrder) => {
      res.render("order/orders-details", { orders: foundOrder.orders });
    })

    .catch((err) =>
      console.log(`Err while getting a single post from the  DB: ${err}`)
    );
});

router.get("/orders-confirmed", (req, res) => {
  const { cookid } = req.session.currentCook;

  Order.find({ menuOwnerRef: cookid })
    .populate("menuOwnerRef")
    .populate("userId")
    .populate({ path: "orders", populate: { path: "menuId" } })

    .then((dbOrders) => {
      console.log("ordenes:", dbOrders[0].orders);
      res.render("order/orders-confirmed", { orders: dbOrders });
    })
    .catch((err) =>
      console.log(`Err while getting the posts from the DB: ${err}`)
    );
});

router.get("/orders-confirmed/:orderId", (req, res) => {
  const { orderId } = req.params;
  console.log(orderId);

  Order.findById(orderId)
    .populate("userId")
    .populate({
      path: "orders",
      populate: { path: "menuId", populate: { path: "menuOwnerRef" } },
    })
    .then((foundOrder) => {
      res.render("order/orders-details2", { orders: foundOrder.orders });
    })

    .catch((err) =>
      console.log(`Err while getting a single post from the  DB: ${err}`)
    );
});

module.exports = router;
