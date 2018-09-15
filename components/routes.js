import React, { Component } from 'react';
import {createStackNavigator, createDrawerNavigator, createMaterialTopTabNavigator} from 'react-navigation';
import { DrawerActions } from 'react-navigation';
import {View,Text,StyleSheet,Platform,TouchableOpacity,Image,StatusBar} from 'react-native';
import Home from './Home'
import DrawerScreen from './Drawer'
import Contact from './Contacto'
import styles from './styles/index'
import HomeScreen from './Home';
import About from './About';
import VideoScreen from './Videos';
import Gallery from './Galeria'

const DrawerNavigator = createDrawerNavigator({
    Home:{
        screen: HomeScreen
    },
    Contact:{
        screen: Contact
    },
    About:{
        screen:About
    },
    Videos:{
        screen:VideoScreen
    },
    Galeria:{
        screen: Gallery
    }
},{
    initialRouteName: 'Home',
    contentComponent: DrawerScreen,
    drawerWidth: 300
});

const MenuImage = ({navigation}) => {
    if(!navigation.state.isDrawerOpen){
        return <Image source={require('./images/menu-button.png')}/>
    }else{
        return <Image source={require('./images/left-arrow.png')}/>
    }
}

const StackNavigator = createStackNavigator({
    
    //important: key and screen name (i.e. DrawerNavigator) should be same while using the drawer navigator inside stack navigator.
    
    DrawerNavigator:{
        screen: DrawerNavigator
    }
},{
    navigationOptions: ({ navigation }) => ({
        title: 'Ruta5',  // Title to appear in status bar
        headerLeft: 
        <TouchableOpacity  onPress={() => {navigation.dispatch(DrawerActions.toggleDrawer())} }>
            <MenuImage style="styles.bar" navigation={navigation}/>
        </TouchableOpacity>,
        headerStyle: {
            backgroundColor: '#333',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },

    })
});

export default StackNavigator;