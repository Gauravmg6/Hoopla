import React,{Component} from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import ButtonBase from '@material-ui/core/ButtonBase';
import withStyles from '@material-ui/core/styles/withStyles';
import StarIcon from '@material-ui/icons/Star';
import Avatar from '@material-ui/core/Avatar';
import { green } from '@material-ui/core/colors';
import Detailed from './Detailed';
import Login from './Login';

const styles = makeStyles=>({
  root: {
    maxWidth: 300,
  },
  media: {
    height: 220,
  },
    rounded:{
        color:'#fff',
        backgroundColor:green[500],
        width:'45px',
        height:'21px',
        borderRadius:'16px',
        
    }
  });

class Carddata extends Component{
  constructor(props){
    super(props);
      this.state={
          cardList:this.props.obj,
          data:"",
 }
}
viewDetails=(data)=>{
    this.setState({data:data})
    console.log(sessionStorage.getItem("login"));
}
render(){
  const { classes } = this.props;
  if(this.state.data!=""){
    if(sessionStorage.getItem("login")!=null){
    return <Detailed obj={this.state.data}></Detailed>
    }
    else {
      alert("Login to continue");
    return <Login></Login>;
    }
  }
   else {return (
    <div className="row mx-5 px-5">
    {this.state.cardList.map((data)=>{
        return <div className="col-3 mt-5 mb-2">
        <Card className={classes.root}>
        <ButtonBase id="cardButton" onClick={()=>this.viewDetails(data)}>
          <CardActionArea>
            <CardMedia
              className={classes.media}
              // image={require("../assets/img/"+data.image)}
              title="Contemplative Reptile"
            />
            <CardContent>
              <div className="offset-10"><Avatar className={classes.rounded} varient="rounded"><div style={{fontSize:'16px'}}>{data.pRating}<StarIcon style={{fontSize:'16px',color:"white"}}/></div></Avatar></div>
              <div className="row">
              <div className="col-9">
                {data.pName}
              </div>
              <div className="col-3">
                <b>&#8377;{data.price}</b>
              </div>
              </div>
            </CardContent>
          </CardActionArea>
          </ButtonBase>
        </Card>
        </div>
    })}
    </div>
  );
   }
}
}
export default withStyles(styles)(Carddata)
