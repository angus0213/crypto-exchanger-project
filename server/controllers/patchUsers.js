const wallet = require("../data/wallet.json");
const depositWallet = require("../data/depositWallet.json");
const { getCollections } = require("../configs/MongoDB");
//set user full info
const patchUsers = async (req, res) => {
  const { users } = getCollections();//get mongodb collection
  const { userId, ID, fullName, age, address, country } = req.body;
  try {
    if (ID && fullName && age && address && country && age >= 18) {
      const patchResult = await users.updateOne(
        { _id: userId },
        {
          $set: {
            ID: ID,
            fullName: fullName,
            age: age,
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
