import React, {Component} from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import {RNCamera} from 'react-native-camera';
import {SafeAreaView} from 'react-navigation';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export class CameraPage extends Component {
  constructor(props) {
    super(props);
    this.camera;
    this.state = {
      picDetails: {},
    };
  }

  takePicture = async () => {
    if (this.camera) {
      const options = {quality: 0.5, base64: false, pauseAfterCapture: true};
      const data = await this.camera.takePictureAsync(options);
      this.setState({picDetails: data});
      console.log(data);
    }
  };
  retakePic = async () => {
    if (this.camera) {
      await this.setState({picDetails: {}});
      this.camera.resumePreview();
    }
  };
  render() {
    return (
      <SafeAreaView style={{flex: 1}}>
        <RNCamera
          ref={(ref) => {
            this.camera = ref;
          }}
          style={{
            flex: 1,
            justifyContent: 'flex-end',
            alignItems: 'center',
          }}
          captureAudio={false}
          playSoundOnCapture={true}
          type={RNCamera.Constants.Type.back}
          flashMode={RNCamera.Constants.FlashMode.off}
          androidCameraPermissionOptions={{
            title: 'Permission to use camera',
            message: 'We need your permission to use your camera',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}>
          {({camera, status, recordAudioPermissionStatus}) => {
            if (status !== 'READY') return <Text>Loading...</Text>;
            return (
              <View
                style={{
                  flex: 0,
                  flexDirection: 'row',
                  justifyContent: 'space-evenly',
                  alignItems: 'center',
                  width: '100%',
                }}>
                <TouchableOpacity
                  style={{flex: 0, margin: 20}}
                  onPress={this.retakePic}>
                  <MaterialCommunityIcons
                    name="camera-retake-outline"
                    size={40}
                    style={{
                      borderRadius: 20,
                      color: 'tomato',
                      // color: '#FF8800',
                    }}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={this.takePicture}
                  style={{
                    flex: 0,
                    margin: 20,
                    // backgroundColor: '#fff',
                    paddingHorizontal: 20,
                  }}>
                  <MaterialCommunityIcons
                    name="camera-outline"
                    size={60}
                    style={{
                      // borderRadius: 30,
                      color: '#fff',
                    }}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={{flex: 0, margin: 20}}
                  onPress={async () => {
                    await this.props.navigation.state.params.onCapture(
                      this.state.picDetails,
                    );
                    this.props.navigation.goBack();
                  }}>
                  <MaterialCommunityIcons
                    name="check-circle-outline"
                    size={40}
                    style={{
                      borderRadius: 20,
                      color: '#007E33',
                    }}
                  />
                </TouchableOpacity>
              </View>
            );
          }}
        </RNCamera>
      </SafeAreaView>
    );
  }
}

export default CameraPage;
