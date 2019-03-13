import React from 'react';
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation';
import HomeScreen from "../screens/HomeScreen";
import SectionScreen from "../screens/SectionScreen";
import Icon from 'react-native-ionicons'
import CoursesScreen from "../screens/CoursesScreen";
import ProjectsScreen from "../screens/ProjectsScreen";

const activeColor = "#4775f2";
const inActiveColor = "#b8bece";

const HomeStack = createStackNavigator({
   Home: HomeScreen,
   Section: SectionScreen
}, {
    mode: "modal"
});

//focused ? activeColor : inActiveColor focused true ise activecolor, değilse inactivecolor yapılmalı.
HomeStack.navigationOptions = ({navigation}) => {
    let tabBarVisible = true;
    const routeName = navigation.state.routes[navigation.state.index].routeName;

    if (routeName == "Section") {
        tabBarVisible = false;
    }
    
    return{
        tabBarVisible,
        tabBarLabel : "Home",
        tabBarIcon : ({ focused }) =>
            <Icon name="ios-home" size={26} color = { focused ? activeColor : inActiveColor} />
    }

};

const CoursesStack = createStackNavigator({
    Courses : CoursesScreen
});

CoursesStack.navigationOptions = {
    tabBarLabel : "Course",
    tabBarIcon : ({ focused }) =>
        <Icon name = "ios-albums" size = {26} color = { focused ? activeColor : inActiveColor} />
};

const ProjectsStack = createStackNavigator({
    Projects : ProjectsScreen
});

ProjectsStack.navigationOptions = {
    tabBarLabel : "Projects",
    tabBarIcon : ({ focused }) =>
        <Icon name="ios-folder" size={26} color = { focused ? activeColor : inActiveColor} />
};
const TabNavigator = createBottomTabNavigator({
    HomeStack,
    CoursesStack,
    ProjectsStack
});

export default TabNavigator;