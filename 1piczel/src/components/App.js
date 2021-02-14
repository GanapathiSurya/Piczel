import React from 'react';
import Switch from 'react-bootstrap/esm/Switch';
import { BrowserRouter, Route } from 'react-router-dom';
import { AuthProvider, useAuth } from '../contexts/AuthContext';
import Signup from './Signup';
import Login from './Login';
import FirstPage from './FirstPage';
import UpdateProfile from './UpdateProfile';
import ForgotPassword from './ForgotPassword';
import PrivateRoute from './PrivateRoute';
import Profile from './Profile';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import PrivateRoute2 from './PrivateRoute2';
import AccountPage from './AccountPage';
import Contests from './Contests';
import CreateContest from './createContest';
export default function App() 
{
    return (
        <div class="w-100">
        <BrowserRouter>
        <AuthProvider> 
                <Switch className="pl-0">
                  <PrivateRoute exact path="/" component={FirstPage}></PrivateRoute>
                  <PrivateRoute2 path="/signup" component={Signup}></PrivateRoute2>
                  <PrivateRoute2 path="/login" component={Login}></PrivateRoute2>
                  <PrivateRoute path="/update-profile" component={UpdateProfile}></PrivateRoute>
                  <PrivateRoute path="/forgot-password" component={ForgotPassword}></PrivateRoute>
                  <PrivateRoute path="/profile" component={Profile}></PrivateRoute>
                  <Route path="/account/:id" component={AccountPage}></Route>
                  <Route path="/contests" component={Contests}></Route>
                  
                </Switch>
                
            </AuthProvider>
            </BrowserRouter>
            </div>
    );
}
