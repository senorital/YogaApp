import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image, ImageBackground, StatusBar, Dimensions } from 'react-native';
import { Header } from '../../../../common/header/header';
import colors from '../../../../styles/colors';
import images from '../../../../styles/images';
import fonts from '../../../../styles/fonts';
import Feather from 'react-native-vector-icons/Feather';
import globalStyles from '../../../../styles/globalStyles';
import Title from '../../../../common/title/title';

const ProfileCards = ({ imageSource, borderColor,iconColor,color,title,description,onPress }) => {
  return (
    <TouchableOpacity style={[styles.card, { borderBottomColor: borderColor }]} onPress={onPress}>
      {/* Left Image */}
      <View style={{flexDirection:'row'}}>
      <Image source={imageSource} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>
         {description}
        </Text>
        </View>
        <View style={[styles.iconContainer,{backgroundColor : iconColor}]}>
        <Feather  name="check" size={15} color={colors.white} />
        </View>
        </View>
    </TouchableOpacity>
  );
};


const ProfileList = ({navigation}) => {
  const handleCardPress = (screenName, initialStep) => {
    
    if (screenName === 'CompleteProfile') {
      navigation.navigate('CompleteProfile', { initialStep });
    }
  };
  return (
    <View style={globalStyles.container}>
     
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
       
       <Header title={'Profile'} icon={images.back} />

       <ScrollView contentContainerStyle={{ paddingBottom: 50 }} style={styles.details}>
       <Title title={'Complete Your Profile for a Seamless Experience'} />
       <Text style={styles.text}>Help us tailor the app to your needs by filling out your profile. It only takes a few moments!</Text>
       <ProfileCards imageSource={images.profile_2} borderColor={colors.blue_border} iconColor={colors.blue100} color={colors.blue} title={'Personal Information'} description={'Help us tailor the app to your needs by filling out your profile. It only takes a few moments!'}  onPress={() => handleCardPress('CompleteProfile', 0)}  />
       <ProfileCards imageSource={images.learning} borderColor={colors.lightBrown} iconColor={colors.red100} color={colors.brown} title={'Educational Details'} description={'Highlight your qualifications to build trust and credibility with your clients.'} onPress={() => handleCardPress('CompleteProfile', 1)}/>
       <ProfileCards imageSource={images.profile_2} borderColor={colors.lightYellow} iconColor={colors.yellow100} color={colors.darkYellow} title={'Bank Details'} description={'Provide your bank information to ensure hassle-free payouts and secure transactions.'}  onPress={() => handleCardPress('CompleteProfile', 2)}/>
       <ProfileCards imageSource={images.search} borderColor={colors.lightGreen} iconColor={colors.parrot} color={colors.darkGreen} title={'Verification'} description={'Complete your verification to unlock all features and build trust within the community.'} onPress={() => handleCardPress('CompleteProfile', 4)} />
       <ProfileCards imageSource={images.certificate} borderColor={colors.lightPurple} iconColor={colors.purple} color={colors.darkPurple} title={'Certifications'} description={'Upload your certifications to demonstrate your skills and qualifications to potential clients'} />
       <ProfileCards imageSource={images.profile} borderColor={colors.lightPink} iconColor={colors.pink} color={colors.magenta} title={'Studio Details'} description={'Provide information about your studio to attract more clients and streamline your bookings'}/>

       </ScrollView>
     
    
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },

  details :{
   paddingHorizontal:20,
   paddingVertical:20,
  
  },
  text: {
    fontFamily: fonts.families.primary,
    color: colors.grey,
    fontSize:fonts.sizes.small
   
  },
  card: {
    // flexDirection: "row",
    // alignItems: "center",
    backgroundColor: colors.white,
    padding: 15,
    marginVertical: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    borderBottomWidth: 15, 
  },
  image: {
    width: 60,
    height: 60,
    resizeMode:'contain'
  },
  textContainer: {
    flex:1,
    marginHorizontal: 15,
  },
  title: {
    fontFamily: fonts.families.secondary,
    fontSize: fonts.sizes.regular,
    color: colors.black,
  },
  description: {
    fontFamily: fonts.families.primary,
    fontSize: fonts.sizes.vsmall,
    color: colors.grey,
    
  },
  iconContainer: {
    width: 30,
    height: 30,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
 
});

export default ProfileList;
