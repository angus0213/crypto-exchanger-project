const { getCollections, closeMongoDB } = require("../configs/MongoDB");
//set user collection
const postUsers = async (req, res) => {
  const { users } = getCollections();//get mongodb collection
  try {
    let checkExistUserbyEmail = "";
    if (req.body.email) {
      checkExistUserbyEmail = await users.findOne({
        email: req.body.email,
      });
    }//in the case that user use email to register, check whether database contains the same user

    let checkExistUserbyMobileNumber = "";
    if (req.body.mobileNumber && req.body.countryCode) {
      checkExistUserbyMobileNumber =
        (await users.findOne({
          mobileNumber: req.body.mobileNumber,
        })) &&
        (await users.findOne({
          countryCode: req.body.countryCode,
        }));
    }//in the case that user use phone to register, check whether database contains the same user

    if (checkExistUserbyEmail || checkExistUserbyMobileNumber) {
      return res
        .status(403)
        .json({ status: 403, message: "user already exist" });
    } else {
      const addUser = await users.insertOne(req.body);
      return res.status(200).json({ status: 200, data: addUser });//uodate database
    }
  } catch (err) {
    return res.status(500).json({ status: 500, message: err.message });
  }
};

module.exports = { postUsers };
