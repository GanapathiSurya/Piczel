import React, {useRef, useState} from 'react'
import {Form, Button, Card, Alert} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function ForgotPassword() {
   const emailRef = useRef()
   const { resetPassword } = useAuth()
   const [error, setError] = useState('');
   const [loading, setLoading] = useState(false);
   const [message, setMessage] = useState('');
   
   async function handleSubmit(e) {
       e.preventDefault();
        
        try {
            setMessage('')
            setError("");
            setLoading(true);
            await resetPassword(emailRef.current.value);
            setMessage("Check your inbox for further instructions")
        } catch(error) {
            setError("Failed to reset password");
            alert(error)
        }
       setLoading(false)
   }
    return (
        <>
        <br></br>
        <br></br>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Reset Password</h2>
     
    {error && <Alert variant="danger">{error}</Alert>}  
    {message && <Alert variant="success">{message}</Alert>}
                     <Form onSubmit={handleSubmit}>
                        <Form.Group id="email">
                           <Form.Label>
                               Email
                           </Form.Label>
                           <Form.Control type="email" ref={emailRef} required>

                           </Form.Control>
                        </Form.Group>
                        
                       
                        <Button className="w-100" type="submit" disabled={loading}>
                            Reset password
                        </Button>
                     </Form>
                     
            <div className="w-100 text-center mt-2">
             <Link to="/login">Login</Link>
            </div>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
             Don't have an account? <Link to="/signup">Sign up</Link>
            </div>
        </>
    )
}
