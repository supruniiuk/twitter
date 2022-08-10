const ApiError = require("../errors/apiError");
const Tweet = require("../models/tweet");

class TwitterController {
  async getAll(req, res, next) {
    try {
      const tweets = await Tweet.find();

      res.json({ tweets });
    } catch (err) {
      console.log(err.message);
      return next(ApiError.internal(`Server error`));
    }
  }

  async createTweet(req, res, next) {
    const creator_id = req.user.id;
    const { content } = req.body;

    try {
      const tweet = new Tweet({
        creator_id,
        content,
      });

      await tweet.save();

      res.json({
        message: "Tweet created successfully",
      });
    } catch (err) {
      return next(ApiError.internal(`Server error`));
    }
  }

  async getById(req, res, next) {
    const tweetId = req.params.id;

    try {
      const tweet = await Tweet.findOne(
          {_id: tweetId });

      if (!tweet) {
        return next(ApiError.badRequest(`Tweet with id ${tweetId} not found`));
      }

      res.json({tweet});
    } catch (err) {
      return next(ApiError.internal(`Server error`));
    }
  }

  async deleteById(req, res, next) {
    const userId = req.user.id;
    const tweetId = req.params.id;

    try {
      const tweet = await Tweet.findOne(
        {_id: tweetId, creator_id: userId})

      if (!tweet) {
        return next(ApiError.badRequest(`Tweet with id ${tweetId} not found`));
      }

      await Tweet.findOneAndDelete({ _id: tweetId });

      res.json({ message: "Tweet successfuly deleted" });
    } catch (err) {
      console.log(err.message)
      return next(ApiError.internal(`Server error`));
    }
  }
}
module.exports = new TwitterController();
