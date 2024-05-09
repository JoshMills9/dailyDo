import React, { useState, useEffect } from 'react';
import { Alert,View, Text, TouchableOpacity,TextInput, FlatList,Platform,Image, ScrollView,TouchableHighlight, Pressable } from 'react-native';
import { getFirestore, collection, getDocs,doc,updateDoc} from 'firebase/firestore';
import { Searchbar,Avatar } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
import styles from '../styles/styles';
import { FontAwesome6 } from '@expo/vector-icons';

import { Portal,Provider as PaperProvider , Dialog,} from 'react-native-paper';


import AddTask from './addTask';



const AssignTask = ({navigation,route, }) => {
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
    const [Color, setColor] = useState("red");
    const [formattedDate, setFormattedDate] = useState("")
    const [Time, setTime] = useState("")
    const [data,setData] = useState([]);
    const [showAssinged, setShowAssigned] = useState(false);
    const [assiged, setAssigned] = useState(false)
    const [pressed, setpressed] = useState(false)
    console.log(usernames)
    console.log(users)    


    //useEffect to add assigned task to data array
    useEffect(()=>{
        if(Task !== undefined || descrip !== undefined || formattedDate !== undefined){
            if(assiged){
                setData(prevList=> [{Task,descrip,formattedDate,selectedValue,Color,Time,},...prevList])
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
                    ...doc.data().userDetails
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
     useEffect(() => {
         const assignTask = async (Email) => {
            try {
                const user = users.find(user => user.email === Email);
                if (user) {
                    const userDocRef = doc(db, 'users', user.id); // Assuming 'id' is the document ID of the user
        
                    await updateDoc(userDocRef, {
                        data,
                        assigned: user.email
                        
                    });
        
                    Alert.alert('Task Assigned', 'Task assigned successfully!');
                } else {
                    console.log('User not found', 'No user found with this email.');
                }
            } catch (error) {
                console.error(error);
                Alert.alert('Error', error.message);
            }
        };
        assignTask(searchQuery || selectedValue)
    }, [data])


    //get username from user email
    useEffect(() => {
        const getUsernamesFromEmails = () => {
            if (users && users.length > 0) {
                const extractedUsernames = users.map(user => {
                    if (user.email) {
                        // Split the email address by '@' symbol
                        const parts = user.email.split('@');
                        // The username is the first part of the email
                        return parts[0];}
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
    
        



       

    const handleInputTitle = (value) => {
       setTask(value)
    };

    const handleInputDecrip = (value) => {
        setDescrip(value)
     };



    return (
        <PaperProvider>
        <View style={{ flex:1, margin: 10 ,}}>

            <Searchbar
                placeholder="Search user"
                onChangeText={searchQueryHandler}
                value={searchQuery}
                style={{ borderWidth: 1, backgroundColor: "white", borderColor: "lightgray" }}
                icon={()=>( <Picker
                    selectedValue={selectedValue}
               
                    style={{ height:40, width:50 }}
                  
                    onValueChange={(value)=> {setSelectedValue(value);setSearchQuery(value); setshowView(true); setShowAssigned(false);}}
                >
                     <Picker.Item label="--Select User--" value={null} />
                {users.map((user) => (
                    <Picker.Item key={user.id} label={user.email} value={user.email} />
                ))}
                </Picker>)}
            />

           

            {enabled && (
                <View style={{flex:1,}}>
                <FlatList
                    data={emailsWithUsername.filter(user => (user.email && user.username ) && (user.email && user.username).toLowerCase().includes(searchQuery.toLowerCase()))}
                    renderItem={({ item }) => (
                        <TouchableHighlight onPress={()=> {setSearchQuery(item.email);setSelectedValue(item.email); setEnabled(false);setshowView(true); }} underlayColor="transparent" >
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
                    style={{ flex:1}} // Take up all available space for scrolling
                />
                </View>
               
           )}


           {showview && 
           <View style={[{flex:1,paddingTop:10,},]}>
                
                <AddTask
                    onPress={[
                        { callback: () => { setAssigned(true); }, args: [] },
                        { callback: () => { setSearchQuery(""); }, args: [] },
                        { callback: () => { setshowView(false); }, args: [] },
                        { callback: () => { setShowAssigned(true); }, args: [] },
               
                     
                    ]}
                    assignTitle={handleInputTitle}
                    assignDescrip={handleInputDecrip}
                    assignColor={(value) => setColor(value)}
                    Calendar={(value) => setFormattedDate(value)}
                    time ={(value) => setTime(value)}
                    
                />


            </View>
            }

       
       
       

          {(showAssinged) &&  
          <FlatList
           data={data.filter(item => item.Task)}
           keyExtractor={(item,index) => index.toString()}
           renderItem={({item,index})=>{

            return(
                <Pressable onLongPress={()=> {setpressed(true);showDialog(index)}} >
                <View style={[{ width:"100%",alignSelf:"center", backgroundColor:"white",borderBottomWidth:1,borderBottomColor:"lightgray",padding:6, elevation: pressed ? 0 : 6,marginVertical:10,marginHorizontal:20,borderRadius:15,}]}>
                            
                            <View style={{marginBottom:15,backgroundColor:"",flexDirection:"row",alignItems:"flex-start", justifyContent:"space-between",}}>
                                <View style={{width:16,height:16, borderRadius:50,backgroundColor: item.Color }}></View>
                                
                                <View>
                                    <Text style={{fontWeight:"300"}}>To: {<FontAwesome6 name="circle-user" size={12} color="gray" />} {item.selectedValue}</Text>
                                    <Text style={{fontSize:11, alignSelf:"center",fontWeight:"300"}} >{item.formattedDate}</Text>
                                </View>
                                
                                <Text style={{fontWeight:"300"}}>{item.Time}</Text>
                            </View>

                                <View style={{marginLeft:20,}}>
                                    <Text style={{fontSize:18, fontWeight:"bold"}}>{item.Task}</Text>
                                </View>

                                <View style={{marginLeft:20,marginTop: 5}}>
                                    <Text style={{fontSize:16, fontWeight:"300"}} >{item.descrip}</Text>
                                </View>
                            
                            
                        </View>
                    </Pressable>
            )
           }}
           
           />
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
                            <TouchableOpacity onPress={() => {hideDialog() ;setpressed(false)}}><Text style={{alignSelf:'center', fontSize:16}}>Cancel</Text></TouchableOpacity> 
                            <TouchableOpacity  onPress={() => {handleDelete() ;setpressed(false)}}><Text style={{alignSelf:'center', fontSize:16}}>Yes</Text></TouchableOpacity> 
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
