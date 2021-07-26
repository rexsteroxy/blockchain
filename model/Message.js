const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, " name is required"],
      unique: true
    },

    

    email: {
      type: String,
      required: [true, "email is required"],
      unique: true
    },

    message: {
      type: String,
      required: [true, "message is required"],
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

const Message = mongoose.model("Message", MessageSchema);

module.exports = Message;
