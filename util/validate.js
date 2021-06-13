const Joi = require("joi");


module.exports = (obj) => {
  return (req, res, next) => {

    console.log(req.params);
    const schema = Joi.object().keys(obj).required().unknown(false);
    const value = req.method === "GET" ? req.params : req.body;
    const { error, value: vars } = schema.validate(value);

    if (error) {
      return res.status(500).json({
        status: false,
        message: error.message,
      });
    }

    req.body = vars;
    next();
  };
};
