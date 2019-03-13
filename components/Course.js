import React from 'react';
import styled from 'styled-components';
import { Dimensions } from 'react-native';

const screenWidth = Dimensions.get("window").width;



function getCourseWidth(screenWidth) {
    var cardWidth = screenWidth - 40;
    //ipad ise ekranda cok buyuk durmasını istemiyoruz.
    if (screenWidth >= 768){
        cardWidth = (screenWidth - 60) /2;
    }
    if (screenWidth >= 1024){
        cardWidth = (screenWidth - 80)/3;
    }
    return cardWidth;
}
class Course extends React.Component{

    state = {
        cardWidth : getCourseWidth(screenWidth)
    };

    componentDidMount(): void {
        Dimensions.addEventListener("change", this.adaptLayout)
    };
    adaptLayout = dimensions => {
        this.setState({
            cardWidth : getCourseWidth(dimensions.window.width)
        });
    };
    render(){
        return(
            <Container style = {{ width : this.state.cardWidth }}>
                <Cover>
                    <Image source ={this.props.image}/>
                    <Logo source = {this.props.logo} resizeMode={"contain"}/>
                    <Subtitle>{this.props.subtitle}</Subtitle>
                    <Title>{this.props.title}</Title>
                </Cover>
                <Content>
                    <Avatar source ={this.props.avatar}/>
                    <Caption>{this.props.caption}</Caption>
                    <Author>Taught by {this.props.author}</Author>
                </Content>

            </Container>
        );
    }
}
export default Course;

const Subtitle = styled.Text`
    font-size:15;
    font-weight:500;
   text-transform : uppercase;
   color: rgba(255,255,255,0.8);
   margin-left:20;
`;

const Avatar = styled.Image`
  width:32;
  height:32;
  top:20;
  left:20;
  border-radius:16;
  position:absolute;
`;
const Logo = styled.Image`
 width:48;
  height:48;
  position:absolute
  top:90;
  left:50%;
margin-left:-24;
`;
const Image = styled.Image`
    width:100%;
    height:100%;
position:absolute;
`;
const Cover = styled.View`
 height:260;
 border-top-left-radius:14;
 border-top-right-radius:14;
overflow:hidden;
justify-content:flex-end;

`;
const Caption = styled.Text`
    font-size:14;
    color : #3c4560;
    font-weight:500;
 
`;
const Content = styled.View`
 padding-left:62;
 justify-content:center;
height:75;
`;
const Container = styled.View`
  width:335;
  height:335;
  background:white;
  margin:10px 20px;
  border-radius:14;
  box-shadow:0 10px 20px rgba(0,0,0,0.15);
`;
const Title = styled.Text`
font-size:24;
color:white;
font-weight:600;
margin-top:4;
margin-bottom:20;
margin-left:20;
width : 170;

`;
const Author = styled.Text`
 font-size:13;
 color:#b8bece;
 font-weight:500;
 margin-top:4;
`;