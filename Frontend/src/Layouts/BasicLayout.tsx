import React, { Component, useEffect, useState, useContext } from 'react';
import { Route, Link } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import pic from '../img/img_avatar3.png';
import User from '../Types/User.d';
import { UserContext } from '../Context/UserContext';

export type Props = {
    children: React.ReactNode;
}
function BasicLayout({children} : Props): JSX.Element {
    return (
        <>
        <div>
            This is Layout
        </div>
        {children}
        </>

    );

}

export default BasicLayout;
