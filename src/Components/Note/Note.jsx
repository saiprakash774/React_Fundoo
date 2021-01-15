import React, { useState } from "react";
import InputBase from "@material-ui/core/InputBase";
import NoteCss from "./Note.module.css";
import IconFun from "../IconFun/IconFun";
import ImageOutlinedIcon from "@material-ui/icons/ImageOutlined";
import CheckBoxOutlinedIcon from "@material-ui/icons/CheckBoxOutlined";
import BrushOutlinedIcon from "@material-ui/icons/BrushOutlined";
import Button from "@material-ui/core/Button";
import NoteService from "../../Services/noteServices";

const service = new NoteService();

export default function Note(props) {
  const [isToggled, setIsToogled] = useState(true);
  const toggle = () => {
    setIsToogled(false);
  };
  const closeToggle = () => {
    setIsToogled(true);
  };

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [color, setColor] = useState("#fff");

  const userNote = () => {
    closeToggle();
    if (title !== "") {
      let formData = new FormData();
      formData.set("title", title);
      formData.set("description", content);
      formData.set("color", color);
      service
        .userNote(formData, localStorage.getItem("userToken"))
        .then((result) => {
          console.log(result);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <div className="addNote">
      {isToggled ? (
        <div className={NoteCss.textContainer}>
          <div className={NoteCss.main_note} onClick={toggle}>
            <InputBase
              className={NoteCss.basicnote}
              placeholder="Take a Note"
            />
            <div className={NoteCss.note_icons}>
              <CheckBoxOutlinedIcon />
            </div>
            <div className={NoteCss.note_icons}>
              <BrushOutlinedIcon />
            </div>
            <div className={NoteCss.note_icons}>
              {" "}
              <ImageOutlinedIcon />{" "}
            </div>
          </div>
        </div>
      ) : (
        <div
          className={NoteCss.noteContainer}
          style={{ backgroundColor: color }}
        >
          {" "}
          {/*style */}
          <div className={NoteCss.note}>
            <div className={NoteCss.main_note2}>
              <InputBase
                className={NoteCss.basicnote2}
                multiline="true"
                placeholder="Title"
                fullWidth
                onChange={(e) => setContent(e.target.value)}
              />
            </div>
            <div className={NoteCss.main_note2}>
              <InputBase
                className={NoteCss.basicnote2}
                multiline="true"
                placeholder="Take a note..."
                fullWidth
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className={NoteCss.main_note3}>
              <IconFun setBackColor={setColor} noteid={""} />
              <div
                className={NoteCss.Onclose}
               
              >
                <Button  onClick={() => {
                  userNote();
                }}>close</Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
