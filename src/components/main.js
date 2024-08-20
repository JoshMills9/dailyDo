import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';


import SignUp from './signup';
import Login from './login';
import TodoLists from "./lists";
import AddTask from "./addTask";
import EditTask from './editTask';
import AssignTask from './assignTask';
import Assigned from './assigned';

import { SafeAreaView, StatusBar } from 'react-native';
import styles from '../styles/styles';



const Stack = createNativeStackNavigator();

const MainComponent= ()=> {


return(
    <SafeAreaView style={[styles.container]}>
        <StatusBar  barStyle={"default"} showHideTransition={"fade"} hidden={false}/>
        <NavigationContainer>
            <Stack.Navigator screenOptions={{headerTitleStyle:{fontWeight:"bold"}}} initialRouteName='LogInScreen'>

                <Stack.Screen 
                    name="SignUp" 
                    component={SignUp} 
                    options={{ headerShown: false}} 
                />

                <Stack.Screen 
                    name="LogInScreen" 
                    component={Login} 
                    options={{ headerShown: false}} 
                />
            

              <Stack.Screen 
                    name="To-Do List" 
                    component={TodoLists} 
                    options={({navigation, route }) => ({headerBackVisible: false,
                    })}
                /> 

                <Stack.Screen name="Add New Task" component={AddTask} />

                <Stack.Screen name="Edit Task" component={EditTask} />

                <Stack.Screen name="Assign Task" component={AssignTask} />
                
                <Stack.Screen name="Notifications" component={Assigned} />
    

            </Stack.Navigator>
        </NavigationContainer>
    </SafeAreaView>
);


};

export default MainComponent;