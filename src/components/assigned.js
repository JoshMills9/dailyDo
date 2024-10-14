import React, { useEffect, useState } from 'react';
import { getFirestore, collection, getDocs,where,query} from 'firebase/firestore';
import { Text, View ,ScrollView, Image, Pressable, TouchableOpacity, ImageBackground,TouchableHighlight} from 'react-native';
import styles from '../styles/styles';
import { FontAwesome6 } from '@expo/vector-icons';
import { Portal,Provider as PaperProvider , Dialog,} from 'react-native-paper';

import AsyncStorage from '@react-native-async-storage/async-storage';



const Assigned = ({ route }) => {
    const { userEmail } = route.params;
    const [assignedTasks, setAssignedTasks] = useState([]);
    const [isVisible, setIsVisible] = useState(false);
    const [pressed, setpressed] = useState(false)
    const [Data, setData] = useState([])

    const db = getFirestore();

    //useEffect to fetch data from storage
    useEffect(() => {
        const fetchData = async () => {
          try {
            const data = await AsyncStorage.getItem('assignedTask');
            if (data !== null) {
              const parsedData = JSON.parse(data);
              setAssignedTasks(parsedData)
            }
          } catch (e) {
            console.error('Failed to fetch the data from storage', e);
          }
        };
    
        fetchData();
      }, []);



   
       //function to delete item by index
       const deleteList = (index) => {
        
        // Create a copy of the original list
        const updatedList = [...assignedTasks];
    
        // Remove the item at the specified index
        updatedList.splice(index, 1);

        // Update the state with the modified list
        setAssignedTasks(updatedList);
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


        const [popupData, setPopupData] = useState(null);
        const [view, setView] = useState(false)
  
        const handlePress = (item) => {
          setPopupData(item);
          setView(true);
      };
  
      const PopUp = () => {
          if (!popupData) return null; // Prevent rendering if there's no data
          return (
              <View style={{
                  position: "absolute", bottom:0,borderTopRightRadius:50,borderTopLeftRadius:50, alignSelf: "center", height: 400,width:"100%",
                  backgroundColor: "royalblue", elevation: 5, borderRadius: 10,
                  justifyContent:"space-around", paddingHorizontal:10
              }}>
                  <View style={{flexDirection:"row", justifyContent:"space-between",alignItems:"center",flex:1}}>
                      <View style={{flexDirection:"row",alignItems:"center"}}>
                          <View style={{
                              width: 50, height: 50, borderRadius: 50, backgroundColor: popupData.Color,
                              alignItems: "center", justifyContent: "center", marginRight:15
                          }}>
                              <Text style={{ fontSize: 18, fontWeight: "500", color: "white" }}>
                                  {popupData.email?.slice(0, 1).toUpperCase()}
                              </Text>
                          </View>
  
                          <Text style={{ fontSize: 18, fontWeight: "500", color: "white" }} adjustsFontSizeToFit={true}>
                                  {popupData.email}
                          </Text>
                      </View>
                      <Text style={{fontSize:16, fontWeight: "bold" ,color:"white"}}>{popupData.Time}</Text>
                  </View>
  
                  <View style={{flex:2}}>
                      <Text style={{ fontSize: 18, fontWeight: "bold" ,textAlign:"justify",color:"white"}}>{popupData.Task}</Text>
                      <Text style={{color:"white",marginTop:10,textAlign:"justify",}} adjustsFontSizeToFit={true}>{popupData.descrip}</Text>
                  </View>
                  <TouchableOpacity style={{flexDirection:"row",backgroundColor:"white",marginVertical:15,
                      alignSelf:"center",height:40,alignItems:"center",borderRadius:15,elevation:2,
                       justifyContent:"center",width:"50%", marginRight:20}} onPress={() => setView(false)}>
                      <Text style={{color:"red", fontSize:16}}>Close</Text>
                  </TouchableOpacity>
              </View>
          );
      };
  
    


    return (
        <View style={[styles.container]}> 

        <PaperProvider>
            <ScrollView>
        <View style={{flex:1,padding:10}}>
          
             {assignedTasks.map((item, index) => (

                <TouchableHighlight  underlayColor="#DDDDDD" 
                onPress={()=> handlePress(item)}
                style={{borderRadius:15,borderBottomWidth:1,borderBottomColor:"lightgray",paddingHorizontal:10, height:90,}} 
                onLongPress={()=> {setpressed(true);showDialog(index)}} >

                            
                            <View style={{flexDirection:"row", justifyContent:"space-between", marginVertical:20}}>

                                <View style={{width:40,height:40, borderRadius:50,backgroundColor: item.Color , alignItems:"center",justifyContent:"center"}}>
                                    <Text style={{fontSize:18, fontWeight:"500", color:"white"}}>{item.email.slice(0,1).toUpperCase()}</Text></View>

                                <View style={{width:260,  height:80}}>

                                    <View>
                                        <Text style={{fontSize:18, fontWeight:"bold"}}>{item.Task.length > 25 ? `${item.Task.slice(0, 25)}....` : item.Task}</Text>
                                    </View>

                                    <View>
                                        <Text numberOfLines={1}>{item.descrip.length > 30 ? `${item.descrip.slice(0, 30)}....` : item.descrip}</Text>
                                    </View>

                                </View>

                                <View>
                                    <Text style={{fontWeight:"bold",}}>{item.Time}</Text>
                                </View>
                                
                            

                            
                            </View>
                        
                                
                    
                    </TouchableHighlight>
               
                ))}
           
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
                            <TouchableOpacity onPress={hideDialog}><Text style={{alignSelf:'center', fontSize:16, color:"orangered", marginLeft:-100}}>Cancel</Text></TouchableOpacity> 
                            <TouchableOpacity  onPress={handleDelete}><Text style={{alignSelf:'center', fontSize:16,color:"white"}}>Yes</Text></TouchableOpacity> 
                        </View>
                        
                    </Dialog.Actions>
                </Dialog>
            </Portal>
        
            }
   
        </View>
        </ScrollView>

        {view && <PopUp />}
        </PaperProvider>      

        </View> 
    );
};

export default Assigned;
