import React from 'react';
import { View, Text, StyleSheet, ImageBackground, Image, Dimensions } from 'react-native';
import { Svg, Polygon } from 'react-native-svg';
import images from '../../styles/images';
import fonts from '../../styles/fonts';
import colors from '../../styles/colors';
import Entypo from 'react-native-vector-icons/Entypo';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const Status = ({ title }) => {
  return (
    <View style={styles.statusContainer}>
      <Entypo name={'dot-single'} size={screenWidth > 800 ? 44 : 22} color={'#19A232'} style={styles.icon} />
      <Text style={styles.status}>{title}</Text>
    </View>
  );
};
const triangle_height = 100;
const getCardWidth = () => {
  if (screenWidth >= 834) {
    return screenWidth * 0.4;
  } else if (screenWidth > 500) {
    return screenWidth * 0.7;
  } else {
    return screenWidth * 0.9;
  }
};

const small = screenWidth < 360;  
const medium = screenWidth >= 360 && screenWidth < 768; 
const large = screenWidth >= 768; 

const smallIconSize = small ? screenWidth * 0.05 : medium ? screenWidth * 0.035 : screenWidth * 0.023;  
const triangleSize = small ? screenWidth * 0.08 : medium ? screenWidth * 0.045 : screenWidth * 0.03;  
const smallIconSizeh = small ? screenWidth * 0.05 : medium ? screenWidth * 0.045 : screenWidth * 0.023;  


const Card = ({ title, description, imageUri, width }) => {
  return (
    <View style={[styles.card, { width: width || getCardWidth() }]}>
      <ImageBackground source={images.card} style={[styles.image, { width: '100%' }]}>
        <View style={{ paddingHorizontal: 20 }}>
          <Status title="Online" />
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 5 }}>
            <View style={styles.dateContainer}>
              <Text style={styles.dateLarge}>14</Text>
              <Text style={styles.dateSmall}>th</Text>
            </View>
          </View>
          <Text style={[styles.address, { marginTop: -10 }]}>March, Wednesday</Text>

          <View style={styles.content}>
            <View style={styles.textContainer}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={styles.title}>Ankush Gupta</Text>
                <Text style={styles.monthly}>Home Tuition</Text>
              </View>
              <Text style={styles.time}>04:00 pm - 5:00 pm</Text>
              <Text style={[styles.address, { paddingBottom: 10 }]} numberOfLines={2}>
                Tilak Nagar, near community center, near sabji mandi, West Delhi, 247776
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.triangleWrapper}>
        <Svg height={triangle_height} width={triangle_height} viewBox="0 0 100 100">
            <Polygon points="-5,105 105,105 105,-5" fill="transparent" stroke="orange" strokeWidth="5" />
            <Polygon points="0,100 100,100 100,0" fill={colors.light_orange} />
          </Svg>
          <View style={styles.triangleContent}>
            <Image source={images.paise} style={styles.smallIcon} />
            <Image source={images.tick_icon} style={styles.triangleImage} />
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    marginVertical: 10,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2,
    // paddingBottom: 30,
    overflow: 'hidden',
    minHeight: screenHeight * 0.2, // Set card height dynamically (around 30% of screen height)
  },
  image: {
    width: '100%',
    height: screenHeight * 0.17, // Background image height (adjusts dynamically)
    position: 'relative',
  },
  triangleWrapper: {
    position: 'absolute',
    right: 0,
    bottom: -50,
   
  },
  triangleContent: {
    position: 'absolute',
    top: 50,
    right: 7,
    flexDirection: 'row',
    alignItems: 'center',
    
  },
  smallIcon: {
    width: smallIconSize,
    height: smallIconSizeh,
    marginRight: small ? 5 : medium ? 7 : 5,  // Adjust margin based on screen size
  },
  triangleImage: {
    width: triangleSize,
    height: triangleSize,
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: fonts.sizes.semismall,
    fontFamily: fonts.families.bold,
    color: '#333',
  },
  time: {
    fontSize: fonts.sizes.small,
    color: '#666',
    fontFamily: fonts.families.primary,
    marginBottom: 5,
  },
  address: {
    fontSize: fonts.sizes.vsmall,
    color: colors.grey,
    width: '80%',
    fontFamily: fonts.families.primary,
  },
  statusContainer: {
    position: 'absolute',
    top: 12,
    right: -9,
    flexDirection: 'row',
    paddingRight: 20,
    borderColor: colors.green,
    borderStyle: 'dashed',
    borderWidth: 1,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.light_green,
  },
  status: {
    textAlign: 'center',
    fontFamily: fonts.families.secondary,
    color: colors.green,
    fontSize: fonts.sizes.small,
  },
  dateContainer: {
    flexDirection: 'row',
  },
  dateLarge: {
    fontSize: fonts.sizes.extraLarge,
    fontFamily: fonts.families.bold,
    color: colors.grey,
  },
  dateSmall: {
    fontSize: fonts.sizes.small,
    fontFamily: fonts.families.primary,
    color: '#666',
    marginLeft: 2,
    alignSelf: 'flex-start',
  },
  monthly: {
    fontFamily: fonts.families.primary,
    fontSize: fonts.sizes.vsmall,
    textAlign: 'center',
    backgroundColor: colors.member_back,
    color: colors.membership,
    borderColor: colors.membership,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: screenWidth > 800 ? 10 : 5,
    marginHorizontal: screenWidth > 800 ? 40 : 10,
  },
});

export default Card;
