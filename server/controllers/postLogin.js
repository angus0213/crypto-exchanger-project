const { getCollections } = require("../configs/MongoDB");
//set log in info
const postLogin = async (req, res) => {
  const { users } = getCollections();//get mongodb collection
  try {
    const matchUser = req.body.email
      ? await users.findOne({ email: req.body.email })
      : await users.findOne({
          countryCode: req.body.countryCode,
          mobileNumber: req.body.mobileNumber,
        });//check user login method, and check in different method

    const matchPassword = matchUser.password === req.body.password;//check password

    if (matchUser && matchPassword) {
      delete matchUser.password;
      return res.status(200).json({ status: 200, data: matchUser });
    } else {
      return res
        .status(403)
        .json({ status: 403, message: "Please check username and password" });
    }
  } catch (err) {
    return res.status(500).json({ status: 500, message: err.message });
  }
};

module.exports = { postLogin };
