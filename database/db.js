
const mongoose = require('mongoose');

const connection = async (userName,password) =>{

    const URL =`mongodb://${userName}:${password}@ac-3jzitxq-shard-00-00.j8qdlze.mongodb.net:27017,ac-3jzitxq-shard-00-01.j8qdlze.mongodb.net:27017,ac-3jzitxq-shard-00-02.j8qdlze.mongodb.net:27017/?ssl=true&replicaSet=atlas-hbvj9j-shard-0&authSource=admin&retryWrites=true&w=majority`
    console.log("Database connected successfully");
    try {

     await   mongoose.connect(URL, {useUnifiedTopology:true, useNewUrlParser:true})
        
    } catch (error) {
        console.log('Error while connecting the database',error);
    }
}

module.exports = connection