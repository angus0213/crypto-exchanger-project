const { getCollections } = require("../configs/MongoDB");
//get user info
const getUser = async (req, res) => {
  const { users } = getCollections();//get mongodb collection
  const _id = req.params.userId;//get user id
  try {
    const user = await users.findOne({ _id: _id });//find user info
    if (user) {
      delete user.password;// delete password info, and send other user data to frontend
      return res.status(200).json({ status: 200, data: user });
    } else {
      return res
        .status(404)
        .json({ status: 404, message: "user does not exist" });
    }
  } catch (err) {
    return res.status(500).json({ status: 500, message: err.message });
  }
};

module.exports = { getUser };
