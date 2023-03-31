const { getCollections, closeMongoDB } = require("../configs/MongoDB");

const postUsers = async (req, res) => {
  const { users } = getCollections();
  try {
    let checkExistUserbyEmail=""
    if (req.body.email){
    checkExistUserbyEmail = await users.findOne({
      email: req.body.email,
    })};

    let checkExistUserbyMobileNumber=""
    if (req.body.mobileNumber && req.body.countryCode){
    checkExistUserbyMobileNumber = (await users.findOne({
        mobileNumber: req.body.mobileNumber,
      })) && (await users.findOne({
        countryCode: req.body.countryCode,
      }))
    
    };
    
    if ((checkExistUserbyEmail )||(checkExistUserbyMobileNumber) ) {
        return res.status(403).json({ status: 403, message:"user already exist" });
    }else{
    const addUser = await users.insertOne(req.body);
    return res.status(200).json({ status: 200, data: addUser });}
   
   
  } catch (err) {
    return res.status(500).json({ status: 500, message: err.message });
  }
};

module.exports = { postUsers };
