import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import TodoLists from "./lists";
import AddTask from "./addTask";
import { Image, TouchableOpacity } from 'react-native';

const Stack = createNativeStackNavigator();

const MainComponent= ()=> {
    return(
        <NavigationContainer>
            <Stack.Navigator screenOptions={{headerStyle:{backgroundColor:"midnightblue"}, headerTitleStyle:{fontWeight:"bold"},
            headerTintColor:"#fff", contentStyle:{backgroundColor:"rgba(0, 0, 128, 0.6)"}}}>

                <Stack.Screen name="To-Do List" component={TodoLists} options={{headerRight:
                     () => (<TouchableOpacity><Image style={{height:30, width:30, tintColor:"#fff"}} source={require("../images/bell.png")}/></TouchableOpacity>)}} />

                <Stack.Screen name="Add New Task" component={AddTask} />
        
            </Stack.Navigator>
           
        </NavigationContainer>
       

    )
};

export default MainComponent;