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

const usersBackendURL = "http://localhost:3000";

const styles = theme => ({
  main: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
    [theme.breakpoints.up(400 + theme.spacing(3) * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing(5),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing(2)}px ${theme.spacing(3)}px ${theme.spacing(3)}px`,
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
    marginTop: theme.spacing(3),
  },
});

class LoginComponent extends Component {
  state = {
    form: {
      email: '',
      password: '',
    },
    formErrMsg: {
      email: '',
      password: '',
    },
    formValid: {
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

      default:
        break;
    }
    //Form err message set
    formErrMsg[fieldName] = message;
    this.setState({ formErrMsg: formErrMsg });
    //Form Valid set
    message === "" ? formValid[fieldName] = true : formValid[fieldName] = false;
    formValid.buttonActive = formValid.email && formValid.password;
    this.setState({ formValid: formValid });
  }

  submitSignIn = (e) => {
    e.preventDefault();
    this.setState({successResponse:"",errorMessage:"",returnMessage:""})
    const userLoginData = { uEmail: this.state.form.email, uPass: this.state.form.password };
    axios.post(usersBackendURL + '/login', userLoginData)
      .then(response =>{this.setState({ successResponse: response.data})
      sessionStorage.setItem("login",response.data.uProfile.uName);
      sessionStorage.setItem("msg","You are logged in Go to Dashboard")
      window.location.reload(false)
      })
      .catch(error => {
        this.setState({ errorMessage: error.response ? error.response.data.message : error.message })
      })
  }

  render() {
    const { email, password } = this.state.form;
    const { formErrMsg } = this.state
    const { classes } = this.props;
    return (
      <React.Fragment>
        <br/>
        <h4 className="text-success text-center">{sessionStorage.getItem("msg")}</h4>
        <div className="col-md-4 offset-4">
          <main className={classes.main}>
            <CssBaseline />
            <Paper className={classes.paper}>
              <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Please login to continue
              </Typography>

              <form className={classes.form} onSubmit={this.submitSignIn}>
                <FormControl margin="normal" required fullWidth>
                  <InputLabel htmlFor="uemail">Email address</InputLabel>
                  <Input autoComplete="email" autoFocus
                    id="uEmail" name="email"
                    value={email} onChange={this.handleInputChange} />
                  <span className="text-danger">{formErrMsg.email}</span>
                </FormControl>

                <FormControl margin="normal" required fullWidth>
                  <InputLabel htmlFor="uPass">Password</InputLabel>
                  <Input name="password" type="password" value={password}
                    onChange={this.handleInputChange} id="uPass"
                    autoComplete="current-password" />
                  <span className="text-danger">{formErrMsg.password}</span><br />
                </FormControl>

                <Button
                  id="logButton"
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  disabled={!this.state.formValid.buttonActive}
                >Login
              </Button>

              </form><br />
              <Link to="/register" exact={"true"} onClick={this.handleClick}>New to Hoopla? Create an account</Link><br />
              {this.state.errorMessage ? (<div className={'text-danger'}>{this.state.errorMessage}</div>) :
                sessionStorage.getItem("msg") && <div className="text-success">{sessionStorage.getItem("msg")}</div>}
            </Paper>
          </main>
        </div>
      </React.Fragment>
    )
  }
}

export default withStyles(styles)(LoginComponent)