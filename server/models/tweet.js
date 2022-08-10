const { Schema, model } = require("mongoose");

const tweetSchema = new Schema(
  {
    creator_id: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    content: {
      type: String,
      required: true
    },
  },
  { timestamps: { createdAt: "creationDate " } }
);

module.exports = model("Tweet", tweetSchema);
