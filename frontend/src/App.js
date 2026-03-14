import React, { Profiler } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Addjob from "./pages/employerjobs/addjob";
import Joblist from "./pages/employerjobs/joblist";
import Editjob from "./pages/employerjobs/editjob";
import Employerdashboard from "./pages/employerjobs/employerdashboard";
import Userjoblist from "./pages/userjobs/userjoblist";
import Signup from "./pages/signup";
import Login from "./pages/login";
import Appliedjobs from "./pages/userjobs/appliedjobs";
import Userapplied from "./pages/employerjobs/userapplied";
import Userdashboard from "./pages/userjobs/userdashboard";
import Profile from "./pages/profile";
import Applynow from "./pages/userjobs/applynow";
import ApplyUserjobs from "./pages/userjobs/applyUserjobs";
import Employerviewapplynow from "./pages/employerjobs/employerviewapplynow";
import Viewapplied from"./pages/employerjobs/viewapplied";
import Userviewapplication from"./pages/userjobs/viewapplication";
function App(){
  return(
    <Router>
      <Routes>
        <Route path="/" element={<Employerdashboard/>}/>
        <Route path="/userdashboard" element={<Userdashboard/>}/>
        <Route path="/addjob" element={<Addjob/>}/>
        <Route path="joblist" element={<Joblist/>} />     
        <Route path="editjob/:id" element={<Editjob/>} />    
            <Route path="/userjoblist" element={<Userjoblist/>} />
          <Route path="/signup" element={<Signup/>} />
           <Route path="/login" element={<Login/>} />
             <Route path="/appliedjobs" element={<Appliedjobs/>} />
              <Route path="/userapplied/:id" element={<Userapplied/>} />
               <Route path="/profile" element={<Profile/>} />
                  <Route path="/applynow/:id" element={<Applynow/>} />
                      <Route path="/applyuserjobs" element={<ApplyUserjobs/>} />
                          <Route path="/employerviewapplynow" element={<Employerviewapplynow/>} />
                           <Route path="/viewapplied/:id" element={<Viewapplied/>} />
                           <Route path="/viewapplication/" element={<Userviewapplication/>} />
          </Routes>
    </Router>
  )
}
export default App;
