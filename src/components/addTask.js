import { Image, SafeAreaView, StatusBar, Text, TextInput, TouchableOpacity, View } from "react-native";

import styles from "../styles/styles";
import { useState } from "react";


const AddTask = ({navigation})=>{

    const [addTask, setaddTask] = useState("")
    const [adddescrip, setdescrip] = useState("");
    const [selectedItem, setSelectedItem] = useState(false);

    const currentDate = new Date();
    const formattedDate = currentDate.toDateString();
    const currentHour = currentDate.getHours();
    const currentMinutes = currentDate.getMinutes();

    const time = `${currentHour}:${currentMinutes}`;

    const obj= {
        header: addTask,
        description: adddescrip,
        color: selectedItem,
        calendar:formattedDate,
        alarm:time

    }
      
     
    return(
        <SafeAreaView style={styles.container}>
            <StatusBar styles="auto"/>
            
            <View >
                <TextInput style={styles.headingtext} value={addTask} onChangeText={(text) => setaddTask(text)} placeholder="Add a Heading"/>
            </View>

            <View>
                <TextInput style={styles.descriptext} value={adddescrip} multiline={true} onChangeText={(text) => setdescrip(text)} placeholder="Add a short description"/>
            </View>

            <View style={styles.colors}>
                <TouchableOpacity onPress={() =>setSelectedItem(true)} style={[styles.pallets, {backgroundColor:"red"}, selectedItem && styles.selectedItem]} ></TouchableOpacity>
                <View style={[styles.pallets, {backgroundColor:"yellow"}]}></View>
                <View style={[styles.pallets, {backgroundColor:"black"}]}></View>
                <View style={[styles.pallets, {backgroundColor:"magenta"}]}></View>
                <View style={[styles.pallets, {backgroundColor:"green"}]}></View>
                <View style={[styles.pallets, {backgroundColor:"cyan"}]}></View>
            </View>

            <View style={styles.ac}>
                <View style={styles.calendarview}> 
                     <TouchableOpacity style={styles.calendarsbg}><Image style={styles.calendars} source={require("../images/alarm.png")}/></TouchableOpacity>
                     <TouchableOpacity style={styles.calendarsbg}><Image style={styles.calendars} source={require("../images/calendar.png")}/></TouchableOpacity>
                </View>
                <View style={styles.audioview}>
                    <Text style={[styles.medtext, {color:"black", fontSize:25}]}>Audio</Text>
                    <TouchableOpacity><Image style={[styles.calendars, {tintColor:"black"}]} source={require("../images/down-arrow.png")}/></TouchableOpacity>
                </View>
            </View>

            <View style={[styles.colors,{marginTop:30}]}>
                <Text style={[styles.medtext, {color:"black", fontSize:25}]}>Set Reminder</Text>
                <TouchableOpacity style={styles.setreminder}><Text style={[styles.medtext, {color:"black", fontSize:18}]}>1</Text></TouchableOpacity>
                <TouchableOpacity style={styles.setreminder}><Text style={[styles.medtext, {color:"black", fontSize:18}]}>2</Text></TouchableOpacity>
                <TouchableOpacity style={styles.setreminder}><Text style={[styles.medtext, {color:"black", fontSize:18}]}>5</Text></TouchableOpacity>
                <TouchableOpacity style={styles.setreminder}><Text style={[styles.medtext, {color:"black", fontSize:18}]}>10</Text></TouchableOpacity>
               
            </View>

            <View style={styles.addtaskview}> 
                <TouchableOpacity onPress={() => navigation.navigate("To-Do List", obj)} style={styles.addtaskbtn}><Text style={styles.addbtn}>
                    Add Task</Text></TouchableOpacity>
            </View>
            
        </SafeAreaView>
       
    )
};


export default AddTask;