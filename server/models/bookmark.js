const { Schema, model } = require("mongoose");

const bookmarkSchema = new Schema(
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
  },
  { timestamps: { createdAt: "addedDate " } }
);

module.exports = model("Bookmark", bookmarkSchema);
