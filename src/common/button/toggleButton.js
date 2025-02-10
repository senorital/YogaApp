import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import fonts from '../../styles/fonts';
import colors from '../../styles/colors';
import { screenWidth } from '../../common/utils/util';


const ToggleSwitch = () => {
  const [isOn, setIsOn] = useState(false);

  const handleToggle = () => {
    setIsOn((prevState) => !prevState);
  };
  const calculateLeftPosition = (switchWidth, circleWidth, offset = 16) => {
    return (switchWidth - circleWidth) / 2 + offset;
  };
  
  const switchWidth = screenWidth <= 375 ? 60 : screenWidth < 768 ? 80 : 90;
  const switchHeight = switchWidth * 0.5;
  const circleSize = switchHeight * 0.8; 
  const circleLeftPosition = isOn
    ? switchWidth - circleSize - calculateLeftPosition(switchWidth, circleSize)
    : calculateLeftPosition(switchWidth, circleSize);
  const statusFontSize = screenWidth <= 375 ? 10 : screenWidth <= 768 ? 12 : 18;
  const statusLeft = isOn ? 12 : circleSize + 8;
  const statusRight = isOn ? circleSize + 8 : 12;


  return (
    <View style={styles.container}>
      <View style={[styles.switchBackground, { width: switchWidth, height: switchHeight }]}>
        {/* Curved layers */}
        <View
          style={[
            styles.layer,
            styles.layer1,
            { backgroundColor: isOn ? '#9B8594' : '#9B8594' }, 

          ]}
        />
        <View
          style={[
            styles.layer,
            styles.layer2,
            { backgroundColor: isOn ? '#9E8797' : '#9E8797' }, 
          ]}
        />
        <View
          style={[
            styles.layer,
            styles.layer3,
            { backgroundColor: isOn ? '#9E8797' : '#9E8797' }, 
          ]}
        />
        <View
          style={[
            styles.layer,
            styles.layer4,
            { backgroundColor: isOn ? '#816077' : '#816077' }, 
          ]}
        />
        <TouchableOpacity
          style={[styles.switch, isOn ? styles.switchOn : styles.switchOff]}
          onPress={handleToggle}
        >
          <View
            style={[
              styles.outerCircle,
              { backgroundColor: isOn ? colors.themelight : colors.themelight },
            ]}
          />
          <View style={[styles.circle,{width : circleSize,height : circleSize}, isOn ? {right : circleLeftPosition} : {right:circleLeftPosition}]} />
        </TouchableOpacity>
        <Text style={[styles.status,{fontSize:statusFontSize}, isOn ? {left : statusLeft} : {right : statusRight}]}>
          {isOn ? 'ON' : 'OFF'}
        </Text> 
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  switchBackground: {
    borderRadius: 30, 
    overflow: 'hidden',
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  layer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: 30,
  },
  layer1: {
    top: 0,
    left: -30,
    width: 140,
    height: 120,
    borderBottomRightRadius: 60,
    borderBottomLeftRadius: 60,
  },
  layer2: {
    top: -10,
    left: 10,
    width: 140,
    height: 120,
    borderTopRightRadius: 60,
    borderTopLeftRadius: 60,
  },
  layer3: {
    top: 0,
    left: 30,
    width: 140,
    height: 120,
    borderBottomRightRadius: 60,
    borderBottomLeftRadius: 60,
  },
  layer4: {
    top: 0,
    left: 50,
    width: 300,
    height: 120,
    right:50,
    borderBottomRightRadius: 60,
    borderBottomLeftRadius: 60,
  },
  switch: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    flexDirection: 'row',
  },
  switchOn: {
    justifyContent: 'flex-start',
  },
  switchOff: {
    justifyContent: 'flex-end',
  },
  outerCircle: {
    width: 100,
    height: 60,
    borderRadius: 30,
    position: 'absolute',
    zIndex: 1,
  },
  circle: {
   
    borderRadius: 100, 
    backgroundColor: '#fff',
    position: 'absolute',
    zIndex: 2,
  },
  // circleOn: {
  //   left: circleLeftPosition,
  // },
  // circleOff: {
  //   right: circleLeftPosition,
  // },
  status: {
    
    fontFamily: fonts.families.primary,
    color: '#fff',
    position: 'absolute',
   
    // left:100
  
  },
  // statusOn: {
  //   left: statusLeft, 
  // },
  // statusOff: {
  //   right: statusRight, 
  // },
});

export default ToggleSwitch;
