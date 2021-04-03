import React,{useState ,useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { FixedSizeList } from 'react-window';
import Grid from '@material-ui/core/Grid';
import {taskByUser} from '../task/api-task';
import {taskByDueDate} from '../task/api-task';
import {taskByPriority} from '../task/api-task';
import {taskByStatus} from '../task/api-task';
import {taskByLabel} from '../task/api-task';
import auth from './../auth/auth-user-helper';
import {remove} from '../task/api-task';
import NewTask from '../task/NewTask';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import { Link } from 'react-router-dom';
import MenuItem from '@material-ui/core/MenuItem';
import MenuButton from './MenuButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import List from '@material-ui/core/List';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Checkbox from '@material-ui/core/Checkbox';
import Card from '@material-ui/core/Card';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    height: 400,
    maxWidth: 270,
    backgroundColor: theme.palette.background.paper,
    flexGrow:1
  },
  control: {
    padding: theme.spacing(2),
  },
  item:{
    margin:theme.spacing(3),
  }
}));

function renderRow(props) {
  const { data,index, style } = props;
  return (
    
    <ListItem button divider style={style} key={index}>
      
      <ListItemText primary={data[index].taskName} />
      
    </ListItem>
   
  );
}

function completeTask(props){
  const jwt = auth.isAuthenticated();

  remove({
    userId: jwt.user._id,
    taskId: props
  },{
      t :jwt.token
  }).then((data) => {
   if (data.error) {
   } else {
     window.location.reload();
     
   }
 });
}


export default function VirtualizedList() {
  const jwt = auth.isAuthenticated()
  const classes = useStyles();
  const [spacing, setSpacing] = React.useState(2);
  const [sortBy,setSortBy] = React.useState('None');
  const [tasks, setTasks] = useState([]);
  const [habits,setHabits]=useState([]);
  const [checked, setChecked] = React.useState(false);

  let check; 
  

  const handleChange = (event) => {
    console.log("Inside handle change")
   
  };

  const handleSort = (event) => {
    setSortBy(event);
  }

  const loadTasks = () => {
    if(sortBy=='None'){
      taskByUser({
        userId: jwt.user._id
      },{
          t :jwt.token
      })
      .then((data)=>{
        if (data.error) {
  
        } else {
          check = JSON.parse(JSON.stringify(data));
          console.log(data);
          data.map(eachTask=>{
            setTasks(tasks=>[...tasks,{
              _id: eachTask._id,
              taskName: eachTask.taskName,
              priority: eachTask.priority,
              status: eachTask.status,
              difficulty : eachTask.difficulty,
              labels: eachTask.labels
            }]);
          });
        }
      })
    }
    else if(sortBy=='TBDD'){
      taskByDueDate({
        userId: jwt.user._id
      },{
          t :jwt.token
      })
      .then((data)=>{
        if (data.error) {
  
        } else {
          check = JSON.parse(JSON.stringify(data));
          data.map(eachTask=>{
            setTasks(tasks=>[...tasks,{
              _id: eachTask._id,
              taskName: eachTask.taskName,
              priority: eachTask.priority,
              status: eachTask.status,
              difficulty : eachTask.difficulty,
              labels: eachTask.labels
            }]);
          });
        }
      })
    }
    else if(sortBy=='TBP'){
      taskByPriority({
        userId: jwt.user._id
      },{
          t :jwt.token
      },{
        priority:'Medium'
      })
      .then((data)=>{
        if (data.error) {
  
        } else {
          console.log("Bochya inside TBP");
          console.log(data);
          check = JSON.parse(JSON.stringify(data));
          data.map(eachTask=>{
            setTasks(tasks=>[...tasks,{
              _id: eachTask._id,
              taskName: eachTask.taskName,
              priority: eachTask.priority,
              status: eachTask.status,
              difficulty : eachTask.difficulty,
              labels: eachTask.labels
            }]);
          });
        }
      })
    }
    else if(sortBy=='TBS'){
      taskByStatus({
        userId: jwt.user._id
      },{
          t :jwt.token
      },{
        status:'In Progress'
      })
      .then((data)=>{
        if (data.error) {
  
        } else {
          console.log("Bochya inside TBS");
          console.log(data);
          check = JSON.parse(JSON.stringify(data));
          data.map(eachTask=>{
            setTasks(tasks=>[...tasks,{
              _id: eachTask._id,
              taskName: eachTask.taskName,
              priority: eachTask.priority,
              status: eachTask.status,
              difficulty : eachTask.difficulty,
              labels: eachTask.labels
            }]);
          });
        }
      })
    }
    else if(sortBy=='TBL'){
      taskByLabel({
        userId: jwt.user._id
      },{
          t :jwt.token
      },{
        labels:'Personal'
      })
      .then((data)=>{
        if (data.error) {
  
        } else {
          console.log("Bochya inside TBL");
          console.log(data);
          check = JSON.parse(JSON.stringify(data));
          data.map(eachTask=>{
            setTasks(tasks=>[...tasks,{
              _id: eachTask._id,
              taskName: eachTask.taskName,
              priority: eachTask.priority,
              status: eachTask.status,
              difficulty : eachTask.difficulty,
              labels: eachTask.labels
            }]);
          });
        }
      })
    }
    
    
  }
  //console.log(sortBy);
  useEffect(() => {
    loadTasks();
   }, []);
 
   

   
  

  return (
    
    <Grid container item xs={12} direction='row' spacing={10}>
    <Grid item xs={3} justify="center" spacing={2}>
        
        
    <List className={classes.root}>
    {tasks.map((value,index) => {
      

      return (
        <ListItem button divider key={index}>
      
          <ListItemText primary={value.taskName} />
         
        </ListItem>
      );
    })}
      <NewTask/>
    </List>
   
        
    </Grid>
    <Grid item xs={3} justify="center" spacing={2}>
    <List className={classes.root}>
    {tasks.map((value,index) => {
      

      return (
        <ListItem button divider key={index}>
          <IconButton onClick={completeTask(value._id)}>
            <CheckBoxOutlineBlankIcon/>
          </IconButton>
          <ListItemText primary={value.taskName} />
          <MenuButton/>
          
        </ListItem>
      );
    })}
      <NewTask/>
    </List>
    </Grid>
    <Grid item xs={3} justify="center" spacing={2}>
    <List className={classes.root}>
    {tasks.map((value,index) => {
      

      return (
        <ListItem button divider key={index}>
      
          <ListItemText primary={value.taskName} />
          
        </ListItem>
      );
    })}
      <NewTask/>
    </List>
    </Grid>
    <Grid item xs={3} justify="center" spacing={2}>
    <List className={classes.root}>
    {tasks.map((value,index) => {
      

      return (
        <ListItem button divider key={index}>
      
          <ListItemText primary={value.taskName} />
         
        </ListItem>
      );
    })}
      <NewTask/>
    </List>
    </Grid>
      
    </Grid>
        
    
    
      
     
    
  );
}
