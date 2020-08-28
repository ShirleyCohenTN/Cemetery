import React from 'react';
import { StyleSheet, Text, View, ImageBackground, Image, TextInput, Alert } from 'react-native';
import { Button, Input, Icon } from 'react-native-elements'
import * as Facebook from 'expo-facebook';


 let url = 'http://185.60.170.14/plesk-site-preview/ruppinmobile.ac.il/site08/api/users';
//var url = 'http://localhost:63180/api/users';

export default class LoginPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            emailText: 'shirley10000@walla.com',
            passText: '123456',

            showErrLbl : false
        };
        console.log('stam2');  
        
    }



    txtchgEmail = (emailText) => {
        this.setState({ emailText });
    }

    txtchgPass = (passText) => { 
        this.setState({ passText }); 
    }


    btnLogin = async () => { 
        console.log(1);
        
        console.log(this.state.emailText +","+ this.state.passText);  
        
       let s = await this.checkUserDetails(this.state.emailText, this.state.passText);
        console.log('returned value=' + s );

        if (s != null) {
            this.setState({showErrLbl:false});
            this.props.navigation.navigate('HomePage', { user: s});
        }
        else {
            console.log('err login!')
            this.setState({showErrLbl:true});
            // Alert.alert("שגיאת התחברות", "אנא בדוק שהאימייל והסיסמא נכונים");
    
        }
    }


    checkUserDetails = async (Email, Password) => {
        let returnedObj = null;

         await fetch(url + `?email=${Email}&password=${Password}`,
            {
                method: 'GET', // 'GET', 'POST', 'PUT', 'DELETE', etc.
                headers: new Headers({
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }),
            }) // Call the fetch function passing the url of the API as a parameter
            .then((resp) => resp.json()) // Transform the data into json
            .then(function (data) {
                console.log("meow");
                console.log(data);
                if (data != null) {
                    console.log(data.Email);
                    console.log(data.Password);
                    returnedObj = data;
                }
                else {
                    console.log('wrong email or password!');
                    returnedObj = null;
                }
                
            })
            .catch(function (err) {
                alert(err);
            });

         return returnedObj;
    }



    btnFBLogin = async () => {
        try {
            let appId = '576833603263599';
            // let appId = '745757062868920';
            await Facebook.initializeAsync(appId);
            const { type, token, expires, permissions, declinedPermissions, }
                = await Facebook.logInWithReadPermissionsAsync({
                    permissions: ['public_profile'],
                });
            if (type === 'success') {
                {

                    this.props.navigation.navigate('HomePage');
                }
            } else { type === 'cancel' }
        }
        catch ({ message }) {
            alert(`Facebook Login Error: ${message}`);
        }
    }


    render() {
        return (
            <View style={styles.container}>
                <ImageBackground style={styles.background} resizeMode='cover' source={require("../images/water.gif")}>
                    <Image style={styles.image} source={require("../images/jewishsilver.gif")}></Image>

                    <Text style={styles.text}>אימייל</Text>
                    <View style={styles.textInput}>
                        <Input
                            value={this.state.emailText}
                            onChangeText={(text) => { this.txtchgEmail(text) }}
                            leftIcon={{ type: 'Entypo', name: 'email', color: '#2690A5' }}
                        />
                    </View>

                    <Text style={styles.text}>סיסמא</Text>
                    <View style={styles.textInput}>
                        <Input
                            value={this.state.passText}
                            onChangeText={(text) => { this.txtchgPass(text) }}
                            leftIcon={{ type: 'FontAwesome5', name: 'lock', color: '#2690A5' }}
                            secureTextEntry={true}
                        />
                    </View>

                    <View style={{ marginTop: 0, width: "30%", alignSelf: 'center' }}>
                        <Button title="התחבר" onPress={this.btnLogin} titleStyle={{ fontSize: 20, fontWeight: 'bold' }} buttonStyle={{ backgroundColor: "#5DA3DF", borderRadius: 15, borderColor: "black", borderWidth: 2 }} />
                        {this.state.showErrLbl && <Text  style ={{color: 'red', width: 200, alignSelf: 'center', marginRight: 38}}> אימייל או סיסמא לא נכונים</Text>}
                    </View>
                    <View style={{ marginTop: 40, width: "80%", alignSelf: 'center' }}>
                        <Button title="התחבר באמצעות פייסבוק f" onPress={() => this.btnFBLogin()} titleStyle={{ fontSize: 18, fontWeight: 'bold' }} buttonStyle={{ backgroundColor: "#4267B2", borderRadius: 15, borderColor: "black", borderWidth: 2 }}></Button>
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
        borderBottomColor: '#2648A5',
        width: 280,
        alignSelf: 'center',
        fontSize: 20,



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
        alignSelf: 'center', marginTop: 18, marginLeft: 12,
        marginBottom: 70
    }
});