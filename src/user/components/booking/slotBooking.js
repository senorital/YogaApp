import React,{useState} from 'react';
import { View, Text, TouchableOpacity, StyleSheet,FlatList, ScrollView, Image, ImageBackground, StatusBar, Dimensions } from 'react-native';
import { Header } from '../../../common/header/header';
import colors from '../../../styles/colors';
import images from '../../../styles/images';
import fonts from '../../../styles/fonts';
import {screenWidth, screenHeight } from '../../../common/utils/util';
import AntDesign  from 'react-native-vector-icons/AntDesign';
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import globalStyles from '../../../styles/globalStyles';
import TimeSlots from './slots';
import DayRow from '../../../instructor/components/calendar/calendarRow';
import ToggleDropdown from './toggleDropdown';

  
const BookYourSlot = () => {
const [selectedTab, setSelectedTab] = useState(0);

const tabs = [
  { id: 0, title: "One time" },
  { id: 1, title: "Weekly subscription" },
  { id: 2, title: "Monthly Subscription" },
];

  return (
    <View style={globalStyles.container}>
     
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />

   
      <View style={styles.backgroundWrapper}>
        <ImageBackground source={images.profile_back} style={styles.backgroundImage}>
          {/* Overlay Header */}
          <View style={styles.headerContainer}>
            <Header title={'Book Your Slot'} icon={images.back} />
          </View>
        </ImageBackground>
      </View>

      <View style={styles.avatarContainer}>
        <Image source={images.avatar} style={styles.avatar} />
      </View>
        <View style={styles.detailsContainer}>
          <Text style={[styles.name]}>John Doe</Text>
        
          <View style={{ alignItems: 'flex-end',marginHorizontal:20 }}>
        <ToggleDropdown />
        </View>
          <DayRow />
          
        </View>
        
        <View style={styles.tabsContainer}>
          {tabs.map((tab, index) => (
            <TouchableOpacity
              key={tab.id}
              style={[
                styles.tabButton,
                selectedTab === index && styles.activeTab,
              ]}
              onPress={() => setSelectedTab(index)}
            >
              <Text
                style={[
                  styles.tabText,
                  selectedTab === index && styles.activeTabText,
                ]}
              >
                {tab.title}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

       
        <View style={styles.tabContent}>
  {/* Render TimeSlot Component based on selectedTab */}
  {selectedTab === 0 && <View><TimeSlots/></View>}
  {selectedTab === 1 && <View><TimeSlots/></View>}
  {selectedTab === 2 && <View><TimeSlots/></View>}
</View>
      
        

     
    </View>
  );
};

const styles = StyleSheet.create({    backgroundColor: colors.white,
  
  container: {
    flex: 1,
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
    width: 100,
    height: 100,
    borderRadius: 100,
    borderWidth: 3,
    borderColor: colors.white,
  },
  detailsContainer: {
    // paddingTop: 20,
    marginTop: screenWidth < 600 ? screenHeight * 0.06 : screenHeight * 0.07, 
 
  },
  name: {
    fontFamily: fonts.families.secondary,
    color: colors.themelight,
    textAlign: 'center',
    fontSize:fonts.sizes.medium
    // marginBottom: 10,
  },
  tabsContainer: {
    flexDirection: 'row',
    marginTop: 15,
    marginHorizontal:20,
   alignItems:'center'
  },
  tabButton: {
    flex: 1,
    paddingVertical: 5,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomColor: colors.themelight,
  },
  tabText: {
    fontFamily: fonts.families.secondary,
    fontSize: fonts.sizes.semismall,
    textAlign:'center',
    color: "#aaa",
  },
  activeTabText: {
    color: colors.themelight,
    fontFamily:fonts.families.secondary,
    fontSize:fonts.sizes.regular
  },
  tabContent: {
    paddingVertical: 20,
    alignItems: 'center',
  },
  tabContentText: {
    fontSize: 18,
    color: '#333',
  },
 
});

export default BookYourSlot;
