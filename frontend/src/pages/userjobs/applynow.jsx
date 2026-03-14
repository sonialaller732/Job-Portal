import React, { useState } from "react";
import axios from "axios";
import { Container, Row, Col, Button, Form,Card } from "react-bootstrap";
 import "bootstrap/dist/css/bootstrap.min.css";
 import {BrowserRouter as Router,Routes,Route,Link,useParams} from "react-router-dom";


 import Footer from "../../component/footer";

 const Applynow = () =>{
  const {id} = useParams();
  const [resume, setResume] = useState(null);

  const [formData,setformData]=useState({
     experience:"",
     skills:"",
     location:"",
     currentctc:"",
     expectedctc:"",
     //resumefile:""
       
  })
  const handleFileChange = (e) => {
  setResume(e.target.files[0]);
};
  const [message,setMessage]=useState('');
    const handlechange=(e)=>{
      setformData({
        ...formData,
        [e.target.name]:e.target.value
      });
    };

   const handleapplyjob= async(e)=>{
      e.preventDefault();
       const fd = new FormData();

  // ✅ append all text fields automatically
  Object.entries({
    ...formData,
  }).forEach(([key, value]) => {
    fd.append(key, value);
  });

  // ✅ append file only once
  fd.append("resumefile", resume);
    fd.append("jobId", id);
  
      try{
        const res= await axios.post("http://localhost:8080/api/user/saveapplynow",fd,
                    {
                      headers: {
                        "Content-Type": "multipart/form-data",
                authorization: `Bearer ${localStorage.getItem("token")}`,
                }
              })
        setMessage(res.data.message)
        setformData({ experience:"",
     skills:"",
     location:"",
     currentctc:"",
     expectedctc:"",
     resumefile:""
      })
        
        
      }catch(err){
      console.log(err.message);
      }
    };


    return(   
      <Container>
        
      <Row>
          
          
      <Col md={12}>

      <Card style={{width:"100%", borderRadius:"15px",backgroundColor:"lightblue"}}className="p-4 shadow-lg">
          <h2 style={{textAlign:"center"}}>Application Form </h2>
      <Form  className="center" onSubmit={handleapplyjob}>
     
      
   
  <Form.Group className="mb-3">
                      <Form.Label className="fw-semibold">Experience</Form.Label>
                      <Form.Control
                        type="text" onChange={handlechange} name="experience" value={formData.experience}
                        placeholder="Enter your Experience here"
                        style={{ borderRadius: "10px", padding: "10px" }}
                      />
      </Form.Group>
      <Form.Group className="mb-3">
                      <Form.Label className="fw-semibold">Skills</Form.Label>
                      <Form.Control
                        type="text" onChange={handlechange} name="skills" value={formData.skills}
                        placeholder="Enter your Skills here"
                        style={{ borderRadius: "10px", padding: "10px" }}
                      />
                        </Form.Group>
                        <Form.Group className="mb-3">
                      <Form.Label className="fw-semibold">Location</Form.Label>
                      <Form.Control
                        type="text" onChange={handlechange} name="location" value={formData.location}
                        placeholder="Enter your location here"
                        style={{ borderRadius: "10px", padding: "10px" }}
                      />
                      </Form.Group>
      <Form.Group className="mb-3">
                      <Form.Label className="fw-semibold">Current CTC</Form.Label>
                      <Form.Control
                        type="text" onChange={handlechange} name="currentctc" value={formData.currentctc}
                        placeholder="Enter Your current CTC"
                        style={{ borderRadius: "10px", padding: "10px" }}
                      />
                    </Form.Group>
                      <Form.Group className="mb-3">
                      <Form.Label className="fw-semibold">Expecteed CTC</Form.Label>
                      <Form.Control
                        type="text" onChange={handlechange} name="expectedctc" value={formData.expectedctc}
                        placeholder="Enter Your expected CTC"
                        style={{ borderRadius: "10px", padding: "10px" }}
                      />
                    </Form.Group>
                           <Form.Group className="mb-3">
                      <Form.Label className="fw-semibold">Resume File</Form.Label>
                      <Form.Control
                        type="file" onChange={handleFileChange} name="resumefile"
                        placeholder="Upload Your resume "
                        style={{ borderRadius: "10px", padding: "10px" }}
                      />
                    </Form.Group>
                   <p style={{color:"green"}}>{message}</p>
                  
                    <Button variant="success" type="submit">Submit</Button>
      </Form> 
          
      </Card>
      </Col>

      </Row>
      <Footer/>
      </Container>



)
 }

export default Applynow;
