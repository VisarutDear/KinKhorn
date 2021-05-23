import Button from '@material-ui/core/Button';
// import axios from 'axios';
// import React, { useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import styled from 'styled-components';
import { makeStyles } from "@material-ui/core/styles";
import DeleteIcon from '@material-ui/icons/Delete';
// import logo from '../images/kinkhorn.gif';



function SignInKioskPage() {
    
  return (
    <>
      <div
        className="content-wrapper"
        style={{ textAlign: 'center', backgroundSize: 'cover' }}
      >
        <div style={{ transform: 'translate(0%,50%)' }}>
          <img src= "https://d1hjxsusq6jw1u.cloudfront.net/Kinkhorn.gif" alt="Logo KK" width="250" height="160"></img>
          {/* <img src="./img/promo1.jpg" alt="Logo KK"></img> */}
          <div style={{ margin: '16px' }}>
            <div>WELCOME</div>
            <div>PLEASE LOGIN TO USE THE APP!</div>
          </div>
          <a href="https://kinkhorn.pongpich.xyz/oauth/google"> 
            {/* Sign In With KMITL */}
            <div style = {{ display : 'flex',flexFlow : 'column', alignItems : 'center', margin : '4px'}}>
                <Button
                  variant="contained"
                  color="primary"
                  // href="#contained-buttons"
                  style = {{margin : '8px'}}
                >
                  Sign In With KMITL
                </Button>
                <Button
                variant="contained"
                color="default"
                aria-label="contained primary button group"
                >
                  Guest Log In
                </Button>
            </div>
          </a>
        </div>
      </div>
    </>
  );
}

export default SignInKioskPage;