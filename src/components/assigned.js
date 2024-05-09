import React, { useEffect, useState } from 'react';
import { getFirestore, collection, getDocs,where,query} from 'firebase/firestore';
import { Text, View , Image, Pressable, TouchableOpacity} from 'react-native';
import styles from '../styles/styles';
import { FontAwesome6 } from '@expo/vector-icons';
import { Portal,Provider as PaperProvider , Dialog,} from 'react-native-paper';


const Assigned = ({ route }) => {
    const { userEmail } = route.params;
    const [assignedTasks, setAssignedTasks] = useState([]);
    console.log(assignedTasks[0])
    const [isVisible, setIsVisible] = useState(false);
    const [pressed, setpressed] = useState(false)
    const [Data, setData] = useState([])

    const db = getFirestore();

    //useEffect to get assigned tasks from db
    useEffect(() => {
        const fetchAssignedTasks = async () => {
            try {
                // Construct a reference to the 'tasks' collection
                const tasksCollectionRef = collection(db, 'users');
                
                // Query the tasks collection for documents where the 'assignedTo' field is equal to userEmail
                const querySnapshot = await getDocs(query(tasksCollectionRef, where("assigned", "==", userEmail)));
                if (!querySnapshot.empty) {
                    // If documents are found, extract their data and update the state with the tasks
                    const tasks = querySnapshot.docs.map(doc => doc.data().data);
                    setAssignedTasks(tasks[0])
                } else {
                    alert('No assigned tasks found for user:' + userEmail)
                    console.log('No assigned tasks found for user:', userEmail);
                }
            } catch (error) {
                console.error('Error receiving assigned tasks:', error);
            }
        };
    
        // Call fetchAssignedTasks when the component mounts or when db or userEmail change
        fetchAssignedTasks();
    }, [db, userEmail]);
    

   
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
    


    return (


        <PaperProvider>
        <View style={{flex:1,padding:10}}>

             {assignedTasks.map((task, index) => (
                 
            <Pressable onLongPress={()=> {setpressed(true);showDialog(index)}} onPress={()=> setIsVisible(true)} >
                    <View style={[{ width:"100%",alignSelf:"center", backgroundColor:"white",borderBottomWidth:1,borderBottomColor:"lightgray",padding:6, elevation: pressed ? 0 : 6,marginVertical:10,marginHorizontal:20,borderRadius:15,}]}>
                        
                        <View style={{marginBottom:15,backgroundColor:"",flexDirection:"row",alignItems:"flex-start", justifyContent:"space-between",}}>
                            <View style={{width:16,height:16, borderRadius:50,backgroundColor: task.Color }}></View>
                            
                            <View>
                                <Text style={{fontWeight:"300"}}>From: {<FontAwesome6 name="circle-user" size={12} color="gray" />} {task.selectedValue}</Text>
                                <Text style={{fontSize:11, alignSelf:"center",fontWeight:"300"}} >{task.formattedDate}</Text>
                            </View>
                            
                            <Text style={{fontWeight:"300"}}>{task.Time}</Text>
                        </View>

                            <View style={{marginLeft:20,}}>
                                <Text style={{fontSize:18, fontWeight:"bold"}}>{isVisible ? task.Task : task.Task.length > 20 ? `${task.Task.slice(0, 20)} ...` : task.Task}</Text>
                            </View>

                            <View style={{marginLeft:20,marginTop: 5}}>
                                 <Text style={{fontSize:16, fontWeight:"300"}}>{task.descrip}</Text>
                            </View>
                     
                        
                    </View>
                </Pressable>
                ))}
           
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
};

export default Assigned;
