import React from 'react';
import { StyleSheet, Text, View, ImageBackground, Image, TextInput, Alert } from 'react-native';
import { Button } from 'react-native-elements'

let url = 'http://185.60.170.14/plesk-site-preview/ruppinmobile.ac.il/site08/api/users';


export default class SignUpPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: 'aaa',
            lastName: 'aaa',
            email: 'aaa',
            pass: 'aaa'

        };
        console.log('stam3');

    }

    txtchgFirstName = (firstName) => {
        this.setState({ firstName });
    }

    txtchgLastName = (lastName) => {
        this.setState({ lastName });
    }

    txtchgEmail = (email) => {
        this.setState({ email });
    }

    txtchgPass = (pass) => {
        this.setState({ pass });
    }


    btnSignUp = async () => {
        let s = await this.AddUser(this.state.firstName, this.state.lastName, this.state.email, this.state.pass);
        console.log('returned value=' + s);
        if (s == null) {
            alert('didnt inserted into db!');
        }
        else {
            // Alert.alert("נרשמת בהצלחה!");

            // this.props.navigation.navigate('HomePage');
            this.props.navigation.navigate('SuccessPage', {firstName: this.state.firstName, lastName: this.state.lastName, email:this.state.email});

        }
        //console.log('signup', firstName, lastName, email, pass);
    }



    AddUser = async (firstName, lastName, email, pass) => {
        let returnedObj = null;

        let obj2Send = {
            "First_Name": firstName,
            "Last_Name": lastName,
            "Email_Address": email,
            "Pass": pass
        }

        await fetch(url,
            {
                method: 'POST', // 'GET', 'POST', 'PUT', 'DELETE', etc.
                body: JSON.stringify(obj2Send),
                headers: new Headers({
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }),
            }) // Call the fetch function passing the url of the API as a parameter
            .then((resp) => resp.json()) // Transform the data into json
            .then(function (data) {
                console.log(data);
                if (!data.toString().includes("could not insert")) {
                    console.log(data.email);
                    console.log(data.pass);
                    returnedObj = data;
                }
                else {
                    console.log('didnt inserted!');
                    returnedObj = null;
                }
            })
            .catch(function (err) {
                alert(err);
            });

        return returnedObj;
    }


    render() {
        return (
            <View style={styles.container}>
                <ImageBackground style={styles.background} resizeMode='cover' source={require("../images/water.gif")}>
                    <Image style={styles.image} source={require("../images/jewishsilver.gif")}></Image>

                    <Text style={styles.text} >שם פרטי</Text>
                    <TextInput
                        onChangeText={(text) => { this.txtchgFirstName(text) }}
                        style={styles.textInput}
                        // value={this.state.firstName}
                    >

                    </TextInput>

                    <Text style={styles.text}>שם משפחה</Text>
                    <TextInput onChangeText={(text) => { this.txtchgLastName(text) }}
                        style={styles.textInput}
                        // value={this.state.lastName}
                    ></TextInput>

                    <Text style={styles.text}>אימייל</Text>
                    <TextInput onChangeText={(text) => { this.txtchgEmail(text) }}
                        style={styles.textInput}
                        // value={this.state.email}
                    ></TextInput>

                    <Text style={styles.text}>סיסמא</Text>
                    <TextInput onChangeText={(text) => { this.txtchgPass(text) }}
                        style={styles.textInput}
                        // value={this.state.pass}
                    ></TextInput>

                    <View style={{ marginTop: 10, width: "30%", alignSelf: 'center' }}>
                        <Button title="הרשמה" onPress={this.btnSignUp} titleStyle={{ fontSize: 20, fontWeight: 'bold' }} buttonStyle={{ backgroundColor: "#39D57D", borderRadius: 15, borderColor: "black", borderWidth: 2 }} />
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
        alignSelf: 'center', marginTop: 18, marginLeft: 12
    }
});