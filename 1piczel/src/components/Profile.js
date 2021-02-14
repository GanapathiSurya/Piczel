import React, { useEffect, useState } from 'react'
import { Alert, Button, Card } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext'
import { projectDatabase } from '../firebase';
import Title from './title';
export default function Profile() {
    const [error, setError ] = useState("")
    const [profilename, setProfileName ] = useState("loading..")
    const [profileemail, setProfileEmail ] = useState("loading..")
    const {currentUser, logout} = useAuth();
    const history= useHistory();
    useEffect(() => {
        projectDatabase.ref("users/"+currentUser.uid).on('value', function(snapshot){
            if(snapshot.exists())
            {
                setProfileName(snapshot.val().Name)
                setProfileEmail(snapshot.val().Email)
            }
        })
        return () => {
           //
        }
    })
    async function handleLogout() {
      setError("")
      try {
           await logout()
           history.push('/login')
      }
      catch{
         setError("failed to logout")
      }
    }
    return (
        <>
        <Title></Title>
        <br></br>
        <center>
        <div style={{maxWidth:"400px", padding:"15px"}}>
            <Card>
                <Card.Body>
            {error && <Alert variant="danger">{error}</Alert>}
            <font size="5"><b className="heading">My Profile</b></font>
            <h4>{currentUser && currentUser.email}</h4>
            <ul class="list-group list-group-flush w3-ul">
              <li class="list-group-item">{profilename}</li>
              <li class="list-group-item">{profileemail}</li>
            </ul> 
           <Link to="/update-profile" className="btn btn-primary w-100 mt-3">Update profile</Link>         

            <div className="w-100 text-center mt-2">
             <Button variant="link" onClick={() => handleLogout()}>Log out</Button>
            </div>
            </Card.Body>
            </Card>
        </div>
        </center>
        </>
    )
}

