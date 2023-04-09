const { getCollections } = require("../configs/MongoDB");
//user cancel nft listing in the market
const patchCancelListing = async (req, res) => {
  const { users, NFTStockData } = getCollections();//get mongodb collection
  const { userId, Nft } = req.body;

  try {
    const getUserNFTInfo = await users.findOne({ _id: userId });//find user info
    const userNFT = getUserNFTInfo.NFT;//get user's nft array
    const updatedUserNFT = userNFT.map((item) => {
      if (item._id === Nft._id) {
        item.quantity = 1;
      }
      return item;
    });//reset user nft quantity to 1

    const patchUserResult = await users.updateOne(
      { _id: userId },
      {
        $set: {
          NFT: updatedUserNFT,
        },
      }
    );//update user collection
    const patchNFTDatebaseResult = await NFTStockData.updateOne(
      { _id: Nft._id },
      { $set: { quantity: 0 } }
    );//update the cancelled nftstock collection to 0
    
    return res
      .status(200)
      .json({ status: 200, data: [patchUserResult, patchNFTDatebaseResult] });
  } catch (err) {
    return res.status(500).json({ status: 500, message: err.message });
  }
};

module.exports = { patchCancelListing };
