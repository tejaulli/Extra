import React, {Component} from 'react';
import CardCollaps from '../UiComponents/ViewCard';
import TimeSheetServices from '../Services/TimesheetServices';
import {Card, CardItem, Button} from 'native-base';
// import {Dropdown} from 'react-native-material-dropdown';
import {NavigationEvents, SafeAreaView} from 'react-navigation';
import {Container, Content, Accordion, View} from 'native-base';
// import DropDownComp from '../UiComponents/DropDown';
import SelectPicker from '../UiComponents/SelectPicker';
import Dropdown from '../UiComponents/DropDown';
import TestTable from '../UiComponents/TestTable';
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  ScrollView,
  ActivityIndicator,
  AsyncStorage,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Header from '../UiComponents/Header';
export default class ViewTimesheets extends Component {
  constructor(props) {
    super(props);
    this.empDetails = [];
    this.orgId = 1;
    this.userId = 1;
    this.state = {
      employeeData: [],
      dataForFiltering: [],
      userId: 1,
      show: false,
      showImage: false,
      status: 'All',
      startDate: null,
      endDate: null,
      showLoader: false,
      refreshScreen: false,
    };
  }

  // empDetails = [];
  // orgId = 1;
  // userId = 1;

  // state = {
  //   employeeData: [],
  //   dataForFiltering: [],
  //   userId: 1,
  //   show: false,
  //   showImage: false,
  //   status: 'All',
  //   startDate: null,
  //   endDate: null,
  //   showLoader: false,
  //   refreshScreen: false,
  // };
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
    const login_data = await AsyncStorage.getItem('login_responce_data');
    const parsed_data = JSON.parse(login_data);
    this.setState({showLoader: true});
    TimeSheetServices.viewEmployeeTimeSheet(
      parsed_data.userDetails.orgId,
      parsed_data.userDetails.userId,
    ).then((response) => {
      debugger;
      if (response.data['responseCode'] === 200) {
        debugger;

        // empDetails = response.data.viewTimesheetList.map((val) => {
        debugger;
        const timesheestData = response.data.viewTimesheetList;
        timesheestData.isFrom = 'viewTimesheets';
        this.setState({
          employeeData: timesheestData,
          dataForFiltering: response.data.viewTimesheetList,
        });
        empDetails = this.state.employeeData;
        // });
        this.setState({
          showLoader: false,
        });
      } else {
        debugger;
        empDetails = [];
        this.setState({employeeData: []});
      }
      console.log(
        ' TimeSheetServices ---> this.state.employeeData',
        this.state.employeeData,
      );
      console.log(' TimeSheetServices ---> emp details', empDetails);
    });
  }

  filterData = (fromDate, toDate, status) => {
    let filteredData;
    // this.setState({dataForFiltering:this.state.employeeData})
    console.log('swicth', fromDate);
    console.log('swicth', toDate);
    console.log('swicth', status);
    if (
      (status === 'A' || status === 'R' || status === 'S' || status === 'O') &&
      fromDate !== null &&
      toDate !== null
    ) {
      // this.setState({dataForFiltering:this.state.employeeData})
      let data = [...this.state.dataForFiltering];
      filteredData = data.filter((eachTimeSheet) => {
        debugger;
        if (
          Date.parse(eachTimeSheet.startDate) > fromDate &&
          Date.parse(eachTimeSheet.startDate) < toDate &&
          eachTimeSheet.reviewerStatus === status
        ) {
          return eachTimeSheet;
        }
      });
      this.setState({employeeData: filteredData});
    } else if (status === 'All' && fromDate !== null && toDate !== null) {
      let data = [...this.state.dataForFiltering];
      filteredData = data.filter((eachTimeSheet) => {
        debugger;
        if (
          Date.parse(eachTimeSheet.startDate) > fromDate &&
          Date.parse(eachTimeSheet.startDate) < toDate &&
          (eachTimeSheet.reviewerStatus === 'A' ||
            eachTimeSheet.reviewerStatus === 'R' ||
            eachTimeSheet.reviewerStatus === 'S' ||
            eachTimeSheet.reviewerStatus === 'O')
        ) {
          return eachTimeSheet;
        }
      });
      this.setState({employeeData: filteredData});
    } else if (
      (status === 'All' ||
        status === 'A' ||
        status === 'R' ||
        status === 'S' ||
        status === 'O') &&
      fromDate === null &&
      toDate === null
    ) {
      let data = [...this.state.dataForFiltering];
      debugger;
      if (status === 'All') {
        this.setState({employeeData: data});
        return;
      }
      filteredData = data.filter((eachTimeSheet) => {
        debugger;
        if (eachTimeSheet.reviewerStatus === status) {
          return eachTimeSheet;
        }
      });
      this.setState({employeeData: filteredData});
    }
  };
  handleStatusChange = (value) => {
    debugger;
    this.setState({status: value}, function () {
      if (this.state.employeeData) {
        this.filterData(
          this.state.startDate,
          this.state.endDate,
          this.state.status,
        );
      }
    });
  };

  renderText() {
    if (this.state.showLoader) return <View style={{marginTop: 150}} />;
    else
      return (
        <View>
          <CardCollaps
            navigation={this.props.navigation}
            timesheestData={this.state.employeeData}
          />
        </View>
      );
  }
  render() {
    let data = [
      {value: 'All', label: 'All'},
      {value: 'A', label: 'Approved'},
      {value: 'R', label: 'Rejected'},
      {value: 'S', label: 'Submitted'},
      {value: 'O', label: 'Open'},
    ];
    return (
      <SafeAreaView>
        <View>
          <Header />
          <View>
            <Card>
              <CardItem style={{height: 60}}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: -5,
                  }}>
                  <Text>
                    <Dropdown
                      data={data}
                      label="Status"
                      changed={this.handleStatusChange}
                    />{' '}
                        
                  </Text>
                </View>
              </CardItem>
            </Card>
            <View>
              {/*<View style={{marginRight:30,postion:'fixed'}}>
            <Button success style={styles.backButton}>
              <Ionicons
                style={{
                  fontSize: 24,
                  color: '#fff',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                name="add-circle"
              />
            </Button>
          </View> */}
              <ScrollView contentContainerStyle={{flexGrow: 1}}>
                {this.renderText()}
                {this.state.showLoader ? (
                  <ActivityIndicator color="grey" size="large" />
                ) : null}
              </ScrollView>
            </View>

            {/* ):null}  */}
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

ViewTimesheets.navigationOptions = {
  title: ' ViewTimesheets',
  headerLeft: null,
};

const styles = StyleSheet.create({
  backButton: {
    marginTop: 350,
    marginRight: 140,
    alignSelf: 'flex-end',
    width: 40,
    height: 40,
    borderRadius: 400,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    elevation: 8,
  },
});
