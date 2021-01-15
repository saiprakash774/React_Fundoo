import React from "react";
import "./Toolbar.css";
import KeepLogo from "../assets/KeepLogo.png";
import MenuOutlinedIcon from "@material-ui/icons/MenuOutlined";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import RefreshOutlinedIcon from "@material-ui/icons/RefreshOutlined";
import ViewAgendaOutlinedIcon from "@material-ui/icons/ViewAgendaOutlined";
import SettingsOutlinedIcon from "@material-ui/icons/SettingsOutlined";
import AppsOutlinedIcon from "@material-ui/icons/AppsOutlined";
import AccountCircleOutlinedIcon from "@material-ui/icons/AccountCircleOutlined";

const Toolbar = (props) => {
  const handleSearch = (e) => {
    props.setSearchTerm(e.target.value);
  };

  return (
    <div className="toolbar">
      <div className="container1">
        <div className="menuButton" onClick={props.drawerHandler}>
          <MenuOutlinedIcon fontSize="medium" />
        </div>
        <div className="keep_logo">
          <img src={KeepLogo} alt="keepLogo" />
        </div>
        <div className="logo-name">
          <span>Fundoo</span>
        </div>
      </div>
      <div className="container2">
        <div className="searchIcon">
          <SearchIcon />
        </div>
        <InputBase
          className="searchplaceholder"
          placeholder="Search…"
          onChange={handleSearch}
        />
      </div>
      <div className="container3">
        <div className="refresh">
          <RefreshOutlinedIcon />
        </div>
        <div className="view">
          <ViewAgendaOutlinedIcon />
        </div>
        <div className="settings">
          <SettingsOutlinedIcon />
        </div>
      </div>
      <div className="container4">
        <div className="apps_outline">
          <AppsOutlinedIcon />
        </div>
        <div className="account_circle">
          <AccountCircleOutlinedIcon />
        </div>
      </div>
    </div>
  );
};

export default Toolbar;
