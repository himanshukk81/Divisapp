import {StyleSheet} from "react-native";
import Constant from "../../utility/Constant";

const styles = StyleSheet.create({
    label: {
        color:'#444',
        textAlign:'center',
        fontWeight:'bold'
    },
    subTitlelabel: {
      color:'#444',
      textAlign:'center',
    },
    labelContainer:{
        marginBottom:20
    },
    container:{
        marginTop:30
    },
    checkbox: {
        alignSelf: "center",
        borderColor:'red'
    },
    textAlign:{
        textAlign:'left',
        marginLeft:23,
        marginBottom:10
    },
    dropdown: {
        margin: 16,
        height: 50,
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 12,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
  
        elevation: 2,
        // color:'red'
      },
      icon: {
        marginRight: 5,
      },
      item: {
        padding: 17,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      },
      textItem: {
        flex: 1,
        fontSize: 16,
        color:'#444'
      },
      placeholderStyle: {
        fontSize: 16,
        color:'#444'
      },
      selectedTextStyle: {
        fontSize: 16,
        color:'#444'
      },
      iconStyle: {
        width: 20,
        height: 20,
      },
      inputSearchStyle: {
        height: 40,
        fontSize: 16,
      },

      centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
      },
      modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 10,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
      },
      modalView2:{
        // margin: 20,
        backgroundColor: "white",
        borderRadius: 10,
        height:Constant.height-230,
        width:Constant.width-30
      },
      modalView3:{
        backgroundColor: "white",
        borderRadius: 10,
        height:Constant.height/2.1,
        width:Constant.width-76
      },
      modalView4:{
        backgroundColor: "white",
        borderRadius: 10,
        height:Constant.height/1.6,
        width:Constant.width-76
      },
      imageBtn:{
        marginVertical:10,borderColor:'red',borderWidth:1,paddingHorizontal:10,paddingVertical:5
      },
      userAccountStatus:{
          backgroundColor:'blue',
          paddingHorizontal:6,
          paddingVertical:2,
          color:'#FFF',
          marginVertical:2
      }
})

export default styles;