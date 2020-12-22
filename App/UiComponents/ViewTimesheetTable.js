import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Alert } from 'react-native';
import { Table, TableWrapper,Col, Cols, Cell } from 'react-native-table-component';
import Calendar from 'react-native-vector-icons/EvilIcons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
export default class ViewTimehseetTable extends Component {
  constructor(props) {
    super(props);
    const elementButton = (value) => (
      <TouchableOpacity onPress={() => this._alertIndex(value)}>
        <View style={styles.btn}>
          <Text style={styles.btnText}>button</Text>
        </View>
      </TouchableOpacity>
    );
 
    this.state = {
      tableTitle: ['Title', 'Title2', 'Title3', 'Title4'],
      tableData: [
        [elementButton('1'), 'a', 'b', 'c', 'd'],
        [elementButton('2'), '1', '2', '3', '4'],
        [elementButton('3'), 'a', 'b', 'c', 'd']
      ]
    }
  }
 
  _alertIndex(value) {
    Alert.alert(`This is column ${value}`);
  }
 
  render() {
    const state = this.state;
    return (
      <View style={{
        flex: 1,
        flexDirection: 'column',
        width:'100%'       
      }}>
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop:10,
        marginBottom:5,
        // padding:10 
      }}>
      <Text style={{
        paddingLeft:25                  
      }}>Date</Text>
      <Text style={{
        paddingLeft:60                  
      }}>Regular Hour</Text>
      <Text style={{
        paddingLeft:20                  
      }}>OT Hour</Text>
      <Text style={{
        paddingLeft:20                  
      }}>Total Hours</Text>
    </View>
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginBottom:5, 
        marginTop:10,                 
      }}>
        <View style={{flexDirection:"column"}}>
          <FontAwesome
            style={{
              fontSize: 12,
              color: '#78b7ff',
              paddingLeft: 10,
              paddingTop: 3,
              // height:30
            }}
            name="circle-thin"
          />                   
        </View>
     <View style={{flexDirection:"column"}}>
        <Text style={{
          paddingLeft:5                 
        }}>{'21-03-2020'}</Text>
        <Text style={{
          paddingLeft:18,fontSize:12,                
        }}>{'Saturday'}</Text>
     </View>
      <Text style={{
        paddingLeft:30                 
      }}>{'08:00'}</Text>
      <Text style={{
        paddingLeft:65                  
      }}>{'04:00'}</Text>
      <Text style={{
        paddingLeft:40                  
      }}>{'12:00'}</Text>
    </View>

    {/* Remove While API integration From Here */}
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginBottom:5, 
        marginTop:10,                 
      }}>
        <FontAwesome
          style={{
            fontSize: 12,
            color: '#78b7ff',
            paddingLeft: 10,
            paddingTop: 3,
          }}
          name="circle"
        />
      <View style={{flexDirection:"column"}}>
        <Text style={{
          paddingLeft:5                 
        }}>{'22-03-2020'}</Text>
        <Text style={{
          paddingLeft:18,fontSize:12,                
        }}>{'Sunday'}</Text>
     </View>
      <Text style={{
        paddingLeft:30                 
      }}>{'08:00'}</Text>
      <Text style={{
        paddingLeft:65                  
      }}>{'04:00'}</Text>
      <Text style={{
        paddingLeft:40                  
      }}>{'12:00'}</Text>
    </View>    
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginBottom:5, 
        marginTop:10,                 
      }}>
        <FontAwesome
          style={{
            fontSize: 12,
            color: '#78b7ff',
            paddingLeft: 10,
            paddingTop: 3,
          }}
          name="circle"
        />
      <View style={{flexDirection:"column"}}>
        <Text style={{
          paddingLeft:5                 
        }}>{'23-03-2020'}</Text>
        <Text style={{
          paddingLeft:18,fontSize:12,                
        }}>{'Monday'}</Text>
     </View>
      <Text style={{
        paddingLeft:30                 
      }}>{'08:00'}</Text>
      <Text style={{
        paddingLeft:65                  
      }}>{'04:00'}</Text>
      <Text style={{
        paddingLeft:40                  
      }}>{'12:00'}</Text>
    </View>    
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginBottom:5, 
        marginTop:10,                 
      }}>
        <FontAwesome
          style={{
            fontSize: 12,
            color: '#78b7ff',
            paddingLeft: 10,
            paddingTop: 3,
          }}
          name="circle"
        />
      <View style={{flexDirection:"column"}}>
        <Text style={{
          paddingLeft:5                 
        }}>{'24-03-2020'}</Text>
        <Text style={{
          paddingLeft:18,fontSize:12,                
        }}>{'Tuesday'}</Text>
     </View>
      <Text style={{
        paddingLeft:30                 
      }}>{'08:00'}</Text>
      <Text style={{
        paddingLeft:65                  
      }}>{'04:00'}</Text>
      <Text style={{
        paddingLeft:40                  
      }}>{'12:00'}</Text>
    </View>    
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginBottom:5, 
        marginTop:10,                 
      }}>
        <FontAwesome
          style={{
            fontSize: 12,
            color: '#78b7ff',
            paddingLeft: 10,
            paddingTop: 3,
          }}
          name="circle"
        />
      <View style={{flexDirection:"column",alignItems:'center'}}>
        <Text style={{
          paddingLeft:5                 
        }}>{'25-03-2020'}</Text>
        <Text style={{
          paddingLeft:18,fontSize:12,                
        }}>{'Wedness Day'}</Text>
     </View>
      <Text style={{
        paddingLeft:30                 
      }}>{'08:00'}</Text>
      <Text style={{
        paddingLeft:65                  
      }}>{'04:00'}</Text>
      <Text style={{
        paddingLeft:40                  
      }}>{'12:00'}</Text>
    </View>    


    {/* Remove While API integration to Here */}      
  </View>
    )
  }
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