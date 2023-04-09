const { getCollections } = require("../configs/MongoDB");
//user purchase nft from the marketplace
const patchNFT = async (req, res) => {
  const { users, NFTStockData } = getCollections();//get mongodb collection
  const { userId, Nft } = req.body;

  try {
    const getUserNFTInfo = await users.findOne({ _id: userId });//find user info
    getUserNFTInfo.NFT.push(Nft);//set user's nft array
    const patchUserResult = await users.updateOne(
      { _id: userId },
      {
        $set: {
          NFT: getUserNFTInfo.NFT,
        },
      }
    );//update user's info

    const patchNFTDatebaseResult = await NFTStockData.updateOne(
      { _id: Nft._id },
      { $set: { quantity: 0, owner: userId.slice(0, 5).concat("***") } }
    );//updata nftstock info, and change the owner of nft to user's id
    return res
      .status(200)
      .json({ status: 200, data: [patchUserResult, patchNFTDatebaseResult] });
  } catch (err) {
    return res.status(500).json({ status: 500, message: err.message });
  }
};

module.exports = { patchNFT };
