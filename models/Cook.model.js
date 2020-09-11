const { Schema, model } = require("mongoose");

const cookSchema = new Schema(
  {
    cookname: { type: String, required: true },
    email: { type: String, required: true },
    passwordHash2: { type: String, required: true, minlength: 6 },
    fullName: { type: String, required: true, maxlength: 20 },
    birthday: { type: Date },
    zipcode: { type: Number, required: true, maxlength: 30 },
    address: { type: String, required: true, maxlength: 30 },
    region: {
      type: String,
      enum: [
        "Alava",
        "Albacete",
        "Alicante",
        "Almería",
        "Asturias",
        "Avila",
        "Badajoz",
        "Barcelona",
        "Burgos",
        "Cáceres",
        "Cádiz",
        "Cantabria",
        "Castellón",
        "Ciudad Real",
        "Córdoba",
        "La Coruña",
        "Cuenca",
        "Gerona",
        "Granada",
        "Guadalajara",
        "Guipúzcoa",
        "Huelva",
        "Huesca",
        "Islas Baleares",
        "Jaén",
        "León",
        "Lérida",
        "Lugo",
        "Madrid",
        "Málaga",
        "Murcia",
        "Navarra",
        "Orense",
        "Palencia",
        "Las Palmas",
        "Pontevedra",
        "La Rioja",
        "Salamanca",
        "Segovia",
        "Sevilla",
        "Soria",
        "Tarragona",
        "Santa Cruz de Tenerife",
        "Teruel",
        "Toledo",
        "Valencia",
        "Valladolid",
        "Vizcaya",
        "Zamora",
        "Zaragoza",
      ],
      required: [true],
    },
    phone: { type: Number, required: true, minlength: 9, maxlength: 9 },
    motivation: { type: String, required: true },
    certification: { type: String, enum: ["PRO", "AMATEUR"], required: [true] },
    foodhHandlingNumber: {
      type: Number,
      required: true,
      minlength: 9,
      maxlength: 9,
    },
    kitchenNumber: { type: Number, required: true, minlength: 9, maxlength: 9 },
    deliveryTime: { type: Number, required: true, minlength: 9, maxlength: 9 },
    status: { type: String, enum: ["Green", "Red"], required: [true] },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Cook", cookSchema);