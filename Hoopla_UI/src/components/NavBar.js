import React, { Component } from 'react';
import { Link} from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import axios from "axios";
import Home from './Home'
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import { alpha, withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
const url = "http://localhost:3000/search/";

const useStyles = theme => ({
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
});


class NavBar extends Component {
  state={
    searchData:"",
    searchObj:"",
    errorMessage:"",
    goback:""
  }
  getSearch=()=>{
    axios.get(url+this.state.searchData)
    .then((res)=>{
      this.setState({searchObj:res.data})
      sessionStorage.setItem("data",JSON.stringify(this.state.searchObj));
      return <Home></Home>
    })
    .catch(error => {
      this.setState({ errorMessage: error.response ? error.response.data.message : error.message })
    })
  }
  saveData=(event)=>{
    this.setState({searchData:event.target.value});
  }
  logOut=()=>{
    sessionStorage.removeItem("login");
    sessionStorage.removeItem("msg")
    alert("You will be logged out")
    window.location.reload(false)
  }
  render(){
    const { classes } = this.props;
    if(sessionStorage.getItem("login")!=null){
      return (
        <React.Fragment>
          <AppBar position="static">
            <Toolbar>
              <Link className="text-white" style={{fontSize:22,textDecoration:"none"}} to="/back">Hoopla</Link>
              {/* <form><input type="search" className="ml-3 form-control" placeholder="Search..." onChange={this.saveData}></input></form> */}
              <form>
              <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ 'aria-label': 'search' }}
                onKeyUp={this.saveData}
              />
            </div>
            </form>
              <h5 className="text-warning ml-auto">Welcome &nbsp;<span><i>{sessionStorage.getItem("login")}</i></span></h5>
              <Link  className="text-white ml-5" to="/cart"><IconButton style={{color:"white"}}><ShoppingCartIcon/></IconButton></Link>
              <Link className="text-white ml-5" style={{fontSize:18,textDecoration:"none"}} onClick={this.logOut} >Logout</Link> 
            </Toolbar>
          </AppBar>
          {this.getSearch()}
        </React.Fragment>
      );
    }
    else return (
        <React.Fragment>
          <AppBar position="static">
            <Toolbar>
              <Link className="text-white" style={{fontSize:22,textDecoration:"none"}} to="/back">Hoopla</Link>
              {/* <form><input type="text" className="ml-3 form-control" placeholder="Search..." onChange={this.saveData}></input></form> */}
              <form>
              <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ 'aria-label': 'search' }}
                onKeyUp={this.saveData}
              />
            </div>
            </form>
              <Link  className="text-white ml-auto" style={{fontSize:18,textDecoration:"none"}} to="/register" >Register</Link>
              <Link className="text-white ml-5" style={{fontSize:18,textDecoration:"none"}} to="/login" >Login</Link> 
            </Toolbar>
          </AppBar>
          {this.getSearch()}
        </React.Fragment>
      );
    }
}


export default withStyles(useStyles)(NavBar)
