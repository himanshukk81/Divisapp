import { StyleSheet } from "react-native";
import Color from "../utility/Color";

const styles = StyleSheet.create({

    tab1Text:{
        color:Color.darkGreen,
        fontWeight:'bold'
    },
    tab2Text:{
        color:Color.darkBlue,
        fontWeight:'bold'
    },
    tab3Text:{
        color:Color.darkGrey,
        fontWeight:'bold'
    },

    tab1TextOuter:{
        color:Color.lightGreen
    },
    tab2TextOuter:{
        color:Color.lightBlue
    },
    tab3TextOuter:{
        color:Color.lightGrey
    },
    
    tab1:{
        borderBottomWidth:2,
        borderBottomColor:Color.darkGreen,
        flexDirection:'row',
        justifyContent:'center',
        padding:10,
        fontWeight:'bold'
    },
    tab2:{
        borderBottomWidth:2,
        borderBottomColor:Color.darkBlue,
        flexDirection:'row',
        justifyContent:'center',
        padding:10,
        fontWeight:'bold'
    },
    tab3:{
        borderBottomWidth:1,
        borderBottomColor:Color.darkGrey,
        flexDirection:'row',
        justifyContent:'center',
        padding:10,
        fontWeight:'bold'
    },
    container:{
        backgroundColor:Color.white,
        borderRadius:2,
        borderWidth: 1,
        borderColor:Color.bgGray
    },
    subContainerContainer:{
        backgroundColor:Color.white,
        borderRadius:2,
        // borderWidth: 1,
        // borderColor:Color.bgGray,
        // flexDirection:'row',
        justifyContent:'center',
        paddingHorizontal:0
    },
    textColor:{
        color:'#000'
    },  
    statusPadding:{
        padding:6,
        color:'#FFF'
    },
    progressStatus:{
        backgroundColor:'#ffc107',
        color:'#FFF',
        fontWeight:'bold'
    },
    registerStatus:{
        
        backgroundColor:'#007bff',
        color:'#FFF',
        fontWeight:'bold'
    },
    cancelStatus:{
        backgroundColor:'#dc3545',
        color:'#FFF',
        fontWeight:'bold'
    },
    completeStatus:{
        backgroundColor:'#28a745',
        color:'#FFF',
        fontWeight:'bold'
    },

    headerView:{
        flexDirection:'row',
        justifyContent:'center',
        borderBottomWidth:0.5,
        alignItems:'center',
        borderBottomColor:'#444',
        padding:10,
        // paddingHorizontal:20
    },
    footerBtnContainer:{
        flexDirection:'row',
        justifyContent:'space-between',
        paddingHorizontal:10,
        marginVertical:6
        // marginTop:6
        // paddingVertical:10
    },
    registerBtn:{

    },
    transferBtn:{

    },
    cambioBtn:{

    },
    btnBorder:{
        borderWidth:1,
        borderColor:'#000',
        borderRadius:2,
        width:150,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center'
    },
    renderList:{
        flexDirection:'row',
        justifyContent:'space-between',
        borderWidth:0.5,
        borderColor:Color.lightgrey,
        padding:16,
        paddingHorizontal:20
    },

    gridAlignment:{
        flexDirection:'row',
        alignItems:'center',
    },
    gridContainer:{
        padding:13,
        borderWidth:0.3,
        borderColor:'#444',
        margin:8
    },
    btnContainer:{
        color:'#FFF',padding:7,textAlign:'center',fontWeight:'bold'
    },
    getOperationContainer:{
        borderWidth:0.2,
        borderColor:'#444',
        paddingHorizontal:10,
        marginVertical:10,
        marginHorizontal:15
    }
})

export default styles;