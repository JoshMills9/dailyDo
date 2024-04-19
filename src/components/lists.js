import { Text, View, Image,FlatList, TouchableHighlight,Modal, TouchableOpacity, ImageBackground, Pressable, Alert, ScrollView } from "react-native";
import styles from "../styles/styles";
import { useEffect, useState } from "react";
import { Audio } from "expo-av";
import { BottomSheet } from 'react-native-btr';


import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

const TodoLists=({navigation, route}) =>{

    //destructuring the route params
    const {header,description, alarm, calendar, color, reminder,song, index} = route.params || {};
    //state to handle list
    const [list , setlist] = useState([])   
  
    
    //using useEffect hook to automatically update the list with the properties header, description , alarm, calendar , color, reminder, song
    useEffect(() => {
        if ((header !== undefined || description !== undefined) && index === undefined) {
            // Add new item to the list
            setlist(prevList => [
                ...prevList, 
                { header, description, alarm, calendar, color, reminder, song }
            ]);
        } else if ((header !== undefined || description !== undefined || alarm !== undefined 
            || calendar !== undefined || color !== undefined || reminder !== undefined || song !== undefined) && index !== undefined) {
            // Update existing item in the list
            setlist(prevList => {
                // Update the item at the specified index
                const updatedList = [...prevList];
                updatedList[index] = { header, description, alarm, calendar, color, reminder, song };
                return updatedList;
            });
        }
    }, [header, description, alarm, calendar, color, reminder,song, index]);
    

    
    const [usertime, setUsertime] = useState([]);

    const [isUserTime, setIsUserTime] = useState();
   

    useEffect(()=>{
        setUsertime(prevList => [...prevList, {alarm,calendar}])
    },[alarm,calendar])


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
            
                    loadSound();
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
            
                    loadSound();
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
            
                    loadSound();
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
            
                    loadSound();
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
            
                    loadSound();
                    setUsertime(usertime.filter(item => item.alarm !== currentFormattedTime))
                    
                }

                const currentIndex = list.findIndex((item, index) => index.toString() &&
                 item.alarm === currentFormattedTime && item.calendar === formattedDate
                );
                setCurrentTimeIndex(currentIndex)

                //console.log(currentFormattedTime); // Log current formatted time
            }, 1000 * 10); // Update every second
            return () => {
                clearInterval(interval); // Clear any intervals
                if (sound) {
                    sound.unloadAsync(); // Unload the sound resource
                }
            };
            
        }, [usertime,isUserTime,list]);

        //state to toggle modal screen
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const [newEdit,  setEdit] = useState(null);

        //function to toggle modal
    const togglePopup = () => {
        setIsPopupVisible(!isPopupVisible);
    };
   
        //function to send data to the edit screen
    const editFunc = (Key,Header, Description,Alarm,Calendar,Color,Reminder,Song) => {
        //edit list object to b routed
        const editObj = {
        Header: Header,
        Description: Description,
        Alarm:Alarm,
        Calendar:Calendar,
        Colors:Color,
        Reminder:Reminder,
        Song:Song,
        Index:Key
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
        
        
        //function to handle user choice from modal
        const handleOptionSelect = (option) => {
            if (option === "Edit") {
                navigation.navigate("Edit Task", newEdit);
            } else if (option === "Delete") {
                deleteList(del);
            } else if (option === "Completed") {
                completed(del); // Pass the selected index (del) to the completed function
            }
            setIsPopupVisible(false)
        };

        //state to store selected index
        const [complete, setcomplete] = useState(null)

   
    
    

    return(
            <ImageBackground source={require("../images/image 2-2.png")} resizeMode="repeat" style={styles.bgImg}>
            <FlatList
                data={list}
                keyExtractor={(item,index) => index.toString()}
                ListEmptyComponent={()=>{return(
                    <View style={{flex:1,marginTop:300,justifyContent:"center",alignItems:"center"}}>
                        <Text style={[styles.medtext,{color:"black", opacity:0.4}]}>add a To-Do</Text></View>
                )}}
                renderItem={({item, index})=> {
                    const selected = selectedIndexes.includes(index.toString());  // Check if the index is selected
                    setcomplete(selected)
                    return(
                        (item.header || item.description) && 
                     <Pressable style={({pressed}) => ({opacity: pressed ? 0.9 : 1 })} 
                        onLongPress={() => {editFunc( index, item.header, item.description,item.alarm,item.calendar,item.color,
                            item.reminder,item.song); setDel(index.toString())}}>

                     <View style={[styles.view,{backgroundColor: selected ? 'gray' : "midnightblue"}]}>

                        <View style={styles.subview}> 
                            <View style={styles.headview}>
                                <View style={{flexDirection:"row" , justifyContent:"space-between" }}>
                                    <View style={{width:260}}>
                                        <Text style={styles.header} adjustsFontSizeToFit={true} numberOfLines={2}>
                                            {item.header}
                                        </Text>
                                    </View>
                
                                    <View style={[styles.color, {backgroundColor: item.color, marginTop:-10,marginRight:-3 }]}></View>
                                </View>
                               
                                <Text style={styles.description}>
                                    {item.description}
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
                                <View style={{ width:150,height:40, alignItems:"flex-end", justifyContent:"center"}}>
                                    <Text adjustsFontSizeToFit={true} numberOfLines={1} style={[styles.text,{fontSize:14, fontWeight:"500"}]}>
                                        Status: {selected ? <Text style={[styles.text,{fontSize:15, fontWeight:"bold", color:"lightgreen" }]}>COMPLETED</Text> : <Text style={[styles.text,{fontSize:12,fontWeight:"400", color:"lightgray"}]}>UNCOMPLETED</Text>}</Text>
                                </View>
                             </View>
                        </View>
                        
                     </View>
                </Pressable>    
                )
                }}
            />
            <TouchableOpacity style={styles.add} onPress={() => navigation.navigate("Add New Task")}>
                <Ionicons name="add" size={40} color="black"  />
            </TouchableOpacity>

            {(isPopupVisible && del) &&  (
                   <BottomSheet
                        visible={isPopupVisible}
                        onBackButtonPress={togglePopup}
                        onBackdropPress={togglePopup}
                        duration={300} // Adjust animation duration as needed
                        elevation={8} // Adjust elevation for shadow effect
                        style={{borderRadius: 10 }}
                    >
                 
                 <View style={{flex:1,padding:15}}>
                        {/*view to display item selected*/}
                   { newEdit && ( 
                    <View style={[styles.container, { paddingVertical:5,justifyContent:"flex-end",marginBottom:160 }]}>
                        <View style={styles.CompletedView}>
                            <View style={styles.compheader}>
                                <View style={styles.title}>
                                    <Text style={[styles.header,{color:"black",fontSize:25}]} adjustsFontSizeToFit={true} numberOfLines={1}>
                                        {newEdit.Header.length > 20 ? `${newEdit.Header.slice(0, 20)} .....` : newEdit.Header}
                                    </Text>
                                </View>
                                <View style={[styles.color, {backgroundColor: newEdit.Colors , width:25,height:25, marginHorizontal:5}]}></View>
                            </View>
                            <View style={styles.dateDescrip}>
                                <View>
                                    <Text style={[styles.medtext,  {color:"black", fontSize:15}]}>
                                        {newEdit.Calendar}
                                    </Text>
                                </View>
                                <View style={{flex:1,marginLeft:10, marginRight:8}} >
                                    <Text style={[styles.description, {color:"black",fontSize:16, fontWeight:"500"}]}>
                                        {newEdit.Description.length > 15 ? `${newEdit.Description.slice(0, 15)} .....` : newEdit.Description}
                                    </Text>
                                </View>
                            </View>
                            <View style={{flexDirection:"row", marginBottom:5, justifyContent:"flex-start", alignItems:"center"}}>
                                    <Image style={ {tintColor: "black", height:15,width:15, marginRight:8}} source={require("../images/clock.png")}/>
                                    <Text style={{fontSize:15, color:  "black"}}>{newEdit.Alarm}</Text>
                            </View>
                        </View>
                    </View>
                    )}

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

                        <TouchableHighlight onPress={() => handleOptionSelect('Completed')} underlayColor="#ccc" style={{width:"100%",borderBottomRightRadius:10,borderBottomLeftRadius:10}}>
                             <View style={{ flexDirection: "row", alignItems: "center", justifyContent:"space-between",justifyContent:"space-between",padding:10, }}>
                                {complete ? <Text style={{fontSize:20, fontWeight:"500"}}>Uncompleted </Text> : <Text style={{fontSize:20, fontWeight:"500"}}>Completed </Text>}
                                {complete ? <MaterialIcons name="remove-done" size={30} color="darkblue" />:<MaterialIcons name="done-all" size={30} color="darkblue" />}
                            </View>
                        </TouchableHighlight>
                    </View>
                 </View>
       
                  </BottomSheet>
      )}


            </ImageBackground>
   
    )
};


export default TodoLists;