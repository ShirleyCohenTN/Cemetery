import React from 'react';
import { StyleSheet, Text, View, ImageBackground, Image } from 'react-native';
import { Button } from 'react-native-elements'


export default class SuccessPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {email: this.props.route.params.email}
    }

    

    render() {
        return (
            <View style={styles.container}>
                <ImageBackground style={styles.background} resizeMode='cover' source={require("../images/water2.gif")}>
                <Text  style = {styles.txtStyle} >שלום, {this.props.route.params.firstName} {this.props.route.params.lastName}!</Text>
                <Text  style = {styles.txtStyle}>נרשמת בהצלחה!</Text>
                <Image style={styles.image} source={require("../images/mark.png")}></Image>

                <View style={{ marginTop: 220, width: "80%", alignSelf: 'center' }}>
                        <Button title="לחץ כאן למעבר לדף הבית" onPress={()=> this.props.navigation.navigate('HomePage', {email:this.state.email})} titleStyle={{ fontSize: 20, fontWeight: 'bold' }} buttonStyle={{ backgroundColor: "#52CD39", borderRadius: 15, borderColor: "black", borderWidth: 2 }} />
                    </View>

                </ImageBackground>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#fff',
        color: 'white'


    },
    background: {
        width: '100%',
        height: '100%',
        flex: 1
    },
    txtStyle:{
        color:'white',
        fontWeight:'bold',
        fontSize : 30,
        textAlign: 'center',
        marginTop:0
    },
    image: {
        width: 100,
        height: 100,
        alignSelf: 'center', marginTop: 10, marginLeft: 12
    }
});