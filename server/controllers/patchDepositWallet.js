const { getCollections } = require("../configs/MongoDB");
const patchDepositWallet = async (req, res) => {

  const { users} = getCollections();

  const { crypto, amount, id } = req.body;

  try {
    const getUser = await users.findOne({ _id: id });
    const depositWalletArray=getUser.depositWallet;

   const newDepositWalletArray= depositWalletArray.map((item)=>{
        if (item._id===crypto) {
            item.amount=amount
        }
        return item
    })

    const walletArray=getUser.wallet;
    const newWalletArray=walletArray.map((item)=>{
        if (item._id===crypto){
            item.amount=item.amount-amount
        }
        return item
    })
    const patchUserResult = await users.updateOne(
      { _id: id },
      {
        $set: {
          depositWallet:newDepositWalletArray, wallet:newWalletArray
        },
      }
    );
 

    return res
      .status(200)
      .json({ status: 200, data: patchUserResult});
  } catch (err) {
    return res.status(500).json({ status: 500, message: err.message });
  }
};

module.exports = { patchDepositWallet };
