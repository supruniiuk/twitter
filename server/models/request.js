const { Schema, model } = require("mongoose");

const requestSchema = new Schema({
  subscriber: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  publisher: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = model("Request", requestSchema);
