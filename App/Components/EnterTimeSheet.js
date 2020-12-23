import React, {useState, useEffect} from 'react';
// import {View, Text} from 'native-base';
import {
  Container,
  Content,
  Card,
  CardItem,
  Text,
  Body,
  View,
  Button,
  Item,
  Input,
  Textarea,
} from 'native-base';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Col, Row, Grid} from 'react-native-easy-grid';
import moment from 'moment';
import {NavigationEvents} from 'react-navigation';
import LinearGradient from 'react-native-linear-gradient';
import {
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  AsyncStorage,
  ActivityIndicator,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Table from '../UiComponents/Table';
import EnterTimesheetBody from '../UiComponents/EnterTimesheetBody';
import InputNumber from 'rc-input-number';
import NumericInput from 'react-native-numeric-input';
import Header from '../UiComponents/Header';
import InputFiled from '../UiComponents/InputFiled';
import TimeSheetServices from '../Services/TimesheetServices';
import DocumentPicker from 'react-native-document-picker';
import {NavigationContainer} from '@react-navigation/native';
import {creatStackNavigator} from 'react-navigation-stack';
export default function EnterTimeSheet({navigation}) {
  const [_totalhours, set_TotalHours] = useState(0);
  const [items, setItems] = useState([]);
  const [fobject, setFobject] = useState([]);
  const [remarks, setRemarks] = useState('');
  const [totalResults, setResults] = useState(0);
  const [loading, setLoading] = useState(false);
  const [resultsArray, setResultsArray] = useState([]);
  const [prevDBattachments, setPrevDBattachments] = useState([]);
  const [refreshScreen, setRefreshScreen] = useState(false);
  const dateFromView = navigation.getParam('inputDate');
  const navFrom = navigation.getParam('navFrom');

  const onPressImagePickr = async (eachObj) => {
    // environments.url
    try {
      const res = await DocumentPicker.pickMultiple({
        type: [DocumentPicker.types.allFiles],
      });
      setResults(res.length);
      setResultsArray((prevState) => [...prevState, res]);
      console.log(resultsArray);

      debugger;
    } catch (err) {
      debugger;
      // if (DocumentPicker.isCancel(err)) {
      //   // User cancelled the picker, exit any dialogs or menus and move on
      // } else {
      //   throw err;
      // }
    }
  };

  const onCapture = (data) => {
    data.name = JSON.stringify(new Date()) + 'Capture';
    data.type = 'image/jpeg';
    setResultsArray((prevState) => [...prevState, data]);
  };

  const loginData = async () => {
    let current_date;
    if (navFrom === 'viewTimeSheets') {
      current_date = moment(dateFromView).format('YYYY-MM-DD');
    } else {
      let date = new Date();
      debugger;
      let Month_prepended_number;
      let Date_prepended_number;

      (date.getMonth() + 1).toString().length === 1
        ? (Month_prepended_number = String(date.getMonth() + 1).padStart(
            2,
            '0',
          ))
        : (Month_prepended_number = date.getMonth() + 1);

      date.getDate().toString().length === 1
        ? (Date_prepended_number = String(date.getDate()).padStart(2, '0'))
        : (Date_prepended_number = date.getDate());

      current_date =
        date.getFullYear() +
        '-' +
        Month_prepended_number +
        '-' +
        Date_prepended_number;
    }
    const login_data = await AsyncStorage.getItem('login_responce_data');
    const parsed_data = JSON.parse(login_data);
    //console.log("organization",parsed_data.userDetails.orgId);
    getTimeSheetData(
      parsed_data.userDetails.orgId,
      parsed_data.userDetails.userId,
      current_date,
    );
  };

  const PastWeeksHandler = async () => {
    setResultsArray([]);
    let startDate = new Date(fobject.startDate);
    startDate = moment(startDate).subtract(1, 'day').format('YYYY-MM-DD');
    const login_data = await AsyncStorage.getItem('login_responce_data');
    const parsed_data = JSON.parse(login_data);
    getTimeSheetData(
      parsed_data.userDetails.orgId,
      parsed_data.userDetails.userId,
      startDate,
    );
  };
  const futureWeeksHandler = async () => {
    setResultsArray([]);
    let endDate = new Date(fobject.endDate);
    endDate = moment(endDate).add(1, 'day').format('YYYY-MM-DD');
    const login_data = await AsyncStorage.getItem('login_responce_data');
    const parsed_data = JSON.parse(login_data);
    getTimeSheetData(
      parsed_data.userDetails.orgId,
      parsed_data.userDetails.userId,
      endDate,
    );
  };

  useEffect(() => {
    //Get timesheet
    loginData();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const rowChangeHandler = (e, inputIndex, name) => {
    let totalHours = 0;
    const dublicateArray = [...items];
    dublicateArray.forEach((each, index) => {
      if (index === inputIndex || inputIndex === 'default') {
        each[name] = e;
        if (name === 'regularHours' || name === 'otHours') {
          each.rowHours = Number(each.regularHours) + Number(each.otHours);
        }
      }
      totalHours = each.rowHours + totalHours;
    });
    setItems(dublicateArray);
    set_TotalHours(totalHours);
  };

  const getTimeSheetData = (orgId, userid, current_date) => {
    TimeSheetServices.get_timesheet(orgId, userid, current_date).then(
      async (result) => {
        if (result.data.responseCode === 200) {
          set_TotalHours(result.data.timesheetDetails[0].totalWeekhours);
          let i;
          for (
            i = 0;
            i < result.data.timesheetDetails[1].timeSheetDetails.length;
            i++
          ) {
            result.data.timesheetDetails[1].timeSheetDetails[i].rowHours =
              Number(
                result.data.timesheetDetails[1].timeSheetDetails[i]
                  .regularHours,
              ) +
              Number(
                result.data.timesheetDetails[1].timeSheetDetails[i].otHours,
              );
          }
          setPrevDBattachments(result.data.timesheetDetails[1].attachments);
          console.log(
            result.data.timesheetDetails[1].attachments,
            'backend attahments',
          );
          await setItems(result.data.timesheetDetails[1].timeSheetDetails);
          //  setAttachmentsArray(attachmentsArray);
          if (
            result.data.timesheetDetails[0].vendorName !== null &&
            result.data.timesheetDetails[0].vendorName !== undefined
          ) {
            result.data.timesheetDetails[0].vendorName = result.data.timesheetDetails[0].vendorName
              .toString()
              .toLowerCase();
          }
          setFobject(result.data.timesheetDetails[0]);
          setRemarks(result.data.timesheetDetails[0].remark);
        } else {
          console.log('Something went wrong!');
        }
      },
    );
  };

  const getTimeSheetDetails = () => {
    let result = [];
    items.forEach((data) => {
      let inputobject = {};
      inputobject.timesheetDate = data.timesheetDate;
      inputobject.regularHours = data.regularHours;
      inputobject.otHours = data.otHours;
      inputobject.description = data.description;
      result.push(inputobject);
    });
    return result;
  };

  const enterTimeSheetService = async () => {
    console.log(
      '.............................................................',
      '\n',
      'starting submission',
      '\n',
      '.............................................................',
    );
    const request = new FormData();
    const login_data = await AsyncStorage.getItem('login_responce_data');
    const parsed_data = JSON.parse(login_data);

    let timesheetData = {
      orgId: parsed_data.userDetails.orgId,
      userId: parsed_data.userDetails.userId,
      startDate: fobject.startDate,
      endDate: fobject.endDate,
      remark: remarks,
      timesheetId: fobject.timesheetId,
      totalWeekhours: _totalhours,
      reviewerStatus: 'S',
      timeSheetDetails: getTimeSheetDetails(),
    };
    request.append('timsheetData', JSON.stringify(timesheetData));
    // resultsArray != null &&
    // resultsArray != undefined &&
    // resultsArray[0]['type']
    if (resultsArray.length) {
      debugger;
      for (let i = 0; i < resultsArray.length; i++) {
        request.append('attachments', resultsArray[i]);
      }
    }
    TimeSheetServices.create_timesheet(request)
      .then((res) => {
        if (res.data.responseCode === 201) {
          Alert.alert(
            'Submitted!',
            'Time Sheet Submitted Successfully',
            [
              {
                text: 'Ok',
              },
            ],
            {cancelable: false},
          );
          {
            /*let obj = [...items];
            obj.forEach((each) => {
              each.regularHours = "";
              each.otHours = "";
              each.description = "";
              each.rowHours = "";
            });
            setItems(obj);*/
          }
          navigation.navigate('ViewTimesheets');
        } else {
          setLoader(false);
          alert(res.data.details);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const remarkChamgedHandler = (e) => {
    let val = e;
    setFobject((prevState) => ({
      ...prevState,
      remark: val,
    }));
    setRemarks(val);
  };
  const totalHourCheck = async () =>
    new Promise((resolve) => {
      if (_totalhours < 40) {
        Alert.alert(
          'Alert!',
          'Total hours should be greater than 40hrs, Are you sure want to continue ?',
          [
            {
              text: 'Cancel',
              onPress: () => {
                resolve(false);
              },
              style: 'cancel',
            },
            {
              text: 'Continue',
              onPress: () => {
                resolve(true);
              },
            },
          ],
          {cancelable: false},
        );
      } else {
        resolve(true);
      }
    });

  const form_validate = async () => {
    if (prevDBattachments.length === 0) {
      // !resultsArray[0]['type']
      if (!resultsArray.length) {
        await Alert.alert('Select atleast one Attachment file');
        return false;
      } else {
        return totalHourCheck().then((res) => res);
      }
    } else if (prevDBattachments.length != 0) {
      return totalHourCheck().then((res) => res);
    }
  };

  const save = async () => {
    const login_data = await AsyncStorage.getItem('login_responce_data');
    const parsed_data = JSON.parse(login_data);
    const request = new FormData();
    let timesheetData = {
      orgId: parsed_data.userDetails.orgId,
      userId: parsed_data.userDetails.userId,
      timesheetId: fobject.timesheetId,
      startDate: fobject.startDate,
      endDate: fobject.endDate,
      remark: remarks,
      reviewerStatus: 'O',
      totalWeekhours: _totalhours,
      timeSheetDetails: getTimeSheetDetails(),
    };
    const regulatHourValidate = timesheetData.timeSheetDetails.find(
      (item) => item.regularHours !== null && item.regularHours !== '',
    );
    const otHoursValidate = timesheetData.timeSheetDetails.find(
      (item) => item.otHours !== null && item.otHours !== '',
    );
    const descriptionValidate = timesheetData.timeSheetDetails.find(
      (item) => item.description !== null && item.description !== '',
    );
    if (regulatHourValidate || otHoursValidate || descriptionValidate) {
      request.append('timsheetData', JSON.stringify(timesheetData));

      // resultsArray != null &&
      // resultsArray != undefined &&
      // resultsArray[0]['type']
      if (resultsArray.length) {
        debugger;
        for (let i = 0; i < resultsArray.length; i++) {
          request.append('attachments', resultsArray[i]);
        }
      }
      TimeSheetServices.create_timesheet(request)
        .then((res) => {
          if (res.data.responseCode === 201) {
            // setLoader(false);
            Alert.alert(
              'Saved!',
              'Time Sheet Saved Successfully',
              [
                {
                  text: 'Ok',
                },
              ],
              {cancelable: false},
            );
            navigation.navigate('ViewTimesheets');
          } else {
            // setLoader(false);
            console.log(res.data.details);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      alert('Enter atleast one day data');
    }
  };

  return (
    <Container>
      <Header />
      <Content>
        {loading ? (
          <ActivityIndicator
            color="grey"
            size="large"
            style={{marginTop: 100}}
          />
        ) : (
          <>
            <Card style={styles.cardStyle}>
              <LinearGradient
                // header
                colors={['#1F3F65', '#1D7985']}
                style={styles.header}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <View style={{backgroundColor: 'transparent', width: 20}}>
                    <Icon
                      onPress={PastWeeksHandler}
                      style={{
                        fontSize: 24,
                        color: '#fff',
                        justifyContent: 'center',
                      }}
                      name="angle-left"
                    />
                  </View>
                  <Text style={styles.headerText}>
                    {moment(fobject.startDate).format('MM-DD-YYYY')} -{' '}
                    {moment(fobject.endDate).format('MM-DD-YYYY')}
                  </Text>
                  <View style={{backgroundColor: 'transparent', width: 20}}>
                    <Icon
                      onPress={futureWeeksHandler}
                      style={{fontSize: 24, color: '#fff'}}
                      name="angle-right"
                    />
                  </View>
                </View>
              </LinearGradient>
              {/* <EnterTimesheetBody /> */}
              <Grid>
                <Row style={{paddingBottom: 7, paddingTop: 7}}>
                  <Col>
                    <Text style={{fontWeight: 'bold', marginLeft: 23}}>
                      {'Date'}
                    </Text>
                  </Col>
                  <Col
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'flex-start',
                      alignItems: 'center',
                    }}>
                    <Text style={{fontWeight: 'bold', marginLeft: -28}}>
                      {'Regular Hours'}
                    </Text>
                  </Col>
                  <Col
                    style={styles.cardHeader}
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text style={{fontWeight: 'bold', marginLeft: -40}}>
                      {'OT Hours'}
                    </Text>
                  </Col>
                </Row>
                {items.map((item, index) => {
                  let str = item.weekDay;

                  let weekDay = str.substring(0, 3);
                  let date = item.timesheetDate;
                  let timesheetDate = date.substring(8, 10);
                  return (
                    <Row style={{paddingBottom: 7}} key={index}>
                      <Col style={styles.cardHeader}>
                        <View
                          style={{
                            flexDirection: 'column',
                            justifyContent: 'flex-start',
                            alignItems: 'flex-start',
                            marginTop: 12,
                          }}>
                          <Text
                            style={[
                              styles.cardHeaderText2,
                              {
                                backgroundColor:
                                  item.weekDay === 'Sunday' ||
                                  item.weekDay === 'Saturday'
                                    ? '#B4B6DB'
                                    : '',
                                borderColor:
                                  item.weekDay === 'Sunday' ||
                                  item.weekDay === 'Saturday'
                                    ? '#B4B6DB'
                                    : '#D8DBDB',
                              },
                            ]}>
                            {timesheetDate}
                          </Text>
                          <Text style={{fontSize: 14, marginLeft: 5}}>
                            {weekDay}
                          </Text>
                        </View>
                      </Col>
                      <Col
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'center',
                          alignItems: 'center',
                          marginLeft: -100,
                        }}>
                        <NumericInput
                          value={
                            item.regularHours === null ? 0 : item.regularHours
                          }
                          id="regularHours"
                          name="regularHours"
                          onChange={(e) =>
                            rowChangeHandler(e, index, 'regularHours')
                          }
                          type="plus-minus"
                          onLimitReached={(isMax, msg) =>
                            console.log(isMax, msg)
                          }
                          totalWidth={110}
                          totalHeight={30}
                          iconSize={25}
                          step={1}
                          valueType="real"
                          rounded
                          textColor="black"
                          iconStyle={{color: 'black', fontSize: 15}}
                          rightButtonBackgroundColor={
                            item.weekDay === 'Sunday' ||
                            item.weekDay === 'Saturday'
                              ? '#B4B6DB'
                              : '#f2f2f2'
                          }
                          leftButtonBackgroundColor={
                            item.weekDay === 'Sunday' ||
                            item.weekDay === 'Saturday'
                              ? '#B4B6DB'
                              : '#f2f2f2'
                          }
                          containerStyle={{
                            backgroundColor:
                              item.weekDay === 'Sunday' ||
                              item.weekDay === 'Saturday'
                                ? '#B4B6DB'
                                : 'white',
                          }}
                        />
                      </Col>
                      <Col
                        style={styles.cardHeader}
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        {/* <Text style={styles.cardHeaderText}>{'02:00'}</Text> */}
                        {/* <InputFiled /> */}
                        <NumericInput
                          value={item.otHours === null ? 0 : item.otHours}
                          //  onChange={value => console.log(value)}
                          onChange={(e) =>
                            rowChangeHandler(e, index, 'otHours')
                          }
                          type="plus-minus"
                          id="otHours"
                          name="otHours"
                          onLimitReached={(isMax, msg) =>
                            console.log(isMax, msg)
                          }
                          totalWidth={110}
                          totalHeight={30}
                          iconSize={25}
                          step={1}
                          valueType="real"
                          rounded
                          textColor="black"
                          iconStyle={{color: 'black', fontSize: 15}}
                          rightButtonBackgroundColor={
                            item.weekDay === 'Sunday' ||
                            item.weekDay === 'Saturday'
                              ? '#B4B6DB'
                              : '#f2f2f2'
                          }
                          leftButtonBackgroundColor={
                            item.weekDay === 'Sunday' ||
                            item.weekDay === 'Saturday'
                              ? '#B4B6DB'
                              : '#f2f2f2'
                          }
                          containerStyle={{
                            backgroundColor:
                              item.weekDay === 'Sunday' ||
                              item.weekDay === 'Saturday'
                                ? '#B4B6DB'
                                : 'white',
                          }}
                        />
                      </Col>
                    </Row>
                  );
                })}

                <Row>
                  <Col style={{width: '98%', marginTop: 20, marginBottom: 10}}>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'flex-start',
                        marginLeft: 10,
                      }}>
                      <Text style={{marginTop: 13}}>Remarks :</Text>
                      <Textarea
                        value={fobject.remark}
                        rowSpan={2}
                        bordered
                        placeholder="Enter remarks here"
                        onChangeText={remarkChamgedHandler}
                        style={{marginLeft: 10, width: 290, borderRadius: 3}}
                      />
                    </View>
                  </Col>
                </Row>
                <Row>
                  <Col style={{width: '98%', marginTop: 5}}>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'flex-start',
                        marginLeft: 10,
                      }}>
                      <Text>Attachments :</Text>
                      <Button
                        light
                        onPress={onPressImagePickr}
                        disabled={
                          fobject.reviewerStatus == 'S' ||
                          fobject.reviewerStatus == 'A'
                        }
                        style={{
                          marginLeft: 10,
                          marginRight: 10,
                          width: 80,
                          height: 30,
                          borderRadius: 30,
                          alignItems: 'center',
                          justifyContent: 'center',
                          marginTop: 2,
                        }}>
                        <Text
                          style={{fontSize: 10, textTransform: 'capitalize'}}>
                          Browse
                        </Text>

                        {/* <TouchableOpacity  style={styles.button}  onPress={onPressImagePickr}>
               <Text style={{color:'white',marginStart:10}}>Browse</Text>
                </TouchableOpacity>
            <Text style={{marginStart:20}}>{totalResults}</Text> */}
                      </Button>

                      <TouchableOpacity
                        style={{
                          width: 44,
                          alignItems: 'center',
                        }}
                        onPress={() =>
                          navigation.navigate('CameraPage', {
                            onCapture: onCapture,
                          })
                        }>
                        <MaterialCommunityIcons
                          name="camera"
                          size={30}
                          style={{color: 'grey'}}
                        />
                      </TouchableOpacity>
                    </View>
                    {/* <Text style={{ marginLeft: 10,}}>Files Count:{totalResults}</Text> */}
                    <ScrollView>
                      {/*Showing the data of selected Multiple files*/}
                      {resultsArray.map((item, key) => (
                        <View key={key}>
                          <Text style={styles.textStyle}>
                            {item.name ? item.name : ''}
                          </Text>
                        </View>
                      ))}
                    </ScrollView>
                  </Col>
                </Row>
                <Row>
                  <Col
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginTop: 10,
                      marginBottom: 20,
                    }}>
                    <View>
                      <Button
                        disabled={
                          fobject.reviewerStatus == 'S' ||
                          fobject.reviewerStatus == 'A'
                        }
                        danger={
                          fobject.reviewerStatus !== 'S' ||
                          fobject.reviewerStatus !== 'A'
                        }
                        light={
                          fobject.reviewerStatus == 'S' ||
                          fobject.reviewerStatus == 'A'
                        }
                        onPress={() => {
                          rowChangeHandler(8, 'default', 'regularHours');
                          rowChangeHandler(0, 0, 'regularHours');
                          rowChangeHandler(0, 1, 'regularHours');
                          rowChangeHandler(0, 'default', 'otHours');
                        }}
                        style={{
                          marginLeft: 10,
                          width: 80,
                          height: 30,
                          borderRadius: 30,
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}>
                        <Text
                          style={{fontSize: 12, textTransform: 'capitalize'}}>
                          Default
                        </Text>
                      </Button>
                    </View>
                    <View>
                      <Button
                        disabled={
                          fobject.reviewerStatus == 'S' ||
                          fobject.reviewerStatus == 'A'
                        }
                        success={
                          fobject.reviewerStatus !== 'S' ||
                          fobject.reviewerStatus !== 'A'
                        }
                        light={
                          fobject.reviewerStatus == 'S' ||
                          fobject.reviewerStatus == 'A'
                        }
                        onPress={save}
                        style={{
                          marginLeft: 25,
                          width: 80,
                          height: 30,
                          borderRadius: 30,
                          alignItems: 'center',
                          justifyContent: 'center',
                          // backgroundColor:'green'
                        }}>
                        <Text
                          style={{fontSize: 12, textTransform: 'capitalize'}}>
                          Save
                        </Text>
                      </Button>
                    </View>
                    <View>
                      <Button
                        disabled={
                          fobject.reviewerStatus == 'S' ||
                          fobject.reviewerStatus == 'A'
                        }
                        success={
                          fobject.reviewerStatus !== 'S' ||
                          fobject.reviewerStatus !== 'A'
                        }
                        light={
                          fobject.reviewerStatus == 'S' ||
                          fobject.reviewerStatus == 'A'
                        }
                        onPress={async () => {
                          const x = await form_validate();
                          x
                            ? enterTimeSheetService()
                            : console.log('unable to submit form');
                        }}
                        style={{
                          marginLeft: 25,
                          width: 80,
                          height: 30,
                          borderRadius: 30,
                          alignItems: 'center',
                          justifyContent: 'center',
                          // backgroundColor:'green'
                        }}>
                        <Text
                          style={{fontSize: 12, textTransform: 'capitalize'}}>
                          Submit
                        </Text>
                      </Button>
                    </View>
                  </Col>
                </Row>
              </Grid>
            </Card>
          </>
        )}
      </Content>
    </Container>
  );
}

const styles = StyleSheet.create({
  cardStyle: {
    borderRadius: 10,
    borderColor: 'black',
    // width:'96%',
  },
  header: {
    flex: 1,
    height: 50,
    color: 'white',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  headerText: {
    color: '#fff',
    paddingLeft: 15,
    paddingRight: 15,
  },
  cardHeader: {
    marginLeft: 20,
  },
  cardHeaderText: {
    fontSize: 14,
  },
  cardHeaderText1: {
    fontSize: 14,
  },
  cardHeaderText2: {
    fontSize: 14,
    borderWidth: 1,
    borderRadius: 20,
    paddingLeft: 9,
    paddingRight: 7,
    paddingTop: 7,
    paddingBottom: 5,
  },
  container: {
    flex: 2,
    width: 60,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
});
