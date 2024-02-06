import React,{Component} from 'react';
import Card from '@material-ui/core/Card';
import { Link,Redirect} from 'react-router-dom';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import withStyles from '@material-ui/core/styles/withStyles';
import StarIcon from '@material-ui/icons/Star';
import Avatar from '@material-ui/core/Avatar';
import { green } from '@material-ui/core/colors';

const styles = makeStyles=>({
  root: {
    maxWidth: 400,
  },
  media: {
    height: 250,
  },
  rounded:{
    color:'#fff',
    backgroundColor:green[500],
    width:'60px',
    height:'25px',
    borderRadius:'18px',
    
}
});

class CardDetails extends Component{
  constructor(props){
    super(props);
      this.state={
          card:this.props.obj,
          home:false,
          successMessage:""
 }
}
addToCart=()=>{
    this.setState({successMessage:"Successfully Added to Cart"});
}
render(){
  const { classes } = this.props;
      return <div className="row">
        <div className="col-4 mt-5 mb-5 ml-5">
            <Card className={classes.root}>
                <CardActionArea>
                <CardMedia
                className={classes.media}
                // image={require("../assets/img/"+this.state.card.image)}
                title="Contemplative Reptile"
            />
          </CardActionArea>
        </Card>
        </div>
        <div className="col-4 offset-3 mt-5 mb-2">
        <Card className={classes.root}>
          <CardActionArea>
            <CardContent>
              <h4><b>{this.state.card.pCategory}</b></h4>
              <h4>{this.state.card.pName}</h4>
              <br/>
              <h5>Seller&nbsp;{this.state.card.pSeller.s_Id}</h5>
              <br/>
              <h4>Description</h4>
              <h6>{this.state.card.pDescription}</h6>
              <h4>Specification</h4>
              <ul><li><b>Colour</b>&nbsp;{this.state.card.color}</li></ul>
              <h4>Rating&nbsp;<span className={classes.rounded} style={{fontSize:'18px'}}>{this.state.card.pRating}<StarIcon style={{fontSize:'16px',color:"white"}}/></span>
              </h4>
              <h4>Price</h4>
              <h4>&#8377;{Number(this.state.card.price*(1-this.state.card.pSeller.pDiscount)).toFixed(2)}</h4>
              <br/>
              <h5><del>&#8377;{this.state.card.price}</del></h5>
              <h4><span className="text-warning">{this.state.card.pSeller.pDiscount*100}&#37;</span>OFF &nbsp;+{this.state.card.pSeller.pShippingCharges}&nbsp;shipping charges</h4>
              <h4>Availability</h4>
              <h5>{this.state.card.pSeller.pQuantity}</h5>
              <button type="button" className="btn btn-primary" onClick={this.addToCart} id="addCart">ADD TO CART</button>
              <Link to="/" className="btn btn-warning ml-2">Go Back</Link>
              <div className="text-success text-center"><h5>{this.state.successMessage}</h5></div>
            </CardContent>
          </CardActionArea>
        </Card>
        </div>
    </div>
    }
}
export default withStyles(styles)(CardDetails)
