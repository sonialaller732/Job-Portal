import React, {useState,useEffect} from "react";
import { Container, Row, Col, Button, Form,Card } from "react-bootstrap";
 import "bootstrap/dist/css/bootstrap.min.css";
 import {BrowserRouter as Router,Routes,Route,Link} from "react-router-dom";
 import Header from "../../component/header";
 import Footer from "../../component/footer";
 import axios from 'axios';
 import Getapplynowgrid from "../../component/getapplynowgrid";


const Userviewapplication=()=>{
    const [applynow, setapplynow]=useState([]);
    const[userId,setUserId]=useState(null);
    const fetchapplyjobData = async()=>{
        try{
              const token = localStorage.getItem("token");

            const applynowdata =await axios.get('http://localhost:8080/api/user/getuserappliedjob',
                    {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                    }
            );
            setapplynow(applynowdata.data.data);
              setUserId(localStorage.getItem('userId'));
             }catch(err){
            console.log('error_message',err.message)
        }
    };
    useEffect(()=>{
    fetchapplyjobData();
    },[]);
     return(
        <Container>
        <Header/>
        <Getapplynowgrid rows={applynow} userId={userId} getRowId={(row) => row._id}/>
        <Footer/>
        </Container>
    )
 }
 export default  Userviewapplication;