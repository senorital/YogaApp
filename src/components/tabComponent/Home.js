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
import { CustomHeader } from '../header/header';
import images from '../styles/images';
import Footer from '../footer/footer';
import globalStyles from '../styles/globalStyles';
import Title from '../title/title';
import colors from '../styles/colors';
import Card from '../cards/card';
import AntDesign from 'react-native-vector-icons/AntDesign';
import fonts from '../styles/fonts';

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
  const renderCard = () => <Card width={large ? screenWidth * 0.6 : screenWidth * 0.8} />;

  return (
    <View style={globalStyles.container}>
      <CustomHeader
        title="Hello Ankush!"
        rightIcon={images.avatar}
        subText={'Marsh ganj mandi, Shamli, UP'}
      />
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

        <Title title={'List New Classes'} />
        <View style={{ marginVertical: 10 }}>
          <TouchableOpacity>
            <View style={styles.newCard}>
              <View style={styles.newCardHeader}>
                <Text style={styles.newCardTitle}>Add New Class Listing</Text>
                <Text style={styles.cardText}>
                Why limit your potential? Add more class timings and attract more clients! Earn More
                Money
              </Text>
              </View>
              <AntDesign name="plussquare" size={iconSize} color={colors.purple400} style={{borderRadius:3}} />

             
            </View>
          </TouchableOpacity>
        </View>
         
        <Title title={'Latest Booking'} />
        <View>
        <FlatList
          data={cardsData}
          renderItem={renderCard}
          keyExtractor={(item, index) => `latest-booking-${index}`}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.flatList}
          ItemSeparatorComponent={() => <View style={styles.cardSeparator} />} 

        />
       </View>
       <View style={{marginVertical:10}}>
        <Title title={'Upcoming Classes'} />
        <View style={{margin:5}}>
        <FlatList
          data={cardsData}
          renderItem={renderCard}
          keyExtractor={(item, index) => `upcoming-classes-${index}`}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.flatList}
          ItemSeparatorComponent={() => <View style={styles.cardSeparator} />} // Add space between cards

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
    marginVertical: 10,
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
  newCard: {
    // justifyContent: 'center',
    borderStyle: 'dashed',
    borderColor: colors.theme,
    borderWidth: 1,
    flexDirection:'row',
    borderRadius: 10,
    alignItems:'center',
    justifyContent:'space-between',
    padding: small ? 10 : medium ? 15 : 30, 
    backgroundColor: colors.purple500,
  },
  newCardHeader: {
    flexDirection: 'column',
    // justifyContent: 'space-around'
  },
  newCardTitle: {
    color: colors.purple400,
    fontFamily: 'Poppins-Medium',
    fontSize: small ? 12 : medium ? 14 : 30, 
    // justifyContent:'flex-start',
    // alignItems:'flex-start'
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
