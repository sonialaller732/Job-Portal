import React, { useState } from "react";
import axios from "axios";
import { Container, Row, Col, Button, Form,Card } from "react-bootstrap";
 import "bootstrap/dist/css/bootstrap.min.css";
 import {BrowserRouter as Router,Routes,Route,Link} from "react-router-dom";
 import Header from "../../component/header";
 import Footer from "../../component/footer";

 const Addjob = () =>{
  const userId = localStorage.getItem("userId");

  const [formData,setformData]=useState({
        profilename:"",
        description:"",
        companyname:"",
        experience:"",
        salary:"",
        location:"",
        lastdate:"",
        userId:userId,
        
  })
  const [message,setMessage]=useState('');
    const handlechange=(e)=>{
      setformData({
        ...formData,
        [e.target.name]:e.target.value
      });
    };
   const handleaddjob= async(e)=>{
      e.preventDefault();
      console.log(formData);
      try{
        const res= await axios.post("http://localhost:8080/api/employer/addjob",formData)
        			
        setMessage(res.data.message)
        setformData({profilename:"",
        description:"",
        companyname:"",
        experience:"",
        salary:"",
        location:"",
        lastdate:""})
        
        
      }catch(err){
      console.log(err.message);
      }
    };


    return(   
      <Container>
        <Header/>
      <Row>
          <Col md={5}>
            <Card style={{width:"100%",height:"100%",borderRadius:"10px"}} >
            <img src="images/image2.png" style={{height:"100%",width:"100%",borderRadius:"10px"}}/>
            </Card>
          </Col>
      <Col md={7}>

      <Card style={{width:"100%", borderRadius:"15px",backgroundColor:"lightblue"}}className="p-4 shadow-lg">
          <h2 style={{textAlign:"center"}}>Fill Job Details</h2>
      <Form  className="center" onSubmit={handleaddjob}>
      <Form.Group className="mb-3">
        <Form.Label className="fw-semibold">Profile Name</Form.Label>
        <Form.Select  onChange={handlechange} name="profilename" value={formData.profilename}>
      <option value=""> --Select profile--</option>
      <option value="Software Engineer"> Software Engineer</option>
      <option value="Delivery Partner">Delivery Partner</option>
      <option value="Teacher"> Teacher</option>
      <option value="Driver">Driver</option>
                  </Form.Select>


      </Form.Group>
      <Form.Group className="mb-3">
                      <Form.Label className="fw-semibold">Description</Form.Label>
                      <Form.Control
                        as="textarea" onChange={handlechange} name="description" value={formData.description}
                        placeholder="Enter your Description here"
                        style={{ borderRadius: "10px", padding: "10px" }}
                      />
                      </Form.Group>
                       <Form.Group className="mb-3">
                      <Form.Label className="fw-semibold">Company Name</Form.Label>
                      <Form.Control
                        as="textarea" onChange={handlechange} name="companyname" value={formData.companyname}
                        placeholder="Enter Company Name here"
                        style={{ borderRadius: "10px", padding: "10px" }}
                      />
                      </Form.Group>
      <Form.Group className="mb-3">
                      <Form.Label className="fw-semibold">Experience</Form.Label>
                      <Form.Control
                        type="text" onChange={handlechange} name="experience" value={formData.experience}
                        placeholder="Enter Your Experience"
                        style={{ borderRadius: "10px", padding: "10px" }}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label className="fw-semibold">Salary</Form.Label>
                      <Form.Control type="number" onChange={handlechange} name="salary" value={formData.salary} placeholder="Enter your salary" 
                      style={{borderRadius:"10px", padding: "10px"}}
                      />
                    </Form.Group>
                      
                    <Form.Group className="mb-3">
                      <Form.Label className="fw-semibold">Location</Form.Label>
                      <Form.Control type="text" placeholder="Enter your location" onChange={handlechange} 
                      name="location" value={formData.location} 
                      style={{borderRadius:"10px", padding: "10px"}}
                      />
                    </Form.Group>
                      
                    <Form.Group className="mb-3">
                      <Form.Label className="fw-semibold">Last Date</Form.Label>
                      <Form.Control type="date" onChange={handlechange} name="lastdate" value={formData.lastdate}  placeholder="Enter your last date" 
                      style={{borderRadius:"10px", padding: "10px"}}
                      />
                    </Form.Group>
                    <p style={{color:"green"}}>{message}</p>
                    <Button variant="success" type="submit">Save Job</Button>
      </Form> 
          
      </Card>
      </Col>

      </Row>
      <Footer/>
      </Container>



)
 }

export default Addjob;
