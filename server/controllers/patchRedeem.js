const { log } = require("console");
const { getCollections } = require("../configs/MongoDB");

const patchRedeem = async (req, res) => {
  const { users } = getCollections();

  try {
    const userInfo = await users.findOne({ _id: req.body._id });

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
      });

      const newWallet = userInfo.wallet.map((crypto) => {
        if (crypto._id === req.body.redeemCoin) {
          crypto.amount = crypto.amount + depositAmount;
        }
        return crypto;
      });

      const newDepositPrincipalData = userInfo.depositPrincipalData.map(
        (crypto) => {
          if (crypto._id === req.body.redeemCoin) {
            crypto.amount = 0;
          }
          return crypto;
        }
      );

      const timestamp = Date.parse(new Date());

      const newDepositWalletHistoryObject = {
        crypto: req.body.redeemCoin,
        amount: depositAmount,
        id: req.body._id,
        imageSrc: imageSrc,
        type: "redeem",
        timestamp: timestamp,
      };

      userInfo.depositWalletHistory.push(
        newDepositWalletHistoryObject)



      const newWalletData = await users.updateOne(
        { _id: req.body._id },
        {
          $set: {
            depositWallet: newDepositWallet,
            wallet: newWallet,
            depositPrincipalData: newDepositPrincipalData,
            depositWalletHistory: userInfo.depositWalletHistory
          },
        }
      );

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
