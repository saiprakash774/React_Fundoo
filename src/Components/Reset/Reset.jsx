import React, { Component } from "react";
import ResetStyle from "./Reset.module.css";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import UserService from "../../Services/userService";
import { Link } from "react-router-dom";

const service = new UserService();
const passwordRegex = RegExp(
  "^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?!(?:.*[!@#$%^&*]){2})[a-zA-Z0-9!@#$%^&*]{8,}$"
);
export default class reset extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: "",
      passwordErrFlag: false,
      passwordErrMsg: "",
      confirm: "",
      confirmErrFlag: false,
      confirmErrMsg: ""
    };
    this.toggleShow = this.toggleShow.bind(this);
   }
  
   toggleShow() {
     this.setState({ hidden: !this.state.hidden });
   }
 
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  validate = () => {
    this.setState({
      passwordErrFlag: false,
      passwordErrMsg: "",
      confirmErrFlag: false,
      confirmErrMsg: ""
    });

    let isvalid = false;
    if (this.state.password.length === 0) {
      this.setState({
        passwordErrFlag: true,
        passwordErrMsg: "password is Required !",
      });
      isvalid = true;
    }
    
    if (
      this.state.password.length > 0 &&
      !passwordRegex.test(this.state.password)
    ) {
      this.setState({
        passwordErrFlag: true,
        passwordErrMsg: "password is invalid !",
      });
      isvalid = true;
    }
    
    if (this.state.confirm.length === 0) {
        this.setState({
          confirmErrFlag: true,
          confirmErrMsg: "Confirmation is Required !",
        });
        isvalid = true;
      }
      if (this.state.password !== this.state.confirm) {
        this.setState({
          confirmErrFlag: true,
          confirmErrMsg: "Password does not match!",
        });
        isvalid = true;
      }
    return isvalid;
  };
  
  submit = (e) => {
    e.preventDefault();
    if (this.validate()) console.log("You have entered wrong password");
    else {
      console.log("reset password successful", this.state.password);
      let userData = {
        newPassword: this.state.password
      };
      const token=this.props.match.params.token;
      console.log(token);
      service
        .resetpassword(userData,token)
        .then((data) => {
          console.log(data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  render() {
    return (
      <div className={ResetStyle.Container}>
        <div className={ResetStyle.inner}>
          <div className={ResetStyle.header}>
            <div>
              <span className={ResetStyle.a1}>F</span>
              <span className={ResetStyle.a2}>u</span>
              <span className={ResetStyle.a3}>n</span>
              <span className={ResetStyle.a4}>d</span>
              <span className={ResetStyle.a5}>o</span>
              <span className={ResetStyle.a6}>o</span>
            </div>
          </div>
          <div>
            <span>Find Your Password</span>
          </div>
          <div className={ResetStyle.resettext}>Reset your Password</div>
          <div className={ResetStyle.resetpassword1}>
              <TextField
                error={this.state.passwordErrFlag}
                helperText={this.state.passwordErrMsg}
                type={this.state.hidden ? "text" : "password"}
                onChange={this.handleChange}
                size="medium"
                fullWidth
                label="Enter New Password"
                name="password"
                variant="outlined"
                required
              />
              </div>
              <div className={ResetStyle.resetpassword2}>
              <TextField
                error={this.state.confirmErrFlag}
                helperText={this.state.confirmErrMsg}
                type={this.state.hidden ? "text" : "password"}
                size="medium"
                onChange={this.handleChange}
                fullWidth
                label="Confirm Password"
                name="confirm"
                variant="outlined"
                required
              />
            </div>
            <div className={ResetStyle.checkbox}>
              <Checkbox onClick={this.toggleShow} color="primary" />
              <span>Show Password</span>
            </div>
            <div className={ResetStyle.resetbutton}>
              <Button variant="contained"  color="primary" onClick={this.submit} component={Link} to="/login">
                Submit
              </Button>
            </div>
          </div>
        </div>
    );
  }
}
