import React, {useState,useEffect} from "react";
import { Container, Row, Col, Button, Form,Card } from "react-bootstrap";
 import "bootstrap/dist/css/bootstrap.min.css";
 import {BrowserRouter as Router,Routes,Route,Link} from "react-router-dom";
 import Header from "../../component/header";
 import Footer from "../../component/footer";
 import axios from 'axios';
 import Jobdatagrid from "../../component/datagrid";


const Joblist=()=>{
    const [jobs, setjobs]=useState([]);
    

  const fetchjobData = async()=>{
        try{
            const jobsdata =await axios.get('http://localhost:8080/api/employer/list',
                {
                headers: {
                authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            }   
            );
            console.log(jobsdata.data.data[0]);
            setjobs(jobsdata.data.data);
        }catch(err){
            console.log('error_message',err.message)
        }
    };
    useEffect(()=>{
    fetchjobData();
    },[]);
    
    
    const handleDelete=async(row)=>{
         try{
            const jobsdata = await axios.delete(`http://localhost:8080/api/employer/delete/${row._id}`);
            if(jobsdata){
                alert('data deleted');
            fetchjobData();
         }
        }catch(err){
            console.log('error_message',err.message)
        }
        
    }
   
    

    return(
        <Container>
        <Header/>
        <Jobdatagrid rows={jobs} onDelete={handleDelete}/>
       
        <Footer/>
        </Container>
    )
 }
 export default Joblist;