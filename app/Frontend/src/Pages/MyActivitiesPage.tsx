import axios from 'axios'
import React, { useContext, useEffect } from 'react'
import {UserContext} from '../Context/UserContext';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      margin: 'auto',
      maxWidth: 500,
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
  }));


export default function MyActivitiesPage() {
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
                        Canteen A
                        </Typography>
                        <Typography variant="body2" gutterBottom>
                        Chicken Basil with Egg
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                        Order ID: 112546
                        </Typography>
                        </Grid>
                    <Grid item>
                    <Typography variant="subtitle1">฿ 40.00</Typography>
                    </Grid>
                </Grid>
                <Grid item>
                    <Typography variant="body2" style={{ cursor: 'pointer' }}>
                    Reorder
                    </Typography>
                </Grid>
            </Grid>
        </Grid>
    </Paper>
    <Paper className={classes.paper}>
        <Grid container wrap="nowrap" spacing={2}>
            <Grid item>
                <img className={classes.img} alt="complex" src="https://picsum.photos/100/100" />
            </Grid>
            <Grid item xs zeroMinWidth>
                <Grid item xs container direction="column" spacing={1}>
                    <Grid item xs>
                        <Typography gutterBottom variant="subtitle1">
                        Canteen B
                        </Typography>
                        <Typography variant="body2" gutterBottom>
                        Seafood fried rice
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                        Order ID: 156423
                        </Typography>
                        </Grid>
                    <Grid item>
                    <Typography variant="subtitle1">฿ 60.00</Typography>
                    </Grid>
                </Grid>
                <Grid item>
                    <Typography variant="body2" style={{ cursor: 'pointer' }}>
                    Reorder
                    </Typography>
                </Grid>
            </Grid>
        </Grid>
    </Paper>
    <Paper className={classes.paper}>
        <Grid container wrap="nowrap" spacing={2}>
            <Grid item>
                <img className={classes.img} alt="complex" src="https://picsum.photos/100/100" />
            </Grid>
            <Grid item xs zeroMinWidth>
                <Grid item xs container direction="column" spacing={1}>
                    <Grid item xs>
                        <Typography gutterBottom variant="subtitle1">
                        Canteen C
                        </Typography>
                        <Typography variant="body2" gutterBottom>
                        Spaghetti Carbonara
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                        Order ID: 156584
                        </Typography>
                        </Grid>
                    <Grid item>
                    <Typography variant="subtitle1">฿ 50.00</Typography>
                    </Grid>
                </Grid>
                <Grid item>
                    <Typography variant="body2" style={{ cursor: 'pointer' }}>
                    Reorder
                    </Typography>
                </Grid>
            </Grid>
        </Grid>
    </Paper>
    <Paper className={classes.paper}>
        <Grid container wrap="nowrap" spacing={2}>
            <Grid item>
                <img className={classes.img} alt="complex" src="https://picsum.photos/100/100" />
            </Grid>
            <Grid item xs zeroMinWidth>
                <Grid item xs container direction="column" spacing={1}>
                    <Grid item xs>
                        <Typography gutterBottom variant="subtitle1">
                        Canteen D
                        </Typography>
                        <Typography variant="body2" gutterBottom>
                        Tonkatsu Set
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                        Order ID: 169423
                        </Typography>
                    </Grid>
                    <Grid item>
                    <Typography variant="subtitle1">฿ 60.00</Typography>
                    </Grid>
                </Grid>
                <Grid item>
                    <Typography variant="body2" style={{ cursor: 'pointer' }}>
                    Reorder
                    </Typography>
                </Grid>
            </Grid>
        </Grid>
    </Paper>
        
      
    </div>
    )
}
