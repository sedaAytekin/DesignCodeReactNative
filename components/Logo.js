import React from 'react';
import styled from 'styled-components';

const Logo = props => (
    <Container>
         <Image source = {props.image}/>
         <Text>{props.text}</Text>


    </Container>

)
export default Logo

const Container = styled.View`
   flex-direction :row;
   background: white;
   padding:12px 16px 12px;
   height:60;
   border-radius:10;
   box-shadow: 0 5px 10px rgba(0,0,0,0.05);
   align-items:center;
   margin: 0 8px
`;
const Image = styled.Image`
     width : 36;
     height: 36;
`;
const Text = styled.Text`
    font-weight : 600;
    font-size:17;
    margin-left:8
`;