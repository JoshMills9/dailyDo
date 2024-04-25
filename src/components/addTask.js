import { Image, KeyboardAvoidingView,  Platform,Switch,ScrollView, StatusBar, Text, TextInput, TouchableOpacity, View } from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';
import styles from "../styles/styles";
import { useState ,} from "react";
import {Picker} from '@react-native-picker/picker';




const AddTask = ({navigation}) => {

    //state to update header input
    const [addTask, setaddTask] = useState("");

    //state to update description input
    const [adddescrip, setdescrip] = useState("");

    //state to update the datetime
    const [date, setDate] = useState(new Date());

    //state to update the mode of datetime (date or time)
    const [mode, setMode] = useState('');

    const [show, setShow] = useState(false);

    //state to update the display of datetime (calendar or clock)
    const [display, setDisplay] = useState("")

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
    

    let hour = date.getHours();
    const amOrPm = hour < 12 ? 'AM' : 'PM';
    hour = hour % 12 || 12;
    
    const formattedTime = `${hour}:${String(date.getMinutes()).padStart(2, '0')} ${amOrPm}`;
    

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
    

    //state to update the reminder
    const [reminder, setreminder ] = useState("1 min");

    //state to update the color
    const [Color, setColor] = useState("red");

    const [selectedValue, setSelectedValue] = useState("Clingcling");
    
    //state to toggle switch
    const [isEnabled, setIsEnabled] = useState(false);
    //function to handle switch toggler
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    //Obj to be transfered to the other screen
    const obj = {
        header: addTask,
        description: adddescrip,
        calendar: formattedDate,
        alarm: formattedTime,
        reminder: reminder,
        color: Color,
        song: selectedValue,
        toggler: isEnabled
    };

    return (
        <View style={styles.bgImg}>
            <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : "padding"}>
                <ScrollView>
                    
                    <View>
                        <TextInput style={styles.headingtext} value={addTask} onChangeText={(text) => setaddTask(text)}  placeholder="Add Heading" />
                    </View>
                   
                   
                    <View>
                        <TextInput style={styles.descriptext} value={adddescrip} multiline={true} onChangeText={(text) => setdescrip(text)} placeholder="Add a short description" />
                    </View>
                   
                   
                        <View style={styles.colors}>
                            <TouchableOpacity  onPress={() => setColor("red")} style={[styles.pallets, Color==="red"? {elevation:5, backgroundColor:"white"}: "" ]} ><View style={[{backgroundColor:"red", width:30,height:30, borderRadius:50}]}></View></TouchableOpacity>
                            <TouchableOpacity  onPress={() => setColor("yellow")} style={[styles.pallets, Color==="yellow"? {elevation:5, backgroundColor:"white"}: "" ]} ><View style={[{backgroundColor:"yellow", width:30,height:30, borderRadius:50}]}></View></TouchableOpacity>
                            <TouchableOpacity  onPress={() => setColor("black")} style={[styles.pallets, Color==="black"? {elevation:5, backgroundColor:"white"}: "" ]} ><View style={[{backgroundColor:"black", width:30,height:30, borderRadius:50}]}></View></TouchableOpacity>
                            <TouchableOpacity  onPress={() => setColor("magenta")} style={[styles.pallets, Color==="magenta"? {elevation:5, backgroundColor:"white"}: "" ]} ><View style={[{backgroundColor:"magenta", width:30,height:30, borderRadius:50}]}></View></TouchableOpacity>
                            <TouchableOpacity  onPress={() => setColor("green")} style={[styles.pallets, Color==="green"? {elevation:5, backgroundColor:"white"}: "" ]} ><View style={[{backgroundColor:"green", width:30,height:30, borderRadius:50}]}></View></TouchableOpacity>
                            <TouchableOpacity  onPress={() => setColor("cyan")} style={[styles.pallets, Color==="cyan"? {elevation:5, backgroundColor:"white"}: "" ]} ><View style={[{backgroundColor:"cyan", width:30,height:30, borderRadius:50}]}></View></TouchableOpacity>
                        </View>
                     
                    <View style={styles.ac}>
                        <View style={styles.calendarview}> 
                            <TouchableOpacity onPress={() => showMode("time") && setDisplay("clock")}  style={styles.calendarsbg}><Image style={styles.calendars} source={require("../images/alarm.png")}/></TouchableOpacity>
                            <TouchableOpacity onPress={() => showMode("date") && setDisplay("calendar")} style={styles.calendarsbg}><Image style={styles.calendars} source={require("../images/calendar.png")}/></TouchableOpacity>
                            
                        </View>
                        <View style={styles.audioview}>
                            <View style={{flex:1,}}><Text adjustsFontSizeToFit={true} numberOfLines={1}  style={[styles.medtext, { fontSize:24, color:"black"}]}>{selectedValue || "Audio"}</Text></View>
                            <Picker
                                selectedValue={selectedValue}
                           
                                style={{ height:20, width:30 }}
                              
                                onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
                            >
                                <Picker.Item label="Clingcling" value="Clingcling" />
                                <Picker.Item label="Cockcrow" value="Cockcrow" />
                                <Picker.Item label="Clock" value="Clock" />
                                <Picker.Item label="Fairy" value="Fairy" />
                                <Picker.Item label="Bell" value="Bell" />

                            </Picker>
                        </View>
                    </View>
                    
                    <View style={[styles.colors,{marginTop:30}]}>

                        <Text style={[styles.medtext, {fontSize:25,color:"black"}]}>Set Reminder</Text>
                
                        <TouchableOpacity onPress={() => setreminder("1 min")} style={[styles.setreminder, reminder === "1 min" ? { backgroundColor: 'navy' }: ""]}>
                            <Text style={[styles.medtext, reminder === "1 min" ? { color: 'white' }: {color:"black"}, {fontSize:18, }]}>1</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => setreminder("2 mins")} style={[styles.setreminder, reminder === "2 mins" ? { backgroundColor: 'navy' }: ""]}>
                            <Text style={[styles.medtext, reminder === "2 mins" ? { color: 'white' }: {color:"black"}, {fontSize:18, }]}>2</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => setreminder("5 mins")} style={[styles.setreminder, reminder === "5 mins" ? { backgroundColor: 'navy' }: ""]}>
                            <Text style={[styles.medtext,  reminder === "5 mins" ? { color: 'white' }: {color:"black"}, {fontSize:18, }]}>5</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => setreminder("10 mins")} style={[styles.setreminder,  reminder === "10 mins" ? { backgroundColor: 'navy' }: ""]}>
                            <Text style={[styles.medtext,  reminder === "10 mins" ? { color: 'white' }: {color:"black"}, {fontSize:18, }]}>10</Text>
                        </TouchableOpacity>
                        
                    </View>
    
                    <View style={[styles.colors,{marginTop:20,justifyContent:"space-between",paddingHorizontal:15}]}>

                        <Text style={[styles.medtext, {fontSize:20,fontWeight:"500",color:"black"}]}>Mark as Important?</Text>

                        <Switch
                                trackColor={{false: 'gray', true: '#81b0ff'}}
                                thumbColor={isEnabled ? 'white' : 'white'}
                                ios_backgroundColor="#3e3e3e"
                                onValueChange={toggleSwitch}
                                value={isEnabled}
                                style={{ transform: [{ scaleX: 1.3 }, { scaleY: 1.3 }] }}
                            />
                    </View>

                    <View style={styles.addtaskview}> 
                        <TouchableOpacity onPress={() => navigation.navigate("To-Do List", obj)} style={styles.addtaskbtn}><Text style={styles.addbtn}>Add Task</Text></TouchableOpacity>
                    </View>
                   
                </ScrollView>

                {show && (<DateTimePicker testID="dateTimePicker" value={date} mode={mode} 
                is24Hour={false} display={display} onChange={onChange}/>
                )}

            
            </KeyboardAvoidingView>
            </View>
    );
};

export default AddTask;
