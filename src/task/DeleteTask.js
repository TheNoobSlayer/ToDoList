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
import DeleteIcon from '@material-ui/icons/Delete';


import {remove} from './api-task';
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

export default function DeleteTask(props) {
  const jwt = auth.isAuthenticated();
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [error, setError] = React.useState('');


  
  const handleDelete = e => {
    
    e.preventDefault();
	//storing data in user object
    
    
	
     remove({
        userId: jwt.user._id,
        taskId: props.item._id
      },{
          t :jwt.token
      }).then((data) => {
       if (data.error) {
         setError(data.error)
       } else {
         auth.signout(() => console.log('deleted'))
         setError('')
         setOpen(false)
       }
     });
    
  }
  

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
    <IconButton fullWidth='true' size="large" color="inherit" onClick={handleDelete}>
      <DeleteIcon/>
    </IconButton>
  
    </div>
  );
}
