import React, { useRef, useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  Dimensions,
  Animated,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from 'react-native';
import images from '../../../styles/images';
import Footer from '../../footer/footer';
import globalStyles from '../../../styles/globalStyles';
import Button from '../../../common/button/button';
import colors from '../../../styles/colors';
import fonts from '../../../styles/fonts';
import Title from '../../../common/title/title';
import LinearGradient from 'react-native-linear-gradient';



const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const Login = ({ navigation }) => {
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');

  const scrollX = useRef(new Animated.Value(0)).current;
  const scrollRef = useRef(null);
  const intervalRef = useRef(null);

  const image = [images.image1, images.image1, images.image1];

  // Listen for keyboard events
  useEffect(() => {
    const keyboardDidShow = () => setKeyboardVisible(true);
    const keyboardDidHide = () => setKeyboardVisible(false);

    const showListener = Keyboard.addListener('keyboardDidShow', keyboardDidShow);
    const hideListener = Keyboard.addListener('keyboardDidHide', keyboardDidHide);

    return () => {
      showListener.remove();
      hideListener.remove();
    };
  }, []);

  // Automatic image slider
  useEffect(() => {
    let currentIndex = 0;

    const startSliding = () => {
      intervalRef.current = setInterval(() => {
        currentIndex = (currentIndex + 1) % image.length;
        if (scrollRef.current) {
          scrollRef.current.scrollTo({
            x: currentIndex * screenWidth,
            animated: true,
          });
        }
      }, 3000);
    };

    startSliding();

    return () => {
      clearInterval(intervalRef.current);
    };
  }, [image.length]);

  // Handle phone number change
  const handlePhoneNumberChange = (text) => {
    const cleanedText = text.replace(/\D/g, ''); // Remove non-numeric characters
    setPhoneNumber(cleanedText);

    // Dismiss keyboard when 10 digits are entered
    if (cleanedText.length === 10) {
      Keyboard.dismiss();
    }
  };

  return (
    <View
      style={globalStyles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <LinearGradient
        colors={[colors.purple400, colors.purple400]}
        style={styles.linearGradient}
      >
        <ImageBackground
          source={images.header}
          style={globalStyles.imageBackground}
          resizeMode="cover"
        />
        <Animated.ScrollView
          ref={scrollRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: false }
          )}
          scrollEventThrottle={16}
        >
          {image.map((img, index) => (
            <Image key={index} source={img} style={styles.image} />
          ))}
        </Animated.ScrollView>
        <View style={styles.dots}>
          {image.map((_, index) => {
            const dotOpacity = scrollX.interpolate({
              inputRange: [
                screenWidth * (index - 1),
                screenWidth * index,
                screenWidth * (index + 1),
              ],
              outputRange: [0.3, 1, 0.3],
              extrapolate: 'clamp',
            });
            return (
              <Animated.View
                key={index}
                style={[styles.dot, { opacity: dotOpacity }]}
              />
            );
          })}
        </View>
      </LinearGradient>

      <View
    style={styles.scrollContainer}
    //     keyboardShouldPersistTaps="handled"  // Ensures that the keyboard persists while tapping the screen
       >
        <View style={styles.lowerHalf}>
          <Title title={'Number'} />
          <Text style={globalStyles.medium}>
            Enter your mobile number to receive OTP
          </Text>
          <View style={styles.inputRow}>
            <TextInput
              style={[styles.input, styles.countryCode]}
              placeholder="+91"
              placeholderTextColor="#A9A9A9"
              editable={false}
            />
            <TextInput
              style={[styles.input, styles.phoneNumber]}
              placeholder="X X X X X X X X X X"
              keyboardType="phone-pad"
              placeholderTextColor="#A9A9A9"
              value={phoneNumber}
              onChangeText={handlePhoneNumberChange}
              maxLength={10}
            />
          </View>
        </View>
        {!isKeyboardVisible && (
          <View style={[globalStyles.button, styles.buttonContainer]}>
            <Button
              text="Get OTP"
              icon={images.arrow}
              onPress={() => navigation.navigate('Otp')}
              buttonStyle={{ backgroundColor: colors.purple300 }}
              textStyle={{ fontSize: fonts.sizes.medium }}
              iconStyle={{ tintColor: colors.white }}
            />
          </View>
        )}
      </View>
      {!isKeyboardVisible && <Footer />}  
    </View>
  );
};

const styles = StyleSheet.create({
  linearGradient: {
    height: '50%',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: screenWidth,
    height: screenHeight * 0.35,
    resizeMode: 'contain',
    marginTop: screenHeight * 0.09,
  },
  dots: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: screenHeight * 0.03,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    height: 5,
    width: 25,
    borderRadius: 2.5,
    backgroundColor: '#FFF',
    marginHorizontal: 5,
  },
  lowerHalf: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
  inputRow: {
    flexDirection: 'row',
    marginVertical: 10,
    alignItems: 'center',
  },
  input: {
    height: screenHeight * 0.065, // Responsive height (approx. 6.5% of screen height)
    borderWidth: 1,
    borderColor: colors.lightgrey100,
    borderRadius: 10,
    paddingHorizontal: screenWidth * 0.025, // Responsive horizontal padding
    paddingVertical: screenHeight * 0.012, // Responsive vertical padding
    color: colors.black,
    fontFamily: fonts.families.primary,
    backgroundColor: colors.lightgrey100,
  },
  countryCode: {
    width: screenWidth * 0.2, // Adjusted width to be responsive
    marginRight: screenWidth * 0.02,
    textAlign: 'center',
  },
  phoneNumber: {
    flex: 1,
  },
  buttonContainer: {
    paddingHorizontal: 20,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'space-between',
  },
});

export default Login;
