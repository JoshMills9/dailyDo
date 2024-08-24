import React, { useEffect, useState } from "react";
import { View, Text, TextInput, KeyboardAvoidingView,TouchableOpacity, Image , SafeAreaView, ActivityIndicator} from "react-native";
import styles from "../styles/signupStyles";
import { FIREBASE_AUTH, } from "../../firebaseConfig";
import {  HelperText } from "react-native-paper";
import { Portal,Provider as PaperProvider , Dialog,} from 'react-native-paper';
import Animated, {
    useSharedValue,
    withTiming,
    useAnimatedStyle,
    Easing,
    
  } from 'react-native-reanimated';
import {  signInWithEmailAndPassword } from "firebase/auth";

import AsyncStorage from '@react-native-async-storage/async-storage';
import Ionicons from '@expo/vector-icons/Ionicons';



const Login = ({navigation, }) =>{

  
    const [signUpEmail, setSignUpEmail] = useState('');
    const [signUpPassword, setSignUpPassword] = useState("");
    const [login, setLogin] = useState(false);
    const auth = FIREBASE_AUTH;
    const [showIndicator, setIndicator] = useState(false)

  

    const [error,setError] = useState("")
   
  // Function to log in a user
  const Login = async () => {
    try {
      await signInWithEmailAndPassword(auth, signUpEmail, signUpPassword);
      setIndicator(false)
      navigation.navigate("To-Do List");
    } catch (error) {
      setIndicator(false);
      setError(error.message)
      showDialog()
    }
    setAnimate(false)
  };


      //useEffect to save list to Storage
      useEffect(() => {
        const handleSave = async () => {
            try {
              const stringValue = JSON.stringify(signUpEmail);
              await AsyncStorage.setItem('userEmail', stringValue);
        
            } catch (e) {
              console.error('Failed to save the data to the storage', e);
            }
          };
          handleSave();
        }, [signUpEmail]);


  //useEffect to check validity of email
  const [enabled, setEnabled] = useState(false);
     
//email validation
  const searchQueryHandler =(text) =>{
    if (text){
        setSignUpEmail(text);
        setEnabled(true);

        const validateEmail = (email) => {
          // Regular expression pattern for basic email validation
          const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          return pattern.test(email);
      };
  
      if (validateEmail(text)) {
          setEnabled(false)
          console.log("Valid email");
      } else {
          console.log("Invalid email");
      }
    }else{
        setEnabled(false)
        setSignUpEmail("")
    }
  }

    //Login animation
    const translationX = useSharedValue(500);

    useEffect(() => {
        if (login){
            translationX.value = withTiming(-500, { duration: 200, easing: Easing.linear }, () => {
                translationX.value = withTiming(0, { duration: 300, easing: Easing.ease});
        });
        }else if (!login){
            translationX.value = withTiming(500, { duration: 200, easing: Easing.linear }, () => {
                translationX.value = withTiming(0, { duration: 300, easing: Easing.ease});
            })
        }

        else{
            translationX.value = withTiming(0, { duration: 500, easing: Easing.bounce })
        }
        
    },[login])
  
    const animatedStyle = useAnimatedStyle(() => {
      return {
        transform: [{ translateX: translationX.value}],
      };
    });

    // showing alert
    const [isVisible, setVisible] = useState(false);

    const showDialog = () => {
        setVisible(true);
    };

    const hideDialog = () => setVisible(false);

    const [animate, setAnimate] = useState(false)



    const [enable, setEnable] = useState(false)

    return(
      <PaperProvider>
      <View style={styles.container}>
       
      <SafeAreaView>
    
        <Image source={require('../images/login.png')} style={styles.logo} />
        <View style={styles.account}>
          <Text style={styles.title}>Log In</Text>
          <View style={styles.inputConLogIn}>
            <TextInput
              style={[styles.input, { color: 'black' }]}
              placeholder="Enter your gmail"
              placeholderTextColor={'black'}
              value={signUpEmail}
              onChangeText={searchQueryHandler}
            />
            <HelperText type="error" visible={enabled}>
                        {enabled ? "Email address is invalid! ": ""}
            </HelperText>

            <TextInput
              style={[styles.input, { color: 'black' }]}
              placeholder="Enter your password"
              placeholderTextColor={'black'}
              value={signUpPassword}
              onChangeText={(text) => setSignUpPassword(text)}
              secureTextEntry={enable}
            />
            <Ionicons name={enable ? "eye-off-sharp" :"eye-sharp"} size={24} onPress={()=> setEnable(!enable)} style={{position:"absolute", top:120, right:40, width:50, }} color="dimgray" />

            <TouchableOpacity
              style={styles.customBotton}
              onPress={()=> {Login(); setIndicator(true)}}
            >
              {showIndicator ? <ActivityIndicator size={"large"} color={"white"} />
              :
              <Text style={styles.textt}>Log In</Text>}
            </TouchableOpacity>
            <View style={styles.signupContainer}>
              <Text style={styles.signText}>Don't have an account? </Text>

              <TouchableOpacity
                onPress={() => navigation.navigate('SignUp')}
              >
                <Text style={[styles.signText, styles.signupLink]}>
                  SignUp Here
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {isVisible &&
            <Portal>
                <Dialog visible={isVisible} onDismiss={hideDialog}>
                    <Dialog.Icon icon="alert" size={30}/>
                    <Dialog.Title style={{alignSelf:'center', fontWeight:"bold"}}>{login? error : error}</Dialog.Title>
                    <Dialog.Content>
                        <Text style={{alignSelf:'center', fontSize:16}}>{login? error : error}</Text>
                    </Dialog.Content>
                    <Dialog.Actions>
  
                            <TouchableOpacity onPress={hideDialog}><Text style={{alignSelf:'center', fontSize:16}}>{login ? "OK" : "CLOSE"}</Text></TouchableOpacity> 
                        
                    </Dialog.Actions>
                </Dialog>
            </Portal>
            }
 
      </SafeAreaView>
   
    </View>
    </PaperProvider>   
    )
};


export default Login;