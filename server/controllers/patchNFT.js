const { getCollections } = require("../configs/MongoDB");
const patchNFT = async (req, res) => {
  const { users, NFTStockData } = getCollections();

  const { userId, Nft } = req.body;

  try {
    const getUserNFTInfo = await users.findOne({ _id: userId });
    getUserNFTInfo.NFT.push(Nft)
    const patchUserResult = await users.updateOne(
      { _id: userId },
      {
        $set: {
          NFT: getUserNFTInfo.NFT,
        },
      }
    );
    const patchNFTDatebaseResult = await NFTStockData.updateOne(
      { _id: Nft._id },
      { $set: { quantity: 0, owner:userId.slice(0,5).concat("***") } }
    );
    return res
      .status(200)
      .json({ status: 200, data: [patchUserResult, patchNFTDatebaseResult] });
  } catch (err) {
    return res.status(500).json({ status: 500, message: err.message });
  }
};

module.exports = { patchNFT };
