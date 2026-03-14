import React, {useState,useEffect} from "react";
import { Container, Row, Col, Button, Form,Card } from "react-bootstrap";
 import "bootstrap/dist/css/bootstrap.min.css";
 import {BrowserRouter as Router,Routes,Route,Link} from "react-router-dom";
 import Header from "../../component/header";
 import Footer from "../../component/footer";
 import axios from 'axios';
 import Userjobdatagrid from "../../component/userdatagrid";


const Appliedjobs=()=>{
    const [jobs, setjobs]=useState([]);
    const [userId, setUserId] = useState(null);
    
{ /* const fetchSession = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/user/session", {
        withCredentials: true,
      });
      setUserId(res.data.userId);
    } catch (err) {
      console.log("Session error:", err.message);
    }
  }; */}

  const fetchjobData = async()=>{
        try{
            const jobsdata =await axios.get('http://localhost:8080/api/user/getappliedjobs');
            console.log(jobsdata.data.data[0]);
            setUserId(localStorage.getItem('userId'));
            setjobs(jobsdata.data.data);
        }catch(err){
            console.log('error_message',err.message)
        }
    };
    useEffect(()=>{
    //fetchSession();
    fetchjobData();
    },[]);
    const appliedJobs = jobs.filter((job) =>
    job.appliedBy?.includes(userId)
  );
    
 
    return(
        <Container>
        <Header/>
        <Userjobdatagrid rows={appliedJobs}  userId={userId} getRowId={(row) => row._id}/>
       
        <Footer/>
        </Container>
    )
 }
 export default Appliedjobs;