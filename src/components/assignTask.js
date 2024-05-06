import React, { useState, useEffect } from 'react';
import { Alert,View, Text, TouchableOpacity,TextInput, FlatList,Platform,Image, ScrollView,TouchableHighlight } from 'react-native';
import { getFirestore, collection, getDocs,doc,updateDoc} from 'firebase/firestore';
import { Searchbar,Avatar } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
import styles from '../styles/styles';
import { FontAwesome6 } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Ionicons } from '@expo/vector-icons';
import { FAB,Portal,Provider as PaperProvider , Dialog,} from 'react-native-paper';



const AssignTask = ({navigation,route}) => {
    const { userEmail } = route.params;

    const [searchQuery, setSearchQuery] = useState('');
    const [enabled, setEnabled] = useState(false);
    const [users, setUsers] = useState([]);
    const [selectedValue, setSelectedValue] = useState("");
    const [adddescrip, setdescrip] = useState("");
    const [showview, setshowView] = useState(false);
    const [addTask, setaddTask] = useState("");
    const [usernames, setUsernames] = useState([]);
    const [emailsWithUsername, setEmailsWithUsername] = useState(null);
    const [Task, setTask] = useState("");
    const [descrip, setDescrip] = useState("");
   
    //state to update the mode of datetime (date or time)
    const [mode, setMode] = useState('');

    const [show, setShow] = useState(false);

    //state to update the display of datetime (calendar or clock)
    const [display, setDisplay] = useState("");
    const [date, setDate] = useState(new Date());

    const [data,setData] = useState([]);
    const [showAssinged, setShowAssigned] = useState(false);

    const [assiged, setAssigned] = useState(false)
 
    //useEffect to add assigned task to data array
    useEffect(()=>{
        if(Task !== undefined || descrip !== undefined || formattedDate !== undefined){
            if(assiged){
                setData(prevList=> [{Task,descrip,formattedDate,selectedValue},...prevList])
                setAssigned(false)
            }else{
                console.log("")
            }
        }
    },[assiged])



    const db = getFirestore();
    //useEffect to get data from db
    useEffect(() => {
        const fetchData = async () => {
            try {
                const usersCollectionRef = collection(db, 'users');
                const usersSnapshot = await getDocs(usersCollectionRef);
                const userData = usersSnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setUsers(userData);
            } catch (error) {
                alert(error)
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    //function to handle text input
    const searchQueryHandler = (text) => {
        if (text) {
            setSearchQuery(text);
            setEnabled(true);
            setshowView(false)
            setShowAssigned(false)
        } else {
            setEnabled(false);
            setSearchQuery("");
            setshowView(false);
            setShowAssigned(true)
        }
    };
    

      //function to assign task
      const assignTask = async (Email) => {
        try {
            const user = users.find(user => user.email === Email);
            if (user) {
                const userDocRef = doc(db, 'users', user.id); // Assuming 'id' is the document ID of the user
    
                await updateDoc(userDocRef, {
                    assignedTask: {
                        title: addTask,
                        description: adddescrip,
                        from: userEmail,
                        date: formattedDate
                        
                    },
                    assigned: user.email
                    
                });
    
                Alert.alert('Task Assigned', 'Task assigned successfully!');
            } else {
                Alert.alert('User not found', 'No user found with this email.');
            }
        } catch (error) {
            console.error(error);
            Alert.alert('Error', error.message);
        }
    };
    
    //get username from user email
    useEffect(() => {
        const getUsernamesFromEmails = () => {
            if (users && users.length > 0) {
                const extractedUsernames = users.map(user => {
                    // Split the email address by '@' symbol
                    const parts = user.email.split('@');
                    // The username is the first part of the email
                    return parts[0];
                });

                setUsernames(extractedUsernames);
                // Do something with the extracted usernames if needed
            }
        }

        getUsernamesFromEmails();
    }, [users]);

    //useeffect to add usernames to users object
    useEffect(() => {
        const addUsernameToEmails = () => {
            if (users.length === usernames.length) {
                const updatedEmails = users.map((emailObj, index) => {
                    const username = usernames[index];
                    const capitalizedUsername = username.charAt(0).toUpperCase() + username.slice(1); 
                    return { ...emailObj, username: capitalizedUsername }; // Add username to the email object
                });
                setEmailsWithUsername(updatedEmails);
            }
        };

        addUsernameToEmails();
    }, [users, usernames]);


    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };

    //function to update the dateTime
    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);

    };

    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const monthsOfYear = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const dayOfWeek = daysOfWeek[date.getDay()];
    const dayOfMonth = date.getDate();
    const monthOfYear = monthsOfYear[date.getMonth()];
    const year = date.getFullYear();

    let suffix = 'th';
    if (dayOfMonth === 1 || dayOfMonth === 21 || dayOfMonth === 31) {
        suffix = 'st';
    } else if (dayOfMonth === 2 || dayOfMonth === 22) {
        suffix = 'nd';
    } else if (dayOfMonth === 3 || dayOfMonth === 23) {
        suffix = 'rd';
    }

    const formattedDate = `${dayOfWeek}, ${dayOfMonth}${suffix} ${monthOfYear}, ${year}`;
  

     //function to delete item by index
     const deleteList = (index) => {
        
        // Create a copy of the original list
        const updatedList = [...data];
    
        // Remove the item at the specified index
        updatedList.splice(index, 1);

        // Update the state with the modified list
        setData(updatedList);
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
    


    return (
        <PaperProvider>
        <View style={{ flex: 1, margin: 10 }}>

            <Searchbar
                placeholder="Search user"
                onChangeText={searchQueryHandler}
                value={searchQuery}
                style={{ borderWidth: 1, backgroundColor: "white", borderColor: "lightgray" }}
                icon={()=>( <Picker
                    selectedValue={selectedValue}
               
                    style={{ height:40, width:50 }}
                  
                    onValueChange={(value)=> {setSelectedValue(value);setSearchQuery(value); setshowView(true); setShowAssigned(false)}}
                >
                     <Picker.Item label="--Select User--" value={null} />
                {users.map((user) => (
                    <Picker.Item key={user.id} label={user.email} value={user.email} />
                ))}
                </Picker>)}
            />

           

            {enabled && (
                
                <FlatList
                    data={emailsWithUsername.filter(user => (user.email && user.username ) && (user.email && user.username).toLowerCase().includes(searchQuery.toLowerCase()))}
                    renderItem={({ item }) => (
                        <TouchableHighlight onPress={()=> {setSearchQuery(item.email);setSelectedValue(item.email); setEnabled(false);setshowView(true)}} underlayColor="transparent" >
                            <View style={{margin:10,backgroundColor:"white",flex:1,padding:10, elevation:9, }}>
                                <View style={{flexDirection:"row",alignItems:"center",}}> 
                                    <Avatar.Text size={40} labelStyle={{fontSize:18, alignSelf:"center", fontWeight:"600"}} label={item.email[0].toUpperCase()}/>
                                    <View style={{flex:1,padding:5, justifyContent:"center"}}>
                                        <Text style={{fontSize:18,  fontWeight:"500"}}>{item.username}</Text>
                                        <Text style={{fontSize:13}}>{item.email}</Text>
                                    </View>
                                </View>
                              </View>  
                        </TouchableHighlight>
                           
                    )}
                    
                    keyExtractor={(item) => item.id}
                    style={{ flex: 1 }} // Take up all available space for scrolling
                />
               
           )}

        <ScrollView>
           {showview && 
           
           <View style={{flex:1, backgroundColor:"royalblue", marginTop:20, borderRadius:20, padding:15, }}>
                
                <View style={{flexDirection:"row" , justifyContent:"space-around",alignItems:"center"}}>
                    <View style={{flexDirection:"row"}}>
                        
                        <FontAwesome6 name="circle-user" size={18} color="white" />

                        <Text style={{color:"white"}}>  {searchQuery}</Text>
                    </View>

                    <View> 
                     <TouchableOpacity onPress={() => showMode("date") && setDisplay("calendar")}><Ionicons name="calendar-number-sharp" size={30} color="white" style={{backgroundColor:"transparent", elevation:5}} /></TouchableOpacity>
                            
                    </View>

                </View>

                <View>
                        <TextInput style={[styles.headingtext,{borderColor:"white",color:"white"}]} value={addTask} onChangeText={(text) => {setaddTask(text); setTask(text)}}  placeholder="title" placeholderTextColor={"white"}/>
                </View>
                   

                <View>
                    <TextInput style={[styles.descriptext,{borderColor:"white",color:"white"}]} value={adddescrip} multiline={true} onChangeText={(text) => {setdescrip(text); setDescrip(text)}} placeholder="description" placeholderTextColor={"white"}/>
                </View>


                <View style={styles.addtaskview}> 
                        <TouchableOpacity onPress={() => {assignTask(selectedValue || searchQuery); setAssigned(true); setSearchQuery("");setaddTask("");setdescrip("");setshowView(false); setShowAssigned(true);}} style={[styles.addtaskbtn,{width:150, height:55,backgroundColor:"white", elevation:6}]}><Text style={[styles.addbtn,{fontSize:20,color:"royalblue"}]}>Assign Task</Text></TouchableOpacity>
                </View>
           </View>
            }
             {show && (<DateTimePicker testID="dateTimePicker" value={date} mode={mode} 
                is24Hour={false} display={display} onChange={onChange}/>
                )}
           </ScrollView>

       
          {(showAssinged) &&  
          <View style={{ flex:60, paddingVertical:5,}}>

          <FlatList
           data={data.filter(item => item.Task)}
           keyExtractor={(item,index) => index.toString()}
           renderItem={({item,index})=>{

            return(

                <View style={{width:"100%",alignSelf:"center", backgroundColor:"white",borderBottomWidth:1,borderBottomColor:"lightgray",padding:6, elevation:6,margin:10,borderRadius:15}}>
                            <View style={{marginBottom:15,backgroundColor:"",flexDirection:"row",alignItems:"center", justifyContent:"flex-start",}}>
                                <View style={{width:16,height:16, borderRadius:100,backgroundColor:"royalblue" ,marginRight:50}}></View>
                                <Text style={{fontWeight:"300"}}>To: {<FontAwesome6 name="circle-user" size={12} color="gray" />} {item.selectedValue}</Text>
                            </View>
                            <View style={{flexDirection:"row", justifyContent:"space-between", alignItems:"center"}}>
                                <View style={{flex:1,marginLeft:20,}}>
                                    <Text style={{fontSize:18, fontWeight:"bold"}}>{item.Task}</Text>
                                </View>

                                <View style={{width:100}}>
                                    <Text style={{fontSize:10}} >{item.formattedDate}</Text>
                                </View>
                            </View>

                            <View style={{marginLeft:20, flexDirection:"row", alignItems:"center"}}>
                                <View style={{flex:1}}>
                                    <Text style={{fontSize:16, fontWeight:"300"}} >{item.descrip}</Text>
                                </View>
                                <TouchableOpacity onPress={() => {showDialog(index)}}>
                                    <Image style={[styles.delete,{width:30,height:30}]}  source={require("../images/trash.png")}/>
                                </TouchableOpacity>
                            </View>
                            
                        </View>
            )
           }}
           
           />
           </View>
        }

        {visible &&
            <Portal>
                <Dialog visible={visible} onDismiss={hideDialog}>
                    <Dialog.Icon icon="alert" size={30}/>
                    <Dialog.Title style={{alignSelf:'center', fontWeight:"bold"}}>Caution!!</Dialog.Title>
                    <Dialog.Content>
                        <Text style={{alignSelf:'center', fontSize:16}}>Do you want to delete this task?</Text>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <View style={{flexDirection:"row", justifyContent:"space-evenly", width:100}}>
                            <TouchableOpacity onPress={hideDialog}><Text style={{alignSelf:'center', fontSize:16}}>Cancel</Text></TouchableOpacity> 
                            <TouchableOpacity  onPress={handleDelete}><Text style={{alignSelf:'center', fontSize:16}}>Yes</Text></TouchableOpacity> 
                        </View>
                        
                    </Dialog.Actions>
                </Dialog>
            </Portal>
            }
      

        </View>
        </PaperProvider>
       
        
        
    );
}

export default AssignTask;
