const express = require('express');
const router = express.Router();

const {createsignup,getSession,useraplliedJob,Userjob,
     getappliedjobs,getprofileById,submitapplynow,
     uploadFile,Userapplyjob,applynowById,GetUserappliedjob } = require('../controller/signupcontroller');
const { login } = require("../controller/auth");
const authMiddleware = require("../middleware/checktype");
const upload = require("../middleware/upload");

router.post('/signup',createsignup)
router.get('/userlist',authMiddleware, Userjob)
//router.post('/login',checklogin)

router.get("/session", getSession);
router.put("/updateJob", useraplliedJob);
router.get("/getappliedjobs",authMiddleware,  getappliedjobs);
router.get("/getProfile", authMiddleware,getprofileById);
router.post('/saveapplynow',authMiddleware,upload.single("resumefile"),submitapplynow);
router.post('/login',login);
router.get("/jobuserlist", authMiddleware, Userapplyjob);
router.get("/getuserappliedjob",authMiddleware, GetUserappliedjob);

router.get("/applynowbyid/:id",applynowById);

router.post("/upload", upload.single("myfile"), uploadFile);



module.exports = router;