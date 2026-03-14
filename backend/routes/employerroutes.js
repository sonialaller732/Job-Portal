const express = require('express');
const router = express.Router();
const { createJob,Joblist,deletejobs,updatejobs,
    getjobById,getAppliedUser,Userjob,updatestatus } = require('../controller/employercontroller');
const { login } = require("../controller/auth");
const authMiddleware = require("../middleware/checktype");




router.post('/addjob',createJob)
router.get('/list',authMiddleware,Joblist)
router.delete('/delete/:id',deletejobs)
router.put('/update/:id',updatejobs)
router.get('/getjob/:id',getjobById)
router.get('/getAppliedUser/:id',getAppliedUser)
router.put('/updatestatus/:id',updatestatus)




module.exports = router;


