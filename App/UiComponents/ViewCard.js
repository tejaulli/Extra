import React, {Component, useState, useEffect} from 'react';
import {Container, Content, Accordion, View, Text, Button} from 'native-base';
import {StyleSheet, TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import LinearGradient from 'react-native-linear-gradient';
import moment from 'moment';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {withNavigation} from "react-navigation";

// const dataArray = [
//   {title: 'First Element', content: 'Lorem ipsum dolor sit amet'},
//   {title: 'Second Element', content: 'Lorem ipsum dolor sit amet'},
//   {title: 'Third Element', content: 'Lorem ipsum dolor sit amet'},
//   {title: 'First Element', content: 'Lorem ipsum dolor sit amet'},
//   {title: 'Second Element', content: 'Lorem ipsum dolor sit amet'},
//   {title: 'Third Element', content: 'Lorem ipsum dolor sit amet'},
//   {title: 'Third Element', content: 'Lorem ipsum dolor sit amet'},
//   {title: 'First Element', content: 'Lorem ipsum dolor sit amet'},
//   {title: 'Second Element', content: 'Lorem ipsum dolor sit amet'},
//   {title: 'Third Element', content: 'Lorem ipsum dolor sit amet'},
// ];

var colors = ['#ddd', '#efefef', 'red', '#666', 'rgba(0,0,0,.1)', '#ededed'];
var backgroundcolors = ['green', 'black', 'orange', 'blue', 'purple', 'pink'];

const CardCollaps = (props) => {
  const [timeSheetData, setTimeSheetData] = useState(props.timesheestData);
  console.log(
    'CardCollaps = (props) => props.timesheestData',
    props.timesheestData,
  );

  useEffect(() => {
    setTimeSheetData(props.timesheestData);
  }, [props.timesheestData]);

  const getHeadertyle = (expanded) => {
    if (expanded) {
      return ['#1F3F65', '#1D798598']
      
    } else {
      return ['#fff', '#fff', '#fff']     
  
    }
  };
  const getStatuLabelstyle = (reviewerStatus) => {
    return {
      alignItems: 'center',
      height: 20,
      width: 60,
      // backgroundColor: 'green',
      transform: [{rotate: '90deg'}],
      // textAlign: 'center',
      justifyContent: 'center',
      backgroundColor:getStatustyle(reviewerStatus),
    }   
  };
  const getStatustyle = (reviewerStatus) => {
    if ( reviewerStatus === 'A') {
      return '#02C54B'
      
    } else if( reviewerStatus === 'R'){
     return  '#990000'
  
    }
     else if( reviewerStatus === 'O'){
     return  '#014ED0'   
  
    }
     else if(reviewerStatus === 'S'){
     return '#FF5733'   
  
    }   
  };
 

  const _renderHeader = (item, expanded) => {
    const start_date = moment(item.startDate).format('MM-DD-YYYY');
	const end_date = moment(item.endDate).format('MM-DD-YYYY');
    return (
      <LinearGradient
        // colors={expanded ?['#4c669f', '#3b5998', '#192f6a'] : ['#fff', '#fff', '#fff']}
        colors={getHeadertyle(expanded)}
        style={[
          expanded ? styles.cardExpandedStyles : styles.cardClosedStyles,
        ]}>
        <View
         style={[styles.cardSideLabel ,{ backgroundColor: getStatustyle(item.reviewerStatus)}]}          
        >
          <Text style={styles.cardSideLabelText}>
            {item.reviewerStatus === 'A'
              ? 'Approved'
              : item.reviewerStatus === 'R'
              ? 'Rejected'
              : item.reviewerStatus === 'O'
              ? 'Open'
              : 'Submitted'}
          </Text>
        </View>
        <View>
          <Text style={{fontWeight: '600', padding: 10}}>
            <View>
              <Text
                style={[
                  expanded
                    ? styles.cardExpandedTextStyles
                    : styles.cardCloseTextStyles,
                ]}>
                {item.vendorName}
              </Text>
              <View style={{flexDirection: 'row'}}>
                <Text
                  style={[
                    expanded
                      ? styles.cardExpandedTextStyles
                      : styles.cardCloseTextStyles,
                  ]}>
                  {start_date} - {end_date}
                </Text>
              </View>
            </View>
          </Text>
        </View>
        <View>
          {expanded ? (
            <View style={{flexDirection:'column-reverse', justifyContent: 'center'}}>              
              {/* <View >
                <Icon
                  style={[expanded ? styles.iconExpand : styles.iconClose]}
                  name="keyboard-arrow-down"
                />
              </View> */}
              <View style={{marginLeft:20}}>
                <Fontisto
                  style={[expanded ? styles.iconExpand : styles.iconClose]}
                  name="angle-down"
                />
              </View>
            </View>
          ) : (
            <View style={{flexDirection:'column-reverse', justifyContent: 'center'}}>
              <View style={{marginLeft:20}}>
                <Fontisto
                  style={[expanded ? styles.iconExpand : styles.iconClose]}
                  name="angle-right"
				 
                />
              </View>
              {/* <View >
                <Icon
                  style={[expanded ? styles.iconExpand : styles.iconClose]}
                  name="keyboard-arrow-up"
                />
             </View> */}
            </View>
          )}
        </View>
      </LinearGradient>
    );
  };
  const _renderContent = (item) => {
      const submitted_date = moment(item.submittedDate).format('MM-DD-YYYY');
    return (
      <View
        //   style={[expanded ? styles.cardExpandedStyles : styles.cardClosedStyles]}
        style={{
          // flex: 2,
          flexDirection: 'row',
          backgroundColor: '#fff',
          padding: 10,
          //   fontStyle: 'italic',
          marginLeft: 10,
          borderColor: '1 solid black',
          marginRight: 10,
		  marginBottom:5,
          justifyContent: 'space-between',
          height: 130,
          flexWrap: 'wrap',
          padding: 15,
          //   borderRadius: 5,
          elevation: 5, // Android,
          //   borderColor: 'white',
          //   alignItems: 'stretch',
        }}>
        <View style={{}}>
          <Text style={{fontSize: 16,fontWeight:'bold',marginRight:20}}>Regular Hours</Text>
          <Text style={{fontSize: 12}}>{item.regularHours}:00</Text>
        </View>
        <View style={{}}>
          <Text style={{fontSize: 16,fontWeight:'bold'}}>Total Hours</Text>
          <Text style={{fontSize: 12,textAlign:'right'}}>{item.totalWeekhours}:00</Text>
        </View>
        <View style={{}}>
          <Text style={{fontSize: 16,fontWeight:'bold'}}>Employee Remarks</Text>
          <Text style={{fontSize: 12}}>{item.remark}</Text>
        </View>
        <View style={{flexDirection:'column'}}>
          <Text style={{fontSize: 16,fontWeight:'bold'}}>Submitted Date</Text>
          <Text style={{fontSize: 12,textAlign:'right'}}>{submitted_date}</Text>
        
		<TouchableOpacity onPress={() =>  {if (item.reviewerStatus === 'A' || item.reviewerStatus === 'S') {
                props.navigation.navigate('ViewDetailedTimeSheet', {
                  inputDate: item.startDate,
                });
              } else {
                props.navigation.navigate('EnterTimeSheet', {
                  inputDate: item.startDate,
                  navFrom: 'viewTimeSheets',
                });
              }}} style={{marginLeft:23,marginTop:15,width:90,height:22}}>
			  <Text style={{color:'grey',marginLeft:45,marginBottom:3,fontSize:12,textTransform:'capitalize'}}>Open</Text>
              <MaterialCommunityIcons name="open-in-new" size={16} color='grey' style={{marginTop:-18,marginLeft:75}} />
            </TouchableOpacity>
		</View>
      </View>
    );
  };
  //   render() {
  return (
    <Container>
      {/* <Header /> */}
      <Content>
        <Accordion
          dataArray={timeSheetData}
          expanded={null}
          headerStyle={{backgroundColor: '#b7daf8', height: 100, margin: 10}}
          contentStyle={{backgroundColor: '#ffffff', height: 100, margin: 10}}
          icon="add"
          expandedIcon="remove"
          iconStyle={{color: 'green'}}
          expandedIconStyle={{color: 'red'}}
          renderHeader={_renderHeader}
          renderContent={_renderContent}
        />
		<Text style={{height:150}}></Text>
      </Content>
    </Container>
  );
};
// }

const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   justifyContent: 'center',
  //   // paddingHorizontal: 10,
  // },
  // linearGradient: {
  //   marginLeft:5,
  //   marginRight:5,
  //   marginTop:10
  // },
  // linearGradientHeader: {
  //   // flex: 1,
  //   paddingTop:20,
  //   paddingLeft:20,
  //   height: 20,
  //   borderRadius: 5,
  // },

  cardClosedStyles: {
    flexDirection: 'row',
    //   padding: 10,
    justifyContent: 'flex-start',
    alignItems: 'center',
    //   backgroundColor: 'red',
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
    borderRadius: 5,
    elevation: 4, // Android
    backgroundColor: '#fff',
    shadowColor: 'rgba(0,0,0, .4)', // IOS
    shadowOffset: {height: 1, width: 1}, // IOS
    shadowOpacity: 1, // IOS
    shadowRadius: 1, //IOS
	marginBottom:5
  },
  cardExpandedStyles: {
    flexDirection: 'row',
    //   padding: 10,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#1F3F65',
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
    borderRadius: 5,
    elevation: 4, // Android
    // backgroundColor: '#fff',
    shadowColor: 'rgba(0,0,0, .4)', // IOS
    shadowOffset: {height: 1, width: 1}, // IOS
    shadowOpacity: 1, // IOS
    shadowRadius: 1, //IOS
    color: 'white',
	//marginBottom:10
  },
  cardExpandedTextStyles: {
    color: 'white',
  },
  cardCloseTextStyles: {
    color: 'black',
  },
  iconExpand: {
    fontSize: 14,
    paddingLeft: 80,
    color: 'white',
  },
  iconClose: {
    fontSize: 14,
    paddingLeft: 80,
    color: 'black',
  },
  cardSideLabel: {
    alignItems: 'center',
    height: 20,
    width: 62,
    backgroundColor: 'green',
    transform: [{rotate: '90deg'}],
    // textAlign: 'center',
    justifyContent: 'center',
	marginLeft:-21,
	borderBottomLeftRadius:5,
	borderBottomRightRadius:5
  },
  cardSideLabelText: {
    fontSize: 10,
    color: '#fff',
    // paddingLeft:6
  },
  // card: {
  //   alignItems: 'center',
  //   backgroundColor: 'red',
  //   height: 50,
  //   // padding: 10,
  //   flexDirection: 'row',
  //   borderRadius: 3,
  //   shadowColor: 'rgba(0,0,0, .4)', // IOS
  //   shadowOffset: {height: 1, width: 1}, // IOS
  //   shadowOpacity: 1, // IOS
  //   shadowRadius: 1, //IOS
  //   backgroundColor: '#fff',
  //   elevation: 3, // Android
  // },
});

export default CardCollaps;
