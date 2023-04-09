const { getCollections } = require("../configs/MongoDB");
//user listing their nft to the nft market for sell
const patchNFTWallet = async (req, res) => {
  const { users, NFTStockData } = getCollections();//get mongodb collection
  const { userId, Nft, listingPrice } = req.body;

  try {
    const getUserNFTInfo = await users.findOne({ _id: userId });//find user info

    const userNFT = getUserNFTInfo.NFT;
    const updatedUserNFT = userNFT.map((item) => {
      if (item._id === Nft._id) {
        item.quantity = 0;
      }
      return item;
    });//user list the nft to sell, set user's quantity to 0

    const patchUserResult = await users.updateOne(
      { _id: userId },
      {
        $set: {
          NFT: updatedUserNFT,
        },
      }
    );//update database

    const patchNFTDatebaseResult = await NFTStockData.updateOne(
      { _id: Nft._id },
      { $set: { quantity: 1, Price: listingPrice } }
    );//set nftstock to 1

    return res
      .status(200)
      .json({ status: 200, data: [patchUserResult, patchNFTDatebaseResult] });
  } catch (err) {
    return res.status(500).json({ status: 500, message: err.message });
  }
};

module.exports = { patchNFTWallet };
