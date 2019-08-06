const Dev = require("../models/dev");

module.exports = {
  async store(req, res) {
    const { devId } = req.params;
    const { user } = req.headers;

    const loggerDev = await Dev.findById(user);
    const targetDev = await Dev.findById(devId);

    if (!targetDev) {
      return res.status(400).json({ error: "Dev not exists" });
    }

    loggerDev.dislikes.push(targetDev._id);

    await loggerDev.save();
    return res.json(loggerDev);
  }
};
