import React, {Component} from 'react';
import {
  Container,
 
  Content,
  Card,
  CardItem,
  Text,
  Body,
  Button,
} from 'native-base';
import Calendar from 'react-native-vector-icons/EvilIcons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient';
import {StyleSheet, TouchableOpacity,  View,ActivityIndicator,Image,AsyncStorage,ScrollView} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Table from '../UiComponents/Table';
import ViewTimesheetTable from '../UiComponents/ViewTimesheetTable';
import ViewTimesheetBody from '../UiComponents/ViewDetailedBody';
import InputNumber from 'rc-input-number';
import NumericInput from 'react-native-numeric-input';
import TestTable from '../UiComponents/TestTable'
import TimeSheetServices from '../Services/TimesheetServices'
import globalValues from "../Services/GlobalVariables";
import Header from '../UiComponents/Header';
import moment from 'moment';

const USER_API_BASE_URL = globalValues.FILE_API_BASE_URL;
export default class ViewDetailedTimesheet extends Component {

  empDetails = [];
  orgId = 1;
  userId = 1;

  state = {
    empViewFobject: [],
    empViewSobject: [],
    userId: 1,
    show: false,
    showImage: false,
    status: 'All',
    startDate: null,
    endDate: null,
	showLoader:false,
	attachedImages:[]
  };
  // this.setState({ show: true })
  componentDidMount() {
    debugger;
    this.getTimesheetDetails();
  
  }
  async getTimesheetDetails() {
    debugger;
    let empDetails = [];
    let orgId = 1;
    let userId = this.state.userId;
    // this.setState({ show: true });
	
	
	const inDate = this.props.navigation.getParam('inputDate');
	const login_data = await AsyncStorage.getItem('login_responce_data');
	const parsed_data = JSON.parse(login_data); 
    TimeSheetServices.get_timesheet(parsed_data.userDetails.orgId,parsed_data.userDetails.userId,inDate).then((response) => {
      debugger;
      console.log("eeeeeeee",response.data)
      if (response.data['responseCode'] === 200) {
        debugger;
               for (
            i = 0;
            i < response.data.timesheetDetails[1].timeSheetDetails.length;
            i++
          ) {
            response.data.timesheetDetails[1].timeSheetDetails[i].rowHours =
              Number(
                response.data.timesheetDetails[1].timeSheetDetails[i].regularHours
              ) +
              Number(
                response.data.timesheetDetails[1].timeSheetDetails[i].otHours
              );
       
          }
        empDetails = response.data.timesheetDetails.map((val) => {
          debugger;
          const timesheestData = response.data.timesheetDetails[0];
          const timesheetDetails = response.data.timesheetDetails[1];
          console.log("kkkkkkkkkkkkkkkkkkkk",timesheetDetails)
         // timesheestData.isFrom = 'viewTimesheets';
          this.setState({
            empViewFobject: timesheestData,
            empViewSobject: timesheetDetails,
			attachedImages: response.data.timesheetDetails[1].attachments
          
          });
		  console.log("attachments",this.state.attachedImages)
          return this.state.empViewFobject;
        });
      } else {
        // debugger;
        // empDetails = [];
        // this.setState({empViewFobject: []});
        alert("something went wrong")
      }
     
    }). catch((error) => {
      console.log(error);
    });;
  }
   
  dataPass=()=>{
    return this.state.empViewSobject;
  }
  
  renderText() {
   const start_date = moment(this.state.empViewFobject.startDate).format('MM-DD-YYYY');
   const end_date = moment(this.state.empViewFobject.endDate).format('MM-DD-YYYY');
   if(this.state.empViewSobject == this.state.showLoader)
          return(
          <View style={{marginTop:100}}><ActivityIndicator color = "grey" size = "large"   /></View>
		)
    else
		  return(
          <View><Card style={styles.cardStyle}>
            <LinearGradient
              // header
              colors={['#1F3F65', '#1D7985']}
              style={styles.header}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                  alignItems: 'flex-start',
                }}>
                <View
                  style={{
                    flexDirection: 'column',
                    justifyContent: 'flex-start',
                    alignItems: 'flex-start',
                  }}>
                  <View>
                    <Text style={styles.headerText}>
                      {this.state.empViewFobject.vendorName}
                    </Text>
                  </View>

                  <View
                    style={{
                      fontSize: 18,
                      color: '#fff',
                      flexDirection: 'row',
                    }}>
                    <View>
                      <Calendar
                        style={{
                          fontSize: 18,
                          color: '#fff',
                          paddingLeft: 13,
                          paddingTop: 3.5,
                        }}
                        name="calendar"
                      />
                    </View>
                    <Text style={styles.headerDateText}>
                      {start_date} - {end_date}
                    </Text>
                  </View>
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginRight: 15,
                  // alignSelf:'flex-end'
                }}>
                <View>
                  <EvilIcons
                    style={{
                      fontSize: 18,
                      color: '#fff',
                      paddingLeft: 13,
                      paddingTop: 2,
                    }}
                    name="clock"
                  />
                </View>
                <Text style={styles.headerDateText}>{'Total Hours'} :</Text>
                <Text style={{fontSize: 20, paddingLeft: 8, color: 'white'}}>
                  {this.state.empViewFobject.totalWeekhours}
                </Text>
              </View>
            </LinearGradient>
            {/* <Table /> */}
            <ViewTimesheetBody timesheetViewData={this.state.empViewSobject} />
            {/* <ViewTimesheetTable /> */}
            {/* <TestTable /> */}
            <View >

            </View>
			
		  
			 
			
			
          </Card>
		  <Text style={{marginLeft:10,fontWeight:'bold',marginTop:10}}>Attachments</Text>
		  <Card style={styles.imagecardStyle}>
		  <ScrollView 
		    horizontal={true}
            showsHorizontalScrollIndicator={true}
           >
			{Object.keys(this.state.attachedImages).map((key, index) => {
          return (
			<View style={{marginTop:10,marginBottom:10}}>
				<Image 
					source={{ uri: USER_API_BASE_URL+""+`${this.state.attachedImages[key].attachments}` }}
					style={{width:80,height:60,marginRight:5,marginLeft:10}}
				/>
			</View>
			)
           })}
		   </ScrollView>
		   </Card>
		  </View>
		  
		)  
	}

  render() {
    return (
   
      <Container>
        <Header />
        <Content>
          {this.renderText()}
		  
        </Content>
      </Container>
     
    );
  }
}
const styles = StyleSheet.create({
  cardStyle: {
    borderRadius: 10,
    borderColor: 'black',
  },
  imagecardStyle: {
    borderRadius: 10,
    borderColor: 'black',
    flexWrap:'nowrap',
	flexDirection:'row'
  },
  header: {
    flex: 1,
    height: 50,
    color: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  headerText: {
    fontSize: 18,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    color: '#fff',
    paddingLeft: 15,
    paddingRight: 15,
  },
  headerDateText: {
    fontSize: 14,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    color: '#fff',
  },


});
