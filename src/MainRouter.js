import React from 'react';
import {Route,Switch} from 'react-router-dom';
import Menu from './core/Menu';
import Signup from './user/SignUp';
import Signin from './auth/Signin';
import Footer from './core/Footer'




function MainRouter() {
    return (
     <div>
        <Menu/>
        <Switch>
        <Route path="/signup" component={Signup}/>
        <Route path="/signin" component={Signin}/>


        </Switch>
        <Footer/>
     </div>
  
    );
  }
  
  export default MainRouter;
  