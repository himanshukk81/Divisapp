
import React from "react";
import { View ,TextInput,StyleSheet,Image} from "react-native";

import { OutlinedTextField } from 'rn-material-ui-textfield'


export default class InputBox extends React.Component {
    async componentDidMount() {
        console.log("did mount::::::",this.props.inputType)
    }



    constructor(props){
        super()
    }


    render() {
        return (
            <View style={styles.textFieldsCommonStyle}>
                
                <OutlinedTextField
                    style={styles.input}
                    label={this.props.required?this.props.placeholder+' *':this.props.placeholder}
                    // placeholder={this.props.placeholder}
                    onChangeText={text => this.props.onChangeText(text)}
                    secureTextEntry={this.props.secure}
                    // formatText={this.props.value}
                    value={this.props.value}
                    keyboardType={this.props.inputType?this.props.inputType:'name-phone-pad'}
                    maxLength={this.props.maxLength?this.props.maxLength:50}
                    multiline={this.props.multiline?this.props.multiline:false}
                    editable={this.props.readOnly?false:true}
                    // inputContainerStyle={this.props.multiline?{height:200}:{}}
                    // rows={this.props.multiline?3:1}
                />
            </View>
        )
    }
}


const styles = StyleSheet.create({

    textFieldsCommonStyle: {
        paddingHorizontal: 10.0 * 2.0,
        marginTop: 10.0 * 1.5,
        // flexDirection:'row',
        // width:100
    },
    searchSection: {
        // flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        marginBottom:20,
        marginHorizontal:20,
        paddingHorizontal:15,
        borderRadius:5
        
    },
    searchIcon: {
        padding: 10,
    },
    input: {
        // flex: 1,
        // paddingTop: 10,
        // paddingRight: 10,
        // paddingBottom: 10,
        // paddingLeft: 0,
        // backgroundColor: '#fff',
        // color: '#424242',
    },
})

