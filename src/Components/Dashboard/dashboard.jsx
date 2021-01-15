import React, { useState, useEffect } from "react";
import "./dashboard.css";
import Toolbar from "../Toolbar/Toolbar";
import Divider from "@material-ui/core/Divider";
import DisplayNote from "../Note/DisplayNote";
import Note from "../Note/Note";
import Sidebar from "../Sidebar/Sidebar";
import NoteService from "../../Services/noteServices";
import { Route, Switch} from 'react-router-dom'
const service = new NoteService();
function Dashboard() {
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const handleDrawerOpen = () => {
    setOpen(!open);
  };

  const [display, setDisplayNote] = useState([]);

  const getAllNotes = () => {
    service
      .getNote(localStorage.getItem("userToken"))
      .then((data) => {
        let arrayData = data.data.data.data;
        console.log(data);
        setDisplayNote(
          arrayData.filter(
            (data) =>
              (data.isDeleted === false &&
                data.isArchieved === false &&
                data.title
                  .includes(searchTerm)
                  .includes(searchTerm.toLocaleLowerCase())) ||
              data.description
                .toLowerCase()
                .includes(searchTerm.toLocaleLowerCase())
          )
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    getAllNotes();
  }, []);

  return (
<div className="dashMain">
<div className="dashContainer">
      <Toolbar drawerHandler={handleDrawerOpen} setSearchTerm={setSearchTerm} />
      <Divider />
      <Sidebar open={open} />
      <Note />
      <DisplayNote gotNoteList={display} />
    </div>
    <main className="main">
      <Switch>
        <Route path="/dashboard/notes">
          </Route>
      </Switch>
    </main>
    </div>
  );
}

export default Dashboard;
