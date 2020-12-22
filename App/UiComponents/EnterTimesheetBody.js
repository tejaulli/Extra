import React from 'react';
import {Col, Row, Grid} from 'react-native-easy-grid';
import {Text, View, Textarea, Input, Button, Item} from 'native-base';

import {StyleSheet, TouchableOpacity} from 'react-native';
import InputFiled from '../UiComponents/InputFiled';
export default function EnterTimesheetBody() {
  return (
    <Grid style={{paddingRight: 7, paddingLeft: 7}}>
      <Row style={{paddingBottom: 7, paddingTop: 7}}>
        <Col style={styles.cardHeader}>
          <Text style={styles.cardHeaderText}>{'Date'}</Text>
        </Col>
        <Col
          style={styles.cardHeader}
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={styles.cardHeaderText}>{'Regular Hours'}</Text>
        </Col>
        <Col
          style={styles.cardHeader}
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={styles.cardHeaderText}>{'OT Hours'}</Text>
        </Col>
        <Col
          style={styles.cardHeader}
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={styles.cardHeaderText}>{'Total Hours'}</Text>
        </Col>
        <Col
          style={styles.cardHeader}
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={styles.cardHeaderText}>{'Description'}</Text>
        </Col>
      </Row>

      <Row style={{paddingBottom: 7, paddingTop: 7}}>
        <Col style={styles.cardHeader}>
          <View
            style={{
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={styles.cardHeaderText}>{'21-03-2020'}</Text>
            <Text style={styles.cardHeaderText}>{'Friday'}</Text>
          </View>
        </Col>
        <Col
          style={styles.cardHeader}
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          {/* <Text style={styles.cardHeaderText}>{'08:00'}</Text> */}
          <InputFiled />
        </Col>
        <Col
          style={styles.cardHeader}
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          {/* <Text style={styles.cardHeaderText}>{'02:00'}</Text> */}
          <InputFiled />
        </Col>
        <Col
          style={styles.cardHeader}
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          {/* <Text style={styles.cardHeaderText}>{'11:00'}</Text> */}
          {/* <InputFiled /> */}
          <Text style={styles.cardHeaderText}>{'11:00'}</Text>
        </Col>
        <Col
          style={styles.cardHeader}
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Item regular style={{width: 70, height: 20}}>
            <Input style={{fontSize: 12}} />
          </Item>
        </Col>
      </Row>

      <Row style={{paddingBottom: 7, paddingTop: 7}}>
        <Col style={styles.cardHeader}>
          <View
            style={{
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={styles.cardHeaderText}>{'21-03-2020'}</Text>
            <Text style={styles.cardHeaderText}>{'Friday'}</Text>
          </View>
        </Col>
        <Col
          style={styles.cardHeader}
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          {/* <Text style={styles.cardHeaderText}>{'08:00'}</Text> */}
          <InputFiled />
        </Col>
        <Col
          style={styles.cardHeader}
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          {/* <Text style={styles.cardHeaderText}>{'02:00'}</Text> */}
          <InputFiled />
        </Col>
        <Col
          style={styles.cardHeader}
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          {/* <Text style={styles.cardHeaderText}>{'11:00'}</Text> */}
          {/* <InputFiled /> */}
          <Text style={styles.cardHeaderText}>{'11:00'}</Text>
        </Col>
        <Col
          style={styles.cardHeader}
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Item regular style={{width: 70, height: 20}}>
            <Input style={{fontSize: 12}} />
          </Item>
        </Col>
      </Row>

      <Row style={{paddingBottom: 7, paddingTop: 7}}>
        <Col style={styles.cardHeader}>
          <View
            style={{
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={styles.cardHeaderText}>{'21-03-2020'}</Text>
            <Text style={styles.cardHeaderText}>{'Friday'}</Text>
          </View>
        </Col>
        <Col
          style={styles.cardHeader}
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          {/* <Text style={styles.cardHeaderText}>{'08:00'}</Text> */}
          <InputFiled />
        </Col>
        <Col
          style={styles.cardHeader}
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          {/* <Text style={styles.cardHeaderText}>{'02:00'}</Text> */}
          <InputFiled />
        </Col>
        <Col
          style={styles.cardHeader}
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          {/* <Text style={styles.cardHeaderText}>{'11:00'}</Text> */}
          {/* <InputFiled /> */}
          <Text style={styles.cardHeaderText}>{'11:00'}</Text>
        </Col>
        <Col
          style={styles.cardHeader}
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Item regular style={{width: 70, height: 20}}>
            <Input style={{fontSize: 12}} />
          </Item>
        </Col>
      </Row>

      <Row style={{paddingBottom: 7, paddingTop: 7}}>
        <Col style={styles.cardHeader}>
          <View
            style={{
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={styles.cardHeaderText}>{'21-03-2020'}</Text>
            <Text style={styles.cardHeaderText}>{'Friday'}</Text>
          </View>
        </Col>
        <Col
          style={styles.cardHeader}
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          {/* <Text style={styles.cardHeaderText}>{'08:00'}</Text> */}
          <InputFiled />
        </Col>
        <Col
          style={styles.cardHeader}
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          {/* <Text style={styles.cardHeaderText}>{'02:00'}</Text> */}
          <InputFiled />
        </Col>
        <Col
          style={styles.cardHeader}
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          {/* <Text style={styles.cardHeaderText}>{'11:00'}</Text> */}
          {/* <InputFiled /> */}
          <Text style={styles.cardHeaderText}>{'11:00'}</Text>
        </Col>
        <Col
          style={styles.cardHeader}
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Item regular style={{width: 70, height: 20}}>
            <Input style={{fontSize: 12}} />
          </Item>
        </Col>
      </Row>
      <Row>
        <Col style={{width: '98%', marginTop: 20, marginBottom: 10}}>
          <View style={{flexDirection: 'column', justifyContent: 'flex-start'}}>
            <Text>Remarks :</Text>
            <Textarea rowSpan={2} bordered placeholder="Enter remarks here" />
          </View>
        </Col>
      </Row>
      <Row>
        <Col style={{width: '98%', marginTop: 5, marginBottom: 20}}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'flex-start',
            }}>
            <Text>Attachments :</Text>
            <Button
              light
              style={{
                marginLeft: 10,
                width: 80,
                height: 25,
                borderRadius: 30,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text style={{fontSize: 10,textTransform:'capitalize'}}> Browse </Text>
            </Button>
          </View>
        </Col>
      </Row>
      <Row>
        <Col  style={{flexDirection:'row',justifyContent:'center',alignItems:'center',marginTop:30,marginBottom:20}}>
          <View> 
            <Button
              danger
              style={{
                marginLeft: 10,
                width: 80,
                height: 25,
                borderRadius: 30,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text style={{fontSize: 10}}> Cancel </Text>
            </Button>
          </View>
          <View>
            <Button
              success
              style={{
                marginLeft: 25,
                width: 80,
                height: 25,
                borderRadius: 30,
                alignItems: 'center',
                justifyContent: 'center',
                // backgroundColor:'green'
              }}>
              <Text style={{fontSize: 10}}> Submit </Text>
            </Button>
          </View>
        </Col>
      </Row>
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
    fontSize: 12,
  },
});
