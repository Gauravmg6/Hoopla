import React, { Component } from 'react';
import Carousel from 'react-material-ui-carousel';
import { Link,BrowserRouter } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import axios from "axios";
import Cardview from './Cardview';
const url = "http://localhost:3000/";

class Home extends Component {
  constructor(props){
    super(props);
  this.state={
    category:"",
    cardData:"",
    errorMessage:""
  }
}
  getData = (data) => {
    this.setState({cardData:""});
    axios.get(url+data)
      .then(response => {this.setState({cardData: response.data})
      console.log(response.data)}
      )
      .catch(error => {
        this.setState({ errorMessage: error.response ? error.response.data.message : error.message })
      })
  }
  getCategory=(e)=>{
    e.preventDefault();
    var data=e.target.getAttribute("value");
    this.getData(data);
  }


  viewDetails=()=>{
    var object=JSON.parse(sessionStorage.getItem("data"));
    sessionStorage.removeItem("data")
    if(this.state.cardData!=""){
      return <Cardview obj={this.state.cardData}></Cardview>
    }
    else if(object!=null){
      return <Cardview obj={object}></Cardview>
    }
  }
  render() {
    if(this.state.cardData==="" && sessionStorage.getItem("data")==null){
     return (
      <React.Fragment>
        {/* Slider */}
        <AppBar position="static">
          <Toolbar>
            
            <Link name="category" className="text-white pl-5" style={{fontSize:22,textDecoration:"none"}} value="Electronics" onClick={this.getCategory}>ELECTRONICS</Link>
            <Link name="category" className="ml-auto text-white" style={{fontSize:22,textDecoration:"none"}} value="Shoes" onClick={this.getCategory} >SHOES</Link>
            <Link name="category" className="ml-auto text-white" style={{fontSize:22,textDecoration:"none"}} value="Furniture" onClick={this.getCategory} >FURNITURE</Link>
            <Link name="category" className="ml-auto text-white pr-5" style={{fontSize:22,textDecoration:"none"}} value="Clothing" onClick={this.getCategory}>CLOTHING</Link> 
          
          </Toolbar>
        </AppBar>
        <div style={{backgroundColor:"#DEE0FC"}}>
        {/* <Carousel id="carousel" animation="slide" navButtonsAlwaysVisible>
              <img src={require("../assets/img/clothing.png")} className="d-block offset-md-2 mt-4" width="1000" height="485" alt="Clothing Pic" />
              <img src={require("../assets/img/furnitures.png")} className="d-block offset-md-2 mt-4" width="1000" height="485" alt="Furniture Pic" />
              <img src={require("../assets/img/shoes.png")} className="d-block offset-md-2 mt-4" width="1000" height="485" alt="Shoes Pic" />
              <img src={require("../assets/img/mobiles.png")} className="d-block offset-md-2 mt-4" width="1000" height="485" alt="Mobiles Pic" />
        </Carousel> */}
        </div>
      </React.Fragment>
    );
     }
     else{
       return (
        <React.Fragment>
          {/* Slider */}
          <AppBar position="static">
            <Toolbar>
              
              <Link name="category" className="text-white pl-5" style={{fontSize:22,textDecoration:"none"}} value="Electronics" onClick={this.getCategory}>ELECTRONICS</Link>
              <Link name="category"  className="ml-auto text-white" style={{fontSize:22,textDecoration:"none"}} value="Shoes" onClick={this.getCategory} >SHOES</Link>
              <Link name="category" className="ml-auto text-white" style={{fontSize:22,textDecoration:"none"}} value="Furniture" onClick={this.getCategory} >FURNITURE</Link>
              <Link name="category" className="ml-auto text-white pr-5" style={{fontSize:22,textDecoration:"none"}} value="Clothing" onClick={this.getCategory}>CLOTHING</Link> 
            
            </Toolbar>
          </AppBar>
          <div style={{backgroundColor:"#DEE0FC"}}>
          {this.viewDetails()}
          </div>
        </React.Fragment>
      );
     }
  }
}

export default Home;