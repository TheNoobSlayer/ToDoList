import React,{useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import MyTasks from '../task/MyTasks';
import { FixedSizeList } from 'react-window';
import All from './All';
import Grid from '@material-ui/core/Grid';


const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerContainer: {
    overflow: 'auto',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(0),
    //marginLeft: drawerWidth,
    marginTop:85,
  },
  content2: {
    //marginLeft:0,
    // position:'relative',
    // margin: theme.spacing(0),
    flexgrow : 1,
    padding: theme.spacing(0),
    marginRight:520,
    //position: 'relative',
   // marginLeft: drawerWidth+300,
    //marginRight: 0,
  },
  content3: {
    marginLeft:-500,
  },
  paper: {
    height: 140,
    width: 100,
  },
}));

export default function ClippedDrawer() {
  const classes = useStyles();
  const [spacing, setspacing] = useState(2);
  const [all, setAll] = useState(false)
  const [check, setCheck] = useState([0,1,2,3])

  function handleClick(v) {
    
    if(v == 'All')
    {
      setCheck([0,1,2])
      
    }
    if(v == 'Habits')
    {
      setCheck([0,1])
      
    }
    if(v == 'Tasks')
    {
      setCheck([0])
      
    }
    if(v == 'Rewards')
    {
      setCheck([])
      
    }
    if(v == 'Dailies')
    {
      setCheck([0,1,2,3])
      
    }
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <Toolbar />
        <div className={classes.drawerContainer}>
          <List>
            {['All', 'Habits', 'Dailies', 'Tasks','Rewards'].map((text, index) => (
              <ListItem
              onClick={()=>handleClick(text)}
              button key={text}>
                <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                <ListItemText primary={text} />
                
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            {['All mail', 'Trash', 'Spam'].map((text, index) => (
              <ListItem button key={text}>
                <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
        </div>
      </Drawer>
      {/* <main className={classes.content}>
      
        <All/>
        
        
      </main>
      <main className={classes.content2}>
      
        <All/>
        
        
      </main>
      <main className={classes.content3}>
      
        <All/>
      
      
      </main> */}

      <Grid className={classes.content} item xs={12}>
        <Grid container spacing={spacing}>
          {check.map((value) => (
            <Grid key={value} item>
              <All className={classes.paper} />
            </Grid>
          ))}
        </Grid>
      </Grid>
    </div>
  );
}
