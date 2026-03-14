import React, { useState } from "react";
import axios from "axios";
import { Container, Row, Col, Button, Form,Card } from "react-bootstrap";
 import "bootstrap/dist/css/bootstrap.min.css";
 import {BrowserRouter as Router,Routes,Route,Link} from "react-router-dom";

 import Footer from "../component/footer";

 const Signup = () =>{
  const [formData,setformData]=useState({
        type:"",
        name:"",
        email:"",
        mobileno:"",
        password:"",
       
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
        const res= await axios.post("http://localhost:8080/api/user/signup",formData)
                    
        setMessage(res.data.message)
        setformData({type:"",
          name:"",
            email:"",
            mobileno:"",
            password:""
      })
        
        
      }catch(err){
      console.log(err.message);
      }
    };


    return(   
      <Container>
        
      <Row>
          <Col md={5}>
            <Card style={{width:"100%",height:"100%",borderRadius:"10px"}} >
            <img src="images/image2.png" style={{height:"100%",width:"100%",borderRadius:"10px"}}/>
            </Card>
          </Col>
      <Col md={7}>

      <Card style={{width:"100%", borderRadius:"15px",backgroundColor:"lightblue"}}className="p-4 shadow-lg">
          <h2 style={{textAlign:"center"}}>Sign UP </h2>
      <Form  className="center" onSubmit={handleaddjob}>
      <Form.Group className="mb-3">
        <Form.Label className="fw-semibold"> Type</Form.Label>
        <Form.Select  onChange={handlechange} name="type" value={formData.type}>
      <option value=""> --Select Type--</option>
      <option value="Employer">Employer</option>
      <option value="User">User</option>
      
                  </Form.Select>
</Form.Group>
  <Form.Group className="mb-3">
                      <Form.Label className="fw-semibold">Name</Form.Label>
                      <Form.Control
                        type="text" onChange={handlechange} name="name" value={formData.name}
                        placeholder="Enter your Name here"
                        style={{ borderRadius: "10px", padding: "10px" }}
                      />
      </Form.Group>
      <Form.Group className="mb-3">
                      <Form.Label className="fw-semibold">Email</Form.Label>
                      <Form.Control
                        type="email" onChange={handlechange} name="email" value={formData.email}
                        placeholder="Enter your Email here"
                        style={{ borderRadius: "10px", padding: "10px" }}
                      />
                        </Form.Group>
                        <Form.Group className="mb-3">
                      <Form.Label className="fw-semibold">Mobile No</Form.Label>
                      <Form.Control
                        type="number" onChange={handlechange} name="mobileno" value={formData.mobileno}
                        placeholder="Enter your mobile number here"
                        style={{ borderRadius: "10px", padding: "10px" }}
                      />
                      </Form.Group>
      <Form.Group className="mb-3">
                      <Form.Label className="fw-semibold">Password</Form.Label>
                      <Form.Control
                        type="password" onChange={handlechange} name="password" value={formData.password}
                        placeholder="Enter Your Password"
                        style={{ borderRadius: "10px", padding: "10px" }}
                      />
                    </Form.Group>
                   <p style={{color:"green"}}>{message}</p>
                    <a href ="/login">Login</a><br></br><br></br>
                    <Button variant="success" type="submit">Submit</Button>
      </Form> 
          
      </Card>
      </Col>

      </Row>
      <Footer/>
      </Container>



)
 }

export default Signup;
