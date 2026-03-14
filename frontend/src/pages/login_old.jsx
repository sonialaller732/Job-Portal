import React,{useState} from 'react'; 
import axios from 'axios';

import { Container, Row, Col, Button, Form ,Card} from "react-bootstrap";
 import "bootstrap/dist/css/bootstrap.min.css";
  
  import Header from "../component/header";
import { useNavigate } from "react-router-dom";


  const Login = ()  =>{
  const [formData,setformdata]=useState({
    email:"",
    password:"",
  });
  const navigate = useNavigate();
  const [message,setMessage]=useState('');

    const handlechange=(e)=>{
      setformdata({
        ...formData,
        [e.target.name]:e.target.value
      });
    };
  
  const handlelogin= async(e)=>{
      e.preventDefault();
      try{
        const res= await axios.post("http://localhost:8080/api/user/login",formData)
        		console.log(res);	
        setMessage(res.data.message)
        //setformdata({email:"",password:""})
        
        navigate('/')
      }catch(err){
      console.log(err.message);
      }
    };
return(   
<Container>
  <Header/>
<Row>
<Col>
<Card style={{width:"350px", borderRadius:"15px",background:"linear-gradient(180deg, orange,lightblue)",color:"white"}}className="p-4 shadow-lg">
<Form  onSubmit={handlelogin} className="center">
<Form.Group className="mb-3">
                <Form.Label className="fw-semibold">Email</Form.Label>
                <Form.Control
                  type="email" onChange={handlechange} name="email" value={formData.email}
                  placeholder="Enter your email"
                  style={{ borderRadius: "10px", padding: "10px" }}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label className="fw-semibold">Password</Form.Label>
                <Form.Control type="password" placeholder="Enter your password" onChange={handlechange} 
                name="password" value={formData.password}
                style={{borderRadius:"10px", padding: "10px"}}
                />
              </Form.Group>
               <p style={{color:"white"}}>{message}</p>
               <a href="/signup">Signup</a><br></br><br></br>
              <Button variant="primary" type="submit">LOGIN</Button>
</Form> 
    
</Card>
</Col>
</Row>

</Container>

)
 }

 export default Login;

