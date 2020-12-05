import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import "./Home.css";


import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import GroupIcon from '@material-ui/icons/GroupAddOutlined';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));
const Home = () => {
  const [roomName, setRoomName] = React.useState("");
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  const handleRoomNameChange = (event) => {
    setRoomName(event.target.value);
  };
  const classes = useStyles();

  return (
    <div className="home-container">  
    <div>
    <GroupIcon style={{width:"50px",height:"50px"}}/></div>
    <h2>Create/Join Group</h2>
    <TextField id="filled-basic" label="Group Name" variant="filled" color="secondary" value={roomName} onChange={handleRoomNameChange}/>
      {/*<input
        type="text"
        placeholder="Room"
        value={roomName}
        onChange={handleRoomNameChange}
        className="text-input-field"
      />*/}<br/>
      <div className={classes.root}>
      <Button variant="outlined" color="default" onClick={handleClickOpen}>
        {/*<Link to={`/${roomName}`} className="enter-room-button">*/}
          Create/Join
        {/*</Link>*/}
      </Button></div>
      <Dialog open={open} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">{"Confirm Group Name - "+roomName}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            You can only interact with people on the same group. Make sure that other people also join the same group (Please do note that the Group Name is case sensitive).
            <br/>A group is created only if it doesn't exist or else you'll join a existing one.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button color="primary" autoFocus>
            <Link to={`/chat/${roomName}`} style={{color:"white",textDecoration:"none",padding:"5px"}}>
        {/*<Link to={`/chat/{"room":"${roomName}","name":${props.userinfo.user}`} style={{color:"white",textDecoration:"none",padding:"5px"}}>*/}
            Confirm
            </Link>
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Home;