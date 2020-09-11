const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const menuSchema = new Schema(
  {
    menuOwnerRef: { type: mongoose.ObjectId, ref: "Cook", required: true },
    title: String,
    description: String,
    imageUrl: String,
    price: Number,
  },
  {
    timestamps: true,
  }
);
module.exports = model("Menu", menuSchema);

// const { Schema, model } = require('mongoose');
// const menuSchema = new Schema(
//   {
//     menuOwnerRef: [{ type: Schema.Types.ObjectId, ref: "Cook" }],
//     //menuOwnerRef: [{cook.\_id,}],
//     title: { type: String, required: true },
//     desciption: { type: String, required: true },
//     imageUrl: {type: String, required: true},
//     price: { type: Number, required: true },
//   },
//   {
//     timestamps: true
//   }
// );
// module.exports = model('Menu', menuSchema);
