import React from 'react';
import { StyleSheet, Text, View, ImageBackground, Image } from 'react-native';
import {  Button } from 'react-native-elements'




export default class WelcomePage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <ImageBackground style={styles.background} resizeMode='cover' source={require("../images/heaven.gif")}>
          <View>
            <Image style={styles.image} source={require("../images/judaism.gif")}></Image>
            <Text style={{ fontSize: 30, color: "#0F5694", fontWeight: 'bold', alignSelf: 'center'}}>
              ברוך הבא
          </Text>
          </View>
          <View style={{ marginTop: 200, width: "30%", alignSelf: 'center' }}>
            <Button onPress={()=> this.props.navigation.navigate('LoginPage')} title="התחבר" titleStyle={{ fontSize: 20, fontWeight: 'bold'}}  buttonStyle = {{backgroundColor :"#5DA3DF", borderRadius:15, borderColor: "black", borderWidth:2}} />
          </View>
          <View style={{ marginTop: 50, width: "30%", alignSelf: 'center',  borderRadius:10 }}>
            <Button onPress={()=> this.props.navigation.navigate('SignUpPage')} title="הרשם" titleStyle={{ fontSize: 20, fontWeight: 'bold'}}  buttonStyle = {{backgroundColor :"#39D57D", borderRadius:15, borderColor: "black", borderWidth:2}} />
          </View>
        </ImageBackground>
      </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',

  },
  background: {
    width: '100%',
    height: '100%',
    flex: 1
  },
  image: {
    width: 100,
    height: 100,
    alignSelf: 'center', marginTop: 30, marginLeft: 12
  }
});
