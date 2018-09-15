import React from 'react';
import { StyleSheet, View, WebView, Platform } from 'react-native';
import {DrawerNavigation} from 'react-navigation'


export default class ContactScreen extends React.Component{

  render() {
    return (
 
        <View style={{ height: 700 }}>
            <WebView
                    style={ styles.WebViewContainer }
                    javaScriptEnabled={true}
                    domStorageEnabled={true}
                    source={{uri: 'https://rutacincohn.com/about' }}
            />
 
        </View>
 
    );
  }
}