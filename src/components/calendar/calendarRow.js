import React, { useState,useEffect } from 'react';
import { View, Text, TouchableOpacity,ScrollView, StyleSheet, Image } from 'react-native';
import colors from '../styles/colors';
import images from '../styles/images';
import fonts from '../styles/fonts';
import { screenHeight, screenWidth } from '../utils/util';
import moment from 'moment';


const DayRow = ({text,color}) => {
    const [currentWeek, setCurrentWeek] = useState([]);
     const [selectedDate, setSelectedDate] = useState(null);
     
     useEffect(() => {
       const today = moment();
       const startOfWeek = today.clone().startOf('week');
       const week = Array.from({ length: 7 }, (_, i) =>
         startOfWeek.clone().add(i, 'days'),
       );
       setCurrentWeek(week);
       setSelectedDate(today); 
     }, []);
   
     const isToday = (date) => moment().isSame(date, 'day');
     const isSelected = (date) => selectedDate && selectedDate.isSame(date, 'day');
     const isPastDate = (date) => date.isBefore(moment(), 'day');
   
     const handleDateSelect = (date) => {
       if (isPastDate(date)) {
         ToastAndroid.show("Previous dates cannot be selected.", ToastAndroid.LONG);
       } else {
         if (!isSelected(date)) {
           setSelectedDate(date); 
         } else {
           setSelectedDate(null); 
         }
       }
     };

  return (
    <View>
    <ScrollView horizontal showsHorizontalScrollIndicator={false} >
      <View style={styles.calendarRow}>
        {currentWeek.map((day, index) => (
          <View
            key={index}
            style={[
              styles.circleContainer,
                 
              isSelected(day) && {
                backgroundColor: colors.purple400,
                borderRadius: screenWidth > 768 ? 40 : screenWidth < 320 ? 25 : 25,
                paddingVertical: 5,
                paddingHorizontal: 5,
              },
            ]}
          >
            <TouchableOpacity onPress={() => handleDateSelect(day)}>
              <View
                style={[
                  styles.circle,
                  isSelected(day) && { backgroundColor: colors.white },
                ]}
              >
                <Text
                  style={[
                    styles.dateText,
                  //   isToday(day) && { color: colors.purple400 },
                    isSelected(day) && { color: colors.purple400 },
                  ]}
                >
                  {day.format('D')}
                </Text>
              </View>
              <Text
                style={[
                  styles.dayText,
                  // isToday(day) && { color: colors.white },
                  isSelected(day) && { color: colors.white },
                ]}
              >
                {day.format('ddd')}
              </Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
      
    </ScrollView>
    
   </View>
  );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.white,
      },
      box: {
        borderRadius: 10,
        borderWidth: 1,
        justifyContent: 'center',
        paddingHorizontal: 5,
        height: (() => {
          if (screenWidth <= 320) return screenWidth * 0.1; // Extra small screens
          if (screenWidth > 320 && screenWidth <= 480) return screenWidth * 0.09; // Small screens
          if (screenWidth > 480 && screenWidth <= 768) return screenWidth * 0.08; // Medium screens
          if (screenWidth > 768 && screenWidth <= 1024) return screenWidth * 0.06; // Large screens (tablets)
          if (screenWidth > 1024 && screenWidth <= 1440) return screenWidth * 0.06; // Extra large screens (laptops)
          return screenWidth * 0.05; 
        })(), 
        flex: 1,
        alignSelf: 'center',
        marginHorizontal: 6,
        borderColor: colors.grey,
        alignItems: 'center',
      },
     
      calendarRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        // marginBottom: 5,
       marginTop:10,
        paddingHorizontal: 3,
        // backgroundColor: colors.white,
      },
      dayText: {
        fontSize: fonts.sizes.small,
        fontFamily: fonts.families.primary,
        color: colors.calendar,
        marginTop: 10,
        textAlign:'center'
      },
      dateText:{
      fontFamily:fonts.families.primary,
      fontSize:fonts.sizes.semismall
      },
      circle: {
        width: screenWidth > 800 ? 70 : 40,
        height: screenWidth > 800 ? 70 : 40,
        borderRadius: screenWidth > 800 ? 50 : 25,
        backgroundColor: colors.white,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
      },
      circleContainer: {
        alignItems: 'center',
        justifyContent:'center',
        marginHorizontal: screenWidth > 700 ? screenWidth * 0.043 :  screenWidth * 0.03,
      },
      addTimeSlot: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 8,
        alignSelf: 'flex-end',
        backgroundColor: colors.orange100,
        borderRadius: 10,
        elevation: 2,
        marginTop: 15,
        marginHorizontal: screenWidth*0.05,
         
      },
      addTimeSlotText: {
        fontSize: fonts.sizes.small,
        fontFamily: fonts.families.secondary,
        color: colors.black,
      }, 
     timelineTime: {
        fontSize: fonts.sizes.semismall,
        fontFamily: fonts.families.bold,
        color: colors.black,
        marginTop:5
      },
      timelineLine: {
        width: 3,
        height: screenHeight * 0.23,
        marginRight:5,
        marginVertical: 10,
        marginHorizontal: 2,
        borderRadius: 50,
      },
      divider: {
        height: '100%',
        width: 1,
        backgroundColor: 'grey',
        marginHorizontal: 10,
      },
      timelineRow: {
        flexDirection: 'row',
        marginHorizontal:screenWidth > 768 ? 40 : 20
      },
      timelineTimeContainer: {
        width: screenWidth > 768 ? screenWidth * 0.18 : screenWidth < 320 ? screenWidth * 0.2 : screenWidth*0.17,
      },
      plainCardContainer: {
        marginHorizontal: screenWidth > 768 ? 50 : screenWidth < 320 ? 20 : 20,
      },
      endtimelineTime: {
        fontSize: fonts.sizes.semismall,
        fontFamily: fonts.families.primary,
        color: colors.grey,
      },
    });

export default DayRow;
