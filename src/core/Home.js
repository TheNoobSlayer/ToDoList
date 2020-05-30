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
//import MyTasks from '../task/MyTasks';
import { FixedSizeList } from 'react-window';
import All from './All';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TabPanel from '@material-ui/lab/TabPanel';
import TabContext from '@material-ui/lab/TabContext';


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
  const [check, setCheck] = useState([0,1,2,3]);
  const [tab, settab] = React.useState("All");

  const tabToAll = () => {

    settab("All");
  };
  const tabToTasks = () => {

    settab("Tasks");
  };
  const tabToDailies = () => {

    settab("Dailies");
  };
  const tabToRewards = () => {

    settab("Rewards");
  };

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
            
          <ListItem key="All">
            <Button fullWidth onClick={tabToAll}>All</Button>
          </ListItem>
          <ListItem key="Habits">  
            <Button fullWidth onClick={tabToTasks}>Tasks</Button>
          </ListItem>
          <ListItem button key="Dailies">
            <ListItemIcon><InboxIcon/></ListItemIcon>
            <ListItemText primary="Dailies"/>
          </ListItem>
          <ListItem button key="Rewards">
            <ListItemIcon><InboxIcon/></ListItemIcon>
            <ListItemText primary="Rewards"/>
          </ListItem>
      </List>
      <Divider />
      <List>

      </List>
      </div>
      </Drawer>      
      <main className={classes.content}>
      <Toolbar />
        <TabContext value={tab}>
          <TabPanel value="All">
            <All/>
          </TabPanel>
          <TabPanel value="Tasks">
            <div>Boooooooo</div>
          </TabPanel>
          <TabPanel value="Dailies">
            <All/>
          </TabPanel>
          <TabPanel value="Habits">
            <All/>
          </TabPanel>
          <TabPanel value="Rewards">
            <All/>
          </TabPanel>
        </TabContext>
      
      </main>
    </div>
  );
}
