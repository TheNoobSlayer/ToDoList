import React,{useState ,useEffect} from 'react';
import {taskByUser} from '../task/api-task';
import auth from './../auth/auth-user-helper';

const loadTasks = () => {
  const jwt = auth.isAuthenticated()
  taskByUser({
    userId: jwt.user._id
  },{
      t :jwt.token
  })
  .then((data)=>{
    if (data.error) {
      console.log("Bochya inside errror");
      //this.setState({error: data.error})
    } else {
      console.log("Bochya inside else")
      return data;
    
    }
  })
}
console.log("Bochya inside mytasks")
console.log(loadTasks());
export default {loadTasks};
