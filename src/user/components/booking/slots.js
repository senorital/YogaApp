import React from "react";
import { StyleSheet, View, Text } from "react-native";
import globalStyles from "../../../styles/globalStyles";
import colors from "../../../styles/colors"; 
import Title from "../../../common/title/title";
import fonts from "../../../styles/fonts";

const TimeSlots = () => {
  return (
    <View style={globalStyles.container}>
      <Title title={"Select the Slot"} />

      <View style={styles.rowContainer}>
        {/* Group Packages */}
        <View style={styles.column}>
        <View style={styles.packageRow}> 
        <View style={[styles.dot, { backgroundColor: colors.orange }]} />
          <Text style={styles.heading}>
            Group Packages</Text>
            </View> 
            <View style={styles.timeRow}>
          <View style={[styles.dot, { backgroundColor: colors.blue100 }]} />        
          <Text style={styles.packageText}>04:00 pm - 05:00 pm</Text>
          </View>
          <View style={styles.timeRow}>
          <View style={[styles.dot, { backgroundColor: colors.blue100 }]} />        
          <Text style={styles.packageText}>04:00 pm - 05:00 pm</Text>
          </View>
        </View>

        {/* Individual Packages */}
        <View style={styles.column}>
          <View style={styles.packageRow}>
          <View style={[styles.dot, { backgroundColor: colors.blue100 }]} />  
          <Text style={styles.heading}>Individual Packages</Text>
          </View>
          <View style={styles.timeRow}>
          <View style={[styles.dot, { backgroundColor: colors.orange }]} />        
          <Text style={styles.packageText}>04:00 pm - 05:00 pm</Text>
          </View>
          <View style={styles.timeRow}>
          <View style={[styles.dot, { backgroundColor: colors.orange }]} />        
          <Text style={styles.packageText}>04:00 pm - 05:00 pm</Text>
          </View>        
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    overflow:'hidden'
 
  },
  timeRow :{
    flexDirection: "row",
    alignItems:'center',
    borderRadius:10,
    borderColor:colors.grey300,
    borderWidth:1,
    padding:5,
    marginLeft:0,
    marginVertical:5,
    marginRight:5
  },
  heading: {
    fontSize: fonts.sizes.semismall,
    marginBottom: 10,
    color: colors.themelight,
    fontFamily:fonts.families.secondary
  },
  packageRow: {
    flexDirection: "row",
    alignItems:'center',
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 10,
    marginBottom:10
  
  },
  packageText: {
    fontSize: 11,
    color: colors.grey200,
    fontFamily:fonts.families.primary,
   
  },
});

export default TimeSlots;
