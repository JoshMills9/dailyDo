import * as React from 'react';
import { useEffect, useState } from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { getAuth , onAuthStateChanged} from 'firebase/auth';

import SignUp from './signup';
import Login from './login';
import TodoLists from "./lists";
import AddTask from "./addTask";
import EditTask from './editTask';
import AssignTask from './assignTask';
import Assigned from './assigned';

import { SafeAreaView, StatusBar } from 'react-native';
import styles from '../styles/styles';


import AsyncStorage from '@react-native-async-storage/async-storage';



const Stack = createNativeStackNavigator();

const MainComponent= ()=> {

  const [hasSeenHomeScreen, setHasSeenHomeScreen] = useState(null);

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const value = await AsyncStorage.getItem('Token');
        if (value === 'true') {
          setHasSeenHomeScreen(true);
        } else {
          setHasSeenHomeScreen(false);
        }
      } catch (error) {
        console.error('Error checking onboarding status', error);
        setHasSeenHomeScreen(false); // Default to showing onboarding if there's an error
      }
    };

    
    checkLoginStatus()
  }, []);

  if (hasSeenHomeScreen === null) {
    // Return null or a loading indicator while we check the onboarding status
    return null;
  }







return(
    <SafeAreaView style={[styles.container]}>
        <StatusBar  barStyle={"default"} showHideTransition={"fade"} hidden={false}/>
        <NavigationContainer>
            <Stack.Navigator screenOptions={{headerTitleStyle:{fontWeight:"bold"}}} initialRouteName={hasSeenHomeScreen ? 'To-Do List' : 'LogInScreen'}>

                 <Stack.Screen 
                    name="LogInScreen" 
                    component={Login} 
                    options={{ headerShown: false}} 
                />


                <Stack.Screen 
                    name="SignUp" 
                    component={SignUp} 
                    options={{ headerShown: false}} 
                />
           
              <Stack.Screen 
                    name="To-Do List" 
                    component={TodoLists} 
                    options={{headerShown:false}}
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