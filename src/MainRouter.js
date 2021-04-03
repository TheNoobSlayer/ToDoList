import React from 'react';
import {Route,Switch} from 'react-router-dom';
import Menu from './core/Menu';
import MenuBar from './core/MenuBar';
import Signup from './user/SignUp';
import Signin from './auth/Signin';
import Footer from './core/Footer';
import Home from './core/Home';
import Dashboard from './core/Dashboard'
import PrivateRoute from './auth/PrivateRoute'





function MainRouter() {
    return (
     <div>
        <MenuBar/>
        <Switch>
        <Route path="/signup" component={Signup}/>
        <Route path="/signin" component={Signin}/>
        <PrivateRoute path="/home" component={Home}/>
        <PrivateRoute path="/dashboard" component={Dashboard}/>

        </Switch>
        <Footer/>
       
     </div>
  
    );
  }
  
  export default MainRouter;
  