import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Platform,
  ToastAndroid,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import fonts from '../../../styles/fonts';
import colors from '../../../styles/colors';
import { screenHeight, screenWidth } from '../../../common/utils/util';
import globalStyles from '../../../styles/globalStyles';
import {Header} from '../../../common/header/header';
import Footer from '../../../common/footer/footer';
import Button from '../../../common/button/button';
import Title from '../../../common/title/title';
import images from '../../../styles/images';
import TextBox from '../../../styles/textInput';

const Register = ({ navigation }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({});
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardVisible(true);
    });
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardVisible(false);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required.';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required.';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; 
  };

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
    setErrors({ ...errors, [field]: '' }); 
  };

  const handleRegister = () => {
    if (validateForm()) {
      ToastAndroid.show('Registration Successful!', ToastAndroid.SHORT);
      navigation.navigate("Role");
    }
  };

  return (
    <View
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <Header title={'Enter Details'} icon={images.back} />
          <ScrollView
            style={{ padding: 20 }}
            keyboardShouldPersistTaps="handled"
          >
            <Title title={'Enter Your Details'} />
            <Text style={globalStyles.small}>
              Just a few details to get started.
            </Text>
            <View style={styles.form}>
              <TextBox
                heading="Name"
                placeholder="Enter your full name"
                value={formData.name}
                onChangeText={(value) => handleInputChange('name', value)}
                error={errors.name}
              />
              {errors.name && (
                <Text style={styles.errorText}>{errors.name}</Text>
              )}

              <TextBox
                heading="Email Address"
                placeholder="example@gmail.com"
                value={formData.email}
                onChangeText={(value) => handleInputChange('email', value)}
                error={errors.email}
              />
              {errors.email && (
                <Text style={styles.errorText}>{errors.email}</Text>
              )}
            </View>
          </ScrollView>
          {!isKeyboardVisible && ( 
            <View style={styles.footerContainer}>
              <Button
                text="Get Started"
                icon={images.arrow}
                onPress={handleRegister}
                buttonStyle={{ backgroundColor: colors.purple300 }}
                textStyle={{ fontSize: fonts.sizes.medium }}
                iconStyle={{ tintColor: colors.white }}
              />
             
            </View>
       

          )}
            {!isKeyboardVisible && (  <Footer />)}
        </View>
       
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  form: {
    width: '100%',
    marginVertical: 10,
  },
  footerContainer: {
    position: "absolute",
    bottom: 0,
    width: "80%",
    alignSelf: "flex-end",
    paddingHorizontal: screenWidth * 0.1,
     marginBottom:screenHeight * 0.1
  },
  
  errorText: {
    fontSize: fonts.sizes.small,
    fontFamily: fonts.families.light,
    color: colors.red,
    marginBottom: 10,
  },
  footerContainer: {
    position: "absolute",
    bottom: 0,
    width: "80%",
    alignSelf: "flex-end",
    paddingHorizontal: screenWidth * 0.1,
     marginBottom:screenHeight * 0.1
  },
});

export default Register;
