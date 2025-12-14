const mongoose = require('mongoose');

const connectDb = async () =>{
    try{
   await mongoose.connect(process.env.MONGO_URI);
   console.log("mongodb connected  succesfully")

}catch(err){

    console.log("mongodb connection error");
    process.exit(1);
}
};

module.exports = connectDb