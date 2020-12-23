import React, {Component} from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import {RNCamera} from 'react-native-camera';
import {SafeAreaView} from 'react-navigation';

export class CameraPage extends Component {
  constructor(props) {
    super(props);
    this.camera;
    this.state = {};
  }

  takePicture = async () => {
    if (this.camera) {
      const options = {quality: 0.5, base64: false, pauseAfterCapture: true};
      const data = await this.camera.takePictureAsync(options);
      console.log(data);
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
          type={RNCamera.Constants.Type.back}
          flashMode={RNCamera.Constants.FlashMode.on}
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
                  justifyContent: 'center',
                }}>
                <TouchableOpacity
                  onPress={this.takePicture}
                  style={{
                    flex: 0,
                    backgroundColor: '#fff',
                    borderRadius: 5,
                    padding: 15,
                    paddingHorizontal: 20,
                    alignSelf: 'center',
                    margin: 20,
                  }}>
                  <Text style={{fontSize: 14}}> SNAP </Text>
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
