import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet,Image, Dimensions, TouchableOpacity, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import fonts from '../styles/fonts';
import colors from '../styles/colors';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Import the icon library
import images from '../styles/images';

const { width: screenWidth } = Dimensions.get('window');

const DatePicker = ({ heading, placeholder, value, onChangeText, inputStyle, headingStyle }) => {
  const [showPicker, setShowPicker] = useState(false);

  const handleDateChange = (event, selectedDate) => {
    setShowPicker(false);
    if (selectedDate) {
      onChangeText(selectedDate.toISOString().split('T')[0]);
    }
  };

  return (
    <View style={styles.container}>
      {heading && <Text style={[styles.heading, headingStyle]}>{heading}</Text>}
      <TouchableOpacity onPress={() => setShowPicker(true)} activeOpacity={0.7}>
        <View style={styles.inputContainer}>
          <TextInput
            style={[styles.input, inputStyle]}
            placeholder={placeholder}
            placeholderTextColor={'#7F909F'}
            value={value}
            editable={false}
            pointerEvents="none" 
          />
          <Image source={images.calendar} style={styles.icon}/>
        </View>
      </TouchableOpacity>

      {showPicker && (
        <DateTimePicker
          value={value ? new Date(value) : new Date()}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'calendar'}
          onChange={handleDateChange}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    width: '100%',
  },
  heading: {
    fontSize: screenWidth > 600 ? fonts.sizes.small : fonts.sizes.semismall,
    fontFamily: fonts.families.secondary,
    color: colors.label,
    marginBottom: 5,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.lightgrey100,
    backgroundColor: colors.lightgrey100,
    borderRadius: 8,
    paddingHorizontal: 12,
    // paddingVertical: screenWidth > 600 ? 16 : 12,
  },
  input: {
    flex: 1,
    fontSize: screenWidth > 600 ? fonts.sizes.semismall : fonts.sizes.semismall,
    fontFamily: fonts.families.primary,
    color: colors.text,
  },
  icon: {
    width:20,
    height:20,
    resizeMode:'contain'
  },
});

export default DatePicker;
