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
        //Ask for location permissions
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    //if not granted supply error message
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }
    //Find heading and then setState
    let location = Location.getHeadingAsync();
    this.setState({ location });
  };
  componentDidMount() {
      //After finding initial heading, watch for changes and set state accordingly
      let location = Location.watchHeadingAsync();
      this.setState({ location });
  }
    render() {
        let text = 'Waiting..';
        if (this.state.errorMessage) {
            text = this.state.errorMessage;
        } else if (this.state.location) {
            text = JSON.stringify(this.state.location);
        }
        return (
            <View style={{ flex: 1, backgroundColor: '#ddd' }}>

                <Image style={compassStyle}source={require('../assets/images/Gray_compass_rose.png')}/>
            </View>
        )
    }
}

const compassStyle = {
    marginLeft: 10,
    transform: [{ rotate: this.state.location}]
 }


export default MainScreen;
