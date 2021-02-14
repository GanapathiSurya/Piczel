import React, {useRef, useState} from 'react'
import {Form, Button, Card, Alert} from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { projectDatabase } from '../firebase';
import Title from './title';
export default function UpdateProfile() {
    const nameRef = useRef();
    const emailRef = useRef();
   const passwordRef = useRef();
   const passwordConfirmRef = useRef();
   const { currentUser, updatePassword, updateEmail } = useAuth()
   const [error, setError] = useState('');
   const [loading, setLoading] = useState(false);
   
   const history= useHistory();
   let userid="";
   function handleSubmit(e) {
       e.preventDefault();
        if(passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError('Passwords do not matched')
        }
        const promises = []
        setLoading(true)
        setError("")
        if(emailRef.current.value !== currentUser.email)
        {
            promises.push(updateEmail(emailRef.current.value))
        }
        if(passwordRef.current.value)
        {
            promises.push(updatePassword(passwordRef.current.value))
        }
        userid = currentUser.uid;
        projectDatabase.ref("users/"+userid).set({
          Name:nameRef.current.value,
          Email:emailRef.current.value,
        });
        Promise.all(promises).then(() => {
            history.push("/")
        }).catch((error) => {
            setError("Faled to update an account");
             alert(error);
        })
        .finally(() => {
            setLoading(false)
        })
   }
    return (
        <>
        <Title/>
        <br></br>
        <center>
            <div style={{maxWidth:"400px"}}>
            <Card style={{maxWidth:"400px"}}>
                <Card.Body>
                <font size="5"><b className="heading">Update Profile</b></font>
     
    {error && <Alert variant="danger">{error}</Alert>}
                     <Form onSubmit={handleSubmit}>
                     <Form.Group id="name">
                           <Form.Label>
                               Name
                           </Form.Label>
                           <Form.Control type="text" ref={nameRef} required>
                           </Form.Control>
                        </Form.Group>
                        <Form.Group id="email">
                           <Form.Label>
                               Email
                           </Form.Label>
                           <Form.Control type="email" ref={emailRef} required defaultValue={currentUser && currentUser.email}>

                           </Form.Control>
                        </Form.Group>
                        <Form.Group id="password">
                           <Form.Label>
                               Password
                           </Form.Label>
                           <Form.Control type="password" ref={passwordRef} placeholder="Leave blank to keep the same">

                           </Form.Control>
                        </Form.Group>
                        <Form.Group id="password-confirm">
                           <Form.Label>
                            Password confirmation
                           </Form.Label>
                           <Form.Control type="password" ref={passwordConfirmRef}  placeholder="Leave blank to keep the same">

                           </Form.Control>
                        </Form.Group>
                        <Button className="w-100" type="submit" disabled={loading}>
                            Update Profile
                        </Button>
                     </Form>
                </Card.Body>
                
            <div className="w-100 text-center mt-2">
              <Link to="/">Cancel</Link>
            </div>
            </Card>
            </div>
            </center>
        </>
    )
}
