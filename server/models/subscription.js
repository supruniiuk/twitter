const { Schema, model } = require("mongoose");

const subscriptionSchema = new Schema({
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

module.exports = model("Subscription", subscriptionSchema);
