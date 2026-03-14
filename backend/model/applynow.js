const mongoose = require("mongoose");

const applynowSchema = new mongoose.Schema({
    experience:{
            type:String,
            required:true,
        },
        skills:{
         type:String,
         required:true,
        },
         location:{
            type:String,
            required:true,
        },
        currentctc:{
         type:String,
         required:true,
        },
     expectedctc:{
        type:String,
        required:true,
     }, 
     resumefile:{
        type:String,
        required:true,
     },
     status:{
      type:String
     },
      jobId:
            {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Job"
         },
         
     
      userId:
            {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Signup"
         },


    })

const Applynow = mongoose.model("Applynow", applynowSchema);
module.exports = Applynow;