import React from 'react'; 
import {  Row, Col} from "react-bootstrap";

const Footer=() =>{
    return(
        <Row>
            <Col md={12} >
            <div  style={{height:"150px",width:"100%",backgroundColor:"orange", marginTop:"20px"}}>
        <footer>
            <ul>
                <li><a href="#"> Contact US </a></li>
                   <li><a href="#">About US </a></li>
                      <li><a href="#">Privacy Policy </a></li>
                </ul>
            <p style={{ textAlign:"center"}}>COPY RIGHT@ 2025</p>
            </footer>
        </div>
        </Col>
        </Row>
    )
}
export default Footer;