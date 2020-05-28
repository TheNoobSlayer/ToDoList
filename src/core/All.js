import React,{useState ,useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { FixedSizeList } from 'react-window';
import Grid from '@material-ui/core/Grid';
import {taskByUser} from '../task/api-task';
import auth from './../auth/auth-user-helper';
import NewTask from '../task/NewTask';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import { Link } from 'react-router-dom';
import MenuItem from '@material-ui/core/MenuItem';
import MenuButton from './MenuButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';

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
    
    <ListItem button style={style} key={index}>
      
      <ListItemText primary={data[index].taskName} />
      <MenuButton item={data[index]}/>
    </ListItem>
   
  );
}


export default function VirtualizedList() {
  const jwt = auth.isAuthenticated()
  const classes = useStyles();
  const [spacing, setSpacing] = React.useState(2);
  const [tasks, setTasks] = useState([]);
  const [habits,setHabits]=useState([]);
  let check; 
  
  const loadTasks = (e) => {
    if(e==='TBDD'){
      taskByUser({
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
    
    
  }
  
  useEffect(() => {
    loadTasks();
   }, []);
 
   

   
  const handleChange = (event) => {
    setSpacing(Number(event.target.value));
  }

  return (

    <Grid container item xs={12} direction='row' spacing={10}>
    <Grid item xs={3} justify="center" spacing={2}>
        <IconButton onClick={loadTasks('TBDD')}>Sort by Due Date</IconButton>

        <FixedSizeList height={400} width={300} itemSize={46} itemCount={tasks.length} itemData={tasks}>
            {renderRow}
        </FixedSizeList>
        <NewTask/>
    </Grid>
    <Grid item xs={3} justify="center" spacing={2}>
        <FixedSizeList height={400} width={300} itemSize={46} itemCount={tasks.length} itemData={tasks}>
            {renderRow}
        </FixedSizeList>
        <NewTask/>
    </Grid>
    <Grid item xs={3} justify="center" spacing={2}>
        <FixedSizeList height={400} width={300} itemSize={46} itemCount={tasks.length} itemData={tasks}>
            {renderRow}
        </FixedSizeList>
        <NewTask/>
    </Grid>
    <Grid item xs={3} justify="center" spacing={2}>
        <FixedSizeList height={400} width={300} itemSize={46} itemCount={tasks.length} itemData={tasks}>
            {renderRow}
        </FixedSizeList>
        <NewTask/>
    </Grid>
      
    </Grid>
        
    
    
      
     
    
  );
}
