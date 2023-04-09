const { log } = require("console");
const {getCollections}=require("../configs/MongoDB")


const patchWallet=async(req, res)=>{

    const {users}=getCollections();

    try{
    const userInfo= await users.findOne({_id:req.body.userId})
    
    if(userInfo){
      const wallet=   userInfo.wallet.map((userWallet)=>{
        req.body.updateInfo.forEach((walletChange)=>{
                if (userWallet._id===walletChange._id) {
                    userWallet.amount= userWallet.amount+walletChange.balanceChange
                }  
            })
           return userWallet
        })
       const newWalletData=await users.updateOne({_id:userInfo._id},{$set:{wallet}})

       const timestamp=Date.parse(new Date());
       userInfo.walletHistory.push({timestamp:timestamp, tradeInfo:req.body.updateInfo})
         await users.updateOne({_id:userInfo._id},{$set:{walletHistory:userInfo.walletHistory}} )
         
       return res.status(200).json({ status: 200, data: newWalletData });
    }
    else{
        return res.status(403).json({ status: 403, message: "User doesn't exist" });
    }}
    catch (err){
      return res.status(500).json({ status: 500, message: err.message });
    }
   
}

module.exports={patchWallet};