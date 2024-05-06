const mongoose = require('mongoose')
const colors = require('colors')
const connectDB = async ()=>{
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log('database has connected successfully'.bgMagenta.white);
    }
    catch(error){
        console.log(`ERROR in mongoDB ${error}`.bgRed.white);
    }
};
module.exports=connectDB;

 