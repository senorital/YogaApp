import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Dimensions,
  TouchableOpacity,Alert,
  ToastAndroid
} from 'react-native';
import Card from '../../../common/cards/card';
import {Header} from '../../../common/header/header';
import images from '../../../styles/images';
import colors from '../../../styles/colors';
import ToggleSwitch from '../../../common/button/toggleButton';
import fonts from '../../../styles/fonts';
import { screenHeight, screenWidth } from '../../../common/utils/util';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import moment from 'moment';

const Container = ({ title, onPress, isSelected }) => {
  return (
    <TouchableOpacity
      style={[
        styles.box,
        isSelected && {
          backgroundColor: colors.title_background,
          borderColor: colors.themelight,
        },
      ]}
      onPress={onPress}
    >
      <Text
        style={[
          styles.text,
          isSelected && { color: colors.selectedText },
        ]}
        numberOfLines={1} 
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const calculateFontSize = () => {
  if (screenWidth <= 320) return 9; 
  if (screenWidth > 320 && screenWidth <= 420) return 11;
  if (screenWidth > 420 && screenWidth <= 768) return 12; 
  if (screenWidth > 768 && screenWidth <= 1024) return 16; 
  if (screenWidth > 1024 && screenWidth <= 1440) return 20;
  return 23; 
};


const CalendarRow = () => {
    const [currentWeek, setCurrentWeek] = useState([]);
    const [selectedDate, setSelectedDate] = useState(null); // Store only one selected date
    
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
  
  
  

const PlainCard = ({ title, description, imageUri }) => {
  return (
    <View style={styles.plainCardContainer}>
      <Card title={title} description={description} imageUri={imageUri} width={'100%'} />
    </View>
  );
};

const TimelineCard = ({
  time,
  endTime,
  title,
  description,
  imageUri,
  timelineColor,
}) => {
  return (
    <View style={styles.timelineRow}>
      <View style={styles.timelineTimeContainer}>
        <Text style={styles.timelineTime}>{time}</Text>
        <Text style={styles.endtimelineTime}>{endTime}</Text>
      </View>
      <LinearGradient
        colors={[timelineColor, timelineColor]}
        style={styles.timelineLine}
      />
      <Card
        title={title}
        description={description}
        imageUri={imageUri}
        width={screenWidth > 800 ? '80%' : '78%'}
      />
    </View>
  );
};

const Booking = () => {
  
  const [selectedContainer, setSelectedContainer] = useState('Booking');

  const handleContainerPress = (title) => {
    setSelectedContainer(title);
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.white }}>
      <Header title={'Booking'} icon={images.back} />
      <View  style={{ flexDirection: 'row', marginHorizontal: screenWidth > 768 ? 30 : screenWidth > 360 ? 10 : 5, marginTop: 20 }}  >
    
        <Container
          title={'Booking Calendar'}
          onPress={() => handleContainerPress('Booking')}
          isSelected={selectedContainer === 'Booking'}
        />
        <Container
          title={'Memberships'}
          onPress={() => handleContainerPress('Membership')}
          isSelected={selectedContainer === 'Membership'}
        />
        <View style={{marginHorizontal:5,marginRight:5}}>       
             <ToggleSwitch />
             </View>
      </View>

      {selectedContainer === 'Booking' ? <CalendarRow /> : ''}
      <TouchableOpacity style={styles.addTimeSlot}>
       <Text style={styles.addTimeSlotText}>Add Slots</Text>
       <View style={styles.divider} />
       <Ionicons name="add" size={20} color="black" style={styles.plusIcon} />
     </TouchableOpacity>
      <ScrollView contentContainerStyle={styles.cardsContainer}>
        {selectedContainer === 'Booking' ? (
          <>
            <TimelineCard
              time="8:00 AM"
              endTime="9:00 AM"
              title="React Native Card"
              description="This is a sample card with an image, title, and description."
              imageUri="https://via.placeholder.com/300"
              timelineColor="#ff6347"
            />
            <TimelineCard
              time="9:00 AM"
              endTime="10:00 AM"
              title="Another Card"
              description="You can customize this card further based on your design."
              timelineColor="#32cd32"
            />
          </>
        ) : (
          <>
            <PlainCard
              title="Membership"
              description="Details about Membership 1."
              imageUri="https://via.placeholder.com/300"
            />
            <PlainCard
              title="Membership"
              description="Details about Membership 2."
              imageUri="https://via.placeholder.com/300"
            />
          </>
        )}
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
      if (screenWidth <= 320) return screenWidth * 0.2; // Extra small screens
      if (screenWidth > 320 && screenWidth <= 480) return screenWidth * 0.12; // Small screens
      if (screenWidth > 480 && screenWidth <= 768) return screenWidth * 0.092; // Medium screens
      if (screenWidth > 768 && screenWidth <= 1024) return screenWidth * 0.072; // Large screens (tablets)
      if (screenWidth > 1024 && screenWidth <= 1440) return screenWidth * 0.072; // Extra large screens (laptops)
      return screenWidth * 0.05; 
    })(), 
    flex: 1,
    alignSelf: 'center',
    marginHorizontal: 6,
    borderColor: colors.grey,
    alignItems: 'center',
  },
  text: {
    fontFamily: fonts.families.primary,
    fontSize: calculateFontSize(), // Dynamically calculated font size
    color: colors.text,
  },
  calendarRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    // marginBottom: 5,
   marginTop:10,
    paddingHorizontal: 3,
    backgroundColor: colors.white,
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
    
  },
  timelineLine: {
    width: 3,
   
    marginRight:10,
    marginVertical:5,
    // marginHorizontal: 2,
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
    marginHorizontal:screenWidth > 768 ? 40 : 14,

  },
  timelineTimeContainer: {
    width: screenWidth > 768 ? screenWidth * 0.18 : screenWidth < 320 ? screenWidth * 0.2 : screenWidth*0.16,
    
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

export default Booking;
