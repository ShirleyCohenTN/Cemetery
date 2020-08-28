import 'react-native-gesture-handler';
//import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import React from 'react';



import WelcomePage from './Pages/WelcomePage';
import LoginPage from './Pages/LoginPage';
import SignUpPage from './Pages/SignUpPage';
import HomePage from './Pages/HomePage';
import Rishum from './Pages/Rishum';
import SuccessPage from './Pages/SuccessPage';
import Reshima from './Pages/Reshima';
import GPS from './Pages/GPS';
import GetLocation from './Pages/GetLocation';




const Stack = createStackNavigator();



export default function App() {
  return (
    < NavigationContainer >
  
        <Stack.Navigator initialRouterName="WelcomePage">
          <Stack.Screen name="WelcomePage" component={WelcomePage} />
          <Stack.Screen name="SignUpPage" component={SignUpPage} />
          <Stack.Screen name="LoginPage" component={LoginPage} />
          <Stack.Screen name="HomePage" component={HomePage} />
          <Stack.Screen name="Rishum" component={Rishum} />
          <Stack.Screen name="SuccessPage" component={SuccessPage} />
          <Stack.Screen name="Reshima" component={Reshima} />
          <Stack.Screen name="GPS" component={GPS} />
          <Stack.Screen name="GetLocation" component={GetLocation} />



        </Stack.Navigator>

    </NavigationContainer >
  );
}