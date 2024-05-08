import React, { useState } from 'react';
import {
 View,
 TextInput,
 TouchableOpacity,
 Image,
 SafeAreaView,
 Text,
 Alert,
 
} from 'react-native';
import styles from '../styles/signupStyles';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import {getAuth, createUserWithEmailAndPassword,} from "firebase/auth";
import { Portal,Provider as PaperProvider , Dialog,} from 'react-native-paper';
import {  HelperText } from "react-native-paper";

const SignUp = ({ navigation }) => {

 const [error, setError] = useState('');
 const [signUpEmail, setSignUpEmail] = useState('');
 const [signUpPassword, setSignUpPassword] = useState("");
 const [enabled, setEnabled] = useState(false);
 const [login, setLogin] = useState(false);

 //add user  to  database
 const db = getFirestore();

 const handleAddData = async () => {
   // Write data to Firebase Realtime Database
   const usersCollectionRef = collection(db, 'users'); // Reference to 'users' collection
   const newUserRef = await addDoc(usersCollectionRef, {
    userDetails:{
     email: signUpEmail,
     password: signUpPassword
    }
   });
 };

 const auth = getAuth(); 
 //sign up func
 const SignUp = async () => {
    try {
      await createUserWithEmailAndPassword(auth, signUpEmail, signUpPassword)
      Alert.alert("🎉Sign Up success!🎊",'Please check your emails for verification!');
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

  // showing alert
  const [isVisible, setVisible] = useState(false);

  const showDialog = () => {
      setVisible(true);
  };

  const hideDialog = () => setVisible(false);


 return (
    <PaperProvider>
    <View style={styles.container}>
      <SafeAreaView>
       
        <Image source={require('../images/signup.png')} style={styles.logo} />
        <View style={styles.account}>
          <Text style={styles.title}>Sign Up</Text>

          <View style={styles.inputContainer}>
            <TextInput
              style={[styles.input, { color: '#2F2E41' }]}
              placeholder="Enter your gmail"
              placeholderTextColor={'#2F2E41'}
              value={signUpEmail}
              onChangeText={searchQueryHandler}
            />

            <HelperText type="error" visible={enabled}>
                        {enabled ? "Email address is invalid! ": ""}
            </HelperText>

            <TextInput
              style={[styles.input, { color: '#2F2E41' }]}
              placeholder="Enter your password"
              placeholderTextColor={'#2F2E41'}
              value={signUpPassword}
              onChangeText={(text) => setSignUpPassword(text)}
              secureTextEntry={true}
            />

            <TouchableOpacity
              style={styles.customBotton}
              onPress={()=> {SignUp()}}
            >
              <Text style={styles.textt}>Sign Up</Text>
            </TouchableOpacity>
            <View style={styles.signupContainer}>
              <Text style={styles.signText}>Do you have an account? </Text>

              <TouchableOpacity onPress={() => navigation.navigate('LogInScreen')}>
                <Text style={[styles.signText, styles.signupLink]}>
                 Login Here
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
 );
};

export default SignUp;