import React, { useState, useRef, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Keyboard,
  Pressable,
} from "react-native";
import fonts from "../../../styles/fonts";
import {Header} from "../../../common/header/header";
import images from "../../../styles/images";
import Title from "../../../common/title/title";
import colors from "../../../styles/colors";
import Button from "../../../common/button/button";
import Footer from "../../../common/footer/footer";
import globalStyles from "../../../styles/globalStyles";
import { screenWidth,screenHeight } from "../../utils/util";

const Otp = ({ navigation }) => {
  const [otp1, setOtp1] = useState({
    1: "",
    2: "",
    3: "",
    4: "",
    5: "",
    6: "",
  });
  const [error, setError] = useState(false);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false); 

  const firstInput = useRef();
  const secondInput = useRef();
  const thirdInput = useRef();
  const fourthInput = useRef();
  const fifthInput = useRef();
  const sixthInput = useRef();

  const inputRefs = [
    firstInput,
    secondInput,
    thirdInput,
    fourthInput,
    fifthInput,
    sixthInput,
  ];

  useEffect(() => {
    const showListener = Keyboard.addListener("keyboardDidShow", () => {
      setKeyboardVisible(true);
    });
    const hideListener = Keyboard.addListener("keyboardDidHide", () => {
      setKeyboardVisible(false);
    });

    return () => {
      showListener.remove();
      hideListener.remove();
    };
  }, []);

  const handleOtpChange = (value, index) => {
    const newOtp = { ...otp1, [index]: value };
    setOtp1(newOtp);

    if (value && index < 6) {
      inputRefs[index]?.current?.focus();
    }

    const otpComplete = Object.values(newOtp).every((digit) => digit.length === 1);
  setError(!otpComplete);

   if (otpComplete) {
    Keyboard.dismiss(); 
  }
}


  const handleResendOtp = () => {
    console.log("Resend OTP clicked");
  };

  return (
    <View
      style={styles.keyboardAvoidingView}
      behavior={Platform.OS === "ios" ? "padding" : undefined}>
      <Header title="OTP Verification" icon={images.back} />
      <ScrollView
        contentContainerStyle={styles.scrollViewContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.container}>
          <View style={{ marginTop: 15 }}>
            <Title title="Verify OTP" />
          </View>
          <Text style={[globalStyles.medium, { marginVertical: 10 }]}>
  We’ve sent a 4-digit verification code to +91&nbsp;77777&nbsp;77777&nbsp;
  <Text 
    style={globalStyles.edit} 
    onPress={() => console.log('Edit Number Clicked')}>
    Edit Number
  </Text>
</Text>
          <View style={styles.otpContainer}>
            {[1, 2, 3, 4, 5, 6].map((index) => (
              <TextInput
                key={index}
                style={[
                  styles.otpInput,
                  {
                    borderColor: otp1[index]
                      ? colors.theme
                      : error
                      ? "red"
                      : "#A58D9D",
                  },
                ]}
                value={otp1[index]}
                keyboardType="number-pad"
                maxLength={1}
                ref={inputRefs[index - 1]}
                onChangeText={(value) => handleOtpChange(value, index)}
                onKeyPress={({ nativeEvent }) => {
                  if (nativeEvent.key === "Backspace" && !otp1[index]) {
                    if (index > 1) {
                      inputRefs[index - 2]?.current?.focus();
                    }
                  }
                }}
              />
            ))}
          </View>
          <View style={styles.resendContainer}>
            <Text style={[globalStyles.medium,{color:colors.black}]}>Didn’t receive the code?{" "}</Text>
            <TouchableOpacity onPress={handleResendOtp}>
              <Text style={[globalStyles.medium,{color:colors.purple300,fontFamily:fonts.families.secondary}]}>Resend OTP</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      {!isKeyboardVisible && ( 
        <>
          <View style={styles.footerContainer}>
            <Button
              text="Submit OTP"
              icon={images.arrow}
              onPress={() => navigation.navigate("Register")}
              buttonStyle={{ backgroundColor: colors.purple300 }}
              textStyle={{ fontSize: fonts.sizes.medium }}
              iconStyle={{ tintColor: colors.white }}
            />
          </View>
          <Footer />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  keyboardAvoidingView: {
    flex: 1,
  },
  edit:{
  color:colors.themelight,
  fontFamily:fonts.families.primary,
  fontSize:fonts.sizes
  },
  scrollViewContent: {
    flexGrow: 1,
    paddingBottom: screenHeight * 0.1,
  },
  container: {
    flex: 1,
    paddingHorizontal: screenWidth * 0.05,
  },
  subHeaderText: {
    fontSize : screenWidth > 600 ? fonts.sizes.small : fonts.sizes.small,   
    color: colors.grey,
    fontFamily: fonts.families.primary,
    lineHeight: screenWidth <= 360 ? 12 : screenWidth <= 768 ? 20 : 24, 
    marginVertical: screenHeight * 0.02,
  },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: screenHeight * 0.01,
  },
  otpInput: {
    width: screenWidth * 0.12,
    height: screenWidth * 0.12,
    borderWidth: 1,
    color: "#000",
    fontSize: screenWidth * 0.05,
    borderRadius: screenWidth * 0.02,
    textAlign: "center",
  },
  resendContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: screenHeight * 0.02,
  },
  bottomText: {
    fontSize : screenWidth > 600 ? fonts.sizes.small : fonts.sizes.small,    fontFamily: fonts.families.primary,
    lineHeight: screenWidth <= 360 ? 18 : screenWidth <= 768 ? 20 : screenWidth <= 1024 ? 22 : 24, // Adjust line height accordingly
  },
  resendText: {
    fontSize: screenWidth > 600 ? fonts.sizes.small : fonts.sizes.small,
    fontFamily: fonts.families.secondary,
    color: colors.theme,
    lineHeight: screenWidth <= 360 ? 18 : screenWidth <= 768 ? 20 : screenWidth <= 1024 ? 22 : 24, // Adjust line height accordingly

  },
  footerContainer: {
    position: "absolute",
    bottom: 0,
    width: "80%",
    alignSelf: "flex-end",
    paddingHorizontal: screenWidth * 0.1,
     marginBottom:screenHeight * 0.1
  },
  buttonStyle: {
    backgroundColor: colors.purple300,
    width: "100%",
    paddingVertical: screenHeight * 0.02,
    borderRadius: screenWidth * 0.02,
  },
  buttonText: {
    fontSize: screenWidth * 0.04,
  },
  buttonIcon: {
    tintColor: colors.white,
  },
});

export default Otp;
