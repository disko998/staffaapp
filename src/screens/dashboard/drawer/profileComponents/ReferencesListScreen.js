import React, {Component} from 'react';
import {Text, View, TouchableOpacity, FlatList, Image} from 'react-native';
import {AppConsumer} from '../../../../context/AppProvider';
import Icon from 'react-native-vector-icons/Ionicons';
import StatusBarPaddingIOS from 'react-native-ios-status-bar-padding';

export default class ReferencesListScreen extends Component {
  constructor(args) {
    super(args);
    Icon.loadFont();
  }

  onAddClick() {
    this.context.moveToScreen(
      this,
      this.context.utilities.strings.APP_SCREEN_ADD_REFERENCE,
    );
  }

  onEditClick(index) {
    this.context.moveToScreenPayload(
      this,
      this.context.utilities.strings.APP_SCREEN_UPDATE_REFERENCES,
      {index: index},
    );
  }

  onDeleteClick(item, index) {
    var screen = this;
    this.context.showDialog(
      'Yes',
      'No',
      'Are you sure you want to delete ' + item.name + '?',
      (cancel, ok) => {
        if (ok) {
          this.context.showLoading(true);
          var allData = this.context.userData.references.data;
          allData.splice(index, 1);
          var myData = {references: {data: allData}};
          screen.context.apiService.updateFirestoreUserData(
            screen.context.currentUser.uid,
            myData,
          );
          screen.context.updateUserData(user => {
            screen.context.showLoading(false);
          });
        }
      },
    );
  }

  render() {
    return (
      <AppConsumer>
        {context => (
          <View
            style={context.utilities.styles.root}
            ref={ref => {
              this.context = context;
            }}>
            <StatusBarPaddingIOS />
            <View style={{marginTop: 10, flexDirection: 'row'}}>
              <TouchableOpacity
                style={{marginLeft: 10}}
                onPress={() => context.goBack(this)}>
                <Image
                  source={require('../../../../images/back.png')}
                  style={
                    context.utilities.styles.QualificationListTopImageStyle
                  }
                  tintColor={context.utilities.colors.black}
                />
              </TouchableOpacity>
              <View style={{alignItems: 'center', flex: 1}}>
                <Text style={context.utilities.styles.headerLogoTextStyle}>
                  {context.utilities.strings.appName}
                </Text>
                <Text style={context.utilities.styles.headerInfoTextStyle}>
                  References
                </Text>
              </View>
              <TouchableOpacity
                style={{marginRight: 10}}
                onPress={() => this.onAddClick()}>
                <Image
                  source={require('../../../../images/icon_add.png')}
                  style={
                    context.utilities.styles.QualificationListTopImageStyle
                  }
                  tintColor={context.utilities.colors.black}
                />
              </TouchableOpacity>
            </View>

            {context.userData.references && (
              <View
                style={{
                  height: context.screenHeight,
                  flex: 1,
                  marginTop: 10,
                  marginBottom: 10,
                }}>
                <FlatList
                  extraData={context.userData.references.data}
                  data={context.userData.references.data}
                  renderItem={({item, index}) => (
                    <View
                      style={
                        context.utilities.styles.QualificationListRowBGStyle
                      }>
                      <Image
                        source={{uri: item.docURL}}
                        style={
                          context.utilities.styles
                            .QualificationListRowImageStyle
                        }
                      />
                      <Text
                        style={
                          context.utilities.styles.QualificationListRowNameStyle
                        }>
                        {item.name}
                      </Text>
                      <View
                        style={
                          context.utilities.styles
                            .QualificationListRowOptionBGStyle
                        }>
                        <View
                          style={
                            context.utilities.styles
                              .QualificationListRowOptionBGInnerStyle
                          }>
                          <TouchableOpacity
                            onPress={() => this.onEditClick(index)}>
                            <Icon
                              name={'md-create'}
                              style={{margin: 10}}
                              size={20}
                              color={context.utilities.colors.white}
                            />
                          </TouchableOpacity>
                          {context.userData.references.data.length > 0 && (
                            <TouchableOpacity
                              onPress={() => this.onDeleteClick(item, index)}>
                              <Icon
                                name={'md-trash'}
                                style={{margin: 10}}
                                size={20}
                                color={context.utilities.colors.white}
                              />
                            </TouchableOpacity>
                          )}
                        </View>
                      </View>
                    </View>
                  )}
                />
              </View>
            )}

            {context.userData.references === undefined && (
              <View style={context.utilities.styles.baseStyle1}>
                <Text style={context.utilities.styles.NoDataTextStyle}>
                  {context.utilities.strings.msgNoReferencesFound}
                </Text>
              </View>
            )}
          </View>
        )}
      </AppConsumer>
    );
  }
}
