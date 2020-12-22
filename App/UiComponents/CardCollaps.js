import React, {Component} from 'react';
import {Container, Content, Accordion, View, Text} from 'native-base';
import {StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
// import LinearGradient from 'react-native-linear-gradient';

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

export default class CardCollaps extends Component {
  constructor(props) {
    super(props);
    // console.log('CardCollaps----', props.timesheestData);
    state = {
      dataArray: [],
      // dataForFiltering: [],
      // userId: 1,
      // show: false,
      // showImage: false,
      // status: "All",
      // startDate: null,
      // endDate: null,
    };
  }

  //   this.setState({
  //       dataArray:props.timesheestData
  //   })
  componentDidMount() {
    debugger;
    state = {
        dataArray:  props.timesheestData,
        // dataForFiltering: [],
        // userId: 1,
        // show: false,
        // showImage: false,
        // status: "All",
        // startDate: null,
        // endDate: null,
      };
      console.og()
  }

  getInitialColorState() {
    return {
      color: 'black',
      backgroundColor: '#ffffff',
    };
  }

  _changeColorStyle() {
    // var color = colors[Math.floor(Math.random()*colors.length)];
    // var backgroundColor = backgroundcolors[Math.floor(Math.random()*backgroundcolors.length)];
    this.setState({
      color: '#ffffff',
      backgroundColor: '#1D7985',
    });
  }
  _renderHeader(item, expanded) {
    return (
      // {this.state.dataArray ? (
      <View
        style={[expanded ? styles.cardExpandedStyles : styles.cardClosedStyles]}
        // style={{
        //   flexDirection: 'row',
        //   //   padding: 10,
        //   justifyContent: 'flex-start',
        //   alignItems: 'center',
        //   //   backgroundColor: 'red',
        //   marginLeft: 10,
        //   marginRight: 10,
        //   marginTop: 10,
        //   borderRadius: 5,
        //   elevation: 4, // Android
        //   backgroundColor: '#fff',
        //   shadowColor: 'rgba(0,0,0, .4)', // IOS
        //   shadowOffset: {height: 1, width: 1}, // IOS
        //   shadowOpacity: 1, // IOS
        //   shadowRadius: 1, //IOS
        // }}
      >
        <View style={styles.cardSideLabel}>
          <Text style={styles.cardSideLabelText}>Approved</Text>
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
                {vendorName}
              </Text>
              <View style={{flexDirection: 'row'}}>
                <Text
                  style={[
                    expanded
                      ? styles.cardExpandedTextStyles
                      : styles.cardCloseTextStyles,
                  ]}>
                  {startDate} -  {endDate}
                </Text>
              </View>
            </View>
          </Text>
        </View>
        {expanded ? (
          <View style={{flexDirection: 'column'}}>
            <Icon
              style={[expanded ? styles.iconExpand : styles.iconClose]}
              name="keyboard-arrow-down"
            />
            <Icon
              style={[expanded ? styles.iconExpand : styles.iconClose]}
              name="open-in-new"
            />
          </View>
        ) : (
          <View style={{flexDirection: 'column'}}>
            <Icon
              style={[expanded ? styles.iconExpand : styles.iconClose]}
              name="keyboard-arrow-up"
            />
            <Icon
              style={[expanded ? styles.iconExpand : styles.iconClose]}
              name="open-in-new"
            />
          </View>
        )}
      </View>
      // ): null}
    );
  }
  _renderContent(item) {
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
          <Text style={{fontSize: 16}}>Regular Hours</Text>
          <Text style={{fontSize: 12}}>08:00</Text>
        </View>
        <View style={{}}>
          <Text style={{fontSize: 16}}>OT Hours</Text>
          <Text style={{fontSize: 12}}>02:00</Text>
        </View>
        <View style={{}}>
          <Text style={{fontSize: 16}}>Total Hours</Text>
          <Text style={{fontSize: 12}}>40:00</Text>
        </View>
        <View style={{}}>
          <Text style={{fontSize: 16}}>Employee Remarks</Text>
          <Text style={{fontSize: 12}}>Regular Hours</Text>
        </View>
        <View style={{}}>
          <Text style={{fontSize: 16}}>Submitted Date</Text>
          <Text style={{fontSize: 12}}>12-21-2020</Text>
        </View>
      </View>
    );
  }
  render() {
    return (
      <Container>
        {/* <Header /> */}
        <Content>
          <Accordion
            dataArray={this.props.timesheestData}
            expanded={null}
            headerStyle={{backgroundColor: '#b7daf8', height: 100, margin: 10}}
            contentStyle={{backgroundColor: '#ffffff', height: 100, margin: 10}}
            icon="add"
            expandedIcon="remove"
            iconStyle={{color: 'green'}}
            expandedIconStyle={{color: 'red'}}
            renderHeader={this._renderHeader}
            renderContent={this._renderContent}
          />
        </Content>
      </Container>
    );
  }
}

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
  },
  cardExpandedTextStyles: {
    color: 'white',
  },
  cardCloseTextStyles: {
    color: 'black',
  },
  iconExpand: {
    fontSize: 18,
    paddingLeft: 100,
    color: 'white',
  },
  iconClose: {
    fontSize: 18,
    paddingLeft: 100,
    color: 'black',
  },
  cardSideLabel: {
    alignItems: 'center',
    height: 20,
    width: 60,
    backgroundColor: 'green',
    transform: [{rotate: '90deg'}],
    // textAlign: 'center',
    justifyContent: 'center',
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
