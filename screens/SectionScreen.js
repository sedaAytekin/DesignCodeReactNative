import React from 'react';
import styled from 'styled-components';
import { TouchableOpacity, StatusBar , WebView, Linking } from "react-native";
import Icon from 'react-native-ionicons'

class SectionScreen extends React.Component{
    static navigationOptions = {
        header:null
    };

    componentDidMount() {
        StatusBar.setBarStyle("light-content", true);
    }
    componentWillUnmount(): void {
        StatusBar.setBarStyle("dark-content", true);
    }

    render(){
        //verileri alıyoruz.intent gibi
        const { navigation } = this.props;
        const section = navigation.getParam("section");

        return(
            <Container>
                <StatusBar hidden/>
                <Cover>
                    <Image source = {section.image}/>
                    <Wrapper>
                        <Logo source = {section.logo}/>
                        <Subtitle>{section.subtitle}</Subtitle>
                    </Wrapper>
                    <Title>{section.title}</Title>
                    <Caption>{section.caption}</Caption>
                </Cover>
                <TouchableOpacity
                    onPress = {() => {
                        this.props.navigation.goBack();
                    }}
                    style = {{position:"absolute", top:20, right:20}}>
                <CloseView>
                    <Icon name = "ios-close" size = {36} color = "#4775f2" style = {{marginTop: -2}} />
                </CloseView>
                </TouchableOpacity>
                <Content>
                    <WebView
                        source = {{ html: htmlContent + htmlStyles}}
                        scalesPageToFit={false}
                        scrollEnabled={false}
                        ref = "webview"
                        onNavigationStateChange = {event => {
                            console.log(event);

                            if (event.url != "about:blank"){
                                this.refs.webview.stopLoading();
                                //bu satır komple webvviewi kendi sayfasında acıyor. linking eklenmezse sayfada eklendiği yerde açılır.
                                Linking.openURL(event.url);
                            }

                        }}
                    />
                </Content>
            </Container>
        )
    }
}
export default SectionScreen;
const Content = styled.View`
    height :100%;
    padding:20px;
`;
const htmlContent = `
    <h2>This it a title</h2>
    <p>This <strong>is</strong> a <a href="http://designcode.io"> link </a></p>

`;
const htmlStyles = `
    <style>
    *{
    font-family: -apple-system, Roboto;
    margin:0;
    padding:0;
    }
    img{
    widht:100%;
    border-radius:10;
    margint-top:20;
    }
   </style>
    `;
const Logo = styled.Image`
      width : 24;
      height : 24;
    `;
const Wrapper = styled.View`
      flex-direction: row;
      position:absolute;
      top:40;
      left:20;
      align-items: center;
    `;
const Subtitle = styled.Text`
      font-size:15;
      font-weight:600;
      color: rgba(255,255,255,0.8);
      margin-left:5;
      text-transform:uppercase;
    `;

const CloseView = styled.View`
      width : 32;
      height : 32;
      background: white;
      border-radius:16;
      justify-content:center;
      align-items:center;
      box-shadow: 0 5px 10px rgba(0,0,0,0.15)
    `;
const Container = styled.View`
      flex: 1;
    `;

const Title = styled.Text`
    font-size : 24;
    color:white;
    font-weight: bold;
    width: 170;
    left:20;
    top:78;
    position: absolute;
`;
const Caption = styled.Text`
    font-size : 17;
    color:white;
    bottom:20;
    width: 300;
    left:20;
    position: absolute;
`;
const Image = styled.Image`
    width : 100%;
    height : 100%;
    position :absolute;
`;
const Cover = styled.View`
    height : 375;
`;