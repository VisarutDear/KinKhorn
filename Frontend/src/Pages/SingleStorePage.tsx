import react, { useState } from 'react';
import Button from '@material-ui/core/Button';
import CreateIcon from '@material-ui/icons/Create';
import {
    createMuiTheme,
  FormControlLabel,
  Grid,
  makeStyles,
  Paper,
  Switch,
  Typography,
  withStyles,
} from '@material-ui/core';
// import styled from 'styled-components';

// import ColStyled from '../ColStyled';
// import Subtitle from '../Subtitle';
// import styles from './SingleKiosk.module.css';
// import {
//   loadCurrentItem,
//   addToCart,
// } from '../../Redux/Shopping/shopping-action';
// import { ShopType } from '../../Pages/CanteenPage';
import { connect } from 'react-redux';
import ColorLine from '../Components/ColorLine';
import Item from '../item/item';
// import SingleItem from '../../SingleItem/SingleItem';
import { Link } from 'react-router-dom';
import { green, red, blue } from "@material-ui/core/colors";
import { Card,IconButton, Fab } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  paper: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: theme.spacing(1),
    margin: 'auto',
    alignItems: 'center',
    maxWidth: 600,
    background: '#ededed',
    // background : '#d8a1a4',
  },
  switch: {
    // display : 'flex',
    // justifyContent : 'space-between',
    // padding: theme.spacing(1),
    margin: '8px 0px',
    // alignItems : 'center',
  },
  image: {
    borderRadius: '50%',
    width: '50px',
    margin: '8px',
  },
  outService: {
    color: '#f0ad4e',
    fontWeight: 'bold',
  },
  InService: {
    color: '#5cb85c',
    fontWeight: 'bold',
  },
}));

export default function SingleStorePage() {
  const classes = useStyles();
  const [state, setState] = useState({
    storeStatus: false,
  });
  
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  const InService = (
    <>
      <div className={classes.InService}>Open</div>
    </>
  );

  const OutService = (
    <>
      <div className={classes.outService}>Closed</div>
    </>
  );

  const CustomSwitch = withStyles({
    switchBase : {
      '&$checked' : {
        color : green[600],
      },
    '&$checked + $track' : {
      backgroundColor : green[300],
    },
    },
    checked : {},
    track : {},
  })(Switch);

  const MockData = [
    { name : "food1",
    price : 7,
    category: 'other',
    description : "drink desc 1",
    _id : "60324456tgdf"
    },
    { name : "food2",
    price : 14,
    category: 'other',
    description : "drink desc 1",
    _id : "60324456tgd2f"
    },
    { name : "food3",
    price : 16,
    category: 'other',
    description : "drink desc 1",
    _id : "603244356tgdf"
    },
     ]

  
    const Menu = (
      <>
        {MockData.map((ele: any) => {
          // console.log('ele : ', ele);
          return (
            <>
              <Grid item key={ele._id} xs={12} sm={4} style={{ marginLeft: '16px' }}
              // onClick={() => loadCurrentItem(ele)}
              >
                <Link to ={`menu/${ele._id}`}>
                  {/* <SingleItem current={ele}/> */}
                  <Item item={ele}/>
                  {/* ... */}
                  <ColorLine color="#C1C7CF" />
                </Link>
              </Grid>
            </>
          );
        })}
      </>
    );
  

  return (
    <>
      <Paper>
        <Grid
          container
          direction="row"
          justify="space-between"
          alignItems="center"
        >
          <div
            style={{ display: 'flex', flexFlow: 'row', alignItems: 'center' }}
          >
            <img
              src="https://picsum.photos/200/200"
              className={classes.image}
            />
            <h4> GrabFood aroijung </h4>
          </div>

          <i className="fas fa-chevron-right" style={{ marginRight: '24px' }} />
        </Grid>

        <Paper className={classes.paper}>
          <div>Store Status</div>
          <FormControlLabel
            control={
              <CustomSwitch
                checked={state.storeStatus}
                onChange={handleChange}
                name="storeStatus"
              />
            }
            labelPlacement="start"
            label={state.storeStatus ? InService : OutService}
            className={classes.switch}
          />
        </Paper>
      {Menu}
      </Paper>

      <div style = {{ display : 'flex',flexFlow : 'column', alignItems : 'center', margin : '4px'}}>
                <Button
                  variant="contained"
                  color="default"
                  // href="#contained-buttons"
                  style = {{margin : '8px'}}
                  startIcon={<CreateIcon/>}
                >
                  Edit
                </Button>
                </div>

    </>
  );
          }