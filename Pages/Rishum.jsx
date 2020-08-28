import React from 'react';
import { StyleSheet, Text, View, ImageBackground, Image, TextInput, Alert } from 'react-native';
import { Button } from 'react-native-elements'

import DatePicker from 'react-native-datepicker';


let url = 'http://185.60.170.14/plesk-site-preview/ruppinmobile.ac.il/site08/api/deceased';


export default class Rishum extends React.Component {
    constructor(props) {
        super(props);
        //set value in state for initial date
        this.state = {
            date: "",
            id: "0",
            first_name: "",
            last_name: "",
            father_first_name: "",
            mother_first_name: "",
            jewish_date_of_demise: "",
            date_of_burial: "",
            city: "",
            cemetery_name: "",
            block_num: "",
            row_num: "",
            plot_num: ""
        };
        console.log("stam4");
    }



    txtchgfirst_name = (first_name) => {
        this.setState({ first_name });
    }

    txtchglast_name = (last_name) => {
        this.setState({ last_name });
    }

    txtchgfather_first_name = (father_first_name) => {
        this.setState({ father_first_name });
    }

    txtchgmother_first_name = (mother_first_name) => {
        this.setState({ mother_first_name });
    }

    txtchgjewish_date_of_demise = (jewish_date_of_demise) => {
        this.setState({ jewish_date_of_demise });
    }

   

    txtchgdate_of_burial = (date_of_burial) => {
        this.setState({ date_of_burial });
    }

    txtchgcity = (city) => {
        this.setState({ city });
    }

    txtchgcemetery_name = (cemetery_name) => {
        this.setState({ cemetery_name });
    }

    txtchgblock_num = (block_num) => {
        this.setState({ block_num });
    }

    txtchgrow_num = (row_num) => {
        this.setState({ row_num });
    }

    txtchgplot_num = (plot_num) => {
        this.setState({ plot_num });
    }



    btnHosef = async () => {
        let s = await this.AddDeceased(this.state.id
            ,this.state.first_name,
            this.state.last_name,
            this.state.father_first_name,
            this.state.mother_first_name,
            this.state.jewish_date_of_demise,
            this.state.date,
            this.state.date_of_burial,
            this.state.city,
            this.state.cemetery_name,
            this.state.block_num,
            this.state.row_num,
            this.state.plot_num);
        console.log('returned value=' + s);
        if (s == null) {
            alert('didnt inserted into db!');
        }
        else {
            
            this.props.navigation.navigate('HomePage');
            Alert.alert(`${this.state.first_name} ${this.state.last_name}` + " הוסף בהצלחה !");
        

            // this.props.navigation.navigate('HomePage');
            //this.props.navigation.navigate('SuccessPage', {firstName: this.state.firstName, lastName: this.state.lastName, email:this.state.email});

        }
        //console.log('signup', firstName, lastName, email, pass);
    }



    AddDeceased = async (id,
        first_name,
        last_name,
        father_first_name,
        mother_first_name,
        jewish_date_of_demise,
        date,
        date_of_burial,
        city,
        cemetery_name,
        block_num,
        row_num,
        plot_num) => {
        let returnedObj = null;

        let obj2Send = {
            "ID": id,
            "First_Name": first_name,
            "Last_Name": last_name,
            "Father_First_Name": father_first_name,
            "Mother_First_Name": mother_first_name,
            "Jewish_Date_Of_Demise": jewish_date_of_demise,
            "Gregorian_Date_Of_Demise": date,
            "Date_Of_Burial": date_of_burial,
            "City": city,
            "Cemetery_Name": cemetery_name,
            "Block_Num": block_num,
            "Row_Num": row_num,
            "Plot_Num": plot_num

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
                    //console.log(data.email);
                    //console.log(data.pass);
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
                <ImageBackground style={styles.background} resizeMode='cover' source={require("../images/purple.gif")}>
                    <View style={{ backgroundColor: "black" }}>
                        <Image style={styles.image} source={require("../images/candle1.gif")}></Image>
                    </View>


                    <View>
                        <Text style={{ fontSize: 30, textAlign: 'center' }}>רישום נפטר</Text>
                    </View>



                    <View style={styles.rowContainer}>
                        <TextInput style={styles.textInput} onChangeText={(text) => { this.txtchgfirst_name(text) }} ></TextInput>
                        <Text style={styles.text}>שם פרטי</Text>
                    </View>

                    <View style={styles.rowContainer}>
                        <TextInput style={styles.textInput} onChangeText={(text) => { this.txtchglast_name(text) }} ></TextInput>
                        <Text style={styles.text}>שם משפחה</Text>
                    </View>

                    <View style={styles.rowContainer}>
                        <TextInput style={styles.textInput} onChangeText={(text) => { this.txtchgfather_first_name(text) }}></TextInput>
                        <Text style={styles.text}>שם פרטי של האב</Text>
                    </View>

                    <View style={styles.rowContainer}>
                        <TextInput style={styles.textInput} onChangeText={(text) => { this.txtchgmother_first_name(text) }}></TextInput>
                        <Text style={styles.text}>שם פרטי של האם</Text>
                    </View>

                    <View style={styles.rowContainer}>
                        <TextInput style={styles.textInput} onChangeText={(text) => { this.txtchgjewish_date_of_demise(text) }}></TextInput>
                        <Text style={styles.text}>תאריך פטירה עברי</Text>
                    </View>

                    <View style={styles.rowContainer}>
                        <DatePicker
                            style={{ width: 165 }}
                            date={this.state.date} //initial date from state
                            mode="date" //The enum of date, datetime and time
                            placeholder="בחר תאריך"
                            format="DD-MM-YYYY"
                            minDate="01-01-1970"
                            maxDate="01-01-2100"
                            confirmBtnText="Confirm"
                            cancelBtnText="Cancel"
                            customStyles={{
                                dateIcon: {
                                    position: 'absolute',
                                    right: 1,
                                    top: 4,
                                    marginLeft: 0
                                },
                                dateInput: {
                                    marginLeft: 15,
                                    marginRight: 5,
                                    height: 30,
                                    borderColor: "black"
                                }
                            }}
                            onDateChange={(date) => { this.setState({ date: date.toString() }) }}
                        />
                        <Text style={styles.text}>תאריך פטירה לועזי</Text>
                    </View>

                    <View style={styles.rowContainer}>
                        <TextInput style={styles.textInput} onChangeText={(text) => { this.txtchgdate_of_burial(text) }}></TextInput>
                        <Text style={styles.text}>תאריך קבורה</Text>
                    </View>


                    <View style={styles.rowContainer}>
                        <Text style={{ textAlign: 'center', fontSize: 18, fontWeight: 'bold' }}>מיקום קבורה:</Text>
                    </View>

                    <View style={styles.rowContainer}>
                        <TextInput style={styles.textInputKvura1} placeholder="שם בית העלמין" placeholderTextColor="black" onChangeText={(text) => { this.txtchgcemetery_name(text) }}></TextInput>
                        <TextInput style={styles.textInputKvura1} placeholder="עיר" placeholderTextColor="black" onChangeText={(text) => { this.txtchgcity(text) }}></TextInput>
                    </View>

                    <View style={styles.rowContainer}>
                        <TextInput style={styles.textInputKvura2} placeholder="מס' מקום" placeholderTextColor="black" onChangeText={(text) => { this.txtchgplot_num(text) }}></TextInput>
                        <TextInput style={styles.textInputKvura2} placeholder="מס' שורה" placeholderTextColor="black" onChangeText={(text) => { this.txtchgrow_num(text) }}></TextInput>
                        <TextInput style={styles.textInputKvura2} placeholder="מס' גוש" placeholderTextColor="black" onChangeText={(text) => { this.txtchgblock_num(text) }}></TextInput>
                    </View>



                    <View style={{ marginTop: 10, width: "30%", alignSelf: 'center' }}>
                        <Button title="הוסף" onPress={this.btnHosef} titleStyle={{ fontSize: 20, fontWeight: 'bold' }} buttonStyle={{ backgroundColor: "#7377E6", borderRadius: 15, borderColor: "black", borderWidth: 2 }} />
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
        alignSelf: 'center', alignItems: 'flex-end',
        alignContent: 'center',
        flexDirection: 'row',



    },
    textInput: {

        height: 30,
        marginBottom: 10,
        color: '#2648A5',
        borderBottomWidth: 1.5,
        width: "40%",
        alignSelf: 'center',
        fontSize: 20,
        marginLeft: 0,
        borderWidth: 1,
        marginLeft: 10



    },
    textInputKvura1: {
        height: 30,
        marginBottom: 10,
        color: '#2648A5',
        borderBottomWidth: 1.5,
        width: 160,
        alignSelf: 'center',
        fontSize: 15,
        marginLeft: 0,
        borderWidth: 1,
        marginLeft: 10,
        textAlign: 'center'

    },
    textInputKvura2: {
        height: 30,
        marginBottom: 10,
        color: '#2648A5',
        borderBottomWidth: 1.5,
        width: 80,
        alignSelf: 'center',
        fontSize: 15,
        marginLeft: 0,
        borderWidth: 1,
        marginLeft: 10,
        textAlign: 'center'

    },
    text: {
        fontWeight: 'bold',
        paddingRight: 10,
        paddingLeft: 50,
        color: 'black',
        fontSize: 18,
        width: '60%'

    },
    background: {
        width: '100%',
        height: '100%',
        flex: 1
    },
    image: {
        width: 50,
        height: 70,
        alignSelf: 'center', marginTop: 0, marginLeft: 12
    },
    rowContainer: {
        flexDirection: 'row',
        alignItems: 'stretch',
        alignSelf: 'center'

    },

});