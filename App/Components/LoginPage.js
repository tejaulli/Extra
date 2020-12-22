import React, {Component} from 'react';
import LoginDesign from './LoginPageHeader';
import Svg, {Path} from 'react-native-svg';
//import {View, Content, Item, Input, Icon} from 'native-base';
import {
  StyleSheet,
  TextInput,
  View,
  Linking,
  Image,
  Text,
  TouchableOpacity,
  Button,
  TouchableHighlight,
  Dimensions,
  AsyncStorage,
  ActivityIndicator,
  Alert,
} from 'react-native';
import {Col, Row, Grid} from 'react-native-easy-grid';
import IonIcon from 'react-native-vector-icons/Ionicons';
import EvilIcon from 'react-native-vector-icons/EvilIcons';
import LinearGradient from 'react-native-linear-gradient';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import TimeSheetServices from '../Services/TimesheetServices';

export default class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      emailError: '',
      pswdError: '',
      loginError: '',
      showLoader: false,
      employeeData: [],
    };
	this.login_button = this.login_button.bind(this)
  }

  validate_field() {
    const {email, password} = this.state;
    var re = /^(([^<>()\[\]\\.,;:\s@�]+(\.[^<>()\[\]\\.,;:\s@�]+)*)|(�.+�))@((\[[0�9]{1,3}\.[0�9]{1,3}\.[0�9]{1,3}\.[0�9]{1,3}])|(([a-zA-Z\-0�9]+\.)+[a-zA-Z]{2,}))$/;
    if (email == '') {
      this.setState(() => ({emailError: 'Please fill email'}));
      return false;
    } else if (re.test(this.state.email) == false) {
      this.setState(() => ({emailError: 'Please enter valid email'}));
      return false;
    } else if (password == '') {
      this.setState(() => ({pswdError: 'Please fill password'}));
      return false;
    }
    this.setState(() => ({
      emailError: null,
      pswdError: null,
    }));
    return true;
  }

  login_button() {
    // //To override login
    // AsyncStorage.setItem(
    //   'login_responce_data',
    //   JSON.stringify({userDetails: {firstName: 'habib'}}),
    // );
    // this.props.navigation.navigate('SideNav');
    if (this.validate_field()) {
      this.setState({showLoader: true});
      TimeSheetServices.login_api(this.state.email, this.state.password)
        .then((loginResponce) => {
          if (loginResponce.data.responseCode === 200) {
            this.setState({showLoader: false});
            AsyncStorage.setItem(
              'login_responce_data',
              JSON.stringify(loginResponce.data),
            );
            // this.setState({showLoader: true});
            // setTimeout(() => {
            //   this.setState({showLoader: false});
            // }, 3000);
            if (loginResponce.data.userDetails.firstLogin === true) {
              this.props.navigation.navigate('ChangePassword');
            } else {
              if (loginResponce.data.userDetails.userType === 2) {
                //alert("Succesfully login");
                // this.props.navigation.navigate('ViewTimesheets');
                this.props.navigation.navigate('SideNav'); //changed Line
              }
            }
          } else {
            //console.error(loginResponce.data.details);
            this.setState({showLoader: false});
            this.setState(() => ({loginError: 'Wrong username and password'}));
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }

  render() {
    return (
      <View style={styles.container}>
        {/* <Image style={styles.bgImage} source={{ uri: "https://lorempixel.com/900/1400/nightlife/8/" }}/> */}
        <View
          style={{
            height: 170,
            top: -200,
            width: Dimensions.get('window').width,
          }}>
          <Image
            source={require('../../assests/images/CurveDesign.png')}
            style={{}}
          />
          {/*<Svg
          height="60%"
          width="100%"
          viewBox="0 0 1440 320"
          style={{ position: 'absolute', top: 140}}
        >
          <Path
            fill="#003171"
            d="M0,52L48,80C96,128,192,224,288,261.3C384,299,480,277,576,250.7C672,224,768,192,864,165.3C960,139,1056,117,1152,133.3C1248,149,1344,203,1392,229.3L1440,256L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
          />
        </Svg>*/}
        </View>

        <View>
          <Image
            source={require('../../assests/images/logo.png')}
            style={{width: 200, height: 70, marginTop: -260}}
          />
        </View>
        {!!this.state.loginError && (
          <Text style={{color: 'red', marginBottom: 15, fontSize: 16}}>
            {this.state.loginError}
          </Text>
        )}
        <View style={styles.inputContainer}>
          <IonIcon
            name="person-circle-sharp"
            size={24}
            style={{marginLeft: 18}}
          />
          <TextInput
            style={styles.inputs}
            placeholder="Username"
            keyboardType="email-address"
            underlineColorAndroid="transparent"
            value={this.state.email}
            onChangeText={(email) => this.setState({email})}
          />
        </View>
        {!!this.state.emailError && (
          <Text
            style={{
              color: 'red',
              marginTop: -15,
              marginBottom: 5,
              marginLeft: -120,
            }}>
            {this.state.emailError}
          </Text>
        )}

        <View style={styles.inputContainer}>
          <MaterialCommunityIcons
            name="key"
            size={24}
            style={{marginLeft: 18}}
          />
          <TextInput
            style={styles.inputs}
            placeholder="Password"
            secureTextEntry={true}
            underlineColorAndroid="transparent"
            value={this.state.password}
            onChangeText={(password) => this.setState({password})}
          />
        </View>
        {!!this.state.pswdError && (
          <Text
            style={{
              color: 'red',
              marginTop: -15,
              marginLeft: -100,
              marginBottom: 5,
            }}>
            {this.state.pswdError}
          </Text>
        )}
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => this.props.navigation.navigate('ForgotPassword')}>
          <Text>Forgot Password</Text>
        </TouchableOpacity>
        <TouchableHighlight
          style={styles.loginButton}
          onPress={() => this.login_button()}>
          <Text style={styles.loginText}>Login</Text>
        </TouchableHighlight>
        {this.state.showLoader ? (
          <ActivityIndicator color="grey" size="large" />
        ) : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ECF0F1',
  },

  headerText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginTop: -255,
  },
  inputContainer: {
    //borderBottomColor: '#F5FCFF',
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: 'lightgrey',
    width: 250,
    height: 45,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputs: {
    height: 45,
    marginLeft: 16,
    borderBottomColor: '#FFFFFF',
    flex: 1,
  },
  inputIcon: {
    width: 30,
    height: 30,
    marginLeft: 15,
    justifyContent: 'center',
  },
  buttonContainer: {
    height: 45,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 20,
    width: 250,
    borderRadius: 30,
    marginRight: 30,
    marginTop: -20,
  },
  loginButton: {
    backgroundColor: '#003171',
    paddingTop: 5,
    paddingBottom: 10,
    paddingLeft: 35,
    paddingRight: 35,
    borderRadius: 25,
  },
  loginText: {
    color: 'white',
    fontSize: 20,
  },
  // bgImage:{
  //   flex: 1,
  //   position: 'absolute',
  //   width: '100%',
  //   height: '100%',
  //   justifyContent: 'center',
  // },
});
