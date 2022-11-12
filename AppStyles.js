
import {StyleSheet} from 'react-native';

const AppStyles = StyleSheet.create({

    label:{
      color:'#444',
      textAlign:'left'
    },  
    contain:{
       
    },
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    menuContainer: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-evenly',
    },
    menuItemsCard: {
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 10,
    },
    circleContainer: {
      width: 50,
      height: 50,
      borderRadius: 25,
      padding: 10,
    },

    menuProfile:{
      flexDirection:'row',
      alignItems:'center',
      justifyContent:'space-between',
      paddingHorizontal:7,
      paddingVertical:5
    },
    imageIcon:{
      height: 19, width: 19,tintColor:'red'
    }
});

export default AppStyles;