import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { screenHeight, screenWidth } from '../../common/utils/util';
import images from '../../styles/images';

const Footer = ({  containerStyle }) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <Image source={images.footer} style={[styles.image]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    width: screenWidth,
    alignItems: 'center',
    backgroundColor: 'transparent'
  },
  image: {
    width: screenWidth,
    height: screenHeight * 0.075,
    resizeMode: 'cover',
    backgroundColor: 'transparent' 
  },
});

export default Footer;
