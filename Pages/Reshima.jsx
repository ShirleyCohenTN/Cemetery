import React from 'react';
import { StyleSheet, Text, View, ImageBackground, Image, TextInput, Alert, ActivityIndicator, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-elements'
import { FlatList } from 'react-native-gesture-handler';

let url = 'http://185.60.170.14/plesk-site-preview/ruppinmobile.ac.il/site08/api/deceased';

let url1 = 'http://185.60.170.14/plesk-site-preview/ruppinmobile.ac.il/site08';


export default class Reshima extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            deceased: [],
            isLoading: true
        };

    }




    componentDidMount = () => {
        this.getAllDeceased();
    }



    getAllDeceased = () => {
        fetch(url,
            {
                method: 'GET', // 'GET', 'POST', 'PUT', 'DELETE', etc.
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
                if (!data.toString().includes("could not get all the deceased!")) {
                    this.setState({ deceased: data, isLoading: false });
                }
                else {
                    console.log('didnt inserted!');
                }
            })
            .catch(function (err) {
                alert(err);
            });
    }


    btnDelete = (deceasedID) => {
        fetch(url + `/${deceasedID}`,
            {
                method: 'DELETE', // 'GET', 'POST', 'PUT', 'DELETE', etc.
                headers: new Headers({
                    // 'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }),
            }) // Call the fetch function passing the url of the API as a parameter
            .then((resp) => {
                // console.log(resp);
                if (resp.status === 200) {
                    console.log(200);
                    let newDeceased = this.state.deceased.filter(d => d.ID !== deceasedID);
                    // console.log(newDeceased);
                    this.setState({
                        deceased: newDeceased
                    });
                }
                else if (resp.status === 400) {
                    console.log("BadRequest");
                }
                else {
                    console.log("NotFound");
                }
            }
            ) // Transform the data into json
            .catch(function (err) {
                alert(err);
            });
    }





    btnInfo = (item) => {
        Alert.alert(`${item.First_Name} ${item.Last_Name}`, " מקום קבורה: " + `${item.City}` + " , " + `${item.Cemetery_Name}` + "."
            + `\n`
            + `\n` + " מיקום הקבר: " + "גוש: " + `${item.Block_Num}` + " שורה: " + `${item.Row_Num}` + " מקום: " + `${item.Plot_Num}`
            + `\n`
            + `\n` + " תאריך פטירה עברי :  " + `${item.Jewish_Date_Of_Demise}`
            + `\n`
            + `\n` + " תאריך פטירה לועזי :  " + `${item.Gregorian_Date_Of_Demise}`
            + `\n`
            + `\n` + " תאריך קבורה :  " + `${item.Date_Of_Burial}`
            + `\n`
            + `\n` + " שם האב :  " + `${item.Father_First_Name}`
            + `\n`
            + `\n` + " שם האם :  " + `${item.Mother_First_Name}`,
            [{ text: "אישור" },
                // { text: "מחק נפטר", onPress: () => this.btnDelete(item.ID) }
            ]);
    }



    renderItem = ({ item }) => {

        return (
            <View style={{ flex: 1, flexDirection: 'row', marginBottom: 20, marginTop: 10 }}>



                <TouchableOpacity onPress={() => this.props.navigation.navigate('GPS', { firstName: item.First_Name, lastName: item.Last_Name, block: item.Block_Num, row: item.Row_Num, plot: item.Plot_Num, id: item.ID })}>
                    <Image style={styles.image} source={require("../images/gps.png")} />
                </TouchableOpacity>

                {/* <TouchableOpacity onPress={() => this.props.navigation.navigate('Video')}>
                    <Image style={styles.image} source={require("../images/video.png")} />
                </TouchableOpacity> */}


                <TouchableOpacity onPress={() => this.btnInfo(item)}>
                    <Image style={styles.image} source={require("../images/details1.png")} />
                </TouchableOpacity>



                <View style={{ flex: 1, justifyContent: 'center', marginRight: 20 }}>
                    <Text style={styles.text}>

                        {item.First_Name} {item.Last_Name}
                    </Text>

                </View>


                {/* <TouchableOpacity onPress={() => this.btnDelete(item.ID)}> */}
                <TouchableOpacity onPress={() => Alert.alert(
                    "האם אתה בטוח שברצונך למחוק  ",
                     "    את " + `${item.First_Name} ${item.Last_Name}` + " ?",
                    [
                        {
                            text: "לא",
                            onPress: () => console.log("No pressed")
                        },
                        { text: "כן", onPress: () => this.btnDelete(item.ID) }
                    ],
                    { cancelable: false }
                )}>

                {/* <Image style={styles.imageDelete} source={require("../images/delete2.png")} /> */}
                <Text style={{ color: "white", alignSelf: 'center', fontWeight: 'bold', fontSize: 25 }}>X  </Text>

                <Text style={{ color: "white", alignSelf: 'center', fontWeight: 'bold', fontSize: 13 }}> Delete    </Text>
                </TouchableOpacity>



                {/* <Image style={styles.image}
                    source={require("../images/person.png")} /> */}



            </View >
        )

    }




    rendnerSeparator = () => {
        return (
            <View style={{ height: 1, width: '100%', backgroundColor: 'yellow' }}>

            </View>
        )
    }


    render() {
        return (

            this.state.isLoading
                ? <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator size="large" color="primary" animating />
                </View>
                :

                <View style={styles.container}>
                    <ImageBackground style={styles.background} resizeMode='cover' source={require("../images/water1.gif")}>

                        <FlatList
                            data={this.state.deceased}
                            renderItem={(this.renderItem)}
                            keyExtractor={(item, index) => index}
                            ItemSeparatorComponent={this.rendnerSeparator}
                        />
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
        alignSelf: 'center', alignItems: 'flex-end',
        alignContent: 'center',
        flexDirection: 'row',



    },
    image: {
        width: 50,
        height: 50,
        alignSelf: 'center', marginTop: 0, marginLeft: 12, marginRight: 12
    },
    imageDelete: {
        width: 30,
        height: 30,
        alignSelf: 'center', marginTop: 0, marginLeft: 12, marginRight: 12
    },
    text: {
        fontWeight: 'bold',
        color: 'white',
        fontSize: 18,


    },
    background: {
        width: '100%',
        height: '100%',
        flex: 1
    }
});

