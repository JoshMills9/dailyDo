import { Text, View,SafeAreaView, StatusBar, Image,FlatList, ScrollView, TouchableOpacity } from "react-native";
import styles from "../styles/styles";
import { useEffect, useState } from "react";


const TodoLists=({navigation, route}) =>{
    const {header,description, alarm, calendar, color} = route.params || {};
    const [list , setlist] = useState([])
    
    useEffect(()=>{
        setlist(prevList => [...prevList, { header, description , alarm, calendar , color}]);
    },[header,description])
 
    return(
        <SafeAreaView style={styles.container}>
            <StatusBar styles="auto"/>
            
            {/*<ScrollView>
            <View style={styles.view}>

                <View style={styles.subview}> 
                    <View>
                        <Text style={styles.header}>
                            Work on PC
                        </Text>
                        <Text style={styles.description}>
                            Create the designs that the host fgave me blah blah blah and done.
                        </Text>
                    </View>

                    <View>
                        <Text style={styles.medtext}>
                           Monday, 1st Apr, 2024
                        </Text>
                    </View>

                    <View style={styles.timeview}>
                        <Image style={ {tintColor:"black", height:20,width:20}} source={require("../images/clock.png")}/>
                        <Text style={{fontSize:24, fontWeight:500}}>11:26pm</Text>
                    </View>

                </View>
                
                <View style={styles.subview2}>
                    <View style={styles.color}>

                    </View>

                    <View style={styles.Alarm}>

                        <View style={styles.alarm}>
                            <Text style={styles.text}>Dingdong</Text>
                            <Image style={styles.img} source={require("../images/music.png")}/>
                        </View>

                        <View style={styles.alarm}>
                            <Text style={styles.text}>2 min</Text>
                            <Image style={styles.img} source={require("../images/bell.png")}/>
                        </View>

                    </View>

                </View>

            </View>

            <View style={styles.view}>

                <View style={styles.subview}> 
                    <View>
                        <Text style={styles.header}>
                            Walk Dog
                        </Text>
                        <Text style={styles.description}>
                            Create the designs that the host fgave me blah blah blah and done.
                        </Text>
                    </View>

                    <View>
                        <Text style={styles.medtext}>
                           Monday, 1st Apr, 2024
                        </Text>
                    </View>

                    <View style={styles.timeview}>
                        <Image style={ {tintColor:"black", height:20,width:20}} source={require("../images/clock.png")}/>
                        <Text style={{fontSize:24, fontWeight:500}}>11:26pm</Text>
                    </View>

                </View>
                
                <View style={styles.subview2}>
                    <View style={[styles.color, {backgroundColor:"yellow"}]}>

                    </View>

                    <View style={styles.Alarm}>

                        <View style={styles.alarm}>
                            <Text style={styles.text}>Dingdong</Text>
                            <Image style={styles.img} source={require("../images/music.png")}/>
                        </View>

                        <View style={styles.alarm}>
                            <Text style={styles.text}>2 min</Text>
                            <Image style={styles.img} source={require("../images/bell.png")}/>
                        </View>

                    </View>

                </View>

            </View>

             <View style={styles.view}>

                <View style={styles.subview}> 
                    <View>
                        <Text style={styles.header}>
                            Play Piano
                        </Text>
                        <Text style={styles.description}>
                            Create the designs that the host fgave me blah blah blah and done.
                        </Text>
                    </View>

                    <View>
                        <Text style={styles.medtext}>
                           Monday, 1st Apr, 2024
                        </Text>
                    </View>

                    <View style={styles.timeview}>
                        <Image style={ {tintColor:"black", height:20,width:20}} source={require("../images/clock.png")}/>
                        <Text style={{fontSize:24, fontWeight:500}}>11:26pm</Text>
                    </View>

                </View>
                
                <View style={styles.subview2}>
                    <View style={[styles.color, {backgroundColor:"black"}]}>

                    </View>

                    <View style={styles.Alarm}>

                        <View style={styles.alarm}>
                            <Text style={styles.text}>Dingdong</Text>
                            <Image style={styles.img} source={require("../images/music.png")}/>
                        </View>

                        <View style={styles.alarm}>
                            <Text style={styles.text}>2 min</Text>
                            <Image style={styles.img} source={require("../images/bell.png")}/>
                        </View>

                    </View>

                </View>

            </View>
    </ScrollView>*/}

            <FlatList
                data={list}
                renderItem={({item})=> {
                    return(
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
                                <Text style={{fontSize:24, fontWeight:500}}>{item.alarm} PM</Text>
                            </View>
        
                        </View>
                        
                        <View style={styles.subview2}>
                            <View style={styles.color}>
        
                            </View>
        
                            <View style={styles.Alarm}>
        
                                <View style={styles.alarm}>
                                    <Text style={styles.text}>Dingdong</Text>
                                    <Image style={styles.img} source={require("../images/music.png")}/>
                                </View>
        
                                <View style={styles.alarm}>
                                    <Text style={styles.text}>2 min</Text>
                                    <Image style={styles.img} source={require("../images/bell.png")}/>
                                </View>
        
                            </View>
        
                        </View>
        
                    </View>
                    )
                }}
            />
            <TouchableOpacity style={styles.add} onPress={() => navigation.navigate("Add New Task")}>
                <Text style={styles.addTaskText}>+</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
};


export default TodoLists;