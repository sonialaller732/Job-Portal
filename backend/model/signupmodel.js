const mongoose = require("mongoose");

const signupSchema = new mongoose.Schema({
    type:{
            type:String,
            required:true,
        },
        name:{
         type:String,
         required:true,
        },
         email:{
            type:String,
            required:true,
        },
        mobileno:{
         type:String,
         required:true,
        },
     password:{
        type:String,
        required:true,
     },  
     
      jobApplied: [
         {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Job"
         }
      ],  
      fileurl:{
        type:String,
     },
       
})

const Signup = mongoose.model("Signup", signupSchema);
module.exports = Signup;