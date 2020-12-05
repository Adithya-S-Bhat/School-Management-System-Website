import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ChatIcon from '@material-ui/icons/ChatOutlined';
import CalendarIcon from '@material-ui/icons/CalendarTodayOutlined';
import AssignmentIcon from '@material-ui/icons/AssignmentOutlined';
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import HomeIcon from '@material-ui/icons/HomeOutlined';
import ProfileIcon from '@material-ui/icons/AccountCircleOutlined';
import NotificationsIcon from '@material-ui/icons/Notifications';
import DoneIcon from '@material-ui/icons/DoneOutlineRounded';
import Toolbar from '@material-ui/core/Toolbar';
import MenuIcon from '@material-ui/icons/Menu';
import LogoutIcon from '@material-ui/icons/ExitToAppOutlined';
import DeleteAccountIcon from '@material-ui/icons/DeleteForeverOutlined';
import InfoIcon from '@material-ui/icons/InfoOutlined';
import Badge from '@material-ui/core/Badge';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Popover from '@material-ui/core/Popover';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Link from '@material-ui/core/Link';

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';

import Home from '../webpages/home'
import Conversations from '../webpages/Conversations/ChatApp'
import Info from '../webpages/info'

import Tooltip from '@material-ui/core/Tooltip';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}


const drawerWidth = 145;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexGrow: 1,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  grow:{
    flexGrow:1,
  },
  sectionDesktop: {
    position:'fixed',
    right:'0px',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  typography: {
    padding: theme.spacing(2),
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
}));

export default function Layouts(props) {
  const { qs } = props.match.params;
  var userinfo=JSON.parse(qs);

  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const openprof = Boolean(anchorEl);
  const [opendelete, setOpendelete] = React.useState(false);
  const [deletesuccess, setdeletesuccess] = React.useState(false);
  const [notifiEl, setnotifiEl] = React.useState(null);
  const [Notifics,setNotifics]=React.useState(1);
  const opennotifi = Boolean(notifiEl);
  const id = opennotifi ? 'simple-popover' : undefined;
    
  const [value, setValue] = React.useState(0);

  const handledeleteOpen = () => {
        setOpendelete(true);
  };

  const handledeleteClose = () => {
    setOpendelete(false);
  };
  const handlesuccessdeleteOpen = () => {
        setdeletesuccess(true);
  };

  const handlesuccessdeleteClose = () => {
    handledeleteClose();
    setdeletesuccess(false);
  };
    
  const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
        setAnchorEl(null);
  }; 
  const handlenotifiClose = () => {
        setnotifiEl(null);
  }; 
  
  const handleChange = (event, newValue) => {
        setValue(newValue);
  };

  const handleClick = (event) => {
        setnotifiEl(event.currentTarget);
        setNotifics(0);
  };
  const handleDrawerOpen = () => {
      setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" color="default" className={clsx(classes.appBar, { [classes.appBarShift]: !open,})}>
      <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="close drawer" onClick={handleDrawerClose} className={clsx(classes.menuButton, {[classes.hide]: !open,})}>
              <Tooltip title="Menu">
              <MenuIcon/>
              </Tooltip>
          </IconButton>
          <Typography variant="h6" noWrap className="classes.title">
              &lt;A^3/&gt;
          </Typography>
          <div className={classes.sectionDesktop}>
          <IconButton aria-label="show 1 new notifications" color="inherit" onClick={handleClick}>
            <Badge badgeContent={Notifics} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <Popover id={id} open={opennotifi} anchorEl={notifiEl} onClose={handlenotifiClose} anchorOrigin={{ vertical: 'bottom', horizontal: 'center',}} transformOrigin={{ vertical: 'top', horizontal: 'center',}}>
            <Typography className={classes.typography}>Welcome to &lt;A^3&gt; - World's first School Administration Management Website.</Typography>
          </Popover>
          <IconButton aria-label="account of current user" aria-controls="menu-appbar" aria-haspopup="true" onClick={handleMenu} color="inherit">
              <AccountCircle />
          </IconButton> 
          <Menu id="menu-appbar" anchorEl={anchorEl} anchorOrigin={{vertical: 'top',horizontal: 'right',}} keepMounted transformOrigin={{vertical: 'top', horizontal: 'right',}} open={openprof} onClose={handleClose}>
            <MenuItem onClick={handleClose}><ProfileIcon/>&nbsp;My Profile</MenuItem>
            <MenuItem onClick={handledeleteOpen}><DeleteAccountIcon/>&nbsp;Delete account</MenuItem>
            <Dialog open={opendelete} onClose={handledeleteClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
            <DialogTitle id="alert-dialog-title">{"Are you sure you want to delete your account?"}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
              You will not be able to recover your account once you delete.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handledeleteClose} color="transparent">
                Cancel
              </Button>
              <Button onClick={handlesuccessdeleteOpen} color="secondary" autoFocus>
                Confirm
              </Button>
            </DialogActions>
            </Dialog>{/*<Link href={"localhost:4000/users/delete/"+uemail}>*/} 
            <Dialog open={deletesuccess} onClose={handlesuccessdeleteClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
            <DialogTitle id="alert-dialog-title"><DoneIcon color="secondary"/></DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Account deleted Successfully.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Link href={"//"+window.location.hostname+":5000/users/delete/"+userinfo.email} style={{textDecoration:"none",color:"white"}}>
              <Button autoFocus>{/* onClick={handlesuccessdeleteClose} */}
                Ok
              </Button>
              </Link>
            </DialogActions>
            </Dialog>
            <Link href={"//"+window.location.hostname+":5000/users/logout"} color="inherit" style={{textDecoration:"none",}}><MenuItem onClick={handleClose}><LogoutIcon/>&nbsp;Logout</MenuItem></Link>
          </Menu>
          </div>
      </Toolbar>
    </AppBar>
      <Drawer variant="permanent" className={clsx(classes.drawer, { [classes.drawerOpen]: !open, [classes.drawerClose]: open,})}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: !open,
            [classes.drawerClose]: open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerOpen}>
            <Tooltip title="Minimise Menu">
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
            </Tooltip>
          </IconButton>
        </div>
        <Divider />
        <Tabs orientation="vertical" variant="scrollable" value={value} onChange={handleChange} aria-label="Vertical tabs" className={classes.tabs}>
              <Tab label="Home" icon={<HomeIcon/>} {...a11yProps(0)}/>
              <Tab label="Conversations" icon={<ChatIcon/>} {...a11yProps(1)} />
              <Tab label="Calendar" icon={<CalendarIcon/>} {...a11yProps(2)} />
              <Tab label="Assignments" icon={<AssignmentIcon/>} {...a11yProps(3)} />
              <Divider/>
              <Tab label="My Profile" icon={<ProfileIcon/>} {...a11yProps(4)} />
              <Tab label="About Us" icon={<InfoIcon/>} {...a11yProps(5)} />
      </Tabs>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <TabPanel value={value} index={0}>
          <Home userinfo={userinfo}/>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Conversations userinfo={userinfo}/>
        </TabPanel>
        <TabPanel value={value} index={6}>
          <Info/>
        </TabPanel>
      </main>
    </div>
  );
}