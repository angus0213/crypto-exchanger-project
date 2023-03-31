
const {getCollections}=require("../configs/MongoDB")


const getUser= async(req, res)=>{
    const { users } = getCollections();
    const _id=req.params.userId;
    try{
    const user= await users.findOne({_id:_id})
    if (user) {
        delete user.password;
        return res.status(200).json({status:200, data:user})
    }else{
        return res.status(404).json({status:404, message: "user does not exist"})
    }}
    catch(err){
        return res.status(500).json({ status: 500, message: err.message });
    }

}

module.exports={getUser};