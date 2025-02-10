
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';  
import colors from '../../styles/colors'; 
import fonts from '../../styles/fonts'; 

const Title = ({ title }) => {
  return (
    <View>
      <Text style={styles.text}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({

  text: {
    fontFamily: fonts.families.bold,
    fontSize: fonts.sizes.regular,
    color: colors.themelight,
  },
});

export default Title;
