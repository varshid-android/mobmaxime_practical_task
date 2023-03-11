import {View, Text} from 'react-native';
import React, {useEffect} from 'react';
import GlobleStyle from '../Constants/GlobleStyle';

const Splash = props => {
  useEffect(() => {
    setTimeout(() => {
      props.navigation.replace('Dashboard');
    }, 2000);
  }, []);

  return (
    <View style={GlobleStyle.splashMain}>
      <Text style={GlobleStyle.Splashtxt}>Varshid practical task</Text>
    </View>
  );
};

export default Splash;
