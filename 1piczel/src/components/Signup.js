import React, {useRef, useState} from 'react';
import {Form, Button, Card,Alert} from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './App.css';
export default function Signup() {
   const emailRef = useRef()
   const passwordRef = useRef()
   const passwordConfirmRef = useRef()
   const { signup, currentUser } = useAuth()
   const [error, setError] = useState('');
   const [loading, setLoading] = useState(false);
   const history= useHistory();
   async function handleSubmit(e) {
       e.preventDefault();
        if(passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError('Passwords do not matched')
        }
        /*if(nameRef.current.value.length >= 20) {
            return setError('Only 20 chars in name allowed');
        }*/
        try {
            setError("");
            setLoading(true);
            await signup(emailRef.current.value , passwordRef.current.value);
            
            /*if(currentUser)
            {
                userid = currentUser.uid;
            projectDatabase.ref("users/"+userid).set({
              Name:nameRef.current.value,
              Email:emailRef.current.value
            });
            }*/
            console.log("signup"+currentUser);
            history.push("/");
        } catch(error) {
            setError("Failed to create an account");
            alert(error)
        }
       setLoading(false)
   }
    return (
        <>
        <br></br>
        <br></br>
        <center>
            <Card style={{maxWidth:"400px"}}>
                <Card.Body>
                    <h2 className="text-center mb-4">Sign up</h2>
                   
    {error && <Alert variant="danger">{error}</Alert>}
                     <Form onSubmit={handleSubmit} >
                     
                        <Form.Group id="email">
                           <Form.Label>
                               Email
                           </Form.Label>
                           <Form.Control type="email" ref={emailRef} required>

                           </Form.Control>
                        </Form.Group>
                        <Form.Group id="password">
                           <Form.Label>
                               Password
                           </Form.Label>
                           <Form.Control type="password" ref={passwordRef} required>

                           </Form.Control>
                        </Form.Group>
                        <Form.Group id="password-confirm">
                           <Form.Label>
                            Password confirmation
                           </Form.Label>
                           <Form.Control type="password" ref={passwordConfirmRef} required>

                           </Form.Control>
                        </Form.Group>
                        <Button className="w-100" type="submit" disabled={loading}>
                            Sign up
                        </Button>
                     </Form>
                </Card.Body>
                <div className="w-100 text-center mt-2">
             Already have an account? <Link to="/login">Log in</Link>
            </div>
            </Card>
            </center>
        </>
    )
}
