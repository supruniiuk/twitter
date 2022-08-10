const { Schema, model } = require("mongoose");

const reactionSchema = new Schema(
  {
    tweet_id: {
      type: Schema.Types.ObjectId,
      ref: "Tweet",
      required: true,
    },
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  }
);

module.exports = model("Reaction", reactionSchema);
