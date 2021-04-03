import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import EditIcon from '@material-ui/icons/Edit';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import IconButton from '@material-ui/core/IconButton';

import {update} from './api-task';
import auth from './../auth/auth-user-helper';



const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  }
}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

export default function NewTask(props) {
  
  const jwt = auth.isAuthenticated();
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [taskName, setTaskName] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [label, setLabel] = React.useState('Work');
  const [priority, setPriority] = React.useState('Medium');
  const [status, setStatus] = React.useState('New');
  const [difficulty, setDifficulty] = React.useState('Easy');
  const [error, setError] = React.useState('');


  const handleAdd = e => {
    
    e.preventDefault();
	//storing data in user object
    const task = {
      taskName: taskName || undefined,
	  description: description || undefined,
      labels: label || undefined,
      priority: priority || undefined,
      status: status || undefined,
      difficulty: difficulty || undefined
    }
   console.log();
    
	
     update({
        userId: jwt.user._id,
        taskId: props.item._id
      },{
          t :jwt.token
      },task).then((data) => {
       if (data.error) {
         setError(data.error)
       } else {
         window.location.reload();
         setError('')
         setOpen(false)
       }
     });
    
  }

  const handleTaskChange = (event) => {
    setTaskName(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleDifficultyChange = (event) => {
    setDifficulty(event.target.value);
  };

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };

  const handleLabelChange = (event) => {
    setLabel(event.target.value);
  };
  
  const handlePriorityChange = (event) => {
    setPriority(event.target.value);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
    <IconButton fullWidth='false' size="small" color="inherit" onClick={handleClickOpen}>
      <EditIcon/>
    </IconButton>
  <Dialog
    open={open}
    TransitionComponent={Transition}
    keepMounted
    onClose={handleClose}
    aria-labelledby="alert-dialog-slide-title"
    aria-describedby="alert-dialog-slide-description"
  >
    <DialogTitle id="alert-dialog-slide-title">{"Edit This Task"}</DialogTitle>
      <form classes={classes.form}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              autoComplete="tname"
              name="taskName"
              variant="outlined"
              required
              fullWidth
              id="taskName"
              label="Task Name"
              onChange={handleTaskChange}
              autoFocus
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              fullWidth
              id="description"
              label="Description"
              name="description"
              onChange={handleDescriptionChange}
              autoComplete="description"
            />
          </Grid>
          <Grid item xs={12}>
            <FormLabel component="legend">Label</FormLabel>
            <RadioGroup aria-label="label" name="label1" value={label} onChange={handleLabelChange}>
                <FormControlLabel value="Work" control={<Radio />} label="Work" />
                <FormControlLabel value="School" control={<Radio />} label="School" />
                <FormControlLabel value="Personal" control={<Radio />} label="Personal" />
                <FormControlLabel value="Exercise" control={<Radio />} label="Exercise" />
                <FormControlLabel value="Health & Fitness" control={<Radio />} label="Health & Fitness" />
                <FormControlLabel value="Chores" control={<Radio />} label="Chores" />
                <FormControlLabel value="Creativity" control={<Radio />} label="Creativity" />
                <FormControlLabel value="Self Development" control={<Radio />} label="Self Development" />
                <FormControlLabel value="Others" control={<Radio />} label="Others" />

            </RadioGroup>
          </Grid>
          <Grid item xs={12}>
            <FormLabel component="legend">Priority</FormLabel>
            <RadioGroup aria-label="priority" name="priority1" value={priority} onChange={handlePriorityChange}>
                <FormControlLabel value="Low" control={<Radio />} label="Low" />
                <FormControlLabel value="Medium" control={<Radio />} label="Medium" />
                <FormControlLabel value="High" control={<Radio />} label="High" />
            </RadioGroup>
          </Grid>
          <Grid item xs={12}>
          <FormLabel component="legend">Status</FormLabel>
          <RadioGroup aria-label="status" name="status1" value={status} onChange={handleStatusChange}>
              <FormControlLabel value="New" control={<Radio />} label="New" />
              <FormControlLabel value="In Progress" control={<Radio />} label="In Progress" />
              <FormControlLabel value="Completed" control={<Radio />} label="Completed" />
          </RadioGroup>
          </Grid>
          <Grid item xs={12}>
          <FormLabel component="legend">Difficulty</FormLabel>
          <RadioGroup aria-label="status" name="status1" value={difficulty} onChange={handleDifficultyChange}>
              <FormControlLabel value="Trivial" control={<Radio />} label="Trivial" />
              <FormControlLabel value="Easy" control={<Radio />} label="Easy" />
              <FormControlLabel value="Medium" control={<Radio />} label="Medium" />
              <FormControlLabel value="Hard" control={<Radio />} label="Hard" />
          </RadioGroup>
          </Grid>
         
          
        
        </Grid>
      
      </form>
    <DialogActions>
      <Button onClick={handleClose} color="primary">
        Cancel
      </Button>
      <Button onClick={handleAdd} color="primary">
        Edit
      </Button>
    </DialogActions>
  </Dialog>
    </div>
  );
}
