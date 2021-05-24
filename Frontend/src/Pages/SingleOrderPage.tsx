
import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../Context/UserContext';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import * as apicall from '../api/apicall';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    margin: 'auto',
    maxWidth: 500,
    //   padding: '6px 16px',
  },
  image: {
    width: 128,
    height: 128,
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  },
  secondaryTail: {
    backgroundColor: theme.palette.secondary.main,
  },
}));

const SingleOrderPage = ({ currentOrder }: any) => {
  const userContext = useContext(UserContext);
  const classes = useStyles();
  const order = currentOrder.currentOrder;
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalItems, setTotalItems] = useState(0);

  console.log('currentOrder : ', order);

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

  const handleDone = () => {
    apicall
      .changeStatus(order._id, 'complete')
      .then((res) => console.log('res done : ', res))
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div style={{ width: '100%' }} className={classes.root}>
        <Paper className={classes.paper}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Box fontWeight="fontWeightLight" m={-0.5}>
                {order._id}
              </Box>
            </Grid>
            {/* <Grid item xs={1}>
        <Typography variant="body2">
          <Box fontWeight="fontWeightBold" >
              {totalPrice}
              </Box>
              </Typography>
              
        
        </Grid> */}
            <Grid item xs={4}>
              {/* <Typography variant="body2">
          <Box fontWeight="fontWeightBold" >
              Order for {order.userId}
              </Box>
              </Typography> */}
            </Grid>
            <Grid item xs={7}>
              <Typography variant="body2">
                <Box textAlign="right">{/* {order.userId} */}</Box>
              </Typography>
              <Typography variant="body2">
                {/* <Box textAlign="right"> */}
                {/* 60 */}
                {/* </Box> */}
              </Typography>
            </Grid>
          </Grid>
        </Paper>
        <Paper className={classes.paper}>
          <Grid container wrap="nowrap" spacing={2}>
            <Grid item xs zeroMinWidth>
              <Grid item xs container direction="column" spacing={1}>
                <Grid item xs>
                  <Typography variant="body2" gutterBottom>
                    <i className="fas fa-map-marker-alt" /> Canteen {order.area}
                  </Typography>
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
                  {menu.qty} ||
                  {menu.name} ||
                  {menu.price}
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
                VAT (7%)
              </Box>
            </Grid>
            <Grid item xs={2}>
              <Typography variant="body2">
                <Box textAlign="right">{totalPrice}</Box>
              </Typography>
              <Typography variant="body2">
                <Box textAlign="right">{totalPrice * 0.07}</Box>
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
                <Box textAlign="right">{totalPrice * 0.07 + totalPrice}</Box>
              </Typography>
            </Grid>
            <Grid item></Grid>
          </Grid>
          <Grid item></Grid>
        </Paper>
        <Button variant='contained' color="primary" onClick={() => handleDone()}>DONE</Button>
      </div>
    </>
  );
};

const mapStateToProps = (state: any) => {
  return {
    currentOrder: state.shop.currentOrder,
  };
};

export default connect(mapStateToProps)(SingleOrderPage);
