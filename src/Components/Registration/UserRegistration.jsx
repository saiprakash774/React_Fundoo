import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import classes from "./UserRegistration.module.css";
import logo from "../assets/account.svg";
import { Link } from "react-router-dom";
import UserService from "../../Services/userService";

 // import MuiAlert from '@material-ui/lab/Alert';
  // function Alert(props) {
  //   return <MuiAlert elevation={6} variant="filled" {...props} />;
  // }
const service = new UserService();
const nameRegex = RegExp("^[A-Z][a-z]{2,}$");
const emailRegex = RegExp(
  "^[a-zA-Z]+([\\d\\.\\+\\-][0-9a-zA-z]+)*@[\\da-zA-Z]+.[a-zA-Z]{2,4}(.[a-zA-Z]{2,3})*$"
);
const passwordRegex = RegExp(
  "^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?!(?:.*[!@#$%^&*]){2})[a-zA-Z0-9!@#$%^&*]{8,}$"
);
export class UserRegistration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect:null,
      hidden: false,
      firstName: '',
      firstNameErrFlag: false,
      firstNameErrMsg: '',
      lastName: '',
      lastNameErrFlag: false,
      lastNameErrMsg: "",
      email: "",
      emailErrFlag: false,
      emailErrMsg: "",
      password: "",
      passwordErrFlag: false,
      passwordErrMsg: "",
      confirm: "",
      confirmErrFlag: false,
      confirmErrMsg: "",
      res:"",
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
      firstNameErrFlag: false,
      firstNameErrMsg: "",
      lastNameErrFlag: false,
      lastNameErrMsg: "",
      emailErrFlag: false,
      emailErrMsg: "",
      passwordErrFlag: false,
      passwordErrMsg: "",
    });

    let isvalid = false;
    if (this.state.firstName.length === 0) {
      this.setState({
        firstNameErrFlag: true,
        firstNameErrMsg: "First Name is Required!",
      });
      isvalid = true;
    }

    if (this.state.lastName.length === 0) {
      this.setState({
        lastNameErrFlag: true,
        lastNameErrMsg: "Last Name is Required !",
      });
      isvalid = true;
    }
    if (this.state.email.length === 0) {
      this.setState({
        emailErrFlag: true,
        emailErrMsg: "email is Required !",
      });
      isvalid = true;
    }
    if (this.state.password.length === 0) {
      this.setState({
        passwordErrFlag: true,
        passwordErrMsg: "Password is Required !",
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
    if (
      this.state.firstName.length > 0 &&
      !nameRegex.test(this.state.firstName)
    ) {
      this.setState({
        firstNameErrFlag: true,
        firstNameErrMsg: "First Name is invalid !",
      });
      isvalid = true;
    }
    if (
      this.state.lastName.length > 0 &&
      !nameRegex.test(this.state.lastName)
    ) {
      this.setState({
        lastNameErrFlag: true,
        lastNameErrMsg: "Last Name is invalid !",
      });
      isvalid = true;
    }
    if (this.state.email.length > 0 && !emailRegex.test(this.state.email)) {
      this.setState({
        emailErrFlag: true,
        emailErrMsg: "Email is invalid !",
      });
      isvalid = true;
    }
    if (
      this.state.password.length > 0 &&
      !passwordRegex.test(this.state.password)
    ) {
      this.setState({
        passwordErrFlag: true,
        passwordErrMsg: "Password is invalid !",
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
    if (this.validate()) {
      console.log("login failed");
    } else {
      console.log("login successful", this.state.email, this.state.password);
      let userData = {
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        service: "advance",
        email: this.state.email,
        password: this.state.password,
      };
      service
        .registration(userData)
        .then((data) => {
          this.setState({
            snackbaropen: true,
            snackbarmsg: "User account created Successfully",
            res:"success"
          });
        })
        .catch((error) => {
          this.setState({ res:"error" });
        });
    }
  };
  render() {
    return (
      <div className={classes.MainContainer}>
        <div className={classes.Form}>
          <div className={classes.formhead}>
            <div>
              <span className={classes.a1}>F</span>
              <span className={classes.a2}>u</span>
              <span className={classes.a3}>n</span>
              <span className={classes.a4}>d</span>
              <span className={classes.a5}>o</span>
              <span className={classes.a6}>o</span>
            </div>
            <div>
              <span>Create Your Fundoo Account</span>
            </div>
          </div>
          <div className={classes.rowcontent}>
            <TextField
              className={classes.mr}
              size="small"
              fullWidth 
              error={this.state.firstNameErrFlag}
              helperText={this.state.firstNameErrMsg}
              label="First name"
              variant="outlined"
              onChange={this.handleChange}
              name="firstName"
              required
            />
            <TextField
              size="small"
              fullWidth 
              error={this.state.lastNameErrFlag}
              helperText={this.state.lastNameErrMsg}
              label="Last name"
              variant="outlined"
              name="lastName"
              onChange={this.handleChange}
              required
            />
          </div>
          <div className={classes.mail}>
            <TextField
              size="small"
              error={this.state.emailErrFlag}
              helperText={this.state.emailErrMsg}
              label="Enter Your Mail"
              fullWidth 
              margin="normal"
              onChange={this.handleChange}
              name="email"
              variant="outlined"
              required
            />
          </div>
          <div className={classes.text}>
            You'll need to confirm that this email belongs to you.
          </div>
          <div className={classes.rowcontent}>
            <TextField
              className={classes.mr}
              error={this.state.passwordErrFlag}
              helperText={this.state.passwordErrMsg}
              type={this.state.hidden ? "text" : "password"}
              onChange={this.handleChange}
              size="small"
              fullWidth 
              label="Password"
              name="password"
              variant="outlined"
              required
            />
            <TextField
              error={this.state.confirmErrFlag}
              helperText={this.state.confirmErrMsg}
              type={this.state.hidden ? "text" : "password"}
              size="small"
              onChange={this.handleChange}
              fullWidth 
              label="Confirm"
              name="confirm"
              variant="outlined"
              required
            />
          </div>
          <div className={classes.checkbox}>
            <Checkbox onClick={this.toggleShow} color="primary"/>
            <span>Show Password</span>
          </div>
          <div className={classes.button}>
            <Button component={Link} to="/login" color="primary">
              Sign in instead
            </Button>
            <Button variant="contained" color="primary" onClick={this.submit}>
              Submit
            </Button>
          </div>
        </div>
        <div className={classes.logo}>
          <img className={classes.google} src={logo} alt="logo" />
        </div>
      </div>
         );
  }
}
export default UserRegistration;
