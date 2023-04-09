const { getCollections } = require("../configs/MongoDB");
//user deposit crypto to deposit wallet and get interest
const patchDepositWallet = async (req, res) => {
  const { users } = getCollections();//get mongodb collection
  const interestRate = 0.05;//set deposit interest rate
  const { crypto, amount, id } = req.body;

  try {
    const getUser = await users.findOne({ _id: id });//find user info

    const depositWalletArray = getUser.depositWallet;
    const newDepositWalletArray = depositWalletArray.map((item) => {
      if (item._id === crypto) {
        item.amount = amount;
      }
      return item;
    });//set deposit wallet's amount to the amount that user want to deposit

    const principalArray = getUser.depositPrincipalData;
    const newprincipalArray = principalArray.map((item) => {
      if (item._id === crypto) {
        item.amount = amount;
      }
      return item;
    });//set principal account's amount to the deposit amount

    const walletArray = getUser.wallet;
    const newWalletArray = walletArray.map((item) => {
      if (item._id === crypto) {
        item.amount = item.amount - amount;
      }
      return item;
    });//set wallet amount (reduced by deposit amount)

    const timestamp = Date.parse(new Date());//set trading time
    getUser.depositWalletHistory.push({ ...req.body, timestamp: timestamp });//set trading history data
    const patchUserResult = await users.updateOne(
      { _id: id },
      {
        $set: {
          depositWallet: newDepositWalletArray,
          wallet: newWalletArray,
          depositWalletHistory: getUser.depositWalletHistory,
          depositPrincipalData: newprincipalArray,
        },
      }
    );//update database

    const patchUserDepositWallet = setInterval(async () => {
      const continueGetUser = await users.findOne({ _id: id });
      const continueDepositWalletArray = continueGetUser.depositWallet;
      const continueDepositWalletArrayFixTime = continueDepositWalletArray.map(
        (item) => {
          if (item._id === crypto) {
            item.amount = item.amount * (1 + interestRate);
          }
          return item;
        }
      );//update deposit wallet with interest

      await users.updateOne(
        { _id: id },
        {
          $set: {
            depositWallet: continueDepositWalletArrayFixTime,
          },
        }
      );
    }, 10000);//update database every 10 second with increased user asset
    return res
      .status(200)
      .json({ status: 200, data: [patchUserResult, patchUserDepositWallet] });
  } catch (err) {
    return res.status(500).json({ status: 500, message: err.message });
  }
};

module.exports = { patchDepositWallet };
