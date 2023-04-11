const wallet = require("../data/wallet.json");
const depositWallet = require("../data/depositWallet.json");
const { getCollections } = require("../configs/MongoDB");
//set user full info
const patchUsers = async (req, res) => {
  const { users } = getCollections();//get mongodb collection
  const { userId, ID, fullName, DOB, address, country } = req.body;
  console.log(req.body);
  try {
    if (ID && fullName && address && country) {
      const patchResult = await users.updateOne(
        { _id: userId },
        {
          $set: {
            ID: ID,
            fullName: fullName,
            DOB: DOB,
            address: address,
            country: country,
            wallet: wallet,
            walletHistory: [],
            NFT: [],
            depositWallet: depositWallet,
            depositPrincipalData: depositWallet,
            depositWalletHistory: [],
          },
        }
      );
      //set initial user collection state
      return res.status(200).json({ status: 200, data: patchResult });
    } else {
      return res
        .status(403)
        .json({ status: 403, message: "please check input data" });
    }
  } catch (err) {
    return res.status(500).json({ status: 500, message: err.message });
  }
};

module.exports = { patchUsers };
