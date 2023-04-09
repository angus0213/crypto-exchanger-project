const { getCollections } = require("../configs/MongoDB");
//user redeem their deposit
const patchRedeem = async (req, res) => {
  const { users } = getCollections();//get mongodb collection

  try {
    const userInfo = await users.findOne({ _id: req.body._id });//find user info

    if (userInfo) {
      let depositAmount;
      let imageSrc;
      const newDepositWallet = userInfo.depositWallet.map((crypto) => {
        if (crypto._id === req.body.redeemCoin) {
          depositAmount = crypto.amount;
          imageSrc = crypto.imageSrc;
          crypto.amount = 0;
        }
        return crypto;
      });//reduce depositWallet's amount to 0

      const newWallet = userInfo.wallet.map((crypto) => {
        if (crypto._id === req.body.redeemCoin) {
          crypto.amount = crypto.amount + depositAmount;
        }
        return crypto;
      });//increase wallet's amount to redeem amount

      const newDepositPrincipalData = userInfo.depositPrincipalData.map(
        (crypto) => {
          if (crypto._id === req.body.redeemCoin) {
            crypto.amount = 0;
          }
          return crypto;
        }
      );//reduce principal account's amount to 0

      const timestamp = Date.parse(new Date());//set trading time

      const newDepositWalletHistoryObject = {
        crypto: req.body.redeemCoin,
        amount: depositAmount,
        id: req.body._id,
        imageSrc: imageSrc,
        type: "redeem",
        timestamp: timestamp,
      };//set history info

      userInfo.depositWalletHistory.push(newDepositWalletHistoryObject);//update history info

      const newWalletData = await users.updateOne(
        { _id: req.body._id },
        {
          $set: {
            depositWallet: newDepositWallet,
            wallet: newWallet,
            depositPrincipalData: newDepositPrincipalData,
            depositWalletHistory: userInfo.depositWalletHistory,
          },
        }
      );//update user info
 
      return res.status(200).json({ status: 200, data: newWalletData });
    } else {
      return res
        .status(403)
        .json({ status: 403, message: "User doesn't exist" });
    }
  } catch (err) {
    return res.status(500).json({ status: 500, message: err.message });
  }
};

module.exports = { patchRedeem };
