import React from 'react'
import { useAuth } from '../contexts/AuthContext'
import Loginorsignup from './Loginorsignup';
import Title from './title'

export default function Contests() {
    const {currentUser} = useAuth();
    return (
            <div>
            <Title/>
            <br></br>
            <div className="row">
              <div className="col-lg-8 col-xs-6 col-md-8 col-sm-8">
                 {currentUser && <center><a href="#create-contest-div">Create contest now?</a></center>}
                 <center><h3>Contests</h3></center>
              </div>
              <div className="col-lg-4 col-xs-6 col-md-4 col-sm-4" id="create-contest-div">
              {currentUser ? <><center><h2>Create Contest</h2></center>
                 <ul className="createcontest">
                    <li className="w3-border-red w3-border" style={{boxShadow:"2px 2px red"}}>
                        <a href="/createcontest/1"><h3>Describe Picture Contest</h3></a>
                    </li>
                 </ul> </>:
             <> 
             <Loginorsignup/>
              </>
                }
              </div>
            </div>
      </div>
    )
}
