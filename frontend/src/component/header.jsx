
 import {BrowserRouter as Router,Routes,Route,Link, useNavigate} from "react-router-dom";
import React, {useState,useEffect} from 'react';
 
import axios from "axios";
import { Container, Row, Col, Button, Form ,Card} from "react-bootstrap";


const Header=() =>{
  const [userType, setUserType] = useState("");
  const [loginType, setloginType] = useState("");
   const [session, setSession] = useState({
    loggedIn: false,
    type: null
  });
  const navigate = useNavigate();

useEffect(() => {
    const type = localStorage.getItem("type");
    if (!type) {
      navigate("/login");
    } else {
      setloginType(type);
    }
  }, []);

  const getSession = async () => {
    const res = await axios.get("http://localhost:8080/api/user/session");

    if (res.data.loggedIn) {
      setUserType(res.data.type);
      setSession(res.data);
    }
  };

  useEffect(() => {
    getSession();
  }, []);
const handleLogout = async () => {
    localStorage.removeItem("token");   // remove JWT token
  localStorage.removeItem("type");    // remove role
   localStorage.removeItem("userId");
  window.location.href = "/login";
  };

    return(

<Row>
    <Col sm={12} className="mt-3">
        <Row>
            <div style={{width:"100%", height:"200px", marginBottom:"5px" }}>
                      <img src="../images/image.png" alt="" style={{height:"200px", width:"100%"}}/>
            </div>
        </Row>
   
          <div className="menu text-center">
            <ul className="list-inline">
            
              {loginType === "Employer" &&
              <>
              <li className="list-inline-item">
                <Link to="/">
                <Button variant="info">DashBoard</Button>
                </Link>
              </li>
              <li className="list-inline-item">
                  <Link to="/addjob">
                    <Button variant="info">Add Job</Button>
                  </Link>
                </li>
                <li className="list-inline-item">
                    <Link to="/joblist">
                      <Button variant="info">Job List</Button>
                    </Link>

                  </li>
                  <li className="list-inline-item">
                    <Link to="/employerviewapplynow">
                      <Button variant="info">View Applications</Button>
                    </Link>

                  </li>
                   
                  </>
                }
              {loginType === "User" &&
              <>
               <li className="list-inline-item">
                <Link to="/userdashboard">
                <Button variant="info"> User DashBoard</Button>
                </Link>
              </li>
                <li className="list-inline-item">
                <Link to="/userjoblist">
                <Button variant="info">Jobs</Button>
                </Link>
              </li>
              
               <li className="list-inline-item">
                    <Link to="/viewapplication">
                      <Button variant="info">View Applications</Button>
                    </Link>

                  </li>
              </>
              }
            
              {loginType &&(
             <li className="list-inline-item">
                <Link>
                <Button onClick={handleLogout} variant="info">Logout</Button>
                </Link>
              </li>
              )}
            
            </ul>
          </div>
        </Col>

        </Row>)
}
       export default Header;