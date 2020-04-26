import React, {Component} from 'react';
import {Platform, StyleSheet,Modal, Text,ScrollView, Dimensions,View, Image,FlatList,TouchableOpacity,TouchableWithoutFeedback} from 'react-native';
import Colors from '../../utils/res/Colors';
import Strings from '../../utils/res/Strings';
import Styles from '../../utils/res/Styles';

export default class CustomDialogList extends Component<Props>
{
      constructor(args) {
        super(args);
        let { width } = Dimensions.get("window");
        let { height } = Dimensions.get("window");
        this.state = {
           screenWidth: width,
           screenHeight: height,
           data:[],
        }
      }

      componentWillMount(){
        if(this.props.list != null && this.props.list.length > 0){
          var list = this.props.list;
          list.splice(0, 0, {topicName:"Add New Topic", topicData:{}});
          this.setState({data:list});
          console.log("CustomDialogList componentWillMount  list : " + list.length);
        }
      }

      renderRow = ({item}) => {
        return (
          <TouchableOpacity style = {Styles.ContactsRowStyle} onPress={() => {this.onItemSelected(item)}}>
            <Text style={Styles.ContactsUserNameTextStyle}>{item.topicName}</Text>
          </TouchableOpacity>
        );
      }

      onItemSelected = (item) => {
        if(item.topicName === "Add New Topic"){
          this.props.onAddTopicClick();
        } else {
          this.props.onItemSelected(item);
        }
      }
      onDialogSkipClick = () => {
        this.props.onCancelPress();
      }
      
      render() {
        return (
            <Modal
              visible={this.props.visibility}
              transparent={true}
              animationType={"fade"}
            >
              <View style={Styles.Alert_Main_BG}>
                  {this.state.data.length > 0 &&  
                    <View style={{backgroundColor:Colors.white, width:250, height:"70%"}}>
                      <ScrollView>
                      {
                        this.state.data.map((item, index) => {
                          return (
                            <TouchableOpacity style = {{padding:10}} onPress={() => {this.onItemSelected(item)}}>
                              <Text style={{fontSize:15, fontWeight:'bold', color:Colors.black}}>{item.topicName}</Text>
                            </TouchableOpacity>
                          )
                        })
                      }
                      </ScrollView>
                      <View style={{flexDirection: 'row',alignItems:'center',backgroundColor:Colors.lightGray, justifyContent:'center', height:50}}>
                          <TouchableOpacity
                              style={[Styles.Alert_ButtonStyle, {width:'100%',height:50}]}
                              onPress={()=> {this.onDialogSkipClick()}}>
                              <Text style={Styles.Alert_TextStyle}>{Strings.dialogButtonCancel}</Text>
                          </TouchableOpacity>
                      </View>
                    </View>
                  }
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
