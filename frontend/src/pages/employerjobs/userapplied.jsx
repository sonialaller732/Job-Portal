import React,{useState,useEffect} from "react";
import axios from "axios";
import { Container, Row, Col, Button, Form,Card } from "react-bootstrap";
 import "bootstrap/dist/css/bootstrap.min.css";
 import {BrowserRouter as Router,Routes,Route,Link} from "react-router-dom";
import Header from "../../component/header";
import Footer from "../../component/footer";
import { useParams,} from "react-router-dom";
const Userapplied=()=>{
    const{id}=useParams();
    const [appliedUsers,setappliedUsers]=useState([]);
    const fetchAppliedUsers= async()=>{
          try {
        const res = await axios.get(
          `http://localhost:8080/api/employer/getAppliedUser/${id}`
        );
        setappliedUsers(res.data.users||[]);
      } catch (err) {
        console.log("Fetch Error:", err);
      }
    };
    useEffect(()=>{

    fetchAppliedUsers();
  }, [id]);
    return(
        <Container>
        <Header/>
<div>

    <table className="table">
  <thead>
    <tr>
      <th>Email</th>
    </tr>
  </thead>

  <tbody>
    {appliedUsers?.map((u) => (
      <tr key={u._id}>
        <td>{u.email}</td>
      </tr>
    ))}
  </tbody>
</table>

</div>

        <Footer/>
        </Container>
    )
}
export default Userapplied;