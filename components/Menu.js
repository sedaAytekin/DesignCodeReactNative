import React from 'react';
import styled from 'styled-components';
import { TouchableOpacity, Dimensions, Animated } from 'react-native';
import MenuItem from "./MenuItem";
import Icon from 'react-native-ionicons'
import { connect } from 'react-redux';

const screenWidth = Dimensions.get("window").width;
var cardWidth = screenWidth;

if (screenWidth > 500){
    cardWidth = 500
}

function mapStateToProps(state) {
    return { action : state.action };
}

function mapDispatchToProps(dispatch) {
    return{
        closeMenu : () => dispatch({
            type : "CLOSE_MENU"
    })
    }
}

const screenHeight = Dimensions.get("window").height;
class Menu extends React.Component{

    state = {
        top : new Animated.Value(screenHeight)
    };


    toggleMenu = () =>{
        //reduxta action değerine bakılıyor. State openmenuye eşitse, menuyu acıyoruz.
        if (this.props.action == "openMenu"){
            Animated.spring(this.state.top, {
                //buradaki değer arttıkça menu aşağpı iner
                toValue : 0
            }).start();
        }

        if (this.props.action == "closeMenu"){
            Animated.spring(this.state.top, {
                toValue: screenHeight
            }).start();
        }

    };
    //bu method sadece bir kez çalışır
    componentDidMount() {
        this.toggleMenu();
    }
    componentDidUpdate() {
        this.toggleMenu();
    }

    render(){
        return(
            <AnimatedContainer style = {{ top : this.state.top}}>
                <Cover>
                    <Image source = {require('../assets/background2.jpg')}/>
                    <Title>Meng To</Title>
                    <SubTitle> Designer at Design+Code</SubTitle>
                </Cover>
                <TouchableOpacity onPress = {this.props.closeMenu}
                                  style = {{position : "absolute",
                    top:120,
                    zIndex : 1,
                    left:"50%",
                    marginLeft:-22}}>
                <CloseView>
                    <Icon name={"ios-close"} size={44} color="#546bfb" />
                </CloseView>
                </TouchableOpacity>
                <Content>
                    {items.map((item, index) => (
                            <MenuItem  key = {index}
                                       icon = {item.icon}
                                       title = {item.title}
                                       text = {item.text}
                            />
                    )
                    )}

                </Content>
            </AnimatedContainer>

        )
    }
}
export default connect(mapStateToProps, mapDispatchToProps) (Menu);

const items =[
    {
        icon : "ios-settings",
        title : "Account",
        text : "settings"
    },
    {
        icon : "ios-card",
        title : "Billing",
        text : "payments"
    },
    {
        icon : "ios-compass",
        title : "Learn React",
        text : "start course"
    },
    {
        icon : "ios-exit",
        title : "Log Out",
        text : "see you soon"
    },
]


const Image = styled.Image`
    width: 100%;
    height:100%;
    position:absolute;
`;
const Title = styled.Text`
    color:white;
    font-size:24;
    font-weight:600;
`;
const SubTitle = styled.Text`
    font-size:13;
    color : rgba(255,255,255,0.5);
    margin-top:8;
`;

const Container = styled.View`
    position:absolute;
    background:white;
    width:${cardWidth};
    height:100%;
    z-index:100;
`;
const Cover = styled.View`
    height:142;
    background:black;
    justify-content: center;
    align-items:center;
`;

const Content = styled.View`
    height:${screenHeight};
    background:#f0f3f5;
    padding : 50px;
`;

const CloseView = styled.View`
    height:44;
    background:white;
    width:44;
    justify-content : center;
    align-items: center;
    border-radius:22;
    box-shadow : 0 5px 10px rgba(0,0,0,0.15);
`;

const AnimatedContainer = Animated.createAnimatedComponent(Container);