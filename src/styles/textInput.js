import React from 'react';
import { View, Text, TextInput, StyleSheet, Dimensions } from 'react-native';
import fonts from '../styles/fonts';
import colors from '../styles/colors';

const { width: screenWidth } = Dimensions.get('window'); // Get the screen width dynamically

const TextBox = ({ heading, placeholder, value, onChangeText, inputStyle, headingStyle }) => {
  return (
    <View style={styles.container}>
      <Text style={[styles.heading, headingStyle]}>{heading}</Text>
      <TextInput
        style={[styles.input, inputStyle]}
        placeholder={placeholder}
        placeholderTextColor={'#7F909F'}
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    width: '100%', 
  },
  heading: {
    fontSize: screenWidth > 600 ? fonts.sizes.small : fonts.sizes.semismall, // Responsive font size
    fontFamily: fonts.families.secondary,
    color: colors.label,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.lightgrey100,
    backgroundColor: colors.lightgrey100,
    borderRadius: 8,
    padding: screenWidth > 600 ? 16 : 12, 
    fontSize: screenWidth > 600 ? fonts.sizes.semismall : fonts.sizes.semismall,
    fontFamily: fonts.families.primary,
    color: colors.text,
  },
});

export default TextBox;
