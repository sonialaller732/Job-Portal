import React, {useState,useEffect} from "react";
import { Container, Row, Col, Button, Form,Card } from "react-bootstrap";
 import "bootstrap/dist/css/bootstrap.min.css";
 import {BrowserRouter as Router,Routes,Route,Link} from "react-router-dom";
 import axios from 'axios';
 


const Profile=()=>{
    const [profile, setprofile]=useState([]);
    const[file,setFile]=useState(null)
    

  const fetchData = async()=>{
        try{
            const profiledata =await axios.get('http://localhost:8080/api/user/getProfile',
                {
                headers: {
                authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            }   
            );
            console.log(profiledata.data.data[0]);
            setprofile(profiledata.data.data);
        }catch(err){
            console.log('error_message',err.message)
        }
    };
    useEffect(()=>{
    fetchData();
    },[]);

    const handleSelect = (e) => setFile(e.target.files[0]);

  const handleUpload = async () => {
    const userId = localStorage.getItem("userId")
    const formData = new FormData();
    formData.append("myfile", file);
    formData.append("userId", userId);

    const res = await axios.post("http://localhost:8080/api/user/upload", formData, {
      headers: { "Content-Type": "multipart/form-data" }
    });
    fetchData();

  };
    
    return(
        <Container>
       <Card>
    <div>
        
      <h2>
      <img
  src={`http://localhost:8080${profile.fileurl}`}
  alt="Uploaded"
  width="60"
  height="60"
/>
 User Profile</h2>

      <input type="file" name="files" onChange={handleSelect} />
      <button onClick={handleUpload}>Upload</button>

      <p><strong>Name:</strong> {profile.name}</p>
      <p><strong>Email:</strong> {profile.email}</p>
      <p><strong>Mobile no:</strong> {profile.mobileno || "Not Provided"}</p>
      <p><strong>Location:</strong> {profile.location || "Not Provided"}</p>

      <button>Edit Profile</button>
    </div>
       </Card>

        </Container>
    )
 }
 export default Profile;