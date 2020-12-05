import React from "react";

import "./ChatRoom.css";
import useChat from "../useChat";
import { Link } from "react-router-dom";
//import Link from "@material-ui/core/Link";
import { makeStyles } from '@material-ui/core/styles';
import SendIcon from '@material-ui/icons/SendRounded';
import IconButton from '@material-ui/core/IconButton';
//import Button from '@material-ui/core/Button';
import AttachIcon from '@material-ui/icons/AttachFileRounded';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import TextField from '@material-ui/core/TextField';
import { Button, Grid } from "@material-ui/core";

import OnlineIcon from '@material-ui/icons/FiberManualRecord';
import GroupIcon from '@material-ui/icons/GroupOutlined';
import MediaIcon from '@material-ui/icons/FolderOpenRounded';
import Tooltip from '@material-ui/core/Tooltip';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  }, 
  button: {
    margin: theme.spacing(1),
  },
  margin: {
    margin: theme.spacing(1),
    position: "relative",
    left:"10%"
  },
  input: {
    display: 'none',
  },
}));

const ChatRoom = (props) => {
  const classes = useStyles();
  const { roomId } = props.match.params;
  const { messages, sendMessage ,count,sendCount} = useChat({"roomId":roomId,"userinfo":props.userinfo});
  const [newMessage, setNewMessage] = React.useState("");
  const [anchorEl, setAnchorEl] = React.useState(null);
  const openprof = Boolean(anchorEl);

  const handleNewMessageChange = (event) => {
    setNewMessage(event.target.value);
    sendCount();
  };

  const handleSendMessage = () => {
    sendMessage(newMessage);
    setNewMessage("");
  };
  
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  }; 
  const handleAttachment=(filename)=>{
    setNewMessage("Shared an attachment: //"+window.location.hostname+":5000/static/"+roomId+"/"+filename)
    handleSendMessage();
  }

  return (
    <div className="chat-room-container">
    <div style={{border:"1px solid grey",borderRadius:"10px 10px 0 0",background:"rgb(35,35,35)"}}>
      <h2 style={{position:"relative",left:"2%"}}><GroupIcon/> {roomId}</h2>
      <IconButton aria-label="more" aria-controls="menu-appbar" aria-haspopup="true" onClick={handleMenu} color="inherit" style={{position:"absolute",right:"0px",top:"2%"}}>
        <MoreVertIcon/>
      </IconButton>
      <Menu id="menu-appbar" anchorEl={anchorEl} anchorOrigin={{vertical: 'top',horizontal: 'right',}} keepMounted transformOrigin={{vertical: 'top', horizontal: 'right',}} open={openprof} onClose={handleClose}>
        <a href={"//"+window.location.hostname+":5000/static/"+roomId} style={{color:"white",textDecoration:"none"}} target="_blank"rel="noopener noreferrer"><MenuItem onClick={handleClose}><MediaIcon/>&nbsp;Media</MenuItem></a>
        <Link to="/" style={{color:"white",textDecoration:"none"}}><MenuItem onClick={handleClose}><GroupIcon/>&nbsp;Join another Group</MenuItem></Link>
      </Menu>
      <p><OnlineIcon style={{color:"green",height:"13px"}}/> {count} Online</p>
      </div>
      <div className="messages-container">
        <ol className="messages-list">
          {messages.map((message, i) => (
            <li
              key={i}
              className={`message-item ${
                message.ownedByCurrentUser ? "my-message" : "received-message"
              }`}
              style={{borderRadius: "1.7ch",}}>
              <strong style={{fontSize:"11px",}}>{(message.ownedByCurrentUser? "You" : message.name)}</strong><br/>{message.body}
            </li>
          ))}
        </ol>
      </div>
      <div className={classes.margin}>
        <Grid container spacing={1}>
          <Grid item>
            <form method="POST" action={"//"+window.location.hostname+":5000/users/upload/"+roomId} encType="multipart/form-data">
            <input accept="file" className={classes.input} id="contained-button-file" multiple type="file" name="ipfile"/>
            <label htmlFor="contained-button-file">
            <Tooltip title="Attach">
            <IconButton size="medium" aria-label="add an attachment" component="span" style={{background:"black"}}>
              <AttachIcon/>
            </IconButton>{/* type="submit" value="uploadfile" action={"//"+window.location.hostname+"/users/upload/"+roomId} encType="multipart/form-data" onClick={handleAttachment(ipfile.name)} and this will change setNewMessage("Shared an attachment: localhost:5000/static/{roomId}/name")*/}
            </Tooltip>
            </label>
            <Button type="submit">Submit</Button>
            </form>
          </Grid>
          <Grid item style={{width:'54%',}}>
              <TextField id="filled-basic" value={newMessage} onChange={handleNewMessageChange} label="Type a Message..." variant="filled" multiline rowsMax={2} style={{width:'100%',}}/>
          </Grid>
          <Grid item>
            <Tooltip title="Send">
            <IconButton aria-label="send" onClick={handleSendMessage} size="medium" style={{background:"darkgreen"}}>
            <SendIcon/>
            </IconButton>
            </Tooltip>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default ChatRoom;