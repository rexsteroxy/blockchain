const Coin = require("../model/Coin");
const CoinPrice = require("../model/CoinPrice");

const Message = require("../model/Message");

exports.createCoin = async (req, res, next) => {
  try {
    const { name, price, description, website, logoUrl, exchanges } = req.body;

    const newCoin = await Coin.create({
      name,
      price,
      description,
      website,
      logoUrl,
      exchanges,
    });

    await CoinPrice.create({
      coinId: newCoin._id,
      price: newCoin.price,
    });

    return res.status(201).json({
      status: true,
      newCoin,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};
///
exports.sendMessage = async (req, res, next) => {
  try {
    const { name, email, message } = req.body;

    const _message = await Message.create({
      name, email, message
    });

   
    return res.status(201).json({
      status: true,
      _message,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

exports.getMessages = async (req, res, next) => {
  try {
    const allMessages = await Message.find();

    const count = allMessages.length;

    return res.status(201).json({
      status: true,
      count,
      allMessages,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};
////


exports.listAllCoins = async (req, res, next) => {
  try {
    const allCoins = await Coin.find();

    allCoins.forEach(async (element) => {
      let min = element.price;
      let max = 100000;
      let price = Math.floor(Math.random() * (max - min + 1)) + min;

      element.price = price;

      await CoinPrice.create({
        coinId: element._id,
        price: element.price,
      });
    });

    return res.status(201).json({
      status: true,
      allCoins,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

exports.viewACoin = async (req, res, next) => {
  try {
    const coin = await Coin.findOne({ _id: req.params.id });

    if (!coin) {
      return res.status(401).json({
        status: false,
        message: "no coin found",
      });
    }

    const coinPrices = await CoinPrice.find({ coinId: coin._id });

    return res.status(201).json({
      status: true,
      coinPriceChanges: coinPrices.length,
      coin,
      coinPrices,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

exports.updateCoin = async (req, res) => {
  try {
    const coin = await Coin.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: true,
      requestedAt: req.requestTime,
      data: coin,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

exports.deleteCoin = async (req, res) => {
  try {
    const deletedItem = await Coin.findByIdAndDelete(
      req.params.id
    );

    return res.status(200).json({
      status: true,
      requestedAt: req.requestTime,
      deletedItem
    });

  } catch (error) {
    return res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};
