import React,{ useState,useEffect }  from 'react';
import {StyleSheet, TouchableOpacity, Image, AsyncStorage} from 'react-native';
import {View, Text} from 'native-base';
import LinearGradient from 'react-native-linear-gradient';
import {Content, Thumbnail} from 'native-base';
import TopHeader from '../../assests/images/GradientHeader';
export default function Header() {
  const uri = '../../assests/images/nodata.jpg';
  const [state, setState] = useState({
    name: ""
  });
  
  const getName = async() => {
    debugger;
    const login_data = await AsyncStorage.getItem('login_responce_data');
	const parsed_data = JSON.parse(login_data);
	setState(prevValue => {
      return { name: parsed_data.userDetails.firstName };
    });
    	
  }
  
  useEffect(() => {
    //Get name here 
	getName();

  }, [state.name]);
  
  return (
    // <LinearGradient
    //   colors={['#1f4367', '#1e7483']}
    //   style={styles.linearGradient}>
    //   <View style={styles.header}>
    //     <Text  style={styles.headerText}>View Timesheets</Text>
    //     <View style={{height: 150}}>{/* <Text>Hai</Text> */}</View>
    //     <View style={{
    //           flexDirection: 'row',
    //           justifyContent: 'center',
    //           alignItems: 'center',
    //         //   margin:20
    //         }}>
    //       <Thumbnail large source={{uri: uri}} style={{position:'absolute',margin:-20}}/>
    //     </View>
    //   </View>
    // </LinearGradient>
    <View>
      
      <View style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            //   margin:20
            }}>
          {/*<Thumbnail large source={{uri: uri}} style={{position:'absolute',margin:-20}}/>
		  <Image source={require('../../assests/images/profile.png')}  style={{width:60,height:60,marginTop:-22,marginLeft:-10}}/>*/}
        </View>
  
    </View>
  );
}

const styles = StyleSheet.create({
  headerText: {
    // flex: 1,
    // backgroundColor:"red",
    // height:'500',
    fontSize: 24,
    color: 'white',
    paddingTop: 20,
  },
  header: {
    // flex: 1,
    // backgroundColor:"red",
    // height:'500',
    fontSize: 18,
  },
  linearGradient: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    // borderRadius: 5
  },
  userName: {
    fontSize: 20,   
    marginTop:25,
	color:'#1F3F65',
	textTransform:'capitalize'
  },
});
