import React, {Component} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {
  Table,
  TableWrapper,
  Row,
  Rows,
  Col,
  Cols,
  Cell,
} from 'react-native-table-component';
import InputNumber from 'rc-input-number';
import NumericInput from 'react-native-numeric-input';
export default class TableComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tableHead: ['Date', 'Regular Hour', 'OT Hour', 'Total Hours'],
      tableData: [
        ['12-07-2020', '08:00', '03:00', '11:00'],
        // ['12-07-2020', '08:00', '03:00', '11:00'],
        // ['12-07-2020', '08:00', '03:00', '11:00'],
        // ['12-07-2020', '08:00', '03:00', '11:00'],
      ],
      tableTitle: ['Title', 'Title2', 'Title3', 'Title4'],
    };
  }

  render() {
    const state = this.state;
    return (
      <View style={styles.container}>
        <Table borderStyle={{borderWidth: 2, borderColor: 'transparent'}}>
          <Row
            data={state.tableHead}
            style={styles.head}
            textStyle={styles.textHeader}
          />
          {/* <Rows data={state.tableData} textStyle={styles.text} /> */}
          <TableWrapper style={{width: 80}}>
          <TableWrapper style={{flexDirection: 'row'}}>
          <Col data={['H1', 'H2']} style={styles.head} heightArr={[40, 40]} textStyle={styles.text} />
              <Col data={state.tableTitle} style={styles.title} heightArr={[20,20,20,20]} textStyle={styles.titleText}></Col>
          </TableWrapper>
          </TableWrapper>
        </Table>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {flex: 1, paddingTop: 0, backgroundColor: '#fff'},
  head: {height: 40, backgroundColor: '#f1f8ff', padding: 3},
  textHeader: {margin: 6, fontWeight: 'bold', paddingLeft: 3},
  text: {margin: 6, paddingLeft: 6},
});
