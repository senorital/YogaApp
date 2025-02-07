import React from "react";
import { useNavigation } from "@react-navigation/native";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ImageBackground,
  StatusBar,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import images from "../styles/images";
import colors from "../styles/colors";
import fonts from "../styles/fonts";
import globalStyles from "../styles/globalStyles";
import { screenWidth } from "../utils/util";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const Header = ({ title, icon, onRightIconPress, rightIcon }) => {
  const navigation = useNavigation();

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <StatusBar
        translucent={true}
        backgroundColor="transparent" 
        barStyle="light-content" 
      />

        <LinearGradient
          colors={[colors.themelight, colors.theme]}
          style={styles.linearGradient}>
     <ImageBackground
        source={images.header}
        style={globalStyles.imageBackground}
        resizeMode="cover"
      />
         
          <View style={styles.header}>
             <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
              <Image source={icon} style={styles.back} />
            </TouchableOpacity>
  
           
              <Text style={styles.title}>{title}</Text>
            

           
            {rightIcon && (
              <TouchableOpacity
                onPress={onRightIconPress}
                style={styles.rightIconContainer}
              >
                <Image source={rightIcon} style={styles.rightIcon} />
              </TouchableOpacity>
            )}
          </View>
        </LinearGradient>
      
    </View>
  );
};

const CustomHeader = ({ title,icon,subText, onLeftPress, rightIcon }) => {
  const navigation = useNavigation(); 

  return (
    <View style={styles.container}>
      <StatusBar
        translucent={true}
        backgroundColor="transparent"
        barStyle="light-content"
      />
      <LinearGradient
        colors={[colors.theme, colors.themelight]}
        style={styles.linearGradient}
      >
          <ImageBackground
        source={images.header}
        style={globalStyles.imageBackground}
        resizeMode="cover"
      />
        <View style={styles.CustomHeader}>
          {icon && (
            <TouchableOpacity onPress={onLeftPress}>
              <Image source={icon} style={styles.back} />
            </TouchableOpacity>
          )}
           <View style={{flex:1}}>
              <Text style={[styles.title,{textAlign:'left'}]}>{title}</Text>
              <View style={{flexDirection:'row',alignItems: 'center'}}>
              <MaterialIcons 
  name="gps-fixed" 
  size={screenWidth < 360 ? screenWidth * 0.05 : screenWidth * 0.03} 
  color={colors.white}
/>
     {subText && <Text style={styles.subtitle}>{subText}</Text>}
              </View>
            </View>

           
            {rightIcon && (
              <TouchableOpacity
              onPress={() => navigation.navigate('ProfileList')}
                style={styles.rightIconContainer}
              >
                <Image source={rightIcon} style={styles.rightIcon} />
              </TouchableOpacity>
            )}
          </View>
      </LinearGradient>
    </View>
  );
};

export { Header, CustomHeader };

const styles = StyleSheet.create({
    container: {
        width: "100%",
      
      },
      backButton: {
        position: "absolute",
        left: 20, 
      },
      linearGradient: {
        borderBottomLeftRadius: 25,
        borderBottomRightRadius: 25,
        overflow: "hidden",
      
      },
      header: {
        flexDirection: "row",
        alignItems: "center", 
        justifyContent: "center", 
        paddingHorizontal: 20,

        paddingVertical: 20,
        marginTop: StatusBar.currentHeight || 50,
      },
      CustomHeader : {
        flexDirection: "row",
        justifyContent: "space-between", 
        paddingHorizontal: 20,
        marginVertical: 10,
        paddingTop:20,
        marginTop: StatusBar.currentHeight || 50, 
      },
      back: {
        width: screenWidth < 700 ? 25: screenWidth >768 ? 50 : 35,
        height: screenWidth < 700 ? 25: screenWidth >768 ? 50 : 35,
      },
      subtitle: {
        fontSize: fonts.sizes.semismall,
        fontFamily: fonts.families.primary,
        color: colors.white,
        textAlign: "left",
        marginLeft:5
      },
      title: {
        fontSize: fonts.sizes.large,
        fontFamily: fonts.families.secondary,
        color: colors.white,
        textAlign: "center", 
      },
      rightIconContainer: {
        
      },
      rightIcon: {
        width: screenWidth < 360 ? screenWidth * 0.12 : screenWidth * 0.15, // Adjust width based on screenWidth
        height: screenWidth < 360 ? screenWidth * 0.12 : screenWidth * 0.15, // Adjust height based on screenWidth
      },
});
