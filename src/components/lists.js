import { Text, View,SafeAreaView, StatusBar, Image,FlatList,  TouchableOpacity, ImageBackground } from "react-native";
import styles from "../styles/styles";
import { useEffect, useState } from "react";
import { Audio } from "expo-av";

const TodoLists=({navigation, route}) =>{

    //destructuring the route params
    const {header,description, alarm, calendar, color, reminder,song} = route.params || {};
    //state to handle list
    const [list , setlist] = useState([])
    
    //using useEffect hook to automatically update the list with the properties header, description , alarm, calendar , color, reminder, song
    useEffect(()=>{
        setlist(prevList => [...prevList, { header, description , alarm, calendar , color, reminder, song}]);
    },[header,description])
    
    
    //function to delete an item from the list
    const deleteList = (key) => {
         //  remove the corresponding item from the list
         setlist(prevList => prevList.filter((item, index) => index.toString() !== key));
        }
    

        const [sound, setSound] = useState();
        const [currentTimeIndex, setCurrentTimeIndex] = useState(-1);
        //use effect to handle how music plays
        useEffect(() => {
            const interval = setInterval(() => {
                const currentDate = new Date();
    
                let hour = currentDate.getHours();
                const amOrPm = hour < 12 ? 'AM' : 'PM';
                hour = hour % 12 || 12;
    
                const currentFormattedTime = `${hour}:${String(currentDate.getMinutes()).padStart(2, '0')} ${amOrPm}`;
                console.log(currentFormattedTime, alarm)


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
                console.log(formattedDate, calendar)

                if (song === "Clingcling" && currentFormattedTime === alarm && formattedDate === calendar) {
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
                } else if (song === "Cockcrow"  && currentFormattedTime === alarm && formattedDate === calendar) {
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
                }
                else if (song === "Bell"  && currentFormattedTime === alarm && formattedDate === calendar) {
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
                }
                else if (song === "Fairy"  && currentFormattedTime === alarm && formattedDate === calendar) {
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
                }
                else if (song === "Clock"  && currentFormattedTime === alarm && formattedDate === calendar) {
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
                }

                const currentIndex = list.findIndex((item, index) => index.toString() &&
                 item.alarm === currentFormattedTime && item.calendar === formattedDate
                );
                setCurrentTimeIndex(currentIndex)

                //console.log(currentFormattedTime); // Log current formatted time
            }, 1000 * 15); // Update every second
            return () => clearInterval(interval);
            // Log current formatted time here, it won't be accessible outside the useEffect hook
        }, [list]);
        

    return(
        <SafeAreaView style={styles.container}>
            <StatusBar styles="auto"/>

            <ImageBackground source={require("../images/image 2-2.png")} resizeMode="repeat" style={styles.bgImg}>
            <FlatList
                data={list}
                keyExtractor={(item,index) => index.toString()}
                renderItem={({item, index})=> {
                    return(
                    <>
                        {(item.header || item.description) && 
                        
                        <View style={styles.view}>

                        <View style={styles.subview}> 
                            <View style={styles.headview}>
                                <Text style={styles.header} adjustsFontSizeToFit={true} numberOfLines={2}>
                                    {item.header}
                                </Text>
                                <Text style={styles.description}>
                                    {item.description}
                                </Text>
                            </View>
        
                            <View>
                                <Text style={styles.medtext}>
                                   {item.calendar}
                                </Text>
                            </View>
                            {(currentTimeIndex === index.toString()) &&
                                <View style={[styles.timeview,  {backgroundColor:"orangered"}]}>
                                    <Image style={ {tintColor:"white", height:20,width:20}} source={require("../images/clock.png")}/>
                                    <Text style={{fontSize:24, fontWeight:500, color:"white"}}>{item.alarm}</Text>
                                </View>
                            ||   <View style={[styles.timeview]}>
                                    <Image style={ {tintColor:"black", height:20,width:20}} source={require("../images/clock.png")}/>
                                    <Text style={{fontSize:24, fontWeight:500}}>{item.alarm}</Text>
                                </View>
                            }
                        </View>
                        
                        <View style={styles.subview2}>
                            <View style={[styles.color, {backgroundColor: item.color || "white"}]}>
        
                            </View>

                            <View>
                                <TouchableOpacity onPress={() => deleteList(index.toString())}  ><Image style={styles.delete}  source={require("../images/trash.png")}/></TouchableOpacity>
                            </View>
        
                            <View style={styles.Alarm}>
        
                                <View style={styles.alarm}>
                                    <Text style={[styles.text, {fontSize:15}]}>{item.song}</Text>
                                    <Image style={styles.img} source={require("../images/music.png")}/>
                                </View>
        
                                <View style={styles.alarm}>
                                    <Text style={styles.text}>{item.reminder}</Text>
                                    <Image style={styles.img} source={require("../images/bell.png")}/>
                                </View>
        
                            </View>
        
                        </View>
                            </View>
                   
                }</>
                        )
                }}
            />
            <TouchableOpacity style={styles.add} onPress={() => navigation.navigate("Add New Task")}>
                <Text style={styles.addTaskText}>+</Text>
            </TouchableOpacity>

            </ImageBackground>
        </SafeAreaView>
    )
};


export default TodoLists;