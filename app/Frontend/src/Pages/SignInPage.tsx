import axios from 'axios';
import { SSL_OP_ALLOW_UNSAFE_LEGACY_RENEGOTIATION } from 'node:constants';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import logo from '../img/CIElogo.svg';
import Button from 'react-bootstrap/Button';

const Bg = styled.div`
background-color: white;
width : 100%;
height : 100%;
min-height : 100vh;
padding-top: 350px;
`;

const Flexcontainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 200px;s
  height: 200px;
  margin: auto;
`;

const StyledButton = styled(Button)`
  color: palevioletred;
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;
`;

const Wkk = styled.div`
font-size: 30px;
fontWeight:bold;
color:red;
`;

function SignInPage() {
  return (
    <Bg>
      <Flexcontainer>
        <Wkk >
          Welcome to Kin Khorn
          <img src={logo} alt = "cie-logo" style = {{width : '150px',height : '150px'}}/>
        </Wkk>
      </Flexcontainer>
      <StyledButton>
        <a href='auth/google'>Sign In using KMITL E-mail</a>
      </StyledButton>
    </Bg>
  );
}

export default SignInPage;
