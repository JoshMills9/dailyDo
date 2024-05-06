import React, { useEffect, useState } from "react";
import { View, Text, TextInput, KeyboardAvoidingView,TouchableOpacity, Image , ScrollView} from "react-native";
import styles from "../styles/styles";
import { FIREBASE_AUTH, FIREBASE_DB } from "../../firebaseConfig";
import { ActivityIndicator, HelperText } from "react-native-paper";
import { Portal,Provider as PaperProvider , Dialog,} from 'react-native-paper';
import Animated, {
    useSharedValue,
    withTiming,
    useAnimatedStyle,
    Easing,
    
  } from 'react-native-reanimated';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, collection, addDoc } from 'firebase/firestore';

const Login = ({navigation, route}) =>{

    const [users , setUsers]= useState([])
    const [signUpEmail, setSignUpEmail] = useState('');
    const [signUpPassword, setSignUpPassword] = useState("");
    const [login, setLogin] = useState(false);
    const auth = FIREBASE_AUTH;
    const db = getFirestore();

    const handleAddData = async () => {
      // Write data to Firebase Realtime Database
      const usersCollectionRef = collection(db, 'users'); // Reference to 'users' collection
      const newUserRef = await addDoc(usersCollectionRef, {
        email: signUpEmail,
        password: signUpPassword
      });
      console.log(newUserRef)
    };


         // Function to sign up a user
  const SignUp = async () => {
      try {
        await createUserWithEmailAndPassword(auth, signUpEmail, signUpPassword)
        alert('Please check your emails for verification!');
        handleAddData();
        setSignUpEmail('');
        setSignUpPassword('');
        navigation.navigate("To-Do List");
      } catch (error) {
        setError(error.message)
        showDialog();
        console.error('Error signing up:' , error);
      }
    }

    const [error,setError] = useState("")
    console.log(error)
  // Function to log in a user
  const Login = async () => {
    try {
      await signInWithEmailAndPassword(auth, signUpEmail, signUpPassword)
      navigation.navigate("To-Do List");
    } catch (error) {
      setError(error.message)
      showDialog()
    }
    setAnimate(false)
  };

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

    return(
      <KeyboardAvoidingView style={{flex:1}} behavior="height">
        <PaperProvider>
        <ScrollView contentContainerStyle={{height:680}}>
           <View style ={styles.loginView}>
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
     
            {animate? (
            <View style={{flex:1, alignItems:"center",justifyContent:"center", flexDirection:"row"}}>
               <Image style={{width:80,height:80}} source={require("../images/todo.png")}/>
              <Text style={{fontSize:18}}>
                Please wait...
              </Text>
            </View>
            
            )
            :

           (
            <>
            <View>
               <Image style={{width:150,height:150,marginTop:80}} source={require("../images/todo.png")}/>
            </View>
            <Animated.View style={[styles.mainLogin, animatedStyle]}>

                <View style={{justifyContent:"flex-start", alignItems:"center", flexDirection:"row"}}>
                    <View style={{width:25,height:25,backgroundColor:"white",borderRadius:50, marginRight:10}}></View>
                    <Text style= {[styles.header,{color:"cyan",fontSize:25}]}>{login ? "Login" : "Sign Up"}</Text>
                </View>

                <View style={{marginTop:30,}}>
                    <Text style={{fontSize:16, color:"white", fontWeight:"600"}}>Email</Text>
                    <TextInput style={{marginTop:10,borderRadius:10,color:"white", fontSize:16, width:"100%",borderColor:"white",borderWidth:1,padding:10,paddingHorizontal:20}} value={signUpEmail} onChangeText={searchQueryHandler} placeholderTextColor={"white"}  placeholder="Enter your email..." />
                    <HelperText type="error" visible={enabled}>
                        {enabled ? "Email address is invalid! ": ""}
                    </HelperText>
                </View>

                <View style={{marginTop:5, }}>
                    <Text style={{fontSize:16, color:"white",fontWeight:"600"}}>Password</Text>
                    <TextInput style={{marginTop:10,borderRadius:10,color:"white",fontSize:16, width:"100%",borderColor:"white",borderWidth:1,padding:10,paddingHorizontal:20}} value={signUpPassword} onChangeText={(text) => setSignUpPassword(text)} placeholderTextColor={"white"} placeholder="Enter your password..." secureTextEntry = {true}/>
                </View>

                <View style={{marginTop:20, flexDirection:"row", justifyContent:"space-around"}}>
                    <TouchableOpacity onPress={() => {login ? (Login(), setAnimate(true) ): SignUp()}} style={{backgroundColor:"white", width:200, padding:10,borderRadius:10}}><Text style={{fontSize:18,fontWeight:"600", alignSelf:"center"}}>{login ? "Login" : "Sign Up"}</Text></TouchableOpacity>
                </View>

                <View style={{marginTop:20, flexDirection:"row", alignItems:"center",justifyContent:"center"}}>
                    <Text style={{fontSize:12,color:"white"}}>{login ? "Don't have an account...? " : "Already have an account...?" }</Text><TouchableOpacity onPress={() => {login ? (setSignUpEmail(""), setSignUpPassword(''),  setLogin(false) ) : (setSignUpEmail(""), setSignUpPassword(''), setLogin(true))}} ><Text style={{fontSize:14,fontWeight:"600",  color:"cyan"}}>{login ? " Sign up" : " Login"} </Text></TouchableOpacity><Text style={{fontSize:12,color:"white"}}>{login? "here!" :"instead!" }</Text>
                </View>
            </Animated.View>
           </>)
             }
           
            </View>
          </ScrollView>
        </PaperProvider>
      </KeyboardAvoidingView>
        
    )
};


export default Login;