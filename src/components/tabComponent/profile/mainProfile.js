import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image, ImageBackground, StatusBar, Dimensions } from 'react-native';
import { Header } from '../../header/header';
import colors from '../../styles/colors';
import images from '../../styles/images';
import fonts from '../../styles/fonts';
import {screenWidth, screenHeight } from '../../utils/util';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign  from 'react-native-vector-icons/AntDesign';


const scaleFontSize = (size) => (screenWidth / 375) * size; 
const certificationListWidth = () => {
  if (screenWidth < 378) {
    return '60%';  
  } else if (screenWidth >= 378 && screenWidth <= 768) {
    return '60%';  
  } else {
    return '60%';  
  }
};
let avatarSize;

if (screenWidth <= 400) {
  avatarSize = 120; 
} else if (screenWidth <= 600) {
  avatarSize = 130; 
} else {
  avatarSize = 200; 
}
const Profile = () => {
  return (
    <View style={styles.container}>
     
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />

   
      <View style={styles.backgroundWrapper}>
        <ImageBackground source={images.profile_back} style={styles.backgroundImage}>
          {/* Overlay Header */}
          <View style={styles.headerContainer}>
            <Header title={'Profile'} icon={images.back} />
          </View>
        </ImageBackground>
      </View>

      <View style={styles.avatarContainer}>
        <Image source={images.avatar} style={styles.avatar} />
        <TouchableOpacity style={styles.editIcon}>
          <Image source={images.edit} style={styles.image} />
        </TouchableOpacity>
      </View>
     
      <ScrollView>
        <View style={styles.detailsContainer}>
          <Text style={[styles.name]}>John Doe</Text>
          <View style={styles.ratingContainer}>
            {[...Array(5)].map((_, index) => (
              <AntDesign
                key={index}
                name="star"
                size={screenWidth <= 600 ? 15 : 20} 
                color={colors.orange}
                style={styles.star}
              />
            ))}
          </View>
         
          <View style={styles.row}>
            <Text style={[styles.label]}>Bio:</Text>
            <Text style={[styles.value]}>Full-stack developer specializing in React Native.</Text>
          </View>
          <View style={styles.row}>
            <Text style={[styles.label]}>Details:</Text>
            <Text style={[styles.value]}>Passionate about building mobile experiences.</Text>
          </View>
          <View style={styles.row}>
            <Text style={[styles.label]}>Experience:</Text>
            <Text style={[styles.value]}>5 Years</Text>
          </View>
          <View style={styles.row}>
            <Text style={[styles.label]}>Languages:</Text>
            <Text style={[styles.value]}>English, Hindi</Text>
          </View>

         
          <View style={styles.row}>
            <Text style={[styles.label]}>Specialization:</Text>
            <View style={styles.certificationList}>
              <Text style={[styles.certificationItem]}>• Hatha Yoga</Text>
              <Text style={[styles.certificationItem]}>• Vinyasa Yoga</Text>
              <Text style={[styles.certificationItem]}>• Ashtanga Yoga</Text>
            </View>
          </View>
          <View style={styles.row}>
          <Text style={[styles.label]}>Certifications:</Text>
          <View style={styles.certificationList}>
              <Text style={[styles.certificationItem]}>• React Native Developer - 2022</Text>
              <Text style={[styles.certificationItem]}>• Full Stack Web Development - 2021</Text>
              <Text style={[styles.certificationItem]}>• JavaScript Expert - 2020</Text>
            </View>
          </View>
         
        </View>
        </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  backgroundWrapper: {
    width: '100%',
    height: screenWidth < 320 ? screenWidth * 0.7 : screenWidth < 600 ? screenWidth * 0.6 : screenWidth * 0.35,  
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    overflow: 'hidden',
    position: 'relative', 
  },
  backgroundImage: {
    width: '100%',
    height: '100%', 
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  headerContainer: {
    position: 'absolute',
    top: 0,
    width: '100%',
  },
  avatarContainer: {
    position: 'absolute',
    top: screenHeight * 0.2, 
    left: '50%',
    transform: [{ translateX: '-50%' }], 
    zIndex: 2, 
    alignItems: 'center',
  },
  avatar: {
    width: avatarSize,
    height: avatarSize,
    borderRadius: 100,
    borderWidth: 3,
    borderColor: colors.white,
  },
  editIcon: {
    position: 'absolute',
    bottom: 0,
    right: 10,
    opacity:0.7,
    backgroundColor: '#D1D1D1',
    borderRadius: 20,
    padding: 5,
    borderWidth: 1,
    borderColor: '#767676',
    zIndex: 3, 
  },
  image: {
    width: screenWidth < 400 ? 12 
    : screenWidth < 600 ? 15 
    : screenWidth < 768 ? 18 
    : 30,
height: screenWidth < 400 ? 12 
    : screenWidth < 600 ? 15 
    : screenWidth < 768 ? 18 
    : 30,
    
  },
  detailsContainer: {
    padding: 20,
    marginTop: screenWidth < 600 ? screenHeight * 0.06 : screenHeight * 0.07, 
 
  },
  name: {
    fontFamily: fonts.families.secondary,
    color: colors.themelight,
    textAlign: 'center',
    fontSize:fonts.sizes.medium
    // marginBottom: 10,
  },
  ratingContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom:20
  },
  star: {
    marginHorizontal: 1,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  label: {
    fontFamily: fonts.families.primary,
    color: colors.grey,
    fontSize:fonts.sizes.small,
    width: '40%',
  },
  value: {
    fontFamily: fonts.families.primary,
    color: colors.themelight,
    fontSize:fonts.sizes.small,
    width: '60%',
  },
  certificationList: {
    width: certificationListWidth(),  
  },
  certificationItem: {
    fontFamily: fonts.families.primary,
    color: colors.themelight,
    fontSize:fonts.sizes.small,
    marginBottom: 5,

  },
});

export default Profile;
