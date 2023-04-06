const { getCollections } = require("../configs/MongoDB");

const patchCancelListing=async(req, res)=>{
    console.log(req.body);
    const { users, NFTStockData } = getCollections();
    const { userId, Nft } = req.body;

    try {
      const getUserNFTInfo = await users.findOne({ _id: userId });
  
      const userNFT=getUserNFTInfo.NFT
    const updatedUserNFT= userNFT.map((item)=>{
          if(item._id===Nft._id){
              item.quantity=1
          }
          return item
      })
  
      const patchUserResult = await users.updateOne(
        { _id: userId },
        {
          $set: {
            NFT: updatedUserNFT,
          },
        }
      );
      const patchNFTDatebaseResult = await NFTStockData.updateOne(
        { _id: Nft._id },
        { $set: { quantity: 0}}
      );
      return res
        .status(200)
        .json({ status: 200, data: [patchUserResult, patchNFTDatebaseResult] });
    } catch (err) {
      return res.status(500).json({ status: 500, message: err.message });
    }

}

module.exports={patchCancelListing};