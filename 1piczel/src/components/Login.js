import React, {useRef, useState} from 'react'
import {Form, Button, Card, Alert} from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function Login() {
   const emailRef = useRef()
   const passwordRef = useRef()
   const { login } = useAuth()
   const [error, setError] = useState('');
   const [loading, setLoading] = useState(false);
   const history=useHistory();
   
   async function handleSubmit(e) {
       e.preventDefault();
        
        try {
            setError("");
            setLoading(true);
            await login(emailRef.current.value , passwordRef.current.value);
            history.push("/");
        } catch(error) {
            setError("Failed to sign in");
            alert(error)
        }
       setLoading(false)
   }
    return (
        <>
        <center>
        <br></br>
        <br></br>
            <Card style={{maxWidth:"400px"}}>
                <Card.Body>
                    <h2 className="text-center mb-4">Log in</h2>
     
    {error && <Alert variant="danger">{error}</Alert>}
                     <Form onSubmit={handleSubmit}>
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
                       
                        <Button className="w-100" type="submit" disabled={loading}>
                            Log in
                        </Button>
                     </Form>
                     
            <div className="w-100 text-center mt-2">
             <Link to="/forgot-password">Forgot Password</Link>
            </div>
                </Card.Body>
                <div className="w-100 text-center mt-2">
             Don't have an account? <Link to="/signup">Sign up</Link>
            </div>
            </Card>
            </center>
        </>
    )
}