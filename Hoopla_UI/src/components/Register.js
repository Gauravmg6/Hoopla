import React, { Component } from "react";
import { Link } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import axios from "axios";
import Home from "./Home";

const usersBackendURL = "http://localhost:3000";

const styles = theme => ({
  main: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
    [theme.breakpoints.up(400 + theme.spacing(2) * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing(1),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing(2)}px ${theme.spacing(3)}px ${theme.spacing(2)}px`,
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    marginTop: theme.spacing(1),
  },
});

class RegisterComponent extends Component {
  state = {
    form: {
        userName:"",
        dob:"",
        mobileNumber:"",
        email: '',
        password: ''
    },
    formErrMsg: {
        userName:"",
        dob:"",
        mobileNumber:"",
        email: '',
        password: ''
    },
    formValid: {
        userName:false,
        dob:false,
        mobileNumber:false,
        email: false,
        password: false,
        buttonActive: false
    },
    successResponse: "",
    errorMessage: ""
  }


  handleInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ form: { ...this.state.form, [name]: value } });
    this.validateField(name, value);
  }

  validateField = (fieldName, value) => {
    var message;
    var { formErrMsg } = this.state;
    var { formValid } = this.state;

    switch (fieldName) {
      case 'email':
        let emailRegex = new RegExp(/^[A-z][A-z0-9.]+@[a-z]+\.[a-z]{2,3}$/);
        value === "" ? message = "Please enter your email id" : emailRegex.test(value) ? message = "" : message = "Email id format is wrong"
        break;

      case "password":
        let passRegex = new RegExp(/^(?=.*[A-Z])(?=.*[!@#$&*%&])(?=.*[0-9])(?=.*[a-z]).{7,20}$/);
        value === "" ? message = "Please enter your password" : passRegex.test(value) ? message = "" : message = "Invalid password"
        break
    
      case "userName":
        if(value===""){
          message="Please enter your Name"
        }
        else if(!(value.match(/^[a-zA-z]+([\s][a-zA-Z]+)*$/))){
          message="Only alphabets. Should not start and end with space"
        }
        else message = ""
        break

      case "dob":
        if(value===""){
          message="Please enter your DOB"
        }
        else if(!(new Date(value)<new Date())){
          message="Date should be before Today(s) Date"
        }
        else message = ""
        break

      case "mobileNumber":
        if(value===""){
          message="Please Enter Your Mobile Number"
        }
        else if(!( String(value)[0]!="0")){
          message="Should not Start With 0"
        }
        else if(!(value.length==10)){
          message="Mobile Number should be 10 digits"
        }
        else message = ""
        break

      default:
        break;
    }
    //Form err message set
    formErrMsg[fieldName] = message;
    this.setState({ formErrMsg: formErrMsg });
    //Form Valid set
    message === "" ? formValid[fieldName] = true : formValid[fieldName] = false;
    formValid.buttonActive = formValid.email && formValid.password && formValid.userName && formValid.dob && formValid.mobileNumber;
    this.setState({ formValid: formValid });
  }

  submitSignIn = (e) => {
    e.preventDefault();
    this.setState({successResponse:"",errorMessage:""})
    axios.post(usersBackendURL + '/register',this.state.form)
      .then(response => this.setState({ successResponse: response.data }))
      .catch(error => {
        this.setState({ errorMessage: error.response ? error.response.data.message : error.message })
      })
  }

  render() {
    const { email, password,userName,dob,mobileNumber } = this.state.form;
    const { formErrMsg } = this.state
    const { classes } = this.props;
  if(this.state.successResponse===""){
    return (
      <React.Fragment>
        <div className="col-md-4 offset-4">
          <main className={classes.main}>
            <CssBaseline />
            <Paper className={classes.paper}>
              <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Create account
              </Typography>

              <form className={classes.form} onSubmit={this.submitSignIn}>
                <FormControl margin="normal" required fullWidth>
                  <InputLabel htmlFor="userName">Username</InputLabel>
                  <Input autoComplete="userName" autoFocus
                    id="userName" type="text" name="userName"
                    value={userName} onChange={this.handleInputChange} />
                  <span className="text-danger">{formErrMsg.userName}</span>
                </FormControl>

                <FormControl margin="normal" required fullWidth>
                  DOB<Input name="dob" type="date" value={dob}
                    onChange={this.handleInputChange} id="dob"
                    autoComplete="DOB" />
                  <span className="text-danger">{formErrMsg.dob}</span>
                </FormControl>

                <FormControl margin="normal" required fullWidth>
                  <InputLabel htmlFor="mobileNumber">Mobile Number</InputLabel>
                  <Input name="mobileNumber" type="number" value={mobileNumber}
                    onChange={this.handleInputChange} id="mobileNumber"
                    autoComplete="mobile-number" />
                  <span className="text-danger">{formErrMsg.mobileNumber}</span>
                </FormControl>

                <FormControl margin="normal" required fullWidth>
                  <InputLabel htmlFor="email">Email Address</InputLabel>
                  <Input name="email" type="email" value={email}
                    onChange={this.handleInputChange} id="uEmail"
                    autoComplete="email-address" />
                  <span className="text-danger">{formErrMsg.email}</span>
                </FormControl>

                <FormControl margin="normal" required fullWidth>
                  <InputLabel htmlFor="password">Password</InputLabel>
                  <Input name="password" type="password" value={password}
                    onChange={this.handleInputChange} id="uPass"
                    autoComplete="password" />
                  <span className="text-danger">{formErrMsg.password}</span>
                </FormControl>

                <Button
                  id="regButton"
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  disabled={!this.state.formValid.buttonActive}
                >Register
              </Button>
              <div className="text-danger">{this.state.errorMessage}</div>
              </form><br />
              <Link to="/login" exact={"true"} onClick={this.handleClick}>Already Registeres? Login Here</Link><br />
            </Paper>
          </main>
        </div>
      </React.Fragment>
    )}
    else return <Home></Home>
  }
}

export default withStyles(styles)(RegisterComponent)