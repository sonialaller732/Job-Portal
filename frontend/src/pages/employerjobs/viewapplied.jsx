import React, {useState,useEffect} from "react";
import { Container, Row, Col, Button, Form,Card } from "react-bootstrap";
 import "bootstrap/dist/css/bootstrap.min.css";
 import {BrowserRouter as Router,Routes,Route,Link, useParams} from "react-router-dom";
 import axios from 'axios';
 import Swal from "sweetalert2";
  const Viewprofile=()=>{
 const{id}=useParams();
 const [Applydata, setData] = useState(null);
  const [loginType, setloginType] = useState("");

    
        const fetchapplynowbyid = async()=>{
            try{
                const applynowdata =await axios.get(`http://localhost:8080/api/user/applynowbyid/${id}`);
                setData(applynowdata.data.data);
                const type = localStorage.getItem("type");
 setloginType(type); 
                  
                 }catch(err){
                console.log('error_message',err.message)
            }
        };
        useEffect(()=>{
        fetchapplynowbyid();
        },[]);
        

        
const handleStatusChange = (e) => {
  const status = e.target.value;

  if (!status) return;

  Swal.fire({
    title: "Are you sure?",
    text: `Do you want to change status to "${status}"?`,
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes, Update",
    cancelButtonText: "Cancel",
  }).then(async (result) => {
    if (result.isConfirmed) {
       try {
          await axios.put(
            `http://localhost:8080/api/employer/updatestatus/${id}`,
            { status: status }
          );
         Swal.fire("Updated!", "Status updated successfully.", "success");
          fetchapplynowbyid();
      } catch (error) {
        Swal.fire("Error!", "Status update failed", "error");
      }
    };
   
  });
};


  return(
         <Container>
           <Col md={8}>
        <Card>
         
     <div ClassName="d-flex justifyContent-center ,alignItems, min-vh-100">
        {Applydata ? (
       <table style={{width:"100%"}}>
  <tr style={trstyle}>
    <th style={thStyle}>Name</th>
    <td>{Applydata.userId?.name}</td>
  </tr>
  <tr style={trstyle}>
    <th style={thStyle}>Email</th>
    <td>{Applydata.userId?.email}</td>
  </tr>
    <tr style={trstyle}>
    <th style={thStyle}>Skills</th>
    <td>{Applydata.skills}</td>
  </tr>
    <tr style={trstyle}>
    <th style={thStyle}>Mobile no</th>
    <td>{Applydata.userId?.mobileno}</td>
  </tr>
    <tr style={trstyle}>
    <th style={thStyle}>Experience</th>
    <td>{Applydata.experience}</td>
  </tr>
    <tr style={trstyle}>
    <th style={thStyle}>Location</th>
    <td>{Applydata.location}</td>
  </tr>
    <tr style={trstyle}>
    <th>Current CTC</th>
    <td>{Applydata.currentctc}</td>
  </tr>
    <tr style={trstyle}>
    <th>Expected CTC</th>
    <td>{Applydata.expectedctc}</td>
  </tr>
  <tr style={trstyle}>
    <th></th>
    <td><a href={`http://localhost:8080${Applydata.resumefile}`} target="_blank">View Resume</a></td>
  </tr>
  {loginType === "Employer" &&
    <tr style={trstyle}>
    <th>Status</th>
    <td>
 <Form  className="center">
        <Form.Group className="mb-3">
          <Form.Select  onChange={handleStatusChange} name="status"  value={Applydata?.status || ""}>
        <option value=""> --Select Status--</option>
        <option value="rejected">Rejected</option>
        <option value="shortlisted">Short listed</option>
         <option value="selected">Selected</option>
                    </Form.Select>
  </Form.Group>
</Form>
    </td>
  </tr>
  }
  
</table> 
        ):(
            <p>No data</p>
        )} 
     
     
 
       
     </div>
    
        </Card>
 </Col>
         </Container>
     )
  }
  const thStyle = {
  width: "150px"
};
const trstyle={
padding:"20px",
height:"60px"

}
 
  export default Viewprofile;