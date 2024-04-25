import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import TodoLists from "./lists";
import AddTask from "./addTask";
import EditTask from './editTask';
import { Image, SafeAreaView, StatusBar, TouchableOpacity } from 'react-native';
import styles from '../styles/styles';


const Stack = createNativeStackNavigator();

const MainComponent= ()=> {
    return(
        <SafeAreaView style={[styles.container]}>
            <StatusBar  barStyle={"default"} showHideTransition={"fade"} hidden={false}/>
            <NavigationContainer>
                <Stack.Navigator screenOptions={{headerTitleStyle:{fontWeight:"bold"}}}>

                    <Stack.Screen name="To-Do List" component={TodoLists} options={()=> ({headerRight:
                        () => (<TouchableOpacity><Image style={{height:30, width:30, }} source={require("../images/bell.png")}/></TouchableOpacity>)})} 
                        />

                    <Stack.Screen name="Add New Task" component={AddTask} />

                    <Stack.Screen name="Edit Task" component={EditTask} />

        
                </Stack.Navigator>
           
             </NavigationContainer>
       
        </SafeAreaView>
    )
};

export default MainComponent;