import React, { useState, useEffect, useLayoutEffect } from 'react';
import { Alert,View, Text, TouchableOpacity,TextInput, FlatList,Platform,Image, ScrollView,TouchableHighlight, Pressable,ActivityIndicator, ImageBackground } from 'react-native';
import { getFirestore, collection, getDocs,doc,updateDoc,} from 'firebase/firestore';
import { Searchbar,Avatar } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
import styles from '../styles/styles';
import { FontAwesome6 } from '@expo/vector-icons';

import { Portal,Provider as PaperProvider , Dialog,} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

import AddTask from './addTask';



const AssignTask = ({navigation,route, }) => {
    const { userEmail } = route.params;

    const [searchQuery, setSearchQuery] = useState('');
    const [enabled, setEnabled] = useState(false);
    const [users, setUsers] = useState([]);
    const [selectedValue, setSelectedValue] = useState("");
    const [search, setSearch] = useState(false);
    const [showview, setshowView] = useState(false);
    const [addTask, setaddTask] = useState("");
    const [email, setEmail] = useState("");
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
    const [fromStorage, setFromstorage] = useState(false)

      



    
    //useEffect to add assigned task to data array
    useEffect(()=>{
        if(Task !== undefined || descrip !== undefined || formattedDate !== undefined){
            if(assiged){
                setData(prevList => [{Task,descrip,formattedDate,selectedValue,Color,Time,userEmail,email},...prevList])
                setAssigned(false);
            }else{
                console.log("")
            }
        }
    },[assiged])

    

    //useEffect to fetch data from storage
    useEffect(() => {
        const fetchData = async () => {
          try {
            const data = await AsyncStorage.getItem('Key');
            if (data !== null) {
              const parsedData = JSON.parse(data);
              setData(parsedData);
              setFromstorage(true)
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
              const stringValue = JSON.stringify(data);
              await AsyncStorage.setItem('Key', stringValue);
        
            } catch (e) {
              console.error('Failed to save the data to the storage', e);
            }
          };
          handleSave();
        }, [data]);

 
    


    const db = getFirestore();
    //useEffect to get data from db
  
        const fetchData = async (email) => {
            setSearch(true)
            try {
                const usersCollectionRef = collection(db, 'users');
                const usersSnapshot = await getDocs(usersCollectionRef);
                const userData = usersSnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data().userDetails
                }));
                const user = userData.find(user => user.email === email)
                user ? (setSearch(false), setshowView(true) , setUsers(userData), setShowAssigned(false) , setFromstorage(false)) :
                Alert.alert("Ohh Snap!",'No user found with this email.');setSearch(false)
            } catch (error) {
                alert(error)
                console.error('Error fetching data:', error);
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
                  
                }else if(Email === ""){
                    console.log("empty")
                } else {
                    return null;
                }
            } catch (error) {
                console.error(error);
                Alert.alert('Error', error.message);
            }
        };
        assignTask(email)
    }, [data])



    
  
  

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

     const searchqueryHandler = (text) => {
        if (text) {
          const validateEmail = (email) => {
            // Check if the email ends with '@gmail.com'
            const pattern = /^[^\s@]+@gmail\.com$/;
            return pattern.test(email);
          };
      
          if (validateEmail(text)) {
            fetchData(text);
            setEmail(text);
          } else {
            console.log("Invalid email. Must be a Gmail address.");
          }
        } else {
          setshowView(false);
        }
      };
      


    return (

        <PaperProvider>
        <View style={{ flex:1, margin: 10 ,}}>


            <View style={{padding:10,height:50, borderBottomWidth:1, flexDirection:"row",alignItems:"center", borderColor:"lightgray"}}>
                <Text style={{fontSize:18, marginRight:10}}>To:</Text>
                <TextInput style={{fontSize:18,width:"85%", height:50, justifyContent:"center",alignItems:"center"}} placeholder='email' value={searchQuery} onChangeText={(txt)=> {setSearchQuery(txt);searchqueryHandler(txt)}}/>
                {search &&  <ActivityIndicator  size={'small'} color={"gray"} />}
            </View>


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

       
       
       

          {(showAssinged || fromStorage) &&  
          <FlatList
           data={data.filter(item => item.Task)}
           keyExtractor={(item,index) => index.toString()}
           renderItem={({item,index})=>{

            return(
                <Pressable onLongPress={()=> {setpressed(true);showDialog(index)}} >
                <View style={[{ width:"100%",alignSelf:"center", backgroundColor: "white",borderBottomWidth:1,borderBottomColor:"lightgray",padding:6, elevation: pressed ? 0 : 6,marginVertical:10,marginHorizontal:20,borderRadius:15,}]}>
                            
                            <View style={{marginBottom:15,backgroundColor:"",flexDirection:"row",alignItems:"flex-start", justifyContent:"space-between",}}>
                                <View style={{width:16,height:16, borderRadius:50,backgroundColor: item.Color }}></View>
                                
                                <View>
                                    <Text style={{fontWeight:"300"}}>To: {<FontAwesome6 name="circle-user" size={12} color="gray" />} {item.email}</Text>
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
