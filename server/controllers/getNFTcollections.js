const {getCollections}=require("../configs/MongoDB")

const getNFTcollections=async(req, res)=>{
    const {NFTStockData}=getCollections();
try{
   const nftStock= await NFTStockData.find().toArray();

   if (nftStock) {
    return res.status(200).json({status:200, data:nftStock})
   }else{
    return res.status(404).json({status:404, message:"no data available"})
   }
}
catch(err){
    return res.status(500).json({ status: 500, message: err.message });
}

}

module.exports={getNFTcollections};