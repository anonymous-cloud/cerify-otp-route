const mongoose = require('mongoose');

const User = new mongoose.Schema({
    phoneNumber : {
        type : String,
        required : true,
        unique : true
    },
     isVerified: {
      type: Boolean,
      default: false
    }
},
{ timestamps: true }
)

module.exports = mongoose.model("User", userSchema);
