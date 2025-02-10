import React, { useState } from "react";
import { View, Image, Text, StyleSheet, Dimensions, ImageBackground } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../tabComponent/home";
import images from "../../../styles/images";
import fonts from "../../../styles/fonts";
import colors from "../../../styles/colors";
import { screenHeight, screenWidth } from "../../../common/utils/util";
import UserBooking from "../booking/booking";
import UserProfile from "../tabComponent/profile/profile";
import CourseDetails from "../course/details";
import BookYourSlot from "../booking/slotBooking";
import SearchResult from "../searchResult/searchResult";

const Tab = createBottomTabNavigator();
const { width, height } = Dimensions.get("window");

const UserNavigator = () => {
  const [activeTab, setActiveTab] = useState("Home"); 

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          gestureEnabled: false,
          tabBarStyle: { 
            height: height * 0.09, 
            backgroundColor: 'white',
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
           
          },
          tabBarBackground: () => (
            <ImageBackground source={images.footer} style={[styles.tabBarBackground]} />
          ),
        
        }}
      >
        {[ 
          { name: "Home", component: Home, icon: "home" },
          { name: "Calendar", component: CourseDetails, icon: "calendar" },
          { name: "Booking", component: SearchResult, icon: "booking" },
          { name: "Category", component: UserProfile, icon: "category" },
          { name: "Wallet", component: BookYourSlot, icon: "wallet" },
        ].map((tab, index) => (
          <Tab.Screen
            key={index}
            name={tab.name}
            component={tab.component}
            options={{
              tabBarLabel: () => null, 
              tabBarIcon: ({ focused }) => (
                <View style={[styles.iconContainer]}>
               <Image
  source={focused ? images[`${tab.icon}_active`] : images[tab.icon]}
  style={[
    styles.icon,
    {
      width: screenWidth < 360 ? screenWidth * 0.05 : screenWidth < 768 ? screenWidth * 0.06 : screenWidth * 0.05,
      height: screenWidth < 360 ? screenWidth * 0.05 : screenWidth < 768 ? screenWidth * 0.06 : screenWidth * 0.05,
    },
  ]}
/>
                  {focused && (
                    <Text style={[styles.tabLabel, { color: colors.theme }]}>
                      {tab.name}
                    </Text>
                  )}
                </View>
              ),
            }}
            listeners={{
              focus: () => setActiveTab(tab.name),
            }}
          />
        ))}
      </Tab.Navigator>
    </View>
  );
};

const styles = StyleSheet.create({
  tabBarBackground: {
    width: screenWidth,
    height: screenHeight * 0.07,
    resizeMode: 'cover',
    backgroundColor: 'transparent' ,
    position:'absolute',
    bottom:0,
    borderTopLeftRadius:30,
    borderTopRightRadius:30
    
  },
  iconContainer: {
    alignItems: "center",
    marginTop: 20,
    justifyContent: "center",
    width: width * 0.18, 
  },
  icon: {
    resizeMode: "contain",
  },
  tabLabel: {
    fontFamily: fonts.families.primary,
    textAlign: "center",
    fontSize: width * 0.028,
    marginTop: 2, // Spacing between icon and text
  },
});

export default UserNavigator;
