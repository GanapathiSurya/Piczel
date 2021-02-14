import 'react-bootstrap';
import React from 'react'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';  
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
export default function Title() {
    const {currentUser} = useAuth();
    return (
        <>
        <div className="w3-bar title" style={{width:"100%"}}>
        <div className="w3-bar-item">
              <a href="/" className=" titlename text-decoration-none">
              
                <font size="6">Piczel</font></a>
        </div>
        
            
        <div className="w3-bar-item w3-right pb-0">
            {currentUser ? <table className="table table-borderless">
                <tr>
    <td> <Link className="titlename" to="/profile" >{currentUser && currentUser.email}</Link>
    <br></br>
    </td>
                
                </tr>
            </table>   : <table><tr><td><Link to="/signup"><button class="medium-button">Signup</button></Link></td><td><Link to="/login"><button class="medium-button">Login</button></Link></td></tr></table>}            
        </div>
        </div>
        <div className="w3-bar w3-border-bottom navigation">
          
            <Link to="/">
            <div class="w3-bar-item">
            Home</div></Link>
          
         
        </div>
        </>
    )
}
