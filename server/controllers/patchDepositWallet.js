const { getCollections } = require("../configs/MongoDB");
const patchDepositWallet = async (req, res) => {

  const { users} = getCollections();
 const interestRate=0.05;
  const { crypto, amount, id} = req.body;

  try {
    const getUser = await users.findOne({ _id: id });
    const depositWalletArray=getUser.depositWallet;

   const newDepositWalletArray= depositWalletArray.map((item)=>{
        if (item._id===crypto) {
            item.amount=amount
        }
        return item
    })

    const principalArray=getUser.depositPrincipalData;
    const newprincipalArray= principalArray.map((item)=>{
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
    const timestamp=Date.parse(new Date());
    getUser.depositWalletHistory.push({...req.body, timestamp:timestamp})
    const patchUserResult = await users.updateOne(
      { _id: id },
      {
        $set: {
          depositWallet:newDepositWalletArray,  wallet:newWalletArray, depositWalletHistory:getUser.depositWalletHistory,depositPrincipalData: newprincipalArray
        },
      }
    );

    const patchUserDepositWallet =  setInterval(async() => {
      const continueGetUser = await users.findOne({ _id: id });
    const continueDepositWalletArray=continueGetUser.depositWallet;
      const continueDepositWalletArrayFixTime= continueDepositWalletArray.map((item)=>{
        if (item._id===crypto) {
            item.amount=item.amount*(1+interestRate)
        }
        return item
    })

      await users.updateOne(
      { _id: id },
      {
        $set: {
          depositWallet:continueDepositWalletArrayFixTime
        },
      }
    );
  
 }, 10000);

    return res
      .status(200)
      .json({ status: 200, data: [patchUserResult,patchUserDepositWallet]});
  } catch (err) {
    return res.status(500).json({ status: 500, message: err.message });
  }
};

module.exports = { patchDepositWallet };
