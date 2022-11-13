
import {StyleSheet} from "react-native";

const styles = StyleSheet.create({
    popularCurrenciesContainerStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: 'white', elevation: 2.0,
        borderRadius: Sizes.fixPadding * 2.0,
        alignItems: 'center',
        paddingHorizontal: Sizes.fixPadding,
        paddingVertical: Sizes.fixPadding,
        shadowColor: 'black',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 1},
        shadowRadius: 9,
        elevation: 3,
    },
    segmentTabs:{
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
    },
    activeTabSeg:{
        backgroundColor:Color.theme,
        padding:14,
        paddingHorizontal:35,
        borderWidth:0.2,
        borderColor:'#444'
    },
    inActiveTagSeg:{
        backgroundColor:Color.bgColor,
        padding:14,
        paddingHorizontal:35,
        borderWidth:0.2,
        borderColor:'#444',
    },

    activeTabDivisSeg:{
        backgroundColor:Color.theme,
        padding:9,
        paddingHorizontal:26,
        borderWidth:0.2,
        borderColor:'#999'
    },
    inActiveTabDivisSeg:{
        backgroundColor:'#efefef',
        padding:9,
        paddingHorizontal:26,
        borderWidth:0.1,
        borderColor:'#999'
        // borderWidth:0.2,
        // borderColor:'#444',
    },
    currency1:{
        backgroundColor:'#FFF',
        padding:11,
        paddingHorizontal:45,
        // borderWidth:0.1,
        // borderColor:'#999',
        borderRadius:16,
        marginVertical:5,
        shadowColor: 'black',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 1},
        shadowRadius: 9,
        elevation: 3,
        backgroundColor: 'white'
        // borderRightWidth:1,
        // borderColor:'#444'
    },

    registerOperation:{
        backgroundColor:Color.theme,
        borderRadius:8,
        marginHorizontal:30, 
        padding:14,
        marginVertical:5,
        marginBottom:30
    },

    loading:{
        zIndex:1000,
        position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'
    }
})
export default styles;