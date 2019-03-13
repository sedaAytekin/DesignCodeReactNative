import React from 'react';
import { ScrollView, TouchableOpacity, Animated, Easing, StatusBar, Platform } from 'react-native';
import styled from 'styled-components';
import Card from "../components/card";
import { NotificationIcon } from "../components/Icons";
import Logo from "../components/Logo";
import Course from "../components/Course";
import Menu from "../components/Menu";
import {connect} from 'react-redux';
import Avatar from "../components/Avatar";

function mapStateToProps(state) {
    return{ action: state.action, name : state.name};
}

function mapDispatchToProps(dispatch) {
    return{
        openMenu : () => dispatch({
            type : "OPEN_MENU"
        })
    }
}

class HomeScreen extends React.Component {

    //header:null yapıldığında navigatişon bar gösterilmiyor.
    static navigationOptions = {
      header : null
    };

    state = {
        scale : new Animated.Value(1),
        opacity : new Animated.Value(1)
    };

    componentDidUpdate() {
        this.toggleMenu()
    }
    componentDidMount(){

        StatusBar.setBarStyle("dark-content", true);
        if (Platform.OS == "android")
            StatusBar.setBarStyle("light-content", true);
    }

    toggleMenu = () =>{
        if (this.props.action == "openMenu" ){
            Animated.spring(this.state.scale, {
                toValue : 0.8,
                duration : 300,
                easing : Easing.in()
            }).start();
            Animated.spring(this.state.opacity, {
                toValue : 0.5
            }).start();

            StatusBar.setBarStyle("light-content", true);
        }

        if (this.props.action == "closeMenu"){
            Animated.timing(this.state.scale, {
                toValue : 1,
                duration: 300,
                easing : Easing.in()
            }).start();
            Animated.spring(this.state.opacity, {
                toValue : 1
            }).start();
            StatusBar.setBarStyle("dark-content", true);
        }
    };

    render() {
        return (
            <RootView>
                <Menu />
            <AnimatedContainer style = {{transform : [{ scale : this.state.scale}], opacity: this.state.opacity}}>
                <ScrollView style = {{height : "100%"}}>
                    <TitleBar>
                        <TouchableOpacity onPress={this.props.openMenu} style = {{position : "absolute", top:0, left : 20}}>
                        <Avatar />
                        </TouchableOpacity>
                        <Title>Welcome back,</Title>
                        <Name>{this.props.name}</Name>
                        <NotificationIcon
                            style={{position : "absolute" , right : 20, top:5}}
                        />
                    </TitleBar>
                    <ScrollView style ={{flexDirection :"row", padding:20, paddingLeft:20, paddingTop:20}}
                                horizontal={true}
                                showsHorizontalScrollIndicator={false}
                    >

                        {logos.map((logo, index) => (
                            <Logo key = {index}
                                  image = {logo.image}
                                  text = {logo.text}/>
                        ))}


                    </ScrollView>
                    <Subtitle> Continue Learning</Subtitle>
                    <ScrollView
                        horizontal = {true}
                        style = {{paddingBottom:30}}
                        showsHorizontalScrollIndıcator = {false}

                    >

                        {cards.map((card, index) => (
                            <TouchableOpacity key = {index} onPress = {() => {
                                this.props.navigation.push("Section", {
                                    section: card
                                });
                            }}>
                            <Card
                                  image = {card.image}
                                  caption = {card.caption}
                                  logo = {card.logo}
                                  subtitle = {card.subtitle}
                                  title = {card.title}

                            />
                            </TouchableOpacity>
                        ))}

                    </ScrollView>
                    <Subtitle>Popular Courses</Subtitle>

                    <CoursesContainer>
                    {courses.map((courses, index) => (
                        <Course
                            key={index}
                            title={courses.title}
                            author={courses.author}
                            logo={courses.logo}
                            subtitle={courses.subtitle}
                            avatar={courses.avatar}
                            caption={courses.caption}
                            image={courses.image}
                        />
                    ))}
                    </CoursesContainer>
                </ScrollView>
            </AnimatedContainer>
            </RootView>
        );
    }
}
export default connect(mapStateToProps, mapDispatchToProps) (HomeScreen);

const  CoursesContainer = styled.View`
    flex-direction :row;
    flex-wrap : wrap;
`;
const courses = [
    {
        title: "Prototype in InVision Studio",
        subtitle: "10 sections",
        image: require("../assets/background13.jpg"),
        logo: require("../assets/logo-studio.png"),
        author: "Meng To",
        avatar: require("../assets/avatar.jpg"),
        caption: "Design an interactive prototype"
    },
    {
        title: "React for Designers",
        subtitle: "12 sections",
        image: require("../assets/background11.jpg"),
        logo: require("../assets/logo-react.png"),
        author: "Meng To",
        avatar: require("../assets/avatar.jpg"),
        caption: "Learn to design and code a React site"
    },
    {
        title: "Design and Code with Framer X",
        subtitle: "10 sections",
        image: require("../assets/background14.jpg"),
        logo: require("../assets/logo-framerx.png"),
        author: "Meng To",
        avatar: require("../assets/avatar.jpg"),
        caption: "Create powerful design and code components for your app"
    },
    {
        title: "Design System in Figma",
        subtitle: "10 sections",
        image: require("../assets/background6.jpg"),
        logo: require("../assets/logo-figma.png"),
        author: "Meng To",
        avatar: require("../assets/avatar.jpg"),
        caption:
            "Complete guide to designing a site using a collaborative design tool"
    }

];

const cards = [
    {
        title : "React Native for Designers",
        image : require("../assets/background11.jpg"),
        caption : "React Native",
        logo : require('../assets/logo-react.png'),
        subtitle : "1 of 12 sections"

    },
    {
        title : "Styled Components",
        image : require("../assets/background12.jpg"),
        caption : "React Native",
        logo : require('../assets/logo-react.png'),
        subtitle : "2 of 12 sections"

    },
    {
        title : "Props and Icons",
        image : require("../assets/background13.jpg"),
        caption : "React Native",
        logo : require('../assets/logo-react.png'),
        subtitle : "3 of 12 sections"

    },
    {
        title : "Static Data and Loop",
        image : require("../assets/background14.jpg"),
        caption : "React Native",
        logo : require('../assets/logo-react.png'),
        subtitle : "4 of 12 sections"

    }
];

const logos = [
    {
        image : require("../assets/logo-framerx.png"),
        text  : "Framer X"
    },
    {
        image : require("../assets/logo-figma.png"),
        text  : "Figma"
    },
    {
        image : require("../assets/logo-studio.png"),
        text  : "Studio"
    },
    {
        image : require("../assets/logo-react.png"),
        text  : "React"
    },
    {
        image : require("../assets/logo-swift.png"),
        text  : "Swift"
    },
    {
        image : require("../assets/logo-sketch.png"),
        text  : "Sketch"
    }
];

const RootView = styled.View`
    flex : 1;
    background: black;
`;
const Subtitle = styled.Text`
    color:#b8bece;
    font-weight:600;
    font-size:15;
    margin-left:20;
    margin-top:20;
    text-transform: uppercase;
`;

const Container = styled.View`
  flex:1;
  background-color :  #f0f4f5;
  border-top-left-radius : 10px;
  border-top-right-radius: 10px;

`;
const Title = styled.Text`
  font-size :16;
  color :  #b8bece;
  font-weight:500;

`;
const Name = styled.Text`
  font-size :20;
  color :  #3c4560;
  font-weight:bold;
`;
const TitleBar = styled.View`
  width:100%;
  margin-top:50;
  padding-left:80;
`;

const AnimatedContainer = Animated.createAnimatedComponent(Container);