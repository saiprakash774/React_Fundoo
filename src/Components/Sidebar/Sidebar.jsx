import "./Sidebar.css";
import EmojiObjectsOutlinedIcon from "@material-ui/icons/EmojiObjectsOutlined";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import ArchiveOutlinedIcon from "@material-ui/icons/ArchiveOutlined";
import DeleteOutlineOutlinedIcon from "@material-ui/icons/DeleteOutlineOutlined";
import React, { useState } from "react";
import clsx from "clsx";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import {Route, Switch} from 'react-router-dom';
import { Link } from 'react-router-dom';
import NotificationsActiveOutlinedIcon from "@material-ui/icons/NotificationsActiveOutlined";
import Note from "../Note/Note";
import Trash from "../Trash";
import Archieve from "../Archieve";
import { makeStyles } from "@material-ui/core/styles";
const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  hide: {
    display: "none",
  },
  // appBar: {
  //   zIndex: theme.zIndex.drawer + 1,
  //   transition: theme.transitions.create(['width', 'margin'], {
  //     easing: theme.transitions.easing.sharp,
  //     duration: theme.transitions.duration.leavingScreen,
  //   }),
  // },
  // appBarShift: {
  //   marginLeft: drawerWidth,
  //   width: `calc(100% - ${drawerWidth}px)`,
  //   transition: theme.transitions.create(['width', 'margin'], {
  //     easing: theme.transitions.easing.sharp,
  //     duration: theme.transitions.duration.enteringScreen,
  //   }),
  // },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1,
    },
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

export default function Sidebar(props) {
  const classes = useStyles();
  const [color, setState] = useState(false);
  const [open, setOpen] = useState(false);
  const [keyValue, setkeyValue] = useState("");
  const handleDrawerOpen = () => {
    setOpen(!open);
  };

  const handleclass = (value) => {
    setState(true);
    setkeyValue(value);
  };
  return (
    <div className="SidebarMain">
      <div className={classes.root}>
        <Drawer
          // className={clsx(classes.appBar, {
          //   [classes.appBarShift]: open,
          // })}
          variant="permanent"
          className={clsx(classes.drawer, {
            [classes.drawerOpen]: props.open,
            [classes.drawerClose]: !props.open,
          })}
          classes={{
            paper: clsx({
              [classes.drawerOpen]: props.open,
              [classes.drawerClose]: !props.open,
            }),
          }}
        >
          <List>
            <ListItem
              button
              onMouseOver={() => {
                handleclass("Notes");
                handleDrawerOpen();
              }}
              className={color && keyValue === "Notes" ? "pink" : "white"}
              key="Notes"
              component={Link} to="/dashboard/notes"
            >
              <ListItemIcon>
                <EmojiObjectsOutlinedIcon />
              </ListItemIcon>
              <ListItemText>Notes</ListItemText>
            </ListItem>
            <ListItem
              button
              onMouseOver={() => {
                handleDrawerOpen();
              }}
              className={color && keyValue === "Remainder" ? "pink" : "white"}
              key="Remainder"
            >
              <ListItemIcon>
                <NotificationsActiveOutlinedIcon />
              </ListItemIcon>
              <ListItemText>Remainder</ListItemText>
            </ListItem>
            <ListItem
              button
              onMouseOver={() => {
                handleDrawerOpen();
              }}
              className={color && keyValue === "Edit_Labels" ? "pink" : "white"}
              key="Edit_Labels"
            >
              <ListItemIcon>
                <EditOutlinedIcon />
              </ListItemIcon>
              <ListItemText>Edit Labels</ListItemText>
            </ListItem>
            <ListItem
              button
              onMouseOver={() => {
                handleDrawerOpen();
              }}
              className={color && keyValue === "Archieve" ? "pink" : "white"}
              key="Archieve"
              component={Link} to="/dashboard/archieves"
            >
              <ListItemIcon>
                <ArchiveOutlinedIcon />
              </ListItemIcon>
              <ListItemText>Archieve</ListItemText>
            </ListItem>
            <ListItem
              button
              onMouseOver={() => {
                handleDrawerOpen();
              }}
              className={color && keyValue === "Trash" ? "pink" : "white"}
              key="Trash"
              component={Link} to="/dashboard/trashes"
            >
              <ListItemIcon>
                <DeleteOutlineOutlinedIcon />
              </ListItemIcon>
              <ListItemText>Trash</ListItemText>
            </ListItem>
          </List>
        </Drawer>
        <Switch>
          <Route exact path="/dashboard/notes" component={Note}/>
          <Route exact path="/dashboard/trashes" component={Trash}/>
          <Route exact path="/dashbord/archieves" component={Archieve}/>
        </Switch>
      </div>
    </div>
  );
}
