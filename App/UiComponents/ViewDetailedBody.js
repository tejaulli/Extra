import React, {useState, useEffect} from 'react';
import {Col, Row, Grid} from 'react-native-easy-grid';
import {Text, View} from 'native-base';
import {StyleSheet, TouchableOpacity, Button} from 'react-native';
import TimeSheetServices from '../Services/TimesheetServices';
import moment from 'moment';
export default function ViewDetailedBody(props) {
  // const [tabledata,setTabledata]=useState()
  const [items, setItems] = useState([]);

  useEffect(() => {
    console.log('DDDDDFUNCTION', props.timesheetViewData.timeSheetDetails);
    setItems(props.timesheetViewData.timeSheetDetails);

    //  debugger;

    // TimeSheetServices.get_timesheet("1","6","2020-10-10").then((response) => {

    //   debugger;
    //   console.log('console.log',response)
    //   console.log("VIEWDATA",response.data)
    //     debugger;
    //     if (response.data.responseCode === 200) {
    //       for (
    //         i = 0;
    //         i < response.data.timesheetDetails[1].timeSheetDetails.length;
    //         i++
    //       ) {
    //         response.data.timesheetDetails[1].timeSheetDetails[i].rowHours =
    //           Number(
    //             response.data.timesheetDetails[1].timeSheetDetails[i].regularHours
    //           ) +
    //           Number(
    //             response.data.timesheetDetails[1].timeSheetDetails[i].otHours
    //           );

    //       }
    //      setItems(response.data.timesheetDetails[1].timeSheetDetails);
    //   console.log("VIEWDATA11",response.data.timesheetDetails[1].timeSheetDetails)
    //     } else {
    //       alert("Something went wrong!")
    //     }

    //  })
  }, [props.timesheetViewData.timeSheetDetails]);

  return (
    <Grid>
      <Row style={{paddingBottom: 7, paddingTop: 7}}>
        <Col style={styles.cardHeader}>
          <Text style={[styles.cardHeaderText, {fontWeight: 'bold'}]}>
            {'Date'}
          </Text>
        </Col>
        <Col
          style={styles.cardHeader}
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={[styles.cardHeaderText, {fontWeight: 'bold'}]}>
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
          <Text style={[styles.cardHeaderText, {fontWeight: 'bold'}]}>
            {'Total Hours'}
          </Text>
        </Col>
      </Row>
      {/* <Grid> */}
      {items?.map((item, index) => {
        const timesheet_date = moment(item.timesheetDate).format('MM-DD-YYYY');
        return (
          <Row style={{paddingBottom: 7, paddingTop: 7}} key={item.id}>
            <Col style={styles.cardHeader}>
              <View
                style={{
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text style={styles.cardHeaderText}>{timesheet_date}</Text>
                <Text style={styles.cardHeaderText}>{item.weekDay}</Text>
              </View>
            </Col>
            <Col
              style={styles.cardHeader}
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={styles.cardHeaderText}>
                {item.regularHours ? item.regularHours : 0}:00
              </Text>
            </Col>
            <Col
              style={styles.cardHeader}
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={styles.cardHeaderText}>{item.rowHours}:00</Text>
            </Col>
          </Row>
        );
      })}

      {/*       
      </Grid> */}
      {/* <Row style={{paddingBottom:7,paddingTop:7}}>
        <Col style={styles.cardHeader}>
          <View style={{flexDirection: 'column',justifyContent: 'center',alignItems: 'center',}}>
              <Text style={styles.cardHeaderText}>{'21-03-2020'}</Text>
              <Text style={styles.cardHeaderText}>{'Friday'}</Text>
          </View>
        </Col>
        <Col style={styles.cardHeader} style={{flexDirection: 'row',justifyContent: 'center',alignItems: 'center',}}>
          <Text style={styles.cardHeaderText}>{'08:00'}</Text>
        </Col>
        <Col style={styles.cardHeader} style={{flexDirection: 'row',justifyContent: 'center',alignItems: 'center',}}>
          <Text style={styles.cardHeaderText}>{'02:00'}</Text>
        </Col>
        <Col style={styles.cardHeader} style={{flexDirection: 'row',justifyContent: 'center',alignItems: 'center',}}>
          <Text style={styles.cardHeaderText}>{'11:00'}</Text>
        </Col>
      </Row> */}
      {/* <Row style={{paddingBottom:7,paddingTop:7}}>
        <Col style={styles.cardHeader}>
          <View style={{flexDirection: 'column',justifyContent: 'center',alignItems: 'center',}}>
              <Text style={styles.cardHeaderText}>{'21-03-2020'}</Text>
              <Text style={styles.cardHeaderText}>{'Friday'}</Text>
          </View>
        </Col>
        <Col style={styles.cardHeader} style={{flexDirection: 'row',justifyContent: 'center',alignItems: 'center',}}>
          <Text style={styles.cardHeaderText}>{'08:00'}</Text>
        </Col>
        <Col style={styles.cardHeader} style={{flexDirection: 'row',justifyContent: 'center',alignItems: 'center',}}>
          <Text style={styles.cardHeaderText}>{'02:00'}</Text>
        </Col>
        <Col style={styles.cardHeader} style={{flexDirection: 'row',justifyContent: 'center',alignItems: 'center',}}>
          <Text style={styles.cardHeaderText}>{'11:00'}</Text>
        </Col>
      </Row> */}
      {/* <Row style={{paddingBottom:7,paddingTop:7}}>
        <Col style={styles.cardHeader}>
          <View style={{flexDirection: 'column',justifyContent: 'center',alignItems: 'center',}}>
              <Text style={styles.cardHeaderText}>{'21-03-2020'}</Text>
              <Text style={styles.cardHeaderText}>{'Friday'}</Text>
          </View>
        </Col>
        <Col style={styles.cardHeader} style={{flexDirection: 'row',justifyContent: 'center',alignItems: 'center',}}>
          <Text style={styles.cardHeaderText}>{'08:00'}</Text>
        </Col>
        <Col style={styles.cardHeader} style={{flexDirection: 'row',justifyContent: 'center',alignItems: 'center',}}>
          <Text style={styles.cardHeaderText}>{'02:00'}</Text>
        </Col>
        <Col style={styles.cardHeader} style={{flexDirection: 'row',justifyContent: 'center',alignItems: 'center',}}>
          <Text style={styles.cardHeaderText}>{'11:00'}</Text>
        </Col>
      </Row> */}
      {/* <Row style={{paddingBottom:7,paddingTop:7}}>
        <Col style={styles.cardHeader}>
          <View style={{flexDirection: 'column',justifyContent: 'center',alignItems: 'center',}}>
              <Text style={styles.cardHeaderText}>{'21-03-2020'}</Text>
              <Text style={styles.cardHeaderText}>{'Friday'}</Text>
          </View>
        </Col>
        <Col style={styles.cardHeader} style={{flexDirection: 'row',justifyContent: 'center',alignItems: 'center',}}>
          <Text style={styles.cardHeaderText}>{'08:00'}</Text>
        </Col>
        <Col style={styles.cardHeader} style={{flexDirection: 'row',justifyContent: 'center',alignItems: 'center',}}>
          <Text style={styles.cardHeaderText}>{'02:00'}</Text>
        </Col>
        <Col style={styles.cardHeader} style={{flexDirection: 'row',justifyContent: 'center',alignItems: 'center',}}>
          <Text style={styles.cardHeaderText}>{'11:00'}</Text>
        </Col>
      </Row> */}
    </Grid>
  );
}
const styles = StyleSheet.create({
  cardHeader: {
    // backgroundColor: '#635DB7',
    // flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    // fontSize:12
  },
  cardHeaderText: {
    fontSize: 14,
  },
});
