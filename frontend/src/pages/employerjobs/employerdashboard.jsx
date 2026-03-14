import React, {useState,useEffect} from "react";
import { Container, Row, Col, Button, Form,Card } from "react-bootstrap";
 import "bootstrap/dist/css/bootstrap.min.css";
 import {BrowserRouter as Router,Routes,Route,Link} from "react-router-dom";
 import Header from "../../component/header";
 import Footer from "../../component/footer";
  import axios from 'axios';
const Home=()=>{

  const [jobs, setjobs]=useState([]);
  const [totalusers, settotalusers]=useState([]);

    

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
            settotalusers(jobsdata.data.totalUser);
           
        }catch(err){
            console.log('error_message',err.message)
        }
    };
    useEffect(()=>{
    fetchjobData();
    },[]);

     const totalAppliedUsers = jobs.reduce(
  (total, job) => total + (job.appliedBy?.length || 0),
 0)

     


const jobsEndingToday = jobs.filter(job => new Date(job.lastdate) < new Date()).length;


  return(
        <Container>
 
          
        <Header/>
     
                
          <Row>
            
            <Col  md={4} >
             <Card style={{ backgroundColor: "#CFF0C3", height: "200px" }}>
                <p>Total Jobs</p>
                <h4>{jobs.length}</h4>
             </Card>
             </Col>
             <Col   md={4}>
             <Card style={{ backgroundColor: "#CFF0C3", height: "200px" }}>
              <p>Total Applied User</p>
              <h4>{totalusers}</h4>
             </Card>
             </Col>
             <Col   md={4}>
             <Card style={{ backgroundColor: "#CFF0C3", height: "200px" }}>
              <p>Expired Jobs</p>
              <h4>{jobsEndingToday}</h4>
             </Card>
            </Col>
            
          </Row>
        <Footer/>
        </Container>
    )
}
 export default Home;