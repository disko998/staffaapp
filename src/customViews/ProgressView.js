import React, {Component} from 'react';
import {ActivityIndicator, Dimensions,View} from 'react-native';
import Colors from '../utils/res/Colors';
type Props = {};

export default class ProgressView extends Component<Props>
{
      constructor(args) {
        super(args);
        let { width } = Dimensions.get("window");
        let { height } = Dimensions.get("window");
      
        this.state = {
           screenWidth: width,
           screenHeight: height,
           showProgress:true,     
        }
      }
      componentWillMount = () => {
      }

      render() {
        return (
          <View style = {{width:this.state.screenWidth,backgroundColor:Colors.alertTransparentColor, height:this.state.screenHeight, justifyContent: 'center',alignItems: 'center', position:'absolute'}}>
            <ActivityIndicator size={100} color={Colors.appColor} />
          </View>
        );
      }
}

