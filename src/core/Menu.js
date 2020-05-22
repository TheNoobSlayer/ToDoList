import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import {Link, withRouter} from 'react-router-dom';
import auth from '../auth/auth-user-helper';

const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
    },
    appBar:{
        color:"white",
        backgroundColor:"black"
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
      color:"white",
    },
    pricing:{
      color:"white",
      borderBottom: "red",
  
    }
  }));

  const isActive = (history, path) => {
    if (history.location.pathname == path)
      return {color: '#bef67a'}
    else
      return {color: '#ffffff'}
  }

  const Menu= withRouter(({history}) => {
    const classes = useStyles();
  
    return   (
      <div className={classes.root}>
        <AppBar className={classes.appBar} position="static">
          <Toolbar>
            <IconButton edge="start" className={classes.menuButton} color='inherit' aria-label="menu">
              <MenuIcon />
            </IconButton>
           
            <Typography variant="h6" className={classes.title}>
            <Link to="collabspoty"  style={isActive(history, "/collabspoty")} className={classes.pricing}>
              TooDo
              </Link>
            </Typography>
            
            <Link to="pricing">
            <Button  style={isActive(history, "/pricing")} className={classes.pricing} >Pricing</Button>
            </Link>
            {/* <Link to="signup">
            <Button disableUnderline={true} className={classes.pricing}>SignUp</Button>
            </Link>
            <Link to="signin">
            <Button className={classes.pricing}>Login</Button>
            </Link> */}
            {
        !auth.isAuthenticated() && (<span>
          <Link to="/signup">
            <Button style={isActive(history, "/signup")}>Sign up
            </Button>
          </Link>
          <Link to="/signin">
            <Button style={isActive(history, "/signin")}>Sign In
            </Button>
          </Link>
        </span>)
      }
      { 
        auth.isAuthenticated() && (<span>
         
          <Link to={"/user/" + auth.isAuthenticated().user._id}>
            <Button style={isActive(history, "/user/" + auth.isAuthenticated().user._id)}>My Profile</Button>
          </Link>
          <Button color="inherit" onClick={() => {
              auth.signout(() => history.push('/'))
            }}>Sign out</Button>
        </span>)
      } 
          </Toolbar>
        </AppBar>
      </div>
    
    );
  
  }
  )

  export default Menu;