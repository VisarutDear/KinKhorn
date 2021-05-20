
import axios from 'axios'
import React, { useContext, useEffect } from 'react'
import {UserContext} from '../Context/UserContext';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
// import Timeline from '@material-ui/lab/Timeline';
// import TimelineItem from '@material-ui/lab/TimelineItem';
// import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
// import TimelineConnector from '@material-ui/lab/TimelineConnector';
// import TimelineContent from '@material-ui/lab/TimelineContent';
// import TimelineOppositeContent from '@material-ui/lab/TimelineOppositeContent';
// import TimelineDot from '@material-ui/lab/TimelineDot';
// import FastfoodIcon from '@material-ui/icons/Fastfood';
// import LaptopMacIcon from '@material-ui/icons/LaptopMac';
// import HotelIcon from '@material-ui/icons/Hotel';
// import RepeatIcon from '@material-ui/icons/Repeat';
// import ButtonBase from '@material-ui/core/ButtonBase';

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



export default function HistoryPage() {
    const userContext = useContext(UserContext);
    const params = { 'id' : userContext.user.user_id};
    const classes = useStyles();
    // const params = { 'id' : '---userId---'};
    useEffect(() => {
        axios.get('http://143.198.208.245:9000/api/orders/queue/customer',{params}).then((res) => console.log('res :',res))
    }, [])
    return (
     <div className={classes.root}>
      <Paper className={classes.paper}>
        <Grid container wrap="nowrap" spacing={2}>
            <Grid item>
                <img className={classes.img} alt="complex" src="https://picsum.photos/100/100" />
            </Grid>
            <Grid item xs zeroMinWidth>
                <Grid item xs container direction="column" spacing={1}>
                    <Grid item xs>
                        <Typography gutterBottom variant="subtitle1">
                        Canteen Name
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                        Order ID: 112546
                        </Typography>
                        </Grid>
                </Grid>
                <Grid item>
                    <Typography variant="body2" style={{ cursor: 'pointer' }}>
                    Rate Order
                    </Typography>
                </Grid>
            </Grid>
        </Grid>
    </Paper>
    <Paper className={classes.paper}>
        <Grid container wrap="nowrap" spacing={2}>
            <Grid item xs zeroMinWidth>
                <Grid item xs container direction="column" spacing={1}>
                    <Grid item xs>
                        <Typography variant="body2" gutterBottom>
                        Where: Canteen Name
                        </Typography>
                        <Typography variant="body2" gutterBottom>
                        To: HM Building
                        </Typography>
                        </Grid>
                </Grid>
                <Grid item>
                </Grid>
            </Grid>
        </Grid>
    </Paper>
    <Paper className={classes.paper}>
        <Grid container wrap="nowrap" spacing={2}>
            <Grid item xs zeroMinWidth>
                <Grid item xs container direction="column" spacing={1}>
                    <Grid item xs>
                        <Typography gutterBottom variant="subtitle1">
                            <Box fontWeight="fontWeightBold" m={1}>
                                Order Summary
                            </Box>
                        </Typography>
                        <Typography variant="body2" gutterBottom>
                        1x Spaghetti Carbonara          60
                        </Typography>
                        <Typography variant="body2" gutterBottom>
                        1x Seafood Fried Rice          60
                        </Typography>
                        <Typography variant="body2" gutterBottom>
                        1x Pork Basil with Egg       60
                        </Typography>
                        <Typography variant="body2" gutterBottom>
                        1x Curry Rice        60
                        </Typography>
                        </Grid>
                </Grid>
                <Grid item>
                </Grid>
            </Grid>
        </Grid>
    </Paper>
    <Paper className={classes.paper}>
        <Grid container wrap="nowrap" spacing={2}>
            <Grid item xs zeroMinWidth>
                <Grid item xs container direction="column" spacing={1}>
                    <Grid item xs>
                        <Typography variant="body2" gutterBottom>
                        Subtotal ฿240
                        </Typography>
                        <Typography variant="body2" gutterBottom>
                        Delivery Fee ฿10
                        </Typography>
                        <Typography gutterBottom variant="subtitle1">
                        Total ฿250
                        </Typography>
                    </Grid>
                    <Grid item>
                    </Grid>
                </Grid>
                <Grid item>
                </Grid>
            </Grid>
        </Grid>
    </Paper>
        
      
    </div>
    )
}