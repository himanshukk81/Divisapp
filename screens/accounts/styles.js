import {StyleSheet} from "react-native";
import Constant from "../../utility/Constant";

const styles = StyleSheet.create({
    dropdown: {
        marginHorizontal: 16,
        marginVertical:5,
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
    textAlign:{
        textAlign:'left',
        marginLeft:23,
        marginBottom:10
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
        color:'#444'
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
})

export default styles;