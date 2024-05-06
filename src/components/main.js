import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { useState, useEffect } from 'react';

import { EvilIcons } from '@expo/vector-icons';

import Login from './login';
import TodoLists from "./lists";
import AddTask from "./addTask";
import EditTask from './editTask';
import AssignTask from './assignTask';
import Assigned from './assigned';

import { SafeAreaView, StatusBar, Appearance, useColorScheme, TouchableOpacity } from 'react-native';
import styles from '../styles/styles';
import { FIREBASE_AUTH } from '../../firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';




const Stack = createNativeStackNavigator();

const MainComponent= ()=> {



return(
    <SafeAreaView style={[styles.container]}>
        <StatusBar  barStyle={"default"} showHideTransition={"fade"} hidden={false}/>
        <NavigationContainer>
            <Stack.Navigator screenOptions={{headerTitleStyle:{fontWeight:"bold"}}}>

            <Stack.Screen name='Login' component={Login} options={{headerShown:false}}/>

              <Stack.Screen 
                    name="To-Do List" 
                    component={TodoLists} 
                    options={({navigation, route }) => ({headerBackVisible: false,
                        headerRight: () => (
                            <TouchableOpacity>
                                <EvilIcons name="share-apple" size={40} color="black" />
                            </TouchableOpacity>
                        ),
                    })}
                /> 

                <Stack.Screen name="Add New Task" component={AddTask} />

                <Stack.Screen name="Edit Task" component={EditTask} />

                <Stack.Screen name="Assign Task" component={AssignTask} />
                
                <Stack.Screen name="Assigned" component={Assigned} />

            </Stack.Navigator>
        </NavigationContainer>
    </SafeAreaView>
);


};

export default MainComponent;