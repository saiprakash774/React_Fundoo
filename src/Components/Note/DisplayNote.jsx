import React, { useState } from "react";
import UpdateNote from "./UpdateNote";
import IconFun from "../IconFun/IconFun";
import "./DisplayNote.css";
const DisplayNote = (props) => {
  const [update, setupdate] = useState(false);
  const [arraynote, setarraynote] = useState({});

  const handleClick = (value) => {
    setarraynote(value);
    setupdate(true);
  };

  const handleClose = (value) => {
    setupdate(false);
  };

  return (
    <div className="DisplayNoteMain">
      {props.gotNoteList.map((data) => (
        <div
          className="noteContainer"
          style={{ backgroundColor: data.color }}
          onClick={() => handleClick(data)}
        >
          <div className="note">
            <div className="main_note2">
              <strong>{data.title}</strong>
            </div>
            <div className="main_note2">{data.description}</div>
            <div className="main_note3">
              <IconFun noteid={data.id} item={arraynote} />
            </div>
          </div>
        </div>
      ))}
      <UpdateNote
        item={arraynote}
        open={update}
        close={handleClose}
        GetNote={props.gotNoteList}
      />
    </div>
  );
};
export default DisplayNote;
