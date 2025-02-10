import React from 'react';
import { TouchableOpacity, Text, Image, StyleSheet, View } from 'react-native';
import fonts from '../../styles/fonts';
import colors from '../../styles/colors';
import { screenWidth } from '../utils/util';

const Button = ({ text, icon, onPress, buttonStyle, textStyle, iconStyle }) => {
  return (
    <TouchableOpacity style={[styles.button, buttonStyle]} onPress={onPress}>
      <View style={styles.content}>
        <Text style={[styles.text, textStyle]}>{text}</Text>
        <Image source={icon} style={[styles.icon, iconStyle]} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 14,
    width:screenWidth * 0.65,
    justifyContent: 'center',
    marginVertical: 10
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  text: {
    color: colors.white, 
    fontSize: 16,
    fontFamily: fonts.families.secondary,
    marginRight: 8, 
    
  },
  icon: {
    width: 15,
    height: 15,
    resizeMode: 'contain',
  },
});

export default Button;
