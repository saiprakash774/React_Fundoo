import React, { useState } from "react";
import Icon from "./IconFun.module.css";
import { IconButton } from "@material-ui/core";
import AddAlertOutlinedIcon from "@material-ui/icons/AddAlertOutlined";
import PersonAddOutlinedIcon from "@material-ui/icons/PersonAddOutlined";
import ColorLensOutlinedIcon from "@material-ui/icons/ColorLensOutlined";
import ImageOutlinedIcon from "@material-ui/icons/ImageOutlined";
import ArchiveOutlinedIcon from "@material-ui/icons/ArchiveOutlined";
import MoreVertOutlinedIcon from "@material-ui/icons/MoreVertOutlined";
import Popover from "@material-ui/core/Popover";
import { makeStyles } from "@material-ui/core/styles";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import NoteService from "../../Services/noteServices";
const service = new NoteService();

function IconFun(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const useStyles = makeStyles((theme) => ({
    palette: {
      display: "flex",
      flexFlow: "wrap",
      width: "130px",
    },
    paper: {
      padding: theme.spacing(1),
    },
    colorpicker: {
      margin: theme.spacing(0.5),
      borderRadius: "50%",
      height: "20px",
      width: "20px",
    },
  }));

  const updateColor = (color) => {
    if (props.noteid !== "") {
      let data = {
        color: color,
        noteIdList: [props.noteid],
      };
      service
        .colorNote(data, localStorage.getItem("userToken"))
        .then((result) => {
          console.log(result);
          props.GetNote();
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      props.setBackColor(color);
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const classes = useStyles();
  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleArchieve = () => {
    let archievedata = {
      noteIdList: [props.noteid],
      isArchived: true
    };
    service.archieveNote(archievedata,localStorage.getItem("userToken")).then((result) => {
        console.log(result);
        props.GetNote();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleTrash = () => {
    let data = {
      noteIdList: [props.noteid],
      isDeleted: true,
    };
    service
      .trashNote(data, localStorage.getItem("userToken"))
      .then((result) => {
        console.log(result);
        props.GetNote();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const open = Boolean(anchorEl);
  const inputColor = [
    { color: "#fff" },
    { color: "#f28b82" },
    { color: "#fbbc04" },
    { color: "#fff475" },
    { color: "#ccff90" },
    { color: "#a7ffeb" },
    { color: "#cbf0f8" },
    { color: "#aecbga" },
    { color: "#d7aefb" },
    { color: "#fdcfe8" },
    { color: "#e6c9a8" },
    { color: "#e8eaed" },
  ];

  const [anchorE2, setAnchorE2] = useState(null);
  const handleMenuClick = (event) => {
    setAnchorE2(event.currentTarget);
  };

  const handleMenuClose = () => {
    handleTrash();
    setAnchorE2(null);
  };

  return (
    <div className={Icon.container}>
      <div className={Icon.noteicons}>
        <AddAlertOutlinedIcon />
      </div>
      <div className={Icon.noteicons}>
        <PersonAddOutlinedIcon />
      </div>
      <div className={Icon.noteicons}>
        
        <ColorLensOutlinedIcon onClick={handlePopoverOpen}/>
        <Popover
          id="mouse-over-popover"
          className={classes.popover}
          classes={{
            paper: classes.paper,
          }}
          open={open}
          keepMounted
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
          disableRestoreFocus
        >
          <div className={classes.palette}>
            <div className={Icon.colorhover}>
              {inputColor.map((value) => (
                <IconButton
                  className={classes.colorpicker}
                  style={{ backgroundColor: value.color }}
                  onClick={() => {
                    updateColor(value.color);
                  }}
                ></IconButton>
              ))}
            </div>
          </div>
        </Popover>
      </div>
      <div className={Icon.noteicons}>
        <ImageOutlinedIcon />
      </div>
      <div className={Icon.noteicons}>
        <ArchiveOutlinedIcon onClick={handleArchieve} />
      </div>
      <div className={Icon.noteicons}>
        <MoreVertOutlinedIcon onClick={handleMenuClick}>
          <Menu
            id="simple-menu"
            anchorE2={anchorE2}
            keepMounted
            open={Boolean(anchorE2)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handleMenuClose}>Delete</MenuItem>
          </Menu>
        </MoreVertOutlinedIcon>
      </div>
    </div>
  );
}
export default IconFun;
