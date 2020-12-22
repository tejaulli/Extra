import React, {Component} from 'react';
import LoginDesign from './LoginPageHeader';
import Svg, { Path } from 'react-native-svg';
import {Button} from 'native-base';
import {  StyleSheet,
  TextInput,
  View,
  Linking,
  Image,
  Text,
  TouchableOpacity,
  TouchableHighlight,
  Dimensions,
  AsyncStorage,
  Alert} from 'react-native';
import {Col, Row, Grid} from 'react-native-easy-grid';
import IonIcon from 'react-native-vector-icons/Ionicons';
import EvilIcon from 'react-native-vector-icons/EvilIcons';
import LinearGradient from 'react-native-linear-gradient';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import TimeSheetServices from "../Services/TimesheetServices";


export default class ChangePassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
		current_password:'',
		new_password:'',
		confirm_password:'',
		pswdError:'',
		newError:'',
		confirmError:'',
     
    };
  }
  
  handleSubmit = async() => {
    const login_data = await AsyncStorage.getItem('login_responce_data');
	const parsed_data = JSON.parse(login_data); 
    let email = parsed_data.userDetails.email;
    TimeSheetServices.change_password(
      email,
      this.state.current_password,
      this.state.new_password
    )
      .then((responce) => {
        if (responce.data.responseCode === 200) {
          //alert("Password changed successfully");
          this.props.navigation.navigate("LoginPage");
        } else {
          alert(responce.data.details);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
  
  validate_field(){
	const {current_password, new_password, confirm_password} = this.state;
	if(current_password == ""){
		this.setState(() => ({ pswdError: "Please fill current password"}));
		return false
	}
	else if(new_password == ""){
		this.setState(() => ({ newError: "Please fill new password"}));
		return false
	}
	else if(new_password.length < 8){
		this.setState(() => ({ newError: "New password should contain minimum 8 characters"}));
		return false
	}
	else if(confirm_password == ""){
		this.setState(() => ({ confirmError: "Please fill confirm password"}));
		return false
	}
	else if(new_password !== confirm_password){
		this.setState(() => ({ confirmError: "New password and Confirm password should be same"}));
		return false
	}
	this.setState(() => ({
		pswdError: null,
		newError: null,
		confirmError: null,
	}));
	return true
  }
  
  change_password(){
	if(this.validate_field()){
		this.handleSubmit();
	}
  }
  
  render() {
    return (
      <View style={styles.container}>
      {/* <Image style={styles.bgImage} source={{ uri: "https://lorempixel.com/900/1400/nightlife/8/" }}/> */}
	  <View style={{ height: 170,top:-200, width: Dimensions.get('window').width}}>
	  <Image source={require('../../assests/images/CurveDesign.png')}  style={{}}/>
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
	  
	  <View >
        <Image source={require('../../assests/images/logo.png')}  style={{width:200,height:70,marginTop: -260}}/>
      </View>
   <View style={styles.inputContainer}>
   <MaterialCommunityIcons name="key" size={24} style={{marginLeft:18}} />
     <TextInput style={styles.inputs}
         placeholder="Current Password"
         secureTextEntry={true}
         underlineColorAndroid='transparent'
         value={this.state.current_password}
         onChangeText={(current_password) => this.setState({current_password})}/>
   </View>
   {!!this.state.pswdError && (
	<Text style={{color: 'red',marginTop:-15,marginLeft:-40,marginBottom:5}}>
    {this.state.pswdError}
	</Text>
   )}
   
   <View style={styles.inputContainer}>
   <MaterialCommunityIcons name="key" size={24} style={{marginLeft:18}} />
     <TextInput style={styles.inputs}
         placeholder="New Password"
         secureTextEntry={true}
         underlineColorAndroid='transparent'
         value={this.state.new_password}
         onChangeText={(new_password) => this.setState({new_password})}/>
   </View>
   {!!this.state.newError && (
	<Text style={{color: 'red',marginTop:-15,marginLeft:-20,marginBottom:5}}>
    {this.state.newError}
	</Text>
   )}
   
   <View style={styles.inputContainer}>
   <MaterialCommunityIcons name="key" size={24} style={{marginLeft:18}} />
     <TextInput style={styles.inputs}
         placeholder="Confirm Password"
         secureTextEntry={true}
         underlineColorAndroid='transparent'
         value={this.state.confirm_password}
         onChangeText={(confirm_password) => this.setState({confirm_password})}/>
   </View>
   {!!this.state.confirmError && (
	<Text style={{color: 'red',marginTop:-15,marginLeft:-20,marginBottom:5}}>
    {this.state.confirmError}
	</Text>
   )}
   <View  style={{flexDirection:'row',justifyContent:'center',alignItems:'center',marginTop:10,marginBottom:20}}>
          <View> 
            <Button
              danger
			  onPress={() =>  this.props.navigation.navigate('ViewTimesheets')}
              style={{
                marginLeft: 10,
                width: 95,
                height: 40,
                borderRadius: 30,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text style={{fontSize: 12,textTransform:'capitalize',color:'white',fontSize:16}}> Cancel </Text>
            </Button>
          </View>
          <View>
            <Button
              success
              onPress={() =>  this.change_password()}
              style={{
                marginLeft: 25,
                width: 95,
                height: 40,
                borderRadius: 30,
                alignItems: 'center',
                justifyContent: 'center',
                // backgroundColor:'green'
				
              }}>
              <Text style={{fontSize: 12,textTransform:'capitalize',color:'white',fontSize:16}}> Submit </Text>
            </Button>
          </View>
        </View>
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
    marginTop: -255
  },
  inputContainer: {
      //borderBottomColor: '#F5FCFF',
      backgroundColor: '#FFFFFF',
      borderRadius:30,
      borderBottomWidth: 1,
	  borderTopWidth: 1,
	  borderLeftWidth: 1,
	  borderRightWidth: 1,
	  borderColor:'lightgrey',
      width:250,
      height:45,
      marginBottom:20,
      flexDirection: 'row',
      alignItems:'center',
  },
  inputs:{
      height:45,
      marginLeft:16,
      borderBottomColor: '#FFFFFF',
      flex:1,
  },
  inputIcon:{
    width:30,
    height:30,
    marginLeft:15,
    justifyContent: 'center'
  },
  buttonContainer: {
    height:45,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom:20,
    width:250,
    borderRadius:30,
	marginRight:30,
	marginTop:-20
  },
  loginButton: {
    backgroundColor: "#003171",
	paddingTop:5,
	paddingBottom:10,
	paddingLeft:35,
	paddingRight:35,
	borderRadius:25
  },
  loginText: {
    color: 'white',
	fontSize:20
  },
  // bgImage:{
  //   flex: 1,
  //   position: 'absolute',
  //   width: '100%',
  //   height: '100%',
  //   justifyContent: 'center',
  // },
});