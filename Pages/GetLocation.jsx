import React from 'react';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity, Image, Linking, ImageBackground } from 'react-native';
import { Button } from 'react-native-elements'



var lat = 32.298836;
var lng = 34.881385;
var vatikimLat = 32.298836;
var vatikimLng = 34.881385;

let url = 'http://185.60.170.14/plesk-site-preview/ruppinmobile.ac.il/site08/api/deceased';


export default class GetLocation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            location: null,
            deceasedLatitude: null,
            deceasedLongitude: null,
            lat: null,
            long: null,
            id: this.props.route.params.id,
            flag: null
        };

    }



    btnGetLocation = () => {

        this.setState({ flag: 1 });

        let obj2Send = {
            "ID": `${this.props.route.params.id}`,
            "Deceased_Latitude": `${this.state.lat}`,
            "Deceased_Longitude": `${this.state.long}`
        }


        fetch(url,
            {
                method: 'PUT', // 'GET', 'POST', 'PUT', 'DELETE', etc.
                body: JSON.stringify(obj2Send),
                headers: new Headers({
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }),
            }) // Call the fetch function passing the url of the API as a parameter
            .then((resp) => {
                if (resp.status === 200) {
                    console.log("sababa")
                }
                else if (resp.status === 400) {
                    console.log("BadRequest");
                }
                else {
                    console.log("NotFound");
                }
            }) // Transform the data into json
            .catch(function (err) {
                alert(err);
            });



    }




    render() {




        navigator.geolocation.getCurrentPosition(
            (position) => {
                const output =
                    '\nlatitude=' + position.coords.latitude + ", " +
                    '\nlongitude=' + position.coords.longitude + ", " +
                    '\naltitude=' + position.coords.altitude + ", " +
                    '\nheading=' + position.coords.heading + ", " +
                    '\nspeed=' + position.coords.speed


                this.setState(
                    { lat: position.coords.latitude, long: position.coords.longitude }
                )
            },
            (error) => alert(error.message),
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },


        );



        return (
            <View style={styles.container}>
                <ImageBackground style={styles.background} resizeMode='cover' source={require("../images/heaven.jpg")}>


                 <Image style={styles.image} source={require("../images/location12.png")}></Image>

                    <View style={{  width: "50%", alignSelf: 'center' }}>
                        {this.state.flag === null && <Button title="שמור מיקום" onPress={this.btnGetLocation} titleStyle={{ fontSize: 20, fontWeight: 'bold' }} buttonStyle={{ backgroundColor: "#7BD241", borderRadius: 15, borderColor: "black", borderWidth: 2 }} />}
                    </View>

                    <View style ={{alignSelf: "center"}} >
                        {this.state.flag && <Text style={styles.txt}>המיקום נשמר בהצלחה!</Text>}
                    </View>


                    <View style={{ marginTop: 100, width: "70%", alignSelf: 'center' }}>
                        {/* {this.state.flag && <Text style = {styles.txt}>המיקום נשמר בהצלחה!</Text>} */}
                        {this.state.flag && <Button onPress={() => this.props.navigation.navigate('Reshima')}  titleStyle={{ fontSize: 20, fontWeight: 'bold' }} title="לחזרה לרשימת הנפטרים" buttonStyle={{ backgroundColor: "#3879BA", borderRadius: 15, borderColor: "black", borderWidth: 2 }}></Button>}
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
    mapStyle: {
        width: Dimensions.get('window').width - 40,
        height: Dimensions.get('window').height / 2,
    },
    // image: {
    //     width: 50,
    //     height: 50,
    //     alignSelf: 'center', marginTop: 0, marginLeft: 12, marginRight: 12
    // },
    image1: {
        width: 30,
        height: 30,
        alignSelf: 'center', marginTop: 0, marginLeft: 12, marginRight: 12
    },
    background: {
        width: '100%',
        height: '100%',
        flex: 1
    },
    txt: {
        fontWeight: 'bold',
        color: '#0E0E6B',
        fontSize: 30,
    },
    image: {
        width: 150,
        height: 100,
        alignSelf: 'center',
        marginTop: 200,
    }
});