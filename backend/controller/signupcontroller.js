const Signup= require('../model/signupmodel');
const Job= require('../model/jobmodel');
const bcrypt= require('bcryptjs')
const Applynow= require('../model/applynow');
const mongoose = require("mongoose");
const createsignup = async (req, res) => {
  try {
    const {type,name,email,mobileno,password } = req.body;

    if (!type||!name||!email||!mobileno||!password) {
      return res.status(400).json({ message: 'All fields required' });
    }


    const salt= await bcrypt.genSalt(10); //get54tehdb
    const hashedPassword= await bcrypt.hash(password,salt);

  
    
    const newSignup = new Signup({ type,name,email,mobileno,password:hashedPassword });
    const savedSignup = await newSignup.save(); 
    

    res.status(201).json({ message: 'Sign up successfully', data: savedSignup });
  } catch (error) {
    console.error('❌ Error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
const checklogin=async(req,res)=>{
  try{
    const{email,password}=req.body;
  
    if(!email||!password){      
      return res.status(201).json({message:"All field require"})
    }
     const signupdata =await Signup.findOne({email});
     

     if(!signupdata){
      
      return res.status(201).json({message:"email does not exist"})
     }

    const check=await bcrypt.compare(password,signupdata.password)
    if(!check){
      
      return res.status(201).json({message:"Invaild password"})
    }
    req.session.signupdata={id:signupdata._id,
                              type:signupdata.type,
                              email:signupdata.email
    }
    res.status(200).json({
      message:`welcome ${req.session.signupdata.type}`
    })
  }catch(error){
    res.status(500).json({message:error.message})
  }
}
const getSession = (req, res) => {

  if (!req.session.signupdata)
    return res.json({ loggedIn: false });

  return res.json({
    loggedIn: true,
    type: req.session.signupdata.type,
    userId: req.session.signupdata.id
  });
};

const useraplliedJob = async(req,res) =>{

  try{
      const {id, userId}=req.body;   //jobid    123erdw
      //const userId = req.session.signupdata.id; // signupid or userid
      const job= await Job.findByIdAndUpdate(id,{$addToSet:{appliedBy:userId}},{new:true})
      if(!job){
        return res.status(404).json({message:"Job not found"});
      }
       const signup= await Signup.findByIdAndUpdate(userId,{$addToSet:{jobApplied:id}},{new:true})
      if(!job){
        return res.status(404).json({message:"User not found"});
      }
      res.status(200).json({message:"Applied succefullly",data:job});
  }catch(error){
        console.error('Error:',error);
        res.status(500).json({message:'Server error',error:error.message});

      }
 
}
const Userjob= async (req,res)=>{
   try
  {
    
//_id: "69209b2afe51ee4569e1cc07" with lean();, faster
// _id: ObjectId('6973c1c10bfc118923645f3a'), without lean();
/*⚡ Speed Comparison (Real Impact)
Feature	Without lean	With lean
Memory	High ❌	Low ✅
Speed	Medium	Fast 🚀
Object Size	Heavy	Light ✅
Frontend Use	OK	Perfect ✅*/
    
    const today = new Date().toISOString().split("T")[0];
   
    const jobs= await Job.find({lastdate: { $gte: today } }).lean(); // 12 entries // applied:true or false
    // name, email, mobile, ctc, skills , applied : true(in 3 enties) or false(in 9 entries)
    const appliedList = await Applynow.find({userId:req.userId})
      .select("jobId") // 8 entries, in which 3 jobId
      .lean();

       const appliedJobIds = appliedList
      .filter(item => item.jobId) // remove 5 entries 
      .map(item => item.jobId.toString());

    const result = jobs.map(job => ({
      ...job,
      applied: appliedJobIds.includes(job._id.toString())
    }));
    // if exist job id in job schema then applied= true
    // if exist not job id in job schema then applied = false
   
    res.status(200).json({message:"Data fetched",data: result});
  } catch(error){
    console.error('Error:',error);
    res.status(500).json({message:'Server error',error:error.message});
  }
   };
  const getappliedjobs = async (req,res)=>{
     try
    {
        const userId = req.userId;
       
        const job= await Job.find();
        const applynow= await Applynow.countDocuments({userId:userId});
        
        const jobIds = job.map(item => item._id);
        //console.log(jobIds);
        const totalUsers = await Applynow.distinct("userId", {
       jobId: { $in: jobIds }
});
      res.status(200).json({message:"Data fetched",data: job, totalapply:applynow, totalUser:totalUsers.length});
    } catch(error){
      console.error('Error:',error);
      res.status(500).json({message:'Server error',error:error.message});
    }
    
   };







 const getprofileById= async (req,res)=>{
  try
  {
    const userId = req.userId;
    console.log(userId);
    const profile= await Signup.findById(userId)
    console.log(profile);
    res.status(200).json({message:"Data fetched",data: profile});
  } catch(error){
    console.error('Error:',error);
    res.status(500).json({message:'Server error',error:error.message});
  }
  
 };
  
 const submitapplynow = async(req,res)=>{
  try{
      const userId = req.userId;
    const resumefile = req.file;
if (! resumefile) {
    return res.status(400).json({ success: false, message: "No file uploaded" });
  } 
  const filePath = `/uploads/${ resumefile.filename}`;

    const {experience,skills,location,currentctc,expectedctc,jobId}=req.body;
    if(!experience||!skills||!location||!currentctc||!expectedctc){
      return res.status(400).json({message:"all field require"})}
      
    const newApplynow = new Applynow({experience,skills,location,currentctc,expectedctc,resumefile:filePath,jobId,userId  });
   
    const savedApplynow = await newApplynow.save(); 
    

    res.status(201).json({ message: 'Applied successfully',data: savedApplynow });
  } catch (error) {
    console.error('❌ Error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const uploadFile=async(req,res)=>{
  try{
if (!req.file) {
    return res.status(400).json({ success: false, message: "No file uploaded" });
  } 

  const filePath = `/uploads/${req.file.filename}`;

    const { userId } = req.body
const response = await Signup.findByIdAndUpdate(
      userId,
      { fileurl: filePath },
    );
  // If file is uploaded, return response
  res.status(200).json({
    success: true,
    message: "File uploaded successfully",
    filename: req.file.filename,
    filePath: filePath,
  });
  }catch(error){
console.error('❌ Error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
  
const Userapplyjob= async (req,res)=>{
   try
  {   
    
    //const job= await Applynow.find();
    
   //const job = await Applynow.find().populate("userId");
   console.log(req.userId);
   const myJobs = await Job.find({ addedby: req.userId })
  .select("_id");

const myJobIds = myJobs.map(job => job._id); // KEEP ObjectId

const data = await Applynow.find({
  jobId: { $in: myJobIds }
})
.populate("jobId")
.populate("userId", "name email mobileno");

console.log(data);

    res.status(200).json({message:"Data fetched",data: data});
  } catch(error){
    console.error('Error:',error);
    res.status(500).json({message:'Server error',error:error.message});
  }
   };

   const GetUserappliedjob= async (req,res)=>{
   try
  {   
    
    //const job= await Applynow.find();
    
   const job = await Applynow.find({userId:req.userId}).populate("userId");
    res.status(200).json({message:"Data fetched",data: job});
  } catch(error){
    console.error('Error:',error);
    res.status(500).json({message:'Server error',error:error.message});
  }
   };

  const applynowById= async (req,res)=>{
   try
  {   
    //const job= await Applynow.find();
     
   const job = await Applynow.findById(req.params.id).populate("userId");
   console.log(job);
    res.status(200).json({message:"Data fetched",data: job});
  } catch(error){
    console.error('Error:',error);
    res.status(500).json({message:'Server error',error:error.message});
  }
   };
 

 module.exports={createsignup,checklogin,getSession,useraplliedJob,Userjob,getappliedjobs,
  getprofileById,submitapplynow,uploadFile,Userapplyjob,applynowById, GetUserappliedjob

}