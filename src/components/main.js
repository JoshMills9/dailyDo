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


        const[user, setUser] =  useState(null)

        const [hasLoggedIn, setHasLoggedIn] = useState(null)
       
        //useEffect to get login user
        const auth = getAuth();
        useEffect(() => {
         const unsubscribe = onAuthStateChanged(auth, (user) => {
             if (user) {
               setUser(user)
             } else {
                 setUserEmail(null); // Set user state to null when user is signed out
                 console.log('No user signed in');
             }
         });
 
         // Clean up subscription
         return () => unsubscribe();
     }, [auth]); // Include auth in the dependency array




    //useEffect to fetch data from storage
    useEffect(() => {
        const fetchData = async () => {
          try {
            const data = await AsyncStorage.getItem('Token');
            if (data !== null) {
              const parsedData = JSON.parse(data);
              setHasLoggedIn(parsedData)
            }
          } catch (e) {
            console.error('Failed to fetch the data from storage', e);
          }
        };
    
        fetchData();
      }, []);




      //useEffect to save list to Storage
      useEffect(() => {
        const handleSave = async () => {
            try {
              const stringValue = JSON.stringify(user);
              await AsyncStorage.setItem('Token', stringValue);
           
            } catch (e) {
              console.error('Failed to save the data to the storage', e);
            }
          };
          handleSave();
        }, [user,auth]);

 


return(
    <SafeAreaView style={[styles.container]}>
        <StatusBar  barStyle={"default"} showHideTransition={"fade"} hidden={false}/>
        <NavigationContainer>
            <Stack.Navigator screenOptions={{headerTitleStyle:{fontWeight:"bold"}}} initialRouteName={hasLoggedIn ? 'To-Do List' : 'LogInScreen'}>

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