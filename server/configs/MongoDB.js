const {MongoClient}=require("mongodb");
const path=require("path");

require("dotenv").config({path: path.join(__dirname,"../.env")}); //path to .env

const {MONGO_URI, MONGO_DB_NAME}=process.env;

//options for mongoDB
const options={
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

// constants for mongoDB
let client, db;

// connect to MongDB client
const connectMongoDB= async()=>{
try{
    client=new MongoClient(MONGO_URI, options);
    await client.connect();//connect to the client
    db=client.db(MONGO_DB_NAME)
    console.log("MongoDB is connected");
}catch(err){
    console.log(err.message);
}

}

// get all the collections of this MongoDB project
const getCollections=()=>{
    const users=db.collection("users"); //user collection
    return {users};
}

// close MongoDB client
const closeMongoDB=()=>{
    console.log("MongoDB is close");
    client.close();
}

module.exports={
    connectMongoDB,
    getCollections,
    closeMongoDB,
}