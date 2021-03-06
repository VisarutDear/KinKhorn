import axios from "axios";
import React, { useContext, useEffect, Component,useState } from "react";
import { UserContext } from "../Context/UserContext";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { connect } from 'react-redux';
import { render } from 'react-dom'; 

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    margin: "auto",
    maxWidth: 500,
    //   padding: '6px 16px',
  },
  image: {
    width: 128,
    height: 128,
  },
  img: {
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%",
  },
  secondaryTail: {
    backgroundColor: theme.palette.secondary.main,
  },
}));

const HistoryPage = ({currentOrder} : any ) => {
  const userContext = useContext(UserContext);
  const classes = useStyles();
  console.log(currentOrder)
  const order = currentOrder
  console.log('currentOrder : ',order);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalItems, setTotalItems] = useState(0);  

  useEffect(() => {
    let items = 0;
    let price = 0;

    order.orderList.forEach((item: any) => {
      items += item.qty;
      price += item.qty * item.price;
    });

    setTotalItems(items);
    setTotalPrice(price);
  }, [order, totalPrice, totalItems, setTotalPrice, setTotalItems]);
  
  // const MockData = [{
  //   _id : "1234",
  //   orderList : [{
  //     qty : 1,
  //     name : "isiam",
  //     price : 20,
  //     qty : 1,
  //   },],
  //   orderTime : '11:27:19',
  //   receiveTime : '11:29:19',
  //   shopId : "notaccept",
  //   userId : "63413",
  //   shopname : "shopname"
  // }]
  const VAT = totalPrice * 0.07
  return (
    <div style={{ width: "100%" }} className={classes.root}>
      <Paper className={classes.paper}>
        <Grid container wrap="nowrap" spacing={2}>
          <Grid item>
            <img
              className={classes.img}
              alt="complex"
              src="https://picsum.photos/100/100"
            />
          </Grid>
          <Grid item xs zeroMinWidth>
            <Grid item xs container direction="column" spacing={1}>
              <Grid item xs>
                <Typography gutterBottom variant="subtitle1">
                  {order.shopId}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Order ID: {order._id}
                </Typography>
              </Grid>
            </Grid>
            {/* <Grid item>
              <Typography variant="body2" style={{ cursor: "pointer" }}>
                Rate Order
              </Typography>
            </Grid> */}
          </Grid>
        </Grid>
      </Paper>
      <Paper className={classes.paper}>
        <Grid container wrap="nowrap" spacing={2}>
          <Grid item xs zeroMinWidth>
            <Grid item xs container direction="column" spacing={1}>
              <Grid item xs>
                <Typography variant="body2" gutterBottom>
                <i className="fas fa-map-marker-alt"/> Canteen {order.area}
                </Typography>
                {/* <Typography variant="body2" gutterBottom>
                  To: HM Building
                </Typography> */}
              </Grid>
            </Grid>
            <Grid item></Grid>
          </Grid>
        </Grid>
      </Paper>
      <Paper className={classes.paper}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
        <Box fontWeight="fontWeightBold" m={-0.5}>
          Order Summary
        </Box>
        </Grid>
        {order.orderList.map((menu: any) => {
              return (
                <>
                <Grid container spacing={2} >
                <Grid item xs={2} style = {{paddingLeft : '16px',fontWeight : 'bold'}}>
                  {menu.qty}x
                </Grid>
                <Grid item xs={7}>{menu.name}</Grid>
                <Grid item xs={3}>{menu.price}</Grid>
                </Grid>
                </>
              );
            })}
      </Grid>
      </Paper>
      <Paper className={classes.paper}>
      <Grid container spacing={2}>
      <Grid item xs={10}>
        <Box fontWeight="fontWeightLight" m={-0.5}>
          Subtotal
        </Box>
        <Box fontWeight="fontWeightLight" m={-0.5}>
          Delivery Fee
        </Box>
        </Grid>
              <Grid item xs={2}>
              <Typography variant="body2">
              <Box textAlign="right">
                {totalPrice}
                </Box>
              </Typography>
              <Typography variant="body2">
              <Box textAlign="right">
              {VAT.toFixed(2)}
                </Box>
              </Typography>
              
        </Grid>
        <Grid item xs={10}>
        <Typography variant="body2">
              <Box fontWeight="fontWeightBold" m={-0.5}>
          Total
        </Box>
        </Typography>
        </Grid>
        <Grid item xs={2}>
              <Typography variant="body2">
              <Box textAlign="right">
              {totalPrice * 0.07 + totalPrice}
                </Box>
              </Typography>
              </Grid>
              <Grid item></Grid>
            </Grid>
            <Grid item></Grid>
          {/* </Grid> */}
        {/* </Grid> */}
      </Paper>
    </div>
  );
}

const mapStateToProps = (state : any) => {
  return {
    currentOrder: state.shop.currentOrder,
  };
};

export default connect(mapStateToProps)(HistoryPage);