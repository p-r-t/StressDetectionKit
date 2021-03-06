import Component from 'lib/component';
import {
  ACTIVITY_UNITS,
  GREEN,
  HEARTRATE_UNITS,
  HRV_UNITS,
  RED
} from 'lib/constants';
import { inject, observer } from 'mobx-react/native';
import moment from 'moment';
import { Body, Card, CardItem, Left, Right, Text } from 'native-base';
import * as React from 'react';
import { StyleSheet, View } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    marginHorizontal: 5,
    marginTop: -5
  },
  timestamp: {
    fontWeight: 'bold'
  },
  value: {
    fontWeight: 'bold'
  }
});

@inject('store', 'ui')
@observer
class StatsList extends Component<{}, {}> {
  render() {
    const sample = this.ui.currentSample;
    const stressed = sample.state;
    const duration = moment
      .utc(this.ui.currentSegment.duration)
      .format('HH:mm:ss');

    return (
      <View style={styles.container}>
        <Card>
          <CardItem header>
            <Left>
              <Text style={styles.timestamp}>
                {moment(sample.timestamp).format('h:mm:ss MMMM Do')}
              </Text>
            </Left>
            <Right>
              <Text style={{ color: stressed ? RED : GREEN }}>
                {stressed ? 'STRESS' : 'REST'}
              </Text>
            </Right>
          </CardItem>
          <CardItem>
            <Body>
              <Text>Heart rate variability</Text>
              <Text note>RMSSD</Text>
            </Body>
            <Right>
              <Text style={styles.value}>{`${Math.round(
                sample.hrv
              )} ${HRV_UNITS}`}</Text>
            </Right>
          </CardItem>
          <CardItem>
            <Body>
              <Text>Heart rate</Text>
              <Text note>Mean heart rate</Text>
            </Body>
            <Right>
              <Text style={styles.value}>{`${Math.round(
                sample.heartRate
              )} ${HEARTRATE_UNITS}`}</Text>
            </Right>
          </CardItem>
          <CardItem>
            <Body>
              <Text>Activity index</Text>
              <Text note>Activity intensity</Text>
            </Body>
            <Right>
              <Text style={styles.value}>{`${Math.round(
                sample.activity
              )} ${ACTIVITY_UNITS}`}</Text>
            </Right>
          </CardItem>
          <CardItem>
            <Body>
              <Text>Duration</Text>
              <Text note>{`${stressed ? 'Stress' : 'Rest'} duration`}</Text>
            </Body>
            <Right>
              <Text style={styles.value}>{duration}</Text>
            </Right>
          </CardItem>
        </Card>
      </View>
    );
  }
}

export default StatsList;
