import React,{useState ,useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { FixedSizeList } from 'react-window';
import Grid from '@material-ui/core/Grid';
import {taskByUser} from '../task/api-task';
import auth from './../auth/auth-user-helper';
import NewTask from '../task/NewTask';
import EditTask from '../task/EditTask';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import { Link } from 'react-router-dom';


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
  //console.log("Inside renderRow");
  const { data,index, style } = props;
 // console.log(index);
  console.log(data.length);
  return (
    
    <ListItem button style={style} key={index}>
      <ListItemText primary={data[index].taskName} />
    </ListItem>
   
  );
}


export default function VirtualizedList() {
  const jwt = auth.isAuthenticated()
  const classes = useStyles();
  const [spacing, setSpacing] = React.useState(2);
  const [tasks, setTasks] = useState([]);
  let check; 
  
  const loadTasks = () => {
    taskByUser({
      userId: jwt.user._id
    },{
        t :jwt.token
    })
    .then((data)=>{
      if (data.error) {
        //this.setState({error: data.error})
      } else {
     
        check = JSON.parse(JSON.stringify(data));
   
        // setTasks(JSON.parse(JSON.stringify(data)));
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
  
  useEffect(() => {
    loadTasks();
   }, []);
 
  
   
  const handleChange = (event) => {
    setSpacing(Number(event.target.value));
  }

  return (
     
        

    <Grid container className={classes.root} spacing={2}>
        <FixedSizeList height={400} width={300} itemSize={46} itemCount={tasks.length} itemData={tasks}>
            {renderRow}
        </FixedSizeList>
        <NewTask/>

      
    </Grid>
        
    
    
      
     
    
  );
}
