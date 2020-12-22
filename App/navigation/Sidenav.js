import React from 'react';
import {Text, Button, TouchableOpacity, ScrollView, SafeAreaView, ImageBackground, Image, Dimensions} from 'react-native';
import ViewTimesheets from '../Components/ViewTimesheets';
import EnterTimeSheet from '../Components/EnterTimeSheet';
import ViewDetailedTimeSheet from '../Components/ViewDetailedTimesheet';
import LoginPage from '../Components/LoginPage';

import ChangePassword from '../Components/ChangePassword';
import FileUploader from '../Components/FileUploader';
import Logout from '../Components/Logout';
import {createDrawerNavigator,DrawerItems} from 'react-navigation-drawer';
import {createStackNavigator} from 'react-navigation-stack';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';

const { width, height } = Dimensions.get("window");
const CustomDrawerComponent = props => (
  <SafeAreaView style={{ flex: 1 }}>
    <ImageBackground source={require("../../assests/images/SidebarImage.png")}  style={{width:width-150,height:height}}>
    <ScrollView>
      <DrawerItems {...props} />
    </ScrollView>
    </ImageBackground>
  </SafeAreaView>
);

const SideBarItems = createDrawerNavigator(
  {
    ViewTimesheets: {
      screen: ViewTimesheets,
      navigationOptions: {
        drawerLabel: 'View Timesheets',
		drawerIcon: ({ tintColor }) => (
          <Image
              source={require("../../assests/images/timeSheet.png")}
			  style={{width:14,height:14}}
            />
        )
      },
    },
    EnterTimeSheet: {
      screen: EnterTimeSheet,
      navigationOptions: {
        drawerLabel: 'Enter Timesheets',
		drawerIcon: ({ tintColor }) => (
          <Image
              source={require("../../assests/images/createTimesheet.png")}
			  style={{width:14,height:14}}
            />
        )
      },
    },
    ChangePassword: {
      screen: ChangePassword,
      navigationOptions: {
        drawerLabel: 'Change Password',
		drawerIcon: ({ tintColor }) => (
          <Feather
              name="lock"
			  color={tintColor}
              size={18}
            />
        )
      },
    },
    Logout: {
      screen: Logout,
      navigationOptions: {
        drawerLabel: 'Logout',
		drawerIcon: ({ tintColor }) => (
          <FontAwesome
              name="power-off"
			  color={tintColor}
              size={18}
            />
        )
      },
    },
  },
  {
    defaultNavigationOptions: {
      headerTitleAlign: 'center',
      cardStyle: {opacity: 1},
    },
    initialRouteName: 'ViewTimesheets',
     contentComponent: CustomDrawerComponent,
    drawerPosition: 'left',
    drawerType: 'front',
    drawerWidth: width-150,
    minSwipeDistance: 10,
    drawerLockMode: 'unlocked',
    backBehavior: 'initialRoute',
    detachInactiveScreens: true,
	unmountInactiveRoutes:true,
	contentOptions: {
      activeTintColor: "white",
	  inactiveTintColor :'white',
      activeBackgroundColor :'#1999CE',
    }
  },
);

const SideNav = createStackNavigator(
  {
    init: {
      screen: SideBarItems,
      navigationOptions: ({navigation}) => ({
        title: 'Time Sheets',
        headerTitleAlign: 'center',
        cardStyle: {opacity: 1},
        headerLeft: () => (
          <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
            <MaterialCommunityIcons
              name="menu"
              size={30}
              style={{marginLeft: 10}}
            />
          </TouchableOpacity>
        ),

        headerRight: () => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('EnterTimeSheet', {navFrom: 'default date'})
            }>
            <MaterialCommunityIcons
              name="plus"
              size={30}
              style={{marginRight: 10}}
            />
          </TouchableOpacity>
        ),
      }),
    },
    ViewDetailedTimeSheet: {
      screen: ViewDetailedTimeSheet,
      navigationOptions: {
        title: 'Time Sheets',
        headerTitleAlign: 'center',
      },
    },

    // ViewDetailedTimeSheet: {
    //   screen: ViewDetailedTimeSheet,
    // },
  },
  {initialRouteName: 'init'},
);
export default SideNav;
