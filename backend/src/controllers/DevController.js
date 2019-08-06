const axios = require("axios");
const Dev = require("../models/dev");
module.exports = {
  async index(req, res) {
    const { user } = req.headers;

    const loggerDev = await Dev.findById(user);

    const users = await Dev.find({
      $and: [
        {
          _id: { $ne: user }
        },
        {
          _id: { $nin: loggerDev.likes }
        },
        {
          _id: { $nin: loggerDev.dislikes }
        }
      ]
    });

    return res.json(users);
  },

  async store(req, res) {
    console.log(req.body.username);
    const { username } = req.body;

    const response = await axios.get(
      `https://api.github.com/users/${username}`
    );

    const { name, bio, avatar_url: avatar } = response.data;

    const dev = await Dev.create({
      name,
      user: username,
      bio,
      avatar
    });

    return res.json(dev);
  }
};
