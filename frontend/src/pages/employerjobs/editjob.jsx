import React, { useState,useEffect } from "react";
import axios from "axios";
import { Container, Row, Col, Button, Form,Card } from "react-bootstrap";
 import "bootstrap/dist/css/bootstrap.min.css";
 import {BrowserRouter as Router,Routes,Route,Link} from "react-router-dom";
 import Header from "../../component/header";
 import Footer from "../../component/footer";
import { useParams, useNavigate } from "react-router-dom";

 const Editjob = () =>{
    const{id}=useParams();
    const navigate=useNavigate();
   const [formData,setformData]=useState({
          profilename:"",
          description:"",
          companyname:"",
          experience:"",
          salary:"",
          location:"",
          lastdate:"",
    })
    const [message,setMessage]=useState('');
    useEffect(() => {
    const fetchJob = async () => {
      
      try {
        const res = await axios.get(
          `http://localhost:8080/api/employer/getjob/${id}`
        );

        setformData(res.data.data);
      } catch (err) {
        console.log("Fetch Error:", err);
      }
    };

    fetchJob();
  }, [id]);
const handlechange = (e) => {
    setformData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleupdate=async(e)=>{
    e.preventDefault();
    try{
 const res = await axios.put(
          `http://localhost:8080/api/employer/update/${id}`,formData)
          alert("Data update successfully");
          navigate("/joblist")
    
  }catch(err){
    console.log("Error:",err.message);

    }
  }
    return(   
      <Container>
        <Header/>
      <Row>
          <Col md={5}>
            <Card style={{width:"100%",height:"100%",borderRadius:"10px"}} >
            <img src="../images/image2.png" style={{height:"100%",width:"100%",borderRadius:"10px"}}/>
            </Card>
          </Col>
      <Col md={7}>

      <Card style={{width:"100%", borderRadius:"15px",backgroundColor:"lightblue"}}className="p-4 shadow-lg">
          <h2 style={{textAlign:"center"}}>Update Job Detail</h2>
      <Form  className="center" onSubmit={handleupdate}>
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
                      <Form.Label className="fw-semibold">Company name</Form.Label>
                      <Form.Control
                        type="text" onChange={handlechange} name="companyname" value={formData.companyname}
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
                   
                    <Button variant="success" type="submit">Update Job</Button>
      </Form> 
          
      </Card>
      </Col>

      </Row>
      <Footer/>
      </Container>



)
 }





export default Editjob;
