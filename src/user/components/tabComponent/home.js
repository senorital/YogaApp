//User home
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  FlatList,
} from 'react-native';
import { CustomHeader } from '../../../common/header/header';
import images from '../../../styles/images';
import globalStyles from '../../../styles/globalStyles';
import Title from '../../../common/title/title';
import colors from '../../../styles/colors';
import Card from '../../../common/cards/card';
import fonts from '../../../styles/fonts';
import Search from '../../../common/searchBar/search';
import InstructorCard from '../../../common/cards/instructorCard';
import CourseCard from '../../../common/cards/courseCard';

const { width: screenWidth } = Dimensions.get('window');

const small = screenWidth < 360;
const medium = screenWidth >= 360 && screenWidth < 768;
const large = screenWidth >= 768;
const iconSize = screenWidth < 360 ? 20 
               : screenWidth < 768 ? 25 
               : 50;
const Home = ({ navigation }) => {
const cardsData = [1, 2, 3]; 
const banners = [
    { id: 1, source: images.banner1 },
    { id: 2, source: images.banner2 },
  ]; 

const renderBanner = ({ item }) => (
    <Image source={item.source} style={styles.image} />

  );
const instructorData = [
    { id: 1, text: 'AnkushGupta' , exp : '5' , slot: '5', profile:'Yoga Instructor' , description : 'Dedicated yoga instructor with a passion for helping individuals achieve balance, flexibility, and strength. Specializing in [insert specialization, e.g., Hatha Yoga'},
    { id: 2, text: 'AnkushGupta' , exp : '5' , slot: '5', profile:'Yoga Instructor' , description : 'Dedicated yoga instructor with a passion for helping individuals achieve balance, flexibility, and strength. Specializing in [insert specialization, e.g., Hatha Yoga'},
];  


  const renderCard = () => <Card width={large ? screenWidth * 0.6 : screenWidth * 0.8} />;
  const renderInstructor = ({item}) =>  <InstructorCard text={item.text} exp={item.exp} slot={item.slot} profile={item.profile} description={item.description}/>
  ;

  return (
    <View style={globalStyles.container}>
      <CustomHeader
        title="Hello Ankush!"
        rightIcon={images.avatar}
        subText={'Marsh ganj mandi, Shamli, UP'}
      />
      <View style={[styles.container,{marginVertical:20}]}>
       <Search />
       </View>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.row}>
        <FlatList
          data={banners}
          renderItem={renderBanner}
          keyExtractor={(item) => item.id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.bannerList}
          ItemSeparatorComponent={() => <View style={styles.cardSeparator} />}
        />
         </View>

        <Title title={'Top Instructors'} />
         <View>
         <FlatList
          data={instructorData}
          renderItem={renderInstructor}
          keyExtractor={(item) => item.id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.flatList}
          ItemSeparatorComponent={() => <View style={styles.cardSeparator} />} 

        />    
        </View>
        <Title title={'Courses'} />
        <View>
        <CourseCard text={'Ankush Gupta'} time={'2 hrs 40 min'} description={'How to decrease the body fat by doing these yoga asanas'} rate={49}/>  
        {/* <FlatList
          data={cardsData}
          renderItem={renderCard}
          keyExtractor={(item, index) => `latest-booking-${index}`}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.flatList}
          ItemSeparatorComponent={() => <View style={styles.cardSeparator} />} 

        /> */}
       </View>
       <View style={{marginVertical:10}}>
        <Title title={'Upcoming Slots'} />
        <View style={{margin:5}}>
        <FlatList
          data={cardsData}
          renderItem={renderCard}
          keyExtractor={(item, index) => `upcoming-classes-${index}`}
          showsVerticalScrollIndicator
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.flatList}
          ItemSeparatorComponent={() => <View style={styles.cardSeparator} />} 

        />
        </View>
        </View>
      </ScrollView>
      {/* <Footer /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: small ? 10 : medium ? 15 : 20, 
  },
  row: {
    flexDirection: 'row',
    marginBottom:10
  },
  image: {
    width: small ? screenWidth * 0.45 
          : medium ? screenWidth * 0.7 
          : screenWidth * 0.8,
    height: small ? screenWidth * 0.25 
          : medium ? screenWidth * 0.34 
          : screenWidth * 0.3,
    borderRadius: 10,
  },

  cardText: {
    fontFamily: fonts.families.primary,
    color: colors.black,
    fontSize: small ? 10 : medium ? 12 : 20, 
    flexWrap: 'wrap',
    width: small ? screenWidth * 0.6 : screenWidth * 0.7, 
  },
  cardSeparator: {
    width: small ? 10 : 20, 
  },
});

export default Home;
