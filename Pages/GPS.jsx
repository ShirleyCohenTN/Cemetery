import React from 'react';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity, Image, Linking, ImageBackground } from 'react-native';
import { Button } from 'react-native-elements'



var lat = 32.298836;
var lng = 34.881385;
var vatikimLat = 32.298836;
var vatikimLng = 34.881385;

let url = 'http://185.60.170.14/plesk-site-preview/ruppinmobile.ac.il/site08/api/deceased';


export default class GPS extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            location: null,
            deceasedLatitude: null,
            deceasedLongitude: null,
            lat: null,
            long: null,
            id: this.props.route.params.id
        };

    }



    btnGetLocation = () => {
        this.props.navigation.navigate('GetLocation', { id: this.state.id });

    }


    btnReshima = () => {
        this.props.navigation.navigate('Reshima');

    }



    googleMapOpenUrl = (vatikimLat, vatikimLng) => {
        const latLng = `${vatikimLat}+${vatikimLng}`;
        return `google.navigation:q=${latLng}&mode=w`;
    }



    render() {



        fetch(url + `/${this.props.route.params.id}`
            ,
            {
                method: 'POST', // 'GET', 'POST', 'PUT', 'DELETE', etc.
                headers: new Headers({
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }),
            }) // Call the fetch function passing the url of the API as a parameter
            .then((resp) => {
                if (resp.status === 200) {
                    return resp.json();
                }
                else
                    return "could not get all the deceased!";
            }
            ) // Transform the data into json
            .then((data) => {
                if (!data.toString().includes("could not ")) {
                    this.setState({
                        deceasedLatitude: data.Deceased_Latitude,
                        deceasedLongitude: data.Deceased_Longitude
                    });
                }
                else {
                    console.log('lo sababa');
                }
            })
            .catch(function (err) {
                alert(err);
            });





        return (
            <View style={styles.container}>
                <ImageBackground style={styles.background} resizeMode='cover' source={require("../images/heaven.jpg")}>


                {this.state.deceasedLatitude && <TouchableOpacity style={{ margin: 10, alignItems: 'center', marginTop: 100 }}
                        onPress={() => Linking.openURL(this.googleMapOpenUrl(this.state.deceasedLatitude, this.state.deceasedLongitude))}>
                        <Text style={styles.txt}>קח אותי לקבר של {`${this.props.route.params.firstName}` + " " + `${this.props.route.params.lastName}`}  </Text>
                        <Image style={styles.image1} source={require("../images/location.png")} />
                        <Image style={styles.image} source={require("../images/grave2.png")} />
                    </TouchableOpacity>}



                   <View style = {{width: "60%", marginTop:200, alignSelf: 'center'}}>
                    {this.state.deceasedLatitude === null && <Button title="אני ליד הקבר, וברצוני לשמור מיקום" onPress={this.btnGetLocation} titleStyle={{ fontSize: 20, fontWeight: 'bold' }} buttonStyle={{ backgroundColor: "#1FA655", borderRadius: 15, borderColor: "black", borderWidth: 2 }} />}
                    </View>

                    <View style = {{width: "60%", marginTop:20, alignSelf: 'center'}}>
                    {this.state.deceasedLatitude === null && <Button title="אני לא ליד הקבר, בחזרה לרשימה" onPress={this.btnReshima} titleStyle={{ fontSize: 20, fontWeight: 'bold' }} buttonStyle={{ backgroundColor: "#D54141", borderRadius: 15, borderColor: "black", borderWidth: 2 }} />}
                    </View>



                </ImageBackground>
            </View >
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
    mapStyle: {
        width: Dimensions.get('window').width - 40,
        height: Dimensions.get('window').height / 2,
    },
    image: {
        width: 130,
        height: 130,
        alignSelf: 'center'
    },
    image1: {
        width: 40,
        height: 40,
        alignSelf: 'center'
    },
    txt: {
        fontWeight: 'bold',
        color: 'black',
        fontSize: 24,
        textAlign: 'center'
    },
    background: {
        width: '100%',
        height: '100%',
        flex: 1
    }
});