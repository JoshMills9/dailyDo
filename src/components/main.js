import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import * as Sharing from 'expo-sharing';
import * as FileSystem from 'expo-file-system';

import { EvilIcons } from '@expo/vector-icons';

import TodoLists from "./lists";
import AddTask from "./addTask";
import EditTask from './editTask';
import { SafeAreaView, StatusBar, TouchableOpacity } from 'react-native';
import styles from '../styles/styles';


const Stack = createNativeStackNavigator();

const MainComponent= ()=> {
  
return(
    <SafeAreaView style={[styles.container]}>
        <StatusBar  barStyle={"default"} showHideTransition={"fade"} hidden={false}/>
        <NavigationContainer>
            <Stack.Navigator screenOptions={{headerTitleStyle:{fontWeight:"bold"}}}>

                <Stack.Screen 
                    name="To-Do List" 
                    component={TodoLists} 
                    options={({navigation, route }) => ({
                        headerRight: () => (
                            <TouchableOpacity>
                                <EvilIcons name="share-apple" size={40} color="black" />
                            </TouchableOpacity>
                        ),
                    })}
                />

                <Stack.Screen name="Add New Task" component={AddTask} />

                <Stack.Screen name="Edit Task" component={EditTask} />

            </Stack.Navigator>
        </NavigationContainer>
    </SafeAreaView>
);


};

export default MainComponent;