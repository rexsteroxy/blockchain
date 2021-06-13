const mongoose = require("mongoose");

const CoinSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "coin name is required"],
      unique: true
    },

    price: {
      type: Number,
      required: [true, "coin price is required"],
    },

    description: {
      type: String,
      required: [true, "coin description is required"],
    },

    website: {
      type: String,
      required: [true, "coin website is required"],
    },

    logoUrl: {
        type: String,
        required: [true, "coin logo is required"],
      },

      exchanges:{ 
        type: Array,
        default: [],
      },

    createdAt: {
      type: Date,
      default: Date.now(),
    },
  },

  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const Coins = mongoose.model("Coins", CoinSchema);

module.exports = Coins;
