import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { Constants, Location, Permissions } from 'expo';


class MainScreen extends React.Component {
    state = {
        location: null,
        errorMessage: null
    }
    componentWillMount() {
        this._getLocationAsync();
    }
    _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }

    let location = Location.watchHeadingAsync();
    this.setState({ location });
  };
    render() {
        let text = 'Waiting..';
        if (this.state.errorMessage) {
            text = this.state.errorMessage;
        } else if (this.state.location) {
            text = JSON.stringify(this.state.location);
        }
        return (
            <View style={{ flex: 1, backgroundColor: '#ddd' }}>
                <Text>Hi!</Text>
                <Text>{text}</Text>
                <Image source={require('../assets/images/Gray_compass_rose.png')} />
            </View>
        )
    }
}

export default MainScreen;
