import { Text, View,SafeAreaView, StatusBar, Image,FlatList,  TouchableOpacity, ImageBackground } from "react-native";
import styles from "../styles/styles";
import { useEffect, useState } from "react";


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
    

    return(
        <SafeAreaView style={styles.container}>
            <StatusBar styles="auto"/>

            <ImageBackground source={require("../images/note.png")}  style={styles.bgImg}>
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
        
                           <View style={styles.timeview}>
                                <Image style={ {tintColor:"black", height:20,width:20}} source={require("../images/clock.png")}/>
                                <Text style={{fontSize:24, fontWeight:500}}>{item.alarm}</Text>
                            </View>
                            
        
                        </View>
                        
                        <View style={styles.subview2}>
                            <View style={[styles.color, {backgroundColor: item.color || "white"}]}>
        
                            </View>

                            <View>
                                <TouchableOpacity onPress={() => deleteList(index.toString())}  ><Image style={styles.delete}  source={require("../images/trash.png")}/></TouchableOpacity>
                            </View>
        
                            <View style={styles.Alarm}>
        
                                <View style={styles.alarm}>
                                    <Text style={styles.text}>Dingdong</Text>
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