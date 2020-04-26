import React, {Component} from 'react';
import {Platform, StyleSheet,AsyncStorage,Modal,ToastAndroid, Text, Dimensions,View, Image,FlatList,TouchableOpacity,TouchableWithoutFeedback} from 'react-native';
import Colors from '../../utils/res/Colors';
import Strings from '../../utils/res/Strings';
import Styles from '../../utils/res/Styles';
type Props = {};

export default class CustomDialog extends Component<Props>
{
      constructor(args) {
        super(args);
        let { width } = Dimensions.get("window");
        let { height } = Dimensions.get("window");
        this.state = {
           screenWidth: width,
           screenHeight: height,
           cancelButtonText:(this.props.cancelText != null && this.props.cancelText != "") ? this.props.cancelText : "CANCEL",
        }
      }

      onDialogSkipClick = () => {
        this.props.onCancelPress();
      }
      onOptionSelect = (option) => {
        this.props.onChooseOption(option);
      }
      render() {
        return (
            <Modal
              visible={this.props.visibility}
              transparent={true}
              animationType={"fade"}
              onRequestClose={ () => { this.setState({showProfileDialog:false})} } >
              <View style={Styles.Alert_Main_BG}>
                  <View style={Styles.Alert_Main_View}>
                      <View style={{justifyContent: 'center',alignItems:'center', flex:1}}>
                        <Text style={Styles.Alert_Title}>Select a Photo</Text>
                        <TouchableOpacity
                          onPress={() => { this.onOptionSelect(0)}}>
                          <Text style={Styles.Alert_Option}>Take Photo...</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={() => { this.onOptionSelect(1)}}>
                          <Text style={Styles.Alert_Option}>Choose from library...</Text>
                        </TouchableOpacity>
                      </View>
                      <View style={{ width: '100%', height: 1, backgroundColor: '#fff'}} />
                      <View style={{flexDirection: 'row', height: '25%'}}>
                            <TouchableOpacity
                              style={Styles.Alert_ButtonStyle}
                              onPress={() => { this.onDialogSkipClick()}}
                              activeOpacity={0.7} >
                              <Text style={Styles.Alert_TextStyle}>{this.state.cancelButtonText}</Text>
                            </TouchableOpacity>

                      </View>
                  </View>
              </View>
            </Modal>
        );
      }
}

const styles = StyleSheet.create({
  container: { flex: 1},

  TopOuterView: { flex: 1,flexDirection:'row'},

  InnerViewStyle: {flex:1,justifyContent: 'center',alignItems: 'center',margin:10},

  TextStyle: { color: Colors.appColor,textAlign:'center',fontSize: 22},

  DisableTextStyle: { color: Colors.keyBoardDisableTextColor,textAlign:'center',fontSize: 22},

  DividerStyle: { width:60,backgroundColor: Colors.keyBoardDividerColor, height:1, marginTop:8 },

  BackImageStyle: {width:30, height:30,tintColor: Colors.appColor},

  BackDisableImageStyle: {width:30, height:30,tintColor: Colors.keyBoardDisableTextColor},
});
