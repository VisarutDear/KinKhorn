import React, { useEffect, useState, useContext } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import pic from '../img/img_avatar3.png';
import User from '../Types/User.d';
import { UserContext } from '../Context/UserContext';
import { BsFillCaretDownFill } from "react-icons/bs";
import { Container, Row, Col } from 'react-grid-system';
import { Button, Card, Form, FormControl} from 'react-bootstrap';

const CanteenStyled = styled.div`
    cursor : pointer;
`;

const Droplist = styled.div`
  display : flex;
  width : 100%;
  flex-flow : column nowrap;
  margin-bottom : 0px;
  text-overflow: clip;
  white-space: nowrap;
`;

const ShopStyled = styled(Row)`
    display : flex;
    flex-flow : row;
    justify-content : space-between !important;
`;

interface ShopInfo {
    id : string;
    menu : any;
    owner : string;
    shop : string;
}

interface Menu {
    name : string;
    price : number;
}


function CafeteriaA() {
    const [homePageInfo,setHomePageInfo] = useState([]);
    const [isCanteenOpen,setIsCanteenOpen] = useState(false);
    const userContext = useContext(UserContext);

    const toggleCanteenDropdown = () => {
        setIsCanteenOpen((prevState) => !prevState);
      };
      
    const fetchShop = () => {
        axios.get('http://143.198.208.245:9000/api/shops/customer').then((res) => {
            console.log("shop ",res);
            console.log("set ",res.data.data);
            setHomePageInfo(res.data.data);
            // console.log("home ",homePageInfo);
            // console.log("map : ", homePageInfo[0].shop);
        })
    };
    useEffect(() => {
        fetchShop();
    }, []); 

    const ShopData = (
        <div>
            {homePageInfo.map((data : ShopInfo,i) => (
                <ShopStyled>
                    {data.shop} {data.menu.map((ele : Menu) => (
                    <div>
                    {ele.name} </div>))}
                    {data.menu.map((ele : Menu) => (
                    <div> price : {ele.price}</div>))}
                </ShopStyled>
            )
            )}
        </div>
    )

    return (
        <>
    <Form inline>
      <FormControl type="text" placeholder="Search" className="mr-sm-2" />
      <Button variant="outline-success">Search</Button>
    </Form>
        <Container>
            <Row>
                <Col>
                    <h1>
                    Cafeteria A
                    </h1>
                </Col>
            </Row>
            <Card>
                <Col>
                    <div>
                        {userContext.user.name}
                    </div>
                    <img src={userContext.user.picture} alt='pic'/>
                    {/* <p>
                        {homePageInfo}
                    </p> */}
                </Col>
            </Card>
            
            <CanteenStyled onClick = {toggleCanteenDropdown}><Button>Canteen <BsFillCaretDownFill/></Button>  </CanteenStyled>
            {isCanteenOpen && (
                <Droplist>
                    <a href = '/cafeteriaA'>Cafeteria A</a>
                    <a href = '/cafeteriaC'>Cafeteria C</a>
                    <a href = '/cafeteriaJ'>Cafeteria J</a>
                    <a href = '/cafeteriaIT'>Cafeteria IT</a>
                    <a href = '/cafeteriaL'>Cafeteria L</a>
                </Droplist>
            )}
            {ShopData}
            </Container>
        </>
    );

}

export default CafeteriaA;
