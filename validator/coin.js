const Joi = require("joi");
const myCustomJoi = Joi.extend(require("joi-phone-number"));

module.exports = {
  coinListing: {
    name: Joi.string().required(),
    price: Joi.number().required(),
    description: Joi.string().required(),
    website: Joi.string().required(),
    logoUrl: Joi.string().required(),
    exchanges: Joi.array().required(),
  },

  updateCoin: {
    description: Joi.string(),
    website: Joi.string(),
    logoUrl: Joi.string(),
    exchanges: Joi.array(),
  },

  viewACoin:{
    id: Joi.string().required(),
  }
};
