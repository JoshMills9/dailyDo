import { StyleSheet } from "react-native";


const styles = StyleSheet.create({

    container:{
        flex:1,
        marginBottom:15,
        paddingHorizontal:10
    },

    view:{
        marginTop:20,
        backgroundColor:"midnightblue",
        width:"100%",
        minHeight:250,
        borderRadius:40,
        padding:25,
        flexDirection:"row",
        justifyContent:"center",
        elevation:5,
       
    },
    headview:{
        justifyContent:"space-between",
      
        height:110
    },
    subview:{
        flex:2,
        justifyContent:"space-between"
    },
    subview2:{
        alignItems:"flex-end",
        flex:1,
        justifyContent:"space-between"
    },
    timeview:{
        borderRadius:50,
        flexDirection:"row",
        width:160,
        height:45,
        backgroundColor:"white",
        justifyContent:"space-evenly",
        alignItems:"center"
    },
    Alarm:{
        width:"100%",     
        
    },
    alarm:{
        flexDirection:"row",        
        justifyContent:"space-between",
        alignItems:"center",
        margin:8
    },
    color:{
        backgroundColor:"red",
        width:35,
        height:35,
        borderRadius:50
    },
    text:{
        fontSize:13,
        color:"white"
    },
    description:{
        fontSize:15,
        color:"white"
    },
    header:{
        fontSize:30,
        color:"white",
        fontWeight:"600"
    },
    medtext:{
        fontSize:21,
        color:"white",
        fontWeight:"400"
    },
    img:{
        width:20,
        height:20,
        tintColor:"white"
    },
    add:{
        borderRadius:50,
        width:100,
        height:100,
        backgroundColor:"white",
        zIndex:2,
        position:"absolute",
        bottom:20,
        right:15
    },
    addTaskText:{
        fontSize:70,
        alignSelf:"center",
        fontWeight:"300"
    },

    headingtext:{
        marginTop:30,
        height:50,
        width:"100%",
        borderBottomWidth:1,
        padding:15,
        fontSize:20,
        fontStyle:"italic"
    },
    descriptext:{
        marginTop:30,
        borderRadius:20,
        minHeight:150,
        width:"100%",
        borderWidth:1,
        padding:15,
        fontSize:20,
        fontStyle:"italic",
        textAlignVertical:"top"
    },
    colors:{
        flexDirection:"row",
        justifyContent:"space-evenly",
        alignItems:"center"
    },
    pallets:{
        marginTop:30,
        borderRadius:50,
        width:40,
        height:40,

    },
    calendars:{
        width:33,
        height:33,
        tintColor:"white"
    },
    calendarsbg:{
        alignItems:"center",
        justifyContent:"center",
        width:70,
        height:70,
        borderRadius:50,
        backgroundColor:"navy",

    },

    ac:{
        marginTop:35,
        flexDirection:"row",
        justifyContent:"space-around",
        alignItems:"center"
    },
    calendarview:{
        width:160,
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center",
    },

    audioview:{
        flexDirection:"row",
        borderWidth:1,
        borderRadius:20,
        width:150,
        height:55,
        alignItems:"center",
        justifyContent:"space-evenly",

    },

    setreminder:{
        borderWidth:1,
        width:35,
        height:35,
        borderRadius:50,
        justifyContent:"center",
        alignItems:"center"

    },
    addtaskview:{
        marginTop:50,
        justifyContent:"center",
        alignItems:"center",

    },
    addtaskbtn:{
        backgroundColor:"navy",
        width:250,
        height:75,
        borderRadius:50,
        alignItems:"center",
        justifyContent:"center"
    },
    addbtn:{
        fontSize:25,
        color:"white",
        fontWeight:"bold"
    },
    selectedItem:{
        elevation:5,
        shadowColor: 'rgba(0, 0, 0, 0.9)',
    }



});

export default styles;
