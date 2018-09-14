import React, { Component } from 'react';
 
import { StyleSheet, View, WebView, Platform } from 'react-native';
 
export default class Videos extends React.Component{
 
  render() {
    return (
 
        <View style={{ height: 700 }}>
            <WebView
                    style={ styles.WebViewContainer }
                    javaScriptEnabled={true}
                    domStorageEnabled={true}
                    source={{uri: 'https://www.youtube.com/watch?v=iHjqyUCYcpQ&list=UUk_-JJq-7Pv7W-IfqiyWnvg' }}
            />
 
        </View>
 
    );
  }
}
 
const styles = StyleSheet.create({
 
WebViewContainer: {
 
    marginTop: (Platform.OS == 'ios') ? 20 : 0,
 
  }
  
});