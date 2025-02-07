import React, { useRef,useState } from "react";
import { View, Text, ScrollView, StyleSheet,TouchableOpacity,Image,Modal,FlatList } from "react-native";
import moment from "moment";
import { Header } from "../header/header";
import images from "../styles/images";
import colors from "../styles/colors";
import fonts from "../styles/fonts";
import { screenHeight, screenWidth } from "../utils/util";
import Ionicons from 'react-native-vector-icons/Ionicons'; 
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import { Calendar } from "react-native-calendars";
const HEADER_HEIGHT = 80;
const TIMELINE_WIDTH = screenWidth <= 360 ? 90   : screenWidth >= 360 && screenWidth < 480 ? 90  : screenWidth >= 480 && screenWidth < 768 ? 95  : screenWidth >= 768 && screenWidth < 1024 ? 130 : 150; 



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



const events = [
  {
    id: 1,
    startDate: "2025-02-01",
    endDate: "2025-02-03",
    startTime: 1,
    endTime: 2,
    color: "#DEF4C7",
    borderColor: "#44C45C",
    name: "Team Meeting",
    people: 5,
    description: "A team meeting to discuss quarterly goals."
  },
  {
    id: 2,
    startDate: "2025-02-01",
    endDate: "2025-02-02",
    startTime: 2,
    endTime: 3,
    color: "#D8F1FF",
    borderColor: "#015382",
    name: "Client Call",
    people: 3,
    description: "Weekly client update call."
  },
  {
    id: 3,
    startDate: "2025-02-01",
    endDate: "2025-02-01",
    startTime: 3,
    endTime: 4,
    color: "#DEF4C7",
    borderColor: "#44C45C",
    name: "Team Meeting",
    people: 1,
    description: "A team meeting to discuss quarterly goals."
  },
  {
    id: 4,
    startDate: "2025-02-01",
    endDate: "2025-02-02",
    startTime: 4,
    endTime: 5,
    color: "#FFECCC",
    borderColor: "#FFA200",
    name: "Client Call",
    people: 3,
    description: "Weekly client update call."
  }
];

const calculateFontSize = () => {
  if (screenWidth <= 320) return 14; 
  if (screenWidth > 320 && screenWidth <= 420) return 11.5; 
  if (screenWidth > 420 && screenWidth <= 768) return 13; 
  if (screenWidth > 768 && screenWidth <= 1024) return 16; 
  if (screenWidth > 1024 && screenWidth <= 1440) return 20; 
  return 23; 
};



const generateDatesForMonth = (month) => {
  const daysInMonth = moment(month, "YYYY-MM").daysInMonth();
  return Array.from({ length: daysInMonth }, (_, i) => {
    return {
      date: moment(`${month}-${i + 1}`, "YYYY-MM-DD").format("YYYY-MM-DD")
    };
  });
};

