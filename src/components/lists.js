import { Text,ToastAndroid, View, Image,FlatList,DrawerLayoutAndroid, TouchableHighlight,Modal, TouchableOpacity, ImageBackground, Pressable, Alert, ScrollView, Button } from "react-native";
import styles from "../styles/styles";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Audio } from "expo-av";
import { BottomSheet } from 'react-native-btr';
import Animated, {
    useSharedValue,
    withTiming,
    useAnimatedStyle,
    Easing,
    
  } from 'react-native-reanimated';

import { FAB,Portal,Provider as PaperProvider , Dialog , Badge, Avatar, IconButton} from 'react-native-paper';
import { getAuth, onAuthStateChanged,signOut ,deleteUser} from 'firebase/auth';
import { getFirestore, collection, getDocs,where,query,doc,deleteDoc,} from 'firebase/firestore';

import AsyncStorage from '@react-native-async-storage/async-storage';


import * as Sharing from 'expo-sharing';
import * as FileSystem from 'expo-file-system';

import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import Entypo from '@expo/vector-icons/Entypo';
import { AntDesign } from '@expo/vector-icons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

const TodoLists=({navigation, route}) =>{

    //destructuring the route params
    const {header,description, alarm, calendar, color, reminder,song, index, toggler} = route.params || {};
    //state to handle list
    const [list , setlist] = useState([])  
 
    const [open, setOpen] = useState(false); 
    const [user, setUser] = useState(null);
    const [Username, setUserName] = useState("")
    const [assignedTask, setAssignedTask] = useState([]);

    console.log(assignedTask)

      //useEffect to save list to Storage
      useEffect(() => {
        const handleSave = async () => {
            try {
              await AsyncStorage.setItem('Token','true');
           
            } catch (e) {
              console.error('Failed to save the data to the storage', e);
            }
          };
          handleSave();
        }, []);

 

    //using useEffect hook to automatically update the list with the properties header, description , alarm, calendar , color, reminder, song
    useEffect(() => {
        if ((header !== undefined || description !== undefined) && index === undefined) {
            // Add new item to the list
            setlist(prevList => [
                { header, description, alarm, calendar, color, reminder, song , toggler}, ...prevList
            ]);
        } else if ((header !== undefined || description !== undefined || alarm !== undefined 
            || calendar !== undefined || color !== undefined || reminder !== undefined || song !== undefined || toggler !== undefined) && index !== undefined) {
            // Update existing item in the list
            setlist(prevList => {
                // Update the item at the specified index
                const updatedList = [...prevList];
                updatedList[index] = { header, description, alarm, calendar, color, reminder, song,toggler };
                return updatedList;
            });
        }
    }, [header, description, alarm, calendar, color, reminder,song, index,toggler]);


    
    const [usertime, setUsertime] = useState([]);

    const [isUserTime, setIsUserTime] = useState();

    const [stopSound, setstopSound] = useState(false);

    const [normalTime, setTime] =useState("")
   

    useEffect(()=>{
        setUsertime(prevList => [{alarm,calendar}, ...prevList])
    },[alarm,calendar])


    //useEffect to fetch data from storage
    useEffect(() => {
        const fetchData = async () => {
          try {
            const data = await AsyncStorage.getItem('@storage_Key');
            if (data !== null) {
              const parsedData = JSON.parse(data);
              setlist(parsedData);
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
              const stringValue = JSON.stringify(list);
              await AsyncStorage.setItem('@storage_Key', stringValue);
        
            } catch (e) {
              console.error('Failed to save the data to the storage', e);
            }
          };
          handleSave();
        }, [list]);


        const [sound, setSound] = useState();
        const [currentTimeIndex, setCurrentTimeIndex] = useState("");




 
        //use effect to handle how music plays
        useEffect(() => {
            const interval = setInterval(() => {


                const currentDate = new Date();
                let hour = currentDate.getHours();
                const amOrPm = hour < 12 ? 'AM' : 'PM';
                hour = hour % 12 || 12;
    
                const currentFormattedTime = `${hour}:${String(currentDate.getMinutes()).padStart(2, '0')} ${amOrPm}`;
                setTime(currentFormattedTime)


                const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
                const monthsOfYear = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                const dayOfWeek = daysOfWeek[currentDate.getDay()];
                const dayOfMonth = currentDate.getDate();
                const monthOfYear = monthsOfYear[currentDate.getMonth()];
                const year = currentDate.getFullYear();

                let suffix = 'th';
                if (dayOfMonth === 1 || dayOfMonth === 21 || dayOfMonth === 31) {
                    suffix = 'st';
                } else if (dayOfMonth === 2 || dayOfMonth === 22) {
                    suffix = 'nd';
                } else if (dayOfMonth === 3 || dayOfMonth === 23) {
                    suffix = 'rd';
                }

                const formattedDate = `${dayOfWeek}, ${dayOfMonth}${suffix} ${monthOfYear}, ${year}`;

                usertime.forEach(item => {
                    
                    if ((item.alarm === currentFormattedTime) && (item.calendar === formattedDate)) {
                        setIsUserTime(item.alarm);
                    }
                });
                

                if (song === "Clingcling" && isUserTime === currentFormattedTime) {
                    const loadSound = async () => {
                        try {
                            console.log('Loading Sound');
                            const { sound } = await Audio.Sound.createAsync(require(`../media/Clingcling.wav`));
                            setSound(sound);
                            console.log('Playing Sound');
                            await sound.playAsync();
                        } catch (error) {
                            console.error('Error loading or playing sound:', error);
                        }
                    };
            
                    if (stopSound){
                        const stop = async () => {if (sound !== null){
                            await sound.stopAsync();
                            function showToast() {
                                ToastAndroid.show('Alarm Stopped Successfully!', ToastAndroid.LONG);
                              };showToast() 
                            }
                            }
                        stop()
               
                    }else{
                        loadSound();
                    }

                    setUsertime(prevList => prevList.filter(item => item.alarm !== currentFormattedTime))
                } else if (song === "Cockcrow"  && isUserTime === currentFormattedTime) {
                    const loadSound = async () => {
                        try {
                            console.log('Loading Sound');
                            const { sound } = await Audio.Sound.createAsync(require(`../media/sound2.wav`));
                            setSound(sound);
                            console.log('Playing Sound');
                            await sound.playAsync();
                        } catch (error) {
                            console.error('Error loading or playing sound:', error);
                        }
                    };
                    
                    if (stopSound){
                        const stop = async () => {if (sound !== null){
                            await sound.stopAsync();
                            function showToast() {
                                ToastAndroid.show('Alarm Stopped Successfully!', ToastAndroid.LONG);
                              };showToast() 
                            }
                            }
                        stop();
               
                    }else{
                        loadSound();
                    }
                   
                    setUsertime(usertime.filter(item => item.alarm !== currentFormattedTime))
                }
                else if (song === "Bell"  && isUserTime === currentFormattedTime) {
                    const loadSound = async () => {
                        try {
                            console.log('Loading Sound');
                            const { sound } = await Audio.Sound.createAsync(require(`../media/bell.wav`));
                            setSound(sound);
                            console.log('Playing Sound');
                            await sound.playAsync();
                        } catch (error) {
                            console.error('Error loading or playing sound:', error);
                        }
                    };
                    if (stopSound){
                        const stop = async () => {if (sound !== null){
                            await sound.stopAsync();
                            function showToast() {
                                ToastAndroid.show('Alarm Stopped Successfully!', ToastAndroid.LONG);
                              };showToast() 
                            }
                            }
                        stop()
               
                    }else{
                        loadSound();
                    }
            
                
                   setUsertime(usertime.filter(item => item.alarm !== currentFormattedTime))
                }
                else if (song === "Fairy"  && isUserTime === currentFormattedTime) {
                    const loadSound = async () => {
                        try {
                            console.log('Loading Sound');
                            const { sound } = await Audio.Sound.createAsync(require(`../media/fairy message.wav`));
                            setSound(sound);
                            console.log('Playing Sound');
                            await sound.playAsync();
                        } catch (error) {
                            console.error('Error loading or playing sound:', error);
                        }
                    };
                    if (stopSound){
                        const stop = async () => {if (sound !== null){
                            await sound.stopAsync();
                            function showToast() {
                                ToastAndroid.show('Alarm Stopped Successfully!', ToastAndroid.LONG);
                              };showToast() ;
                            }
                            }
                        stop()
                    }else{
                        loadSound();
                    }
                    
                    setUsertime(usertime.filter(item => item.alarm !== currentFormattedTime))
                }
                else if (song === "Clock"  && isUserTime === currentFormattedTime) {
                    const loadSound = async () => {
                        try {
                            console.log('Loading Sound');
                            const { sound } = await Audio.Sound.createAsync(require(`../media/clock.wav`));
                            setSound(sound);
                            console.log('Playing Sound');
                            await sound.playAsync();
                        } catch (error) {
                            console.error('Error loading or playing sound:', error);
                        }
                    };
            
                    if (stopSound){
                        const stop = async () => {if (sound !== null){
                            await sound.stopAsync();
                            function showToast() {
                                ToastAndroid.show('Alarm Stopped Successfully!', ToastAndroid.LONG);
                              };showToast() 
                            }
                            }
                        stop()
               
                    }else{
                        loadSound();
                    }

                    setUsertime(usertime.filter(item => item.alarm !== currentFormattedTime))
                    
                }

                const currentIndex = list.findIndex((item, index) => index.toString() &&
                 item.alarm === currentFormattedTime && item.calendar === formattedDate
                );
                setCurrentTimeIndex(currentIndex)

                //console.log(currentFormattedTime); // Log current formatted time
            }, 1000 * 10); // Update every minute
            return () => {
                clearInterval(interval); // Clear any intervals
                if(sound){
                    sound.unloadAsync();
                }
            };
            
        }, [usertime,isUserTime,list, stopSound]);

        //state to toggle modal screen
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const [newEdit,  setEdit] = useState(null);

        //function to toggle modal
    const togglePopup = () => {
        setIsPopupVisible(!isPopupVisible);
    };
   
        //function to send data to the edit screen
    const editFunc = (Key,Header, Description,Alarm,Calendar,Color,Reminder,Song,Toggler) => {
        //edit list object to b routed
        const editObj = {
        Header: Header,
        Description: Description,
        Alarm:Alarm,
        Calendar:Calendar,
        Colors:Color,
        Reminder:Reminder,
        Song:Song,
        Index:Key,
        Toggler: Toggler
    };
        setEdit(editObj);
        togglePopup();

    }
        //state to delete item by index
        const [del, setDel] = useState("");
        //state to store indexes
        const [selectedIndexes, setSelectedIndexes] = useState([]);

        // Function to toggle selection of an index
        const completed = (index) => {
            if (selectedIndexes.includes(index)) {
                setSelectedIndexes(selectedIndexes.filter(i => i !== index)); // Deselect the index
            } else {
                setSelectedIndexes([...selectedIndexes, index]); // Select the index
            }
        };

        //function to delete item by index
        const deleteList = (index) => {
        
            // Create a copy of the original list
            const updatedList = [...list];
        
            // Remove the item at the specified index
            updatedList.splice(index, 1);

            // Update the state with the modified list
            setlist(updatedList);
        };


            const [visible, setVisible] = useState(false);
            const [deleteIndex, setDeleteIndex] = useState(null);

            const showDialog = (index) => {
                setVisible(true);
                setDeleteIndex(index);
            };

            const hideDialog = () => setVisible(false);

            const handleDelete = () => {
                deleteList(deleteIndex);
                hideDialog();
            };
        
        
            //function to show priority
        const [isImportant, setIsImportant] = useState(null);

        //useeffect to toggle switch 
        useEffect(() =>{
            if (newEdit && newEdit.Toggler !== null){
            setIsImportant(newEdit.Toggler)
            }
        },[newEdit?.Toggler])
        



        //function to handle user choice from modal
        const handleOptionSelect = (option) => {
            if (option === "Edit") {
                navigation.navigate("Edit Task", newEdit);
            } else if (option === "Delete") {
                showDialog(del);
            } else if (option === "Completed") {
                completed(del); // Pass the selected index (del) to the completed function
            }else if (option === "Important"){
                 handleToggleImportant();
            }else if (option === "Stop"){
                 setstopSound(true)
                 setwiggle(false);
            }else if(option === "Share"){
                //shareTodoList(share);
            }
            setIsPopupVisible(false)
        };

        //state to store selected index
   
        const complete= selectedIndexes.includes(del);
   

        //add animation to flatlist view
        
        const translationX = useSharedValue(0);

        const wiggleAnimation = () => {
          translationX.value = withTiming(-10, { duration: 150, easing: Easing.linear }, () => {
            translationX.value = withTiming(10, { duration: 150, easing: Easing.linear }, () => {
              translationX.value = withTiming(0, { duration: 100, easing: Easing.linear });
            });
          });
        };
      
        const animatedStyle = useAnimatedStyle(() => {
          return {
            transform: [{ translateX: translationX.value}],
          };
        });

        const [wiggle, setwiggle] = useState(false);
          //UseEffect to update stop sound state & wiggle state
          useEffect(() => {
            if (isUserTime !== normalTime){
                setstopSound(false);
                setwiggle(false)
            }
        },[normalTime])

        //useeffect to wiggle animation
        useEffect(()=>{
            if(currentTimeIndex !== undefined){
            setwiggle(true);
           const interval = setInterval (() => {
                wiggleAnimation();
        }, 1000 * 1);

        return (() =>{
            clearInterval(interval)
        })
    }else{
        setwiggle(false)
    }
        },[currentTimeIndex]);


        

        //function to share a task
      
        const shareTask = (index) =>{
            const shareList = [...list];
            const share = [shareList[index]]; 
            if (share !== undefined){
                shareTodoList(share)
            }
        }
       

        const formatTodoList = (share) => {

            if (share.length === 1) {
                const formattedTextArray = share.map((item) => `******** My Task ********** \nHeader: ${item.header}\nDescription: ${item.description}\nAlarm: ${item.alarm}\nCalendar: ${item.calendar}`);
                const formattedText = formattedTextArray.join('\n\n'); 
                return formattedText;
            } else if (share.length > 1) {
                const formattedTextArray = share.map((item, index) => `Task ${index + 1}: \nHeader: ${item.header}\nDescription: ${item.description}\nAlarm: ${item.alarm}\nCalendar: ${item.calendar}`);
                const formattedText = formattedTextArray.join('\n\n'); // Join formatted texts with double line breaks
                return formattedText;
            }
        };
        
        // function to share todo list
        const shareTodoList = async (share) => {
            try {
                if (share.length === 0) {
                    alert('The todo list is empty. Nothing to share.')
                    return; 
                }
        
                const todoListText = formatTodoList(share);
                const fileUri = FileSystem.cacheDirectory + 'todo_list.txt';
        
                await FileSystem.writeAsStringAsync(fileUri, todoListText);
                await Sharing.shareAsync(fileUri);
            } catch (error) {
                console.error('Sharing failed:', error);
                // Display an error message to the user
                Alert.alert('Error', 'Failed to share todo list. Please try again later.');
            }
        };

          




    //useEffect to fetch data from storage
    useLayoutEffect(() => {
        const fetchData = async () => {
          try {
            const data = await AsyncStorage.getItem('userEmail');
            if (data !== null) {
              const parsedData = JSON.parse(data);
              console.log(parsedData)
              setUser(parsedData);
              const parts = parsedData.split('@');
              const username = parts[0]
              const capitalizedUsername = username.charAt(0).toUpperCase() + username.slice(1)
              setUserName(capitalizedUsername)   
            
            }
          } catch (e) {
            console.error('Failed to fetch the data from storage', e);
          }
        };
    
        fetchData();
      }, []);


       // Function to delete user details from auth
        const deleteUserAccount = async () => {
            const user = auth.currentUser;

            try {
                // Check if user is signed in
                if (user) {
                    // Delete the user
                    await deleteUser(user);
                    Alert.alert("---- dailyDo ----", 'User account deleted successfully.');
                    navigation.navigate("LogInScreen");
                } else {
                    // User is not signed in
                    console.log('No user signed in.');
                    Alert.alert("---- dailyDo ----", 'No user is currently signed in.');
                }
            } catch (error) {
                // Handle error
                console.error('Error deleting user:', error.message);
                Alert.alert("---- dailyDo ----", `Error deleting account: ${error.message}`);
            }
        };



      // Delete user documents from the Firestore collection based on email
        const deleteDocumentByEmail = async (emailToSearch) => {
            const usersCollectionRef = collection(db, 'users');

            // Query to find documents where the 'userDetails.email' field matches the given email
            const q = query(usersCollectionRef, where('userDetails.email', '==', emailToSearch));

            try {
                const querySnapshot = await getDocs(q);
                const deletions = []; // Store deletion promises

                for (const document of querySnapshot.docs) {
                    const docRef = doc(db, `users/${document.id}`); // Reference to the document
                    deletions.push(deleteDoc(docRef).then(() => {
                        console.log(`Document with ID ${document.id} deleted.`);
                    })); // Push promise to array
                }

                await Promise.all(deletions); // Wait for all deletions to complete

                navigation.navigate("LogInScreen");
                clearAllData();

                return true; // Indicate success if at least one document was deleted
            } catch (error) {
                console.error('Error deleting document:', error);
                return false; // Indicate failure
            }
        };



        //functio to clear Async data
        const clearAllData = async () => {
            try {
              await AsyncStorage.clear();
              console.log('All data cleared!');
            } catch (error) {
              console.error('Error clearing data:', error);
            }
          };
          
    
          


    const auth = getAuth()
    //function to signout user
    const handleSignOut = () => {
        clearAllData()
        signOut(auth)
            .then(() => {
                // Sign-out successful.
                console.log("User signed out successfully");
                navigation.navigate("LogInScreen")
            })
            .catch((error) => {
                // An error happened.
                console.error("Error signing out user:", error);
            });
    }


    const [assignedTasks, setAssignedTasks] = useState(false);
    const [numberOfTasks, setNumOfTask] = useState(null)

    const db = getFirestore();

    //useEffect to get assigned tasks from db
    useEffect(() => {
        const fetchAssignedTasks = async () => {
            try {
                // Construct a reference to the 'tasks' collection
                const tasksCollectionRef = collection(db, 'users');
                
                // Query the tasks collection for documents where the 'assignedTo' field is equal to userEmail
                const querySnapshot = await getDocs(query(tasksCollectionRef, where("assigned", "==", user)));
                if (!querySnapshot.empty) {
                    // If documents are found, extract their data and update the state with the tasks
                    const tasks = querySnapshot.docs.map(doc => doc.data().data);
                    const  newTask = tasks[0].length;
                    setNumOfTask(newTask)
                    setAssignedTasks(true);
                    setAssignedTask(tasks[0])
                } else {
                    console.log('No assigned tasks found for user:', user);
                }
            } catch (error) {
                console.error('Error receiving assigned tasks:', error);
            }
        };
    
        // Call fetchAssignedTasks when the component mounts or when db or userEmail change
        fetchAssignedTasks();
    }, [db, user]);



    //useEffect to save list to Storage
    useEffect(() => {
        const handleSave = async () => {
            try {
              const stringValue = JSON.stringify(assignedTask);
              await AsyncStorage.setItem('assignedTask', stringValue);
        
            } catch (e) {
              console.error('Failed to save the data to the storage', e);
            }
          };
          handleSave();

          
        }, [assignedTask]);



    const [showProfile, setProfile] = useState(false)
      
    const UserProfile = () =>{
        return(
        <View style={{backgroundColor:"white" ,zIndex:99, position:"absolute", width:200,justifyContent:"space-evenly", height:120,elevation:6, top:60, right:15, borderRadius:6}}>
            <TouchableOpacity  onPress={()=> {handleSignOut();  navigation.navigate("LogInScreen")}} style={{width:"100%",flexDirection:"row", justifyContent:"center",  alignItems:"center",}}><AntDesign name="logout" size={18} color="darkblue" /><Text style={{fontSize:17, color:"darkblue"}}> Sign Out</Text></TouchableOpacity>
            <TouchableOpacity  onPress={() => {deleteDocumentByEmail(user) ;deleteUserAccount()}} style={{width:"100%",flexDirection:"row",justifyContent:"center", alignItems:"center",}}><MaterialCommunityIcons name="account-remove" size={24} color="red" /><Text style={{fontSize:17, color:"red"}}> Delete Account</Text></TouchableOpacity>
        </View>)
    }






    return(
            <ImageBackground  source={require("../images/image 2-2.png")} resizeMode="repeat" style={[styles.container]}>

            <View style={{backgroundColor:"white", height:60, padding:15}}>
                <View style={{flexDirection:"row", justifyContent:"space-between", alignItems:"center"}}>
                    <Text style={{fontSize:20,color:"midnightblue" }}>To-Do List</Text>
                   
                    <TouchableOpacity style={{justifyContent:"center", alignItems:"center"}} onPress={()=> setProfile(!showProfile)} >
                        <FontAwesome5 name="user-alt" size={22} color="midnightblue" />
                        <Text style={{fontSize:9, color:"midnightblue"}}>{Username}</Text>
                    </TouchableOpacity>
                
                </View>
            </View>

            <PaperProvider>
                {visible &&
            <Portal>
                <Dialog visible={visible} onDismiss={hideDialog}>
                    <Dialog.Icon icon="alert" size={30}/>
                    <Dialog.Title style={{alignSelf:'center', fontWeight:"bold"}}>Caution!!</Dialog.Title>
                    <Dialog.Content>
                        <Text style={{alignSelf:'center', fontSize:16, color:"white"}}>Do you want to delete this task?</Text>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <View style={{flexDirection:"row", justifyContent:"space-evenly", width:100}}>
                            <TouchableOpacity onPress={hideDialog}><Text style={{alignSelf:'center', fontSize:16, marginLeft:-100, color:"red"}}>Cancel</Text></TouchableOpacity> 
                            <TouchableOpacity  onPress={handleDelete}><Text style={{alignSelf:'center', fontSize:16, color:"white"}}>Yes</Text></TouchableOpacity> 
                        </View>
                        
                    </Dialog.Actions>
                </Dialog>
            </Portal>
            }
            
            <FlatList
                data={list}
                keyExtractor={(item, index) => {
                    // Generate a unique key using both the item's header and index
                    return `${item?.header?.toString()}_${index}`;
                }}

                renderItem={({item, index})=> {
                    const selectedKey = index?.toString(); // Generate unique key
                    const selected = selectedIndexes?.includes(selectedKey); // Check if the item is selected
                    
                    return(
                        (item?.header && item?.description && index?.toString()) ? 

                     <Pressable style={({pressed}) => ({opacity: pressed ? 0.9 : 1 })} 
                        onPress={() => {editFunc( index, item.header, item.description,item.alarm,item.calendar,item.color,
                            item.reminder,item.song,item.toggler); setDel(index.toString()); UserProfile ?  setProfile(false) : null}}>

                     { (wiggle && index == currentTimeIndex) ? <Animated.View style={[styles.view,{backgroundColor: selected ? 'gray' : 'midnightblue'}, animatedStyle]}>

                        <View style={styles.subview}> 
                            <View style={styles.headview}>
                                <View style={{flexDirection:"row" , justifyContent:"space-between",marginTop:-6}}>
                                    <View style={{width:270,height:60}}>
                                        <Text style={styles.header} adjustsFontSizeToFit={true} numberOfLines={2}>
                                            {item.header.length > 35 ? `${item.header.slice(0, 35)} .....` : item.header}
                                        </Text>
                                    </View>
                
                                    <View style={{height:80, justifyContent:"space-between",alignItems:"center",}}>
                                        <View style={[styles.color, {backgroundColor: item.color, marginRight:-3 }]}></View>
                                        { item.toggler ?
                                        <View><MaterialIcons name="star" size={30} color="white" /></View> : null}
                                    </View>
                                    
                                </View>
                               
                                <Text style={styles.description}>
                                   {item.description.length > 35 ? `${item.description.slice(0, 35)} .....` : item.description}
                                </Text>
                            </View>
        
                            <View style={{flexDirection:"row", justifyContent:"space-between",alignItems:"center",}}>
                                <Text style={styles.medtext}>
                                   {item.calendar}
                                </Text>

                                <View style={styles.Alarm}>
                                    
                                    <View style={styles.alarm}>
                                        <Text style={[styles.text, {fontSize:20,marginRight:8, alignSelf:"center", flex:1}]} adjustsFontSizeToFit={true} numberOfLines={1}>{item.song}</Text>
                                        <Image style={styles.img} source={require("../images/music.png")}/>
                                    </View>

                                    <View style={styles.alarm1}>
                                        <Text style={styles.text}>{item.reminder}</Text>
                                        <Image style={styles.img} source={require("../images/bell.png")}/>
                                    </View>

                                </View>
                             </View>

                             <View style={{ flexDirection:"row", justifyContent:"space-between", alignItems:"center"}}>
                                {(currentTimeIndex === index) ? 
                                    <View style={[styles.timeview,  {backgroundColor:"orangered"}]}>
                                        <Image style={ {tintColor:"white", height:20,width:20}} source={require("../images/clock.png")}/>
                                        <Text style={{fontSize:24, fontWeight:500, color:"white"}}>{item.alarm}</Text>
                                    </View>
                                :   <View style={[styles.timeview,{backgroundColor: selected ? "darkgray" : "white"}]}>
                                        <Image style={ {tintColor:selected? "white": "black", height:20,width:20}} source={require("../images/clock.png")}/>
                                        <Text style={{fontSize:24, fontWeight:500, color: selected ? "white" : "black"}}>{item.alarm}</Text>
                                    </View>
                                }
                                <View style={{ width:150,height:40, alignItems:"flex-end", justifyContent:"center",marginRight:8}}>
                                    <Text adjustsFontSizeToFit={true} numberOfLines={1} style={[styles.text,{fontSize:14, fontWeight:"500"}]}>
                                        Status: {selected ? <Text style={[styles.text,{fontSize:13, fontWeight:"bold", color:"lightgreen" }]}>COMPLETED</Text> : <Text style={[styles.text,{fontSize:12,fontWeight:"400", color:"lightgray"}]}>PENDING</Text>}</Text>
                                </View>
                             </View>
                        </View>
                        
                     </Animated.View>
                     :
                     <View style={[styles.view,{backgroundColor: selected ? 'gray' : "midnightblue"}]}>

                        <View style={styles.subview}> 
                            <View style={styles.headview}>
                                <View style={{flexDirection:"row" , justifyContent:"space-between",marginTop:-6}}>
                                    <View style={{width:270,height:60}}>
                                        <Text style={styles.header} adjustsFontSizeToFit={true} numberOfLines={2}>
                                            {item.header.length > 35 ? `${item.header.slice(0, 35)} .....` : item.header}
                                        </Text>
                                    </View>
                
                                    <View style={{height:80, justifyContent:"space-between",alignItems:"center",}}>
                                        <View style={[styles.color, {backgroundColor: item.color, marginRight:-3 }]}></View>
                                        { item.toggler ?
                                        <View><MaterialIcons name="star" size={30} color="white" /></View> : null}
                                    </View>
                                    
                                </View>
                               
                                <Text style={styles.description}>
                                   {item.description.length > 35 ? `${item.description.slice(0, 35)} .....` : item.description}
                                </Text>
                            </View>
        
                            <View style={{flexDirection:"row", justifyContent:"space-between",alignItems:"center",}}>
                                <Text style={styles.medtext}>
                                   {item.calendar}
                                </Text>

                                <View style={styles.Alarm}>
                                    
                                    <View style={styles.alarm}>
                                        <Text style={[styles.text, {fontSize:20,marginRight:8, alignSelf:"center", flex:1}]} adjustsFontSizeToFit={true} numberOfLines={1}>{item.song}</Text>
                                        <Image style={styles.img} source={require("../images/music.png")}/>
                                    </View>

                                    <View style={styles.alarm1}>
                                        <Text style={styles.text}>{item.reminder}</Text>
                                        <Image style={styles.img} source={require("../images/bell.png")}/>
                                    </View>

                                </View>
                             </View>

                             <View style={{ flexDirection:"row", justifyContent:"space-between", alignItems:"center"}}>
                                {(currentTimeIndex === index) ? 
                                    <View style={[styles.timeview,  {backgroundColor:"orangered"}]}>
                                        <Image style={ {tintColor:"white", height:20,width:20}} source={require("../images/clock.png")}/>
                                        <Text style={{fontSize:24, fontWeight:500, color:"white"}}>{item.alarm}</Text>
                                    </View>
                                :   <View style={[styles.timeview,{backgroundColor: selected ? "darkgray" : "white"}]}>
                                        <Image style={ {tintColor:selected? "white": "black", height:20,width:20}} source={require("../images/clock.png")}/>
                                        <Text style={{fontSize:24, fontWeight:500, color: selected ? "white" : "black"}}>{item.alarm}</Text>
                                    </View>
                                }
                                <View style={{ width:150,height:40, alignItems:"flex-end", justifyContent:"center",marginRight:8}}>
                                    <Text adjustsFontSizeToFit={true} numberOfLines={1} style={[styles.text,{fontSize:14, fontWeight:"500"}]}>
                                        Status: {selected ? <Text style={[styles.text,{fontSize:13, fontWeight:"bold", color:"lightgreen" }]}>COMPLETED</Text> : <Text style={[styles.text,{fontSize:12,fontWeight:"400", color:"lightgray"}]}>PENDING</Text>}</Text>
                                </View>
                             </View>
                        </View>
                        
                     </View>
                     }
                </Pressable>

                :
                
                (item.header) && <Pressable style={({pressed}) => ({opacity: pressed ? 0.95 : 1 })} 
                        onPress={() => {editFunc( index, item.header, item.description,item.alarm,item.calendar,item.color,
                            item.reminder,item.song,item.toggler); setDel(index.toString()); UserProfile ?  setProfile(false) : null}}>

                { (wiggle && index == currentTimeIndex) ? <Animated.View  style={[styles.container, { marginTop:15,marginBottom:5}, animatedStyle]}>
                            <View style={[{width:"93%",alignSelf:"center",paddingHorizontal:20,paddingVertical:10,elevation:6,borderRadius:30,shadowRadius:50,backgroundColor: selected ? 'gray' : "midnightblue"}]}>
                                <View style={styles.compheader}>
                                    <View style={styles.title}>
                                        <Text style={[styles.header,{fontSize:25}]} adjustsFontSizeToFit={true} numberOfLines={1}>
                                            {item.header.length > 20 ? `${item.header.slice(0, 20)} .....` : item.header}
                                        </Text>
                                    </View>
                                    <View style={[styles.color, {backgroundColor: item.color , width:25,height:25, marginLeft:5}]}></View>
                                </View>
                                <View style={[styles.dateDescrip, { justifyContent:"space-between",marginTop:8,}]}>
                                    <View>
                                        <Text style={[styles.medtext,  { fontSize:15}]}>
                                            {item.calendar}
                                        </Text>
                                    </View>

                                    <View style={[styles.Alarm, {width:80,marginRight:4}]}>
                                    
                                    <View style={[styles.alarm,{width:80}]}>
                                        <Text style={[styles.text, {fontSize:13, alignSelf:"center", flex:1}]} adjustsFontSizeToFit={true} numberOfLines={1}>{item.song}</Text>
                                        <Image style={[styles.img,{width:16,height:16}]} source={require("../images/music.png")}/>
                                    </View>

                                    <View style={styles.alarm1}>
                                        <Text style={styles.text}>{item.reminder}</Text>
                                        <Image style={[styles.img,{width:18,height:18}]} source={require("../images/bell.png")}/>
                                    </View>

                                </View>
                                 
                                  
                                </View>
                                <View style={{flexDirection:"row", justifyContent:"space-between", alignItems:"center" }}>
                                
                                {(currentTimeIndex === index) ? 
                                    <View style={[styles.timeview,  {backgroundColor:"orangered", width:120, height:25}]}>
                                        <Image style={ {tintColor:"white", height:15,width:15}} source={require("../images/clock.png")}/>
                                        <Text style={{fontSize:15, fontWeight:"500", color:"white"}}>{item.alarm}</Text>
                                    </View>
                                :   <View style={[styles.timeview,{backgroundColor: selected ? "darkgray" : "white", width:120, height:25}]}>
                                        <Image style={ {tintColor:selected? "white": "black", height:15,width:15}} source={require("../images/clock.png")}/>
                                        <Text style={{fontSize:15, fontWeight:"500", color: selected ? "white" : "black"}}>{item.alarm}</Text>
                                    </View>
                                }
                                    <View>
                                        <View style={{ width:150,height:40, alignItems:"flex-end", justifyContent:"center",marginRight:5}}>
                                            <Text adjustsFontSizeToFit={true} numberOfLines={1} style={[styles.text,{fontSize:14, fontWeight:"500"}]}>
                                            Status: {selected ? <Text style={[styles.text,{fontSize:13, fontWeight:"bold", color:"lightgreen" }]}>COMPLETED</Text> : <Text style={[styles.text,{fontSize:12,fontWeight:"400", color:"lightgray"}]}>PENDING</Text>}</Text>
                                        </View>
                                    </View>

                                    {(item.toggler)   ?
                                        <View ><MaterialIcons name="star" size={25} color="white" /></View> : null}
                                    
                                        
                                </View>
                            </View>
                        </Animated.View>
                        :
                        <View  style={[styles.container, { marginTop:15,marginBottom:5}]}>
                            <View style={[{width:"93%",alignSelf:"center",paddingHorizontal:20,paddingVertical:10,elevation:6,borderRadius:30,shadowRadius:50,backgroundColor: selected ? 'gray' : "midnightblue"}]}>
                                <View style={styles.compheader}>
                                    <View style={styles.title}>
                                        <Text style={[styles.header,{fontSize:25}]} adjustsFontSizeToFit={true} numberOfLines={1}>
                                            {item.header.length > 20 ? `${item.header.slice(0, 20)} .....` : item.header}
                                        </Text>
                                    </View>
                                    <View style={[styles.color, {backgroundColor: item.color , width:25,height:25, marginLeft:5}]}></View>
                                </View>
                                <View style={[styles.dateDescrip, { justifyContent:"space-between",marginTop:8,}]}>
                                    <View>
                                        <Text style={[styles.medtext,  { fontSize:15}]}>
                                            {item.calendar}
                                        </Text>
                                    </View>

                                    <View style={[styles.Alarm, {width:80,marginRight:4}]}>
                                    
                                    <View style={[styles.alarm,{width:80}]}>
                                        <Text style={[styles.text, {fontSize:13, alignSelf:"center", flex:1}]} adjustsFontSizeToFit={true} numberOfLines={1}>{item.song}</Text>
                                        <Image style={[styles.img,{width:16,height:16}]} source={require("../images/music.png")}/>
                                    </View>

                                    <View style={styles.alarm1}>
                                        <Text style={styles.text}>{item.reminder}</Text>
                                        <Image style={[styles.img,{width:18,height:18}]} source={require("../images/bell.png")}/>
                                    </View>

                                </View>
                                 
                                  
                                </View>
                                <View style={{flexDirection:"row", justifyContent:"space-between", alignItems:"center" }}>
                                
                                {(currentTimeIndex === index) ? 
                                    <View style={[styles.timeview,  {backgroundColor:"orangered", width:120, height:25}]}>
                                        <Image style={ {tintColor:"white", height:15,width:15}} source={require("../images/clock.png")}/>
                                        <Text style={{fontSize:15, fontWeight:"500", color:"white"}}>{item.alarm}</Text>
                                    </View>
                                :   <View style={[styles.timeview,{backgroundColor: selected ? "darkgray" : "white", width:120, height:25}]}>
                                        <Image style={ {tintColor:selected? "white": "black", height:15,width:15}} source={require("../images/clock.png")}/>
                                        <Text style={{fontSize:15, fontWeight:"500", color: selected ? "white" : "black"}}>{item.alarm}</Text>
                                    </View>
                                }
                                    <View>
                                        <View style={{ width:150,height:40, alignItems:"flex-end", justifyContent:"center",marginRight:5}}>
                                            <Text adjustsFontSizeToFit={true} numberOfLines={1} style={[styles.text,{fontSize:14, fontWeight:"500"}]}>
                                            Status: {selected ? <Text style={[styles.text,{fontSize:13, fontWeight:"bold", color:"lightgreen" }]}>COMPLETED</Text> : <Text style={[styles.text,{fontSize:12,fontWeight:"400", color:"lightgray"}]}>PENDING</Text>}</Text>
                                        </View>
                                    </View>

                                    {(item.toggler)   ?
                                        <View ><MaterialIcons name="star" size={25} color="white" /></View> : null}
                                    
                                        
                                </View>
                            </View>
                        </View>
                }
                    </Pressable>

                )
                }}
            />

            </PaperProvider>


       
            
            
                 <FAB.Group
                    open={open}
                    
                    icon={open ? 'close' : 'pencil'}
                    backdropColor="rgba(255, 255, 255, 0.8)"
                    actions={[
                            
                        { icon: 'plus', color:'darkblue', style:{backgroundColor:"white",marginLeft:-15,borderRadius:50}, onPress: () => {navigation.navigate("Add New Task"); setOpen(open)} },
                            
                        { icon: 'account-plus',label:"Assign Task", color:"darkblue", style:{backgroundColor:"white", marginLeft:-15, borderRadius:50}, onPress: () => {navigation.navigate("Assign Task",{ userEmail: user }); setOpen(open)} },
                            
                        {
                                icon: () => (
                                  <View>
                                    {assignedTasks && <Badge
                                     size={16}
                                     style={{position:"absolute", right:-5, fontSize:12}}
                                     badgeStyle={{ backgroundColor: "red"}} // Adjust badge style as needed
                                    >{numberOfTasks}</Badge>
                                    }
                                    <IconButton icon="bell" iconColor="darkblue" size={23} style={{alignSelf:"center",justifyContent:"center",zIndex:-1, position:"absolute",top:-10}}/>
                                  </View>
                                ),
                                label: "Notifications",
                                style:{backgroundColor:"white",marginLeft:-15,borderRadius:50,},
                                onPress: () => 
                                    {navigation.navigate("Notifications",{ userEmail: user }); setOpen(open); setAssignedTasks(false) }},
                                    

                            { icon: 'share-all', color:'darkblue',label:"Share All", style:{backgroundColor:"white",marginLeft:-15,borderRadius:50}, onPress:  () => {shareTodoList(list)} },
                            
                        ]}
                    onStateChange={({ open }) => setOpen(open)}
                    onPress={() => {setOpen(true); showProfile ? setProfile(false): null}}
                    color="darkblue"
                   variant="surface"
                   fabStyle={{backgroundColor:"white", borderRadius:50}}
                    
                />
                
                {assignedTasks &&  <Badge style={{position:"absolute", bottom:50,right:22}} size={8} /> }
              


            {(isPopupVisible && del) &&  (
                   <BottomSheet
                        visible={isPopupVisible}
                        onBackButtonPress={togglePopup}
                        onBackdropPress={togglePopup}
                        duration={500}
                        elevation={10} 
                        style={{borderRadius: 10,  }}
                    >
                 
                 <View style={{flex:1,padding:15}}>
                 

                    <View style={styles.popup}>

                        <TouchableHighlight onPress={() => handleOptionSelect('Edit')} underlayColor="#ccc" style={{width:"100%",borderTopRightRadius:15,borderTopLeftRadius:15}}>
                            <View style={[styles.option,{ flexDirection: "row", alignItems: "center",justifyContent:"space-between",padding:10, }]}>
                                <Text style={{fontSize:20, fontWeight:"500"}}>Edit</Text>
                                <MaterialIcons name="edit" size={30} color="darkblue" />
                            </View>
                        </TouchableHighlight>

                        <TouchableHighlight onPress={() => handleOptionSelect('Delete')} underlayColor="#ccc">

                            <View style={{ flexDirection: "row", alignItems: "center" ,justifyContent:"space-between",padding:10, borderBottomWidth: 1,borderBottomColor: '#ccc',}}>
                                <Text style={{fontSize:20,color:"red", fontWeight:"500"}}>Delete</Text>
                                <Image style={styles.delete}  source={require("../images/trash.png")}/>
                            </View>

                        </TouchableHighlight>

                        <TouchableHighlight onPress={() => handleOptionSelect('Completed')} underlayColor="#ccc" style={{width:"100%",borderBottomWidth: 1,borderBottomColor: '#ccc'}}>
                             <View style={{ flexDirection: "row", alignItems: "center", justifyContent:"space-between",justifyContent:"space-between",padding:10, }}>
                                {complete ? <Text style={{fontSize:20, fontWeight:"500"}}>Pending</Text> : <Text style={{fontSize:20, fontWeight:"500"}}>Completed </Text>}
                                {complete ? <MaterialIcons name="pending" size={30} color="darkblue" /> :<MaterialIcons name="done-all" size={30} color="darkblue" />}
                            </View>
                        </TouchableHighlight>

                        <TouchableHighlight onPress={() => {handleOptionSelect('Share'); shareTask(newEdit.Index)}} underlayColor="#ccc">

                        <View style={{ flexDirection: "row", alignItems: "center" ,justifyContent:"space-between",padding:10, borderBottomWidth: 1,borderBottomColor: '#ccc',}}>
                            <Text style={{fontSize:20, fontWeight:"500"}}>Share</Text>
                            <MaterialCommunityIcons name="share" size={30} color="darkblue" />
                        </View>

                        </TouchableHighlight>
                        
                        <TouchableHighlight onPress={() => handleOptionSelect('Stop')} underlayColor="#ccc" style={{width:"100%",borderBottomRightRadius:10,borderBottomLeftRadius:10}} disabled={currentTimeIndex === newEdit.Index ? false : true}>
                             <View style={{ flexDirection: "row", alignItems: "center", justifyContent:"space-between",justifyContent:"space-between",padding:10, }}>
                                <Text style={{fontSize:20, fontWeight:"500"}}>Stop Alarm</Text>
                                <MaterialIcons name="alarm-off" size={30} color="darkblue" />
                            </View>
                        </TouchableHighlight>
                    </View>
                 </View>
       
                  </BottomSheet>
      )}

            
            {showProfile && UserProfile()}

            </ImageBackground>
   
    )
};


export default TodoLists;