import React,{useState ,useEffect} from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { FixedSizeList } from 'react-window';
import Grid from '@material-ui/core/Grid';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import Paper from '@material-ui/core/Paper';
import {taskByUser} from '../task/api-task';
import auth from './../auth/auth-user-helper'



const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    height: 400,
    maxWidth: 300,
    backgroundColor: theme.palette.background.paper,
    flexGrow:1
  },
  control: {
    padding: theme.spacing(2),
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
        console.log(data)
        setTasks(data)
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
      
    </Grid>
        
    
    
      
     
    
  );
}
