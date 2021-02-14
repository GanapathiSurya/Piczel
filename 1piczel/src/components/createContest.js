import React, { useRef, useState } from 'react'
import { useAuth } from '../contexts/AuthContext';
import Loginorsignup from './Loginorsignup';
import Title from './title'
import {Form, Button, Card,Alert} from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import { projectfirestore, projectStorage } from '../firebase';
export default function CreateContest(props) {
    const {currentUser} = useAuth();
    const [error,setError] = useState("");
    //const [eventtitle,seteventtitle] = useState("");
    //const [startdateandtime,setstartdateandtime] = useState(null);
    //const [enddateandtime,setenddateandtime] = useState(null);
    //const [contactno,setcontactno] = useState("");
    //const [] = useState("");
    const [loading,setLoading] = useState(false);
    let x = document.getElementById("eventimage");
    var contestid = parseInt(props.match.params.id);
    const types = ['image/png','image/jpeg'];
    const history = useHistory();
    async function handleSubmit() {
        alert(document.getElementById("eventtitle").value)
        let eventtitle=document.getElementById("eventtitle").value;
        let startdateandtime = document.getElementById("startdateandtime").value;
        let enddateandtime = startdateandtime.setMinutes(startdateandtime.getMinutes()+30);
        let contactno = document.getElementById(contactno).value;
         try {
            console.log(x.files[0]);
            let file = x.files[0];
             setError("");
             setLoading(true);
             let userid = currentUser.uid;
             const storageRef= projectStorage.ref().child("/events/"+userid);
             alert("firestore");
             const collectionRef = projectfirestore.collection("events").doc(userid);
             storageRef.put(file).then(function(snapshot)
             {
            alert("firebase");
            const url = storageRef.getDownloadURL();
            alert(url);
            collectionRef.set({eventtitle,startdateandtime,enddateandtime,contactno});
             })
             history.push("/contests");
         } 
         catch(error) {
             setError("Failed to create an event");
             alert(error)
         }
        setLoading(false)
    }
    return (
        <div>
             <Title></Title>
            <br></br>
            <div className="row">
              <div className="col-lg-4 col-xs-6 col-md-4 col-sm-4">
              {currentUser ? <>
              
                  <h5>
                      {contestid === 1 ?
                      <>
                      <center><h3>Instructions</h3></center><br></br>
                      <ul className="instructions">
                         <li>You can give the picture of your choice.</li>
                         <li>Participants who describe picture the best, will be the winner.</li>
                      </ul> 
                      </>:
                        <>
                        <div></div>
                        </>
                      }
                      
                  </h5></>:
                  <>
                    <Loginorsignup/>
                  </>
                   }
              </div>
              <div className="col-lg-8 col-xs-6 col-md-8 col-sm-8">
                {currentUser ?
                <>
                  {contestid === 1 ?
                  <>
                  <center>
                  <Card style={{maxWidth:"400px"}}>
                <Card.Body>
                    <h2 className="text-center mb-4">Create event</h2>
                    <h4>Duration:30 Minutes</h4>
                   {error && <Alert variant="danger">{error}</Alert>}
                     <Form onSubmit={handleSubmit} >
                      
                        <Form.Group>
                           <Form.Label>
                               Title
                           </Form.Label>
                           <input type="text" id="eventtitle" required>

                           </input>
                        </Form.Group>
                        <Form.Group >
                           <Form.Label>
                               Start date and Start time
                           </Form.Label>
                           <Form.Control type="datetime-local" id="startdateandtime" required>

                           </Form.Control>
                        </Form.Group>
                        <Form.Group >
                           <Form.Label>
                              Your Contact no
                           </Form.Label>
                           <Form.Control type="number" id="contactno" required>

                           </Form.Control>
                        </Form.Group>
                        <Form.Group>
                        <Form.Label>
                             <b>Choose Image</b>
                           </Form.Label>
                                <input type="file" id="eventimage" onchange="myFunction()" required></input>
                           </Form.Group>
                        <Button className="w-100" type="submit" disabled={loading}>
                            Finish
                        </Button>
                     </Form>
                </Card.Body>
            </Card>
            </center>
                  </>
                  :
                  <>
                  </>}
                </> :
                <>

                </>}
              </div>
            </div>
        </div>
    )
}
