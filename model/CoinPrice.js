const mongoose = require("mongoose");

const CoinPriceSchema = new mongoose.Schema(
  {
    coinId: {
      type: String,
      required: [true, "CoinId is required"],
    },


    price: {
      type: Number,
      required: [true, "CoinPrice price is required"],
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

const CoinPrices = mongoose.model("CoinPrices", CoinPriceSchema);

module.exports = CoinPrices;
