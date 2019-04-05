import React from 'react';
import { StyleSheet, Text, View, Button, Vibration } from 'react-native';
import { Constants } from 'expo';

export default class App extends React.Component {
  state = {
    minute: 25,
    second: 1500,
    pomodoro: false,
    stop: false
  };

  componentDidMount() {
    if (this.state.stop === false) {
      this.countdown = setInterval(this.countDownFunction, 1000);
    }
  }

  pauseInterval = () => {
    this.setState(
      prevState => ({ stop: !prevState.stop }),
      () => {
        if (this.state.stop === true) {
          clearInterval(this.countdown);
        } else {
          this.countdown = setInterval(this.countDownFunction, 1000);
        }
      }
    );
  };

  resetTimer = () => {
    this.setState(() => ({
      second: 60 * this.state.minute
    }));
  };

  countDownFunction = () => {
    if (this.state.second > 0) {
      this.setState(prevState => ({
        second: prevState.second - 1
      }));
      if (this.state.second === 0) {
        Vibration.vibrate([2000, 2000, 2000]);
      }
    }
  };

  setPomodoro = () => {
    this.setState(
      prevState => ({ pomodoro: !prevState.pomodoro }),
      () => {
        if (this.state.pomodoro === true) {
          this.setState({ minute: 5, second: 300 });
        } else {
          this.setState({ minute: 25, second: 1500 });
        }
      }
    );
  };

  render() {
    const pause = this.state.stop ? 'START' : 'PAUSE';

    return (
      <View style={styles.container}>
        <Text style={styles.timer}>WORK TIMER</Text>
        <Text style={styles.timer}>{`${Math.floor(
          this.state.second / 60
        )}:${this.state.second % 60}`}</Text>
        <View style={{ flexDirection: 'row' }}>
          <Button title={pause} onPress={this.pauseInterval} />
          <Button title="RESET" onPress={this.resetTimer} />
          <Button title="SWITCH" onPress={this.setPomodoro} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },

  timer: {
    fontSize: 50,
    fontWeight: 'bold'
  }
});
