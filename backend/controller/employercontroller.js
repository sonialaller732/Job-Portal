const Job = require('../model/jobmodel');
const Applynow=require('../model/applynow');

const createJob = async (req, res) => {
  try {
    const { profilename,description,companyname,experience,salary,location,lastdate,userId } = req.body;

    if (!profilename||!description||!companyname||!experience||!salary||!location||!lastdate) {
      return res.status(400).json({ message: 'All fields required' });
    }

    const newJob = new Job({ profilename,description,companyname,experience,salary,location,lastdate,addedby:userId });
    const savedJob = await newJob.save(); 
    

    res.status(201).json({ message: 'Job created successfully', data: savedJob });
  } catch (error) {
    console.error('❌ Error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

 const Joblist= async (req,res)=>{
   try
  {
    const userId = req.userId;
    const job= await Job.find({addedby:userId});
   
    const jobIds = job.map(item => item._id);
    console.log(jobIds);
    const totalUsers = await Applynow.distinct("userId", {
  jobId: { $in: jobIds }
});

  
    res.status(200).json({message:"Data fetched",data: job , totalUser:totalUsers.length});
  } catch(error){
    console.error('Error:',error);
    res.status(500).json({message:'Server error',error:error.message});
  }
  
 };
 
 

 const deletejobs= async(req,res)=>{
try
{
const job=await Job.findByIdAndDelete(req.params.id)
if(!job){
res.status(404).json({message:"Data not found"});
}
res.status(200).json({message:"Data deleted",data:job});


}catch(error){
console.error('Error:',error);
res.status(500).json({messgae:"Server error",error:error.message});
}
 };
  
const updatejobs= async(req,res) =>{
try{
const {profilename,description,companyname,experience,salary,location,lastdate}=req.body;
const job= await Job.findByIdAndUpdate(req.params.id,{profilename,description,companyname,experience,salary,location,lastdate},{new:true})
if(!job){
  return res.status(404).json({message:"Data not found"});
}
res.status(200).json({message:"list updated",data:job});
}catch(error){
  console.error('Error:',error);
  res.status(500).json({message:'Server error',error:error.message});

}
};

 const getjobById= async (req,res)=>{
  try
  {
    const job= await Job.findById(req.params.id)
    console.log(job);
    res.status(200).json({message:"Data fetched",data: job});
  } catch(error){
    console.error('Error:',error);
    res.status(500).json({message:'Server error',error:error.message});
  }
  
 };

 const getAppliedUser= async (req,res)=>{
  try
  {
    const job= await Job.findById(req.params.id)
    .populate("appliedBy", "email");
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    res.status(200).json({
      message: "Applied users list",
      users: job.appliedBy,
    });
  } catch(error){
    console.error('Error:',error);
    res.status(500).json({message:'Server error',error:error.message});
  }
  
 };
 const updatestatus= async(req,res) =>{
try{
const {status}=req.body;
const resp= await Applynow.findByIdAndUpdate(req.params.id,{status},{new:true})
if(!resp){
  return res.status(404).json({message:"Data not found"});
}
res.status(200).json({message:"list updated",data:resp});
}catch(error){
  console.error('Error:',error);
  res.status(500).json({message:'Server error',error:error.message});

}
};

 module.exports={
  createJob,
  Joblist,deletejobs,updatejobs,getjobById,getAppliedUser,updatestatus
}