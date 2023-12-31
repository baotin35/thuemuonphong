const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const Jwt = require("jsonwebtoken");
const User = require("../../models/Users.model.js");
const Post = require("../../models/Posts.model.js");
const { StatusCode } = require("../../utils/constants.js");
const { jsonGenerate } = require("../../utils/helpers.js");

const savePost = async (req, res) => {
  try {
    const { _id } = req.query;
    const user = await User.findById(req.userId);
    const post = await Post.findById({ _id: _id });
    let hasValue = user.SavePost.includes(_id);

    // console.log(hasValue); // true
    if (!hasValue) {
      await user.updateOne({ $push: { SavePost: _id } });
      await post.updateOne({
        $push: { saves: req.userId },
      });
      return res.json(jsonGenerate(StatusCode.SUCCESS, "Save Succssfully"));
    } else {
      await user.updateOne({ $pull: { SavePost: _id } });
      await post.updateOne({
        $pull: { saves: req.userId },
      });
      return res.json(jsonGenerate(StatusCode.SUCCESS, "Unsave Succssfully"));
    }
  } catch (error) {}
};

module.exports = savePost;
