import { StyleSheet } from "react-native";


const styles = StyleSheet.create({

    container:{
        flex:1,   
    },

    view:{
        marginTop:15,
        backgroundColor:"midnightblue",
        alignSelf:"center",
        width:"93%",
        minHeight:200,
        borderRadius:40,
        padding:20,
        flexDirection:"row",
        justifyContent:"center",
        elevation:6,
        shadowRadius:50,
        marginBottom:5
    },

    highlight:{
        borderRadius:40,
    },

    headview:{
        justifyContent:"space-around",
        height:100,
        marginBottom:20,
    
    },
    subview:{
        flex:2,
        justifyContent:"space-between"
    },
    subview2:{
        alignItems:"flex-end",
        flex:1,
        justifyContent:"space-between",
        backgroundColor:"red"
    },
    timeview:{
        borderRadius:50,
        flexDirection:"row",
        width:160,
        height:45,
        backgroundColor:"white",
        justifyContent:"space-evenly",
        alignItems:"center",
    },
    Alarm:{    
       width:100,
       marginRight:8
    },
    alarm:{
        flexDirection:"row",        
        justifyContent:"space-between",
        alignItems:"center",
        marginBottom:15,
        width:100,
     
   
    },
    alarm1:{
        flexDirection:"row",        
        justifyContent:"space-between",
        alignItems:"center",
        marginBottom:5,
     
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

    delEdit:{
        alignItems:"center",
        flexDirection:"row",
        width:"100%",
        justifyContent:"space-between",
        paddingLeft:25
    },

    delete:{
        width:35,
        height:35,
        tintColor:"orangered"
    },

    edit:{
        width:27,
        height:27,
        tintColor:"white"
    },

    add:{
        borderRadius:50,
        width:60,
        height:60,
        backgroundColor:"white",
        zIndex:2,
        position:"absolute",
        bottom:10,
        right:18,
        justifyContent:"center",
        alignItems:"center",
    },

    addTaskText:{
        fontSize:60,
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
        fontStyle:"italic",
        
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
        justifyContent:"center",
        alignItems:"center",
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
        justifyContent:"center",
        paddingRight:15,
        paddingLeft:10
    },

    setreminder:{
        borderWidth:1,
        width:35,
        height:35,
        borderRadius:50,
        justifyContent:"center",
        alignItems:"center",

    },
    addtaskview:{
        marginTop:30,
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
    },

    CompletedView:{
        width:"100%",
        backgroundColor:"rgba(255, 255, 255, 0.7)",
        borderTopRightRadius: 15,
        borderTopLeftRadius: 15,
        borderBottomRightRadius:10,
        borderBottomLeftRadius:10,
        paddingHorizontal:10,
        paddingTop:8
    },
    dateDescrip:{
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center",
        paddingVertical:2
    },
    compheader:{
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center",
    },
    title:{
        flex:1
    },

    popup: {
        position: 'absolute',
        bottom:8,
        left: 15,
        right: 15,
        backgroundColor: 'white',
        borderTopRightRadius: 15,
        borderTopLeftRadius: 15,
        borderBottomRightRadius:10,
        borderBottomLeftRadius:10,
        zIndex: 10,
        elevation: 9, // For Android elevation
      },
      option: {
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
      },

});

export default styles;