const Dropdown = ({ title, isSelected, selectedMonth, onValueChange }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const months = Array.from({ length: 12 }, (_, i) => ({
    month: i + 1,
    name: moment().month(i).format('MMMM YYYY')
  }));

  const handleSelect = (month) => {
    onValueChange(month.month);  
    setModalVisible(false);
  };

  return (
    <View
      style={[
        styles.box,
        isSelected && {
          backgroundColor: colors.title_background,
          borderColor: colors.themelight,
          
        },
      ]}
    >
      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        style={{ flexDirection: 'row' }}
      >
          <Text style={styles.text}>{months.find(m => m.month === moment(selectedMonth, "YYYY-MM").month() + 1)?.name || title}</Text>

        <Ionicons
          name={modalVisible ? 'chevron-up' : 'chevron-down'}
          size={15}
          color="#333"
          style={styles.icon}
        />
      </TouchableOpacity>

      <Modal visible={modalVisible} transparent animationType="fade">
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <FlatList
              data={months}
              keyExtractor={(item) => item.name}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.dropdownItem}
                  onPress={() => handleSelect(item)}
                >
                  <Text style={styles.dropdownText}>{item.name}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const TimeTableScreen = () => {
  const scrollViewRef = useRef(null);
  const horizontalScrollRef = useRef(null);
  const headerScrollRef = useRef(null);

  const hours = Array.from({ length: 24 }, (_, i) => i);
  const [selectedContainer, setSelectedContainer] = useState('');
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(moment().format("YYYY-MM"));
  const [dates, setDates] = useState(generateDatesForMonth(selectedMonth));
  const [selectedDate, setSelectedDate] = useState(moment().format("YYYY-MM-DD"));

  const handleMonthSelect = (selectedMonthNumber) => {
    if (selectedMonthNumber) {
        const newMonth = moment().month(selectedMonthNumber - 1).format("YYYY-MM"); 
        setSelectedMonth(newMonth);
        setDates(generateDatesForMonth(newMonth));
        setShowCalendar(true);
    } else {
        setShowCalendar(false);
    }
};

const handleContainerPress = (title) => {
  setSelectedContainer(title);
};


  return (
    <View style={styles.container}>
      <View
        style={{
          backgroundColor: colors.purple600,
          width: '100%',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        <Header title={'Management'} icon={images.back} />
        
        <View
          style={{
            flexDirection: 'row',
            marginHorizontal:
            screenWidth > 768 ? 20 : screenWidth > 360 ? 20 : 15,
            marginTop: 15,
          }}
        >
          <Dropdown title="Select Month" isSelected={true} selectedMonth={selectedMonth} onValueChange={handleMonthSelect} />

          <Container
            title={'Memberships'}
            onPress={() => handleContainerPress('Membership')}
            isSelected={selectedContainer === 'Membership'}
          />
          <View
            style={{
              marginHorizontal: 5,
              marginRight: 5,
              justifyContent: 'center'
            }}
          >
            <Image style={styles.image} source={images.info} />
          </View>
        </View>
        
      
        {showCalendar && selectedMonth && (
       <View style={{ marginHorizontal: 20 }}>
   <Calendar
  key={selectedMonth}
  current={selectedMonth}
  style={styles.calendarContainer}
  onDayPress={(day) => {
    setSelectedDate(day.dateString);  
    setShowCalendar(false); 
  }}
  onMonthChange={(month) => {
    const newMonth = moment(`${month.year}-${month.month}`, 'YYYY-M').format('YYYY-MM');
    setSelectedMonth(newMonth);
    setDates(generateDatesForMonth(newMonth));
  }}
  theme={{
    textSectionTitleColor: 'black',
    selectedDayBackgroundColor: 'blue',
    selectedDayTextColor: 'white',
    todayTextColor: 'red',
    dayTextColor: 'black',
    arrowColor: 'green',
    textDayHeaderFontFamily:fonts.families.primary,
    textDayFontSize: fonts.sizes.small,
    textDayHeaderFontSize: fonts.sizes.vsmall,
  }}
/>

          </View>
        )}
      </View>

  
     
      <View style={styles.dateHeader}>
        <View style={styles.timelineHeader}>
          <Text style={styles.headerText}>Time</Text>
        </View>
        <ScrollView
          horizontal
          ref={headerScrollRef}
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={17}>
          <View style={styles.calendarRow}>
           {dates.map((item, index) => {
            const isSelected = (moment(item.date).format("YYYY-MM-DD") === selectedDate);
            return (
              <View
              key={index}
              style={[
                styles.circleContainer,
                isSelected && {
                  backgroundColor: colors.purple400,
                  borderRadius: screenWidth > 768 ? 40 : screenWidth < 320 ? 25 : 25,
                  paddingVertical: 5,
                  paddingHorizontal: 5,
                }
              ]}
            >
              <TouchableOpacity
                key={index}
                onPress={() => setSelectedDate(moment(item.date).format("YYYY-MM-DD"))}
              >
                <View
                  style={[
                    styles.circle,
                    isSelected && selectedDate == (moment(item.date).format("YYYY-MM-DD"))
                  ]}
                >
                  <Text style={[styles.headerText, isSelected && { fontFamily:fonts.families.primary }]}>
                    {moment(item.date).format("DD")}
                  </Text>
                  </View>
                  <Text style={[isSelected && {color:'white'}, styles.daytext]}>
                    {moment(item.date).format("ddd")}
                  </Text>
               
              </TouchableOpacity>
              </View>
            );
          })}
          </View>
        </ScrollView>
      </View>

      
      <ScrollView
        ref={scrollViewRef}
        showsVerticalScrollIndicator={true}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.contentRow}>
         
          <View style={styles.timelineColumn}>
            {hours.map((hour) => (
              <View key={hour} style={styles.timelineItem}>
           <Text style={styles.timelineText}>
         {hour === 0 ? "12 am" : hour < 24 ? `${hour} am` : hour === 12 ? "12 pm" : `${hour - 12} pm`}
       </Text>
    
           </View>
            ))}
          </View>

        
          <ScrollView
            horizontal
            ref={horizontalScrollRef}
            showsHorizontalScrollIndicator={false}
            scrollEventThrottle={16}
            onScroll={(event) => {
              const xOffset = event.nativeEvent.contentOffset.x;
              headerScrollRef.current?.scrollTo({ x: xOffset, animated: false });
            }}
          >
            <View style={styles.scheduleContent}>
            {hours.map((hour) => (
  <View key={`hour-${hour}`} style={styles.row}>

    {dates.map((date, colIndex) => {

  const event = events.find(
    (e) =>
      moment(date.date).isSame(e.startDate, "day") &&  
      hour >= e.startTime && hour < e.endTime 
  );

  if (!event) {
    return (
      <View
        key={`empty-${hour}-${colIndex}`}
        style={[
          styles.cell
          
        ]}
      />
    );
  }

 
 
  const getEventPositionAndSize = (event) => {
    const rowHeight = TIMELINE_WIDTH;
    const startHour = event.startTime;
    const endHour = event.endTime;
  
    const top = (startHour - 1) * rowHeight; 

    const height = (endHour - startHour) * rowHeight - 10;

    return { top, height };
  };

 
  const { top, height } = getEventPositionAndSize(event);

  const eventDurationDays = moment(event.endDate).diff(moment(event.startDate), 'days') + 1;
  const cellWidth = screenWidth < 360 ? 90 : screenWidth < 768 ? 150 : 220;
 
  return (
    
    <View
      key={`event-${event.id}-${hour}-${colIndex}`}
      style={[
        styles.eventBlock,
        {
          position: "absolute",
          top, 
          height,
          left: colIndex * cellWidth,
          width: eventDurationDays * cellWidth - 5,
          backgroundColor: event.color,
          borderLeftColor: event.borderColor,
          zIndex: 1,
          borderLeftWidth:20,
          
        }
      ]}
    >
     {event.startDate !== event.endDate ? (
  <>
    <View style={styles.eventHeader}>
      <Text style={styles.eventText}>{event.name}</Text>
      <View style={{ flexDirection: "row", justifyContent: "flex-end", alignItems: "center" }}>
        {event.people > 1 ? (
          <FontAwesome6 name="users" size={15} color={colors.black} />
        ) : (
          <FontAwesome6 name="user-large" size={15} color={colors.black} />
        )}
        <Text style={styles.eventPeopleText}>{event.people}</Text>
      </View>
    </View>
  </>
) : (
  <>
    <View style={{ flexDirection: "row", justifyContent: "flex-end", alignItems: "center" }}>
      {event.people > 1 ? (
        <FontAwesome6 name="users" size={15} color={colors.black} />
      ) : (
        <FontAwesome6 name="user-large" size={15} color={colors.black} />
      )}
      <Text style={styles.eventPeopleText}>{event.people}</Text>
    </View>
    <View style={{ flex: 1, justifyContent: "flex-end" }}>
      <Text
        style={{
          fontSize: 7,
          borderRadius: 8,
          borderWidth: 1,
          textAlign: "center",
          padding: 5,
          fontFamily: fonts.families.primary,
        }}
      >
        {event.name}
      </Text>
    </View>
  </>
)}

{event.startDate !== event.endDate && (
  <Text style={styles.eventDateText} numberOfLines={1}>
    Date: {moment(event.startDate).format("DD MMM, YY")} - {moment(event.endDate).format("DD MMM, YY")}
  </Text>
)}

     
       </View>
       );
         })}
      </View>
       ))}
            </View>
          </ScrollView>
        </View>
      </ScrollView>
      <TouchableOpacity  style={styles.floatingButton}  onPress={() => console.log("Floating Button Pressed")}>
       <Ionicons name="add" size={30} color="darkblue" />
     </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  floatingButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 50,
    height: 50,
    borderRadius: 10,
    backgroundColor: '#D9D9D9', 
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5, 
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  daytext :{

      fontSize: fonts.sizes.small,
      fontFamily: fonts.families.primary,
      marginTop: 5,
      textAlign:'center'
   
  },
  container: { flex: 1, backgroundColor: "#fff" },
  image :{width:20,height:20,justifyContent:'center'},
  eventHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cellFirstRow: {
    borderTopWidth: 1, 
    borderLeftWidth: 1, 
  },
  
  eventPeopleText: {
    fontFamily: fonts.families.primary,
    fontSize: fonts.sizes.semismall,
    color: colors.black,
    marginRight: 10,
    marginLeft:5,
    marginTop:5
  },
  
  eventDateText: {
    position: "absolute",
    bottom: 5,
    left: 5,
    color: colors.black,
    fontSize: fonts.sizes.vsmall,
    fontFamily: fonts.families.secondary,
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
    backgroundColor:colors.white
  },
  icon: {
    marginLeft: 8,
  },
  text: {
    fontFamily:fonts.families.primary,
    fontSize: calculateFontSize(), 
    color: colors.text,
  },
  dateHeader: { flexDirection: "row", backgroundColor: colors.purple600, paddingVertical: 10, alignItems: "center",borderBottomColor:colors.themelight,borderBottomWidth:1 },
  timelineHeader: { width: TIMELINE_WIDTH, justifyContent: "center", alignItems: "center", },
  headerText: { fontFamily: fonts.families.primary, fontSize: fonts.sizes.small },
  scrollContent: { paddingBottom: 20 },
  contentRow: { flexDirection: "row" ,marginVertical:20},
  timelineColumn: { width: TIMELINE_WIDTH,},
  timelineItem: { height: TIMELINE_WIDTH, justifyContent: "flex-start", paddingHorizontal: 20 },
  timelineText: { fontFamily: fonts.families.secondary, fontSize: fonts.sizes.small },
  scheduleContent: { flexDirection: "column", },
  row: {
    flexDirection: "row",
   
 
  },
  eventBlock: {
    position: "absolute",
    left: 0,
    borderRadius: 10,
    padding: 3,
    margin: 2,
    
    overflow: "hidden",
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
  eventText: {
    fontFamily:fonts.families.primary,
    fontSize:fonts.sizes.vsmall,
    borderColor:colors.black,
    borderWidth:1,
    borderRadius:8,
    marginLeft:5,
    paddingHorizontal:9,
    paddingVertical:5,
    textAlign:'center'
    
  },
  cell: {
    width: screenWidth < 360 ? 90 : screenWidth < 768 ? 150 : 220, // Adjust width dynamically
    height: screenWidth < 600 ? 90 : screenWidth < 900 ? 80 : 150, // Adjust height dynamically
    borderWidth: 1,
    borderColor: '#E6E6E6',
    position: 'relative',
  },
  event : {borderTopLeftRadius:10,borderBottomLeftRadius:10},
  circleContainer: { alignItems: 'center', justifyContent:'center',  marginHorizontal: screenWidth > 700 ? screenWidth * 0.06 :  screenWidth * 0.09,


  },
  calendarRow: { flexDirection: 'row',justifyContent: 'space-around',alignItems: 'center', 
    
    
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: 250,
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 10,
  },
  dropdownItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  dropdownText: {
    fontSize: fonts.sizes.regular,
    fontFamily:fonts.families.primary
  },
  calendarContainer: {
    marginTop: 10,
    borderRadius: 10,
    overflow: "hidden",
    fontFamily:fonts.families.primary
  },
});

export default TimeTableScreen;