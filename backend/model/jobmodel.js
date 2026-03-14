const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
    profilename:{
            type:String,
            required:true,
        },
         description:{
            type:String,
            required:true,
        },
           companyname:{
            type:String,
            required:true,
        },
     experience:{
        type:String,
        required:true,

     },     
        salary:{
            type:Number,
            required:true,
        },
         location:{
            type:String,
            required:true,
        },
        addedby:{        
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Signup"
        },
        
        appliedBy:[
            {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Signup"
                 },
            ],
            applyjobId:
            {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Applynow"
                 },
            
         lastdate:{
            type:String,
            required:true,
        },
     
})

const Job = mongoose.model("Job", jobSchema);
module.exports = Job;