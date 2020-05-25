import React,{useState ,useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { FixedSizeList } from 'react-window';
import Grid from '@material-ui/core/Grid';
import {taskByUser} from '../task/api-task';
import auth from './../auth/auth-user-helper';
import NewTask from '../task/NewTask';



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
  const { index, style } = props;
  return (
    <ListItem button style={style} key={index}>
      <ListItemText primary={`Item ${index + 1}`} />
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
      userId: '5ec63cc670c16f5bc010cce0'
    },{
        t :jwt.token
    })
    .then((data)=>{
      if (data.error) {
        //this.setState({error: data.error})
      } else {
        //console.log("Bochya inside loadSkills")
        // const {check} = props;
        check = JSON.parse(JSON.stringify(data));
        // console.log(data)
        // setTasks(JSON.parse(JSON.stringify(data)));
        setTasks(data);
        console.log("hi")
        //  console.log(check);
        //  console.log(check);
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
        <FixedSizeList height={400} width={300} itemSize={46} itemCount={200}>
            {renderRow}
        </FixedSizeList>
        <NewTask/>

      
    </Grid>
        
    
    
      
     
    
  );
}
