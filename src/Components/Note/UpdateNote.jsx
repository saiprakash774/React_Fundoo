import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import InputBase from "@material-ui/core/InputBase";
import IconFun from "../IconFun/IconFun";
import Dialog from "@material-ui/core/Dialog";
import NoteService from "../../Services/noteServices";
import "./UpdateNote.css";

const service = new NoteService();
export default function UpdateNote(props) {
  const [title, setTitle] = useState("");
  const [bgColor, setColor] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    setTitle(props.item.title);
    setColor(props.item.color);
    setDescription(props.item.description);
  }, [props]);

  const updateNote = (e) => {
    e.stopPropagation();
    let formData = new FormData();
    formData.set("title", title);
    formData.set("description", description);
    formData.set("noteId", props.item.id);
    service
      .updateNote(formData, localStorage.getItem("userToken"))
      .then((result) => {
        console.log(result);
        props.GetNote();
      })
      .catch((error) => {
        console.log(error);
      });
    props.close();
  };

  return (
    <Dialog
      open={props.open}
      aria-labelledby="simple-dialog-title"
      onClose={props.close}
    >
      <div className="updateNoteContainer" style={{ backgroundColor: bgColor }}>
        <div className="note">
          <div className="main_note2">
            <InputBase
              className="basicnote2"
              fullWidth
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="main_note2">
            <InputBase
              className="basicnote2"
              multiline="true"
              fullWidth
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="basic_note3">
            <IconFun
              setBackColor={setColor}
              GetNote={props.GetNote}
              noteid={props.item.id}
              color={bgColor}
            />
            <div className="Onclose">
              <Button onClick={(e) => updateNote(e)}>close</Button>
            </div>
          </div>
        </div>
      </div>
    </Dialog>
  );
}
