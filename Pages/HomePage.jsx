import React from 'react';
import { StyleSheet, Text, View, ImageBackground, Image} from 'react-native';
import { Button } from 'react-native-elements'

import * as Linking from 'expo-linking';
import * as WebBrowser from 'expo-web-browser';



export default class HomePage extends React.Component {
    constructor(props) {
        super(props);
    }

    btnOpenMadrih = () => {
        WebBrowser.openBrowserAsync('https://itim.org.il/מנהגי-אבלות/');
    }

    btnOpenTfilot = () => {
        WebBrowser.openBrowserAsync('http://www.kadisha.org/prayers-by-name/');
    }


    
    render() {
        return (
            <View style={styles.container}>
                <ImageBackground style={styles.background} resizeMode='cover' source={require("../images/blue.gif")}>
                    <Image style={styles.image} source={require("../images/candle.gif")}></Image>
                    <Image style={styles.image} source={require("../images/jewishgold.gif")}></Image>

                    <View style={styles.btn}>
                        <Button title="רישום נפטר" onPress={() => this.props.navigation.navigate('Rishum')} titleStyle={styles.btnTitle} buttonStyle={styles.btnStyle} />
                    </View>
                    <View style={styles.btn}>
                        <Button title="רשימת הנפטרים האהובים" onPress={() => this.props.navigation.navigate('Reshima')} titleStyle={styles.btnTitle} buttonStyle={styles.btnStyle} />
                    </View>
                    <View style={styles.btn}>
                        <Button title="מדריך מנהגי אבלות" onPress={this.btnOpenMadrih} titleStyle={styles.btnTitle} buttonStyle={styles.btnStyle} />
                    </View>
                    <View style={styles.btn}>
                        <Button title="תפילות בעת עלייה לקבר" onPress={this.btnOpenTfilot} titleStyle={styles.btnTitle} buttonStyle={styles.btnStyle} />
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


    },
    textInput: {

        height: 40,
        marginBottom: 30,
        color: '#2648A5',
        borderBottomWidth: 1.5,
        borderBottomColor: '#2690A5',
        width: 250,
        alignSelf: 'center',
        fontSize: 20



    },
    text: {
        fontWeight: 'bold',
        paddingRight: 60,
        paddingLeft: 60,
        color: 'black',
        fontSize: 18
    },
    background: {
        width: '100%',
        height: '100%',
        flex: 1
    },
    image: {
        width: 100,
        height: 100,
        alignSelf: 'center', marginTop: 0, marginLeft: 12
    },
    btn: {
        marginTop: 20,
        width: "80%",
        alignSelf: 'center'
    },
    btnStyle: {
        backgroundColor: "green",
        borderRadius: 15,
        borderColor: "black",
        borderWidth: 2
    },
    btnTitle: {
        fontSize: 20,
        fontWeight: 'bold'
    }
});