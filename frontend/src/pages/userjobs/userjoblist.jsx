import React, {useState,useEffect} from "react";
import { Container, Row, Col, Button, Form,Card } from "react-bootstrap";
 import "bootstrap/dist/css/bootstrap.min.css";
 import {BrowserRouter as Router,Routes,Route,Link} from "react-router-dom";
 import Header from "../../component/header";
 import Footer from "../../component/footer";
 import axios from 'axios';
 import Userjobdatagrid from "../../component/userdatagrid";


const Userjoblist=()=>{
    const [jobs, setjobs]=useState([]);
    const [userId, setUserId] = useState(null);
    
const fetchSession = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/user/session", {
        withCredentials: true,
      });
      setUserId(res.data.userId);
    } catch (err) {
      console.log("Session error:", err.message);
    }
  };

  const fetchjobData = async()=>{
        try{
            const token = localStorage.getItem("token");
            const jobsdata =await axios.get('http://localhost:8080/api/user/userlist',
                {
                headers: {
                    Authorization: `Bearer ${token}`
                }
                }
            );
            console.log(jobsdata.data.data[0]);
            setjobs(jobsdata.data.data);
             setUserId(localStorage.getItem('userId'));
        }catch(err){
            console.log('error_message',err.message)
        }
    };
    useEffect(()=>{
    fetchSession();
    fetchjobData();
    },[]);
    
    
    const handleApply=async(row)=>{
        
        //alert('txycutctc');
        const id = row._id || row.id;
       // alert(id); 
        try{
            const jobsdata =await axios.put('http://localhost:8080/api/user/updateJob',{id:id,userId:userId});
            console.log('applied');
        }catch(err){
            console.log('error_message',err.message)
        }
    }
   
    

    return(
        <Container>
        <Header/>
        <Userjobdatagrid rows={jobs} onApply={handleApply} userId={userId} getRowId={(row) => row._id}/>
       
        <Footer/>
        </Container>
    )
 }
 export default Userjoblist;