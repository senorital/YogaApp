import React from "react";
import { StyleSheet, View, Text } from "react-native";
import Svg, { Circle } from "react-native-svg";
import colors from "../../styles/colors";
import fonts from "../../styles/fonts";

const RateView = ({ rating = 4, maxRating = 5, width}) => {
  const percentage = (rating / maxRating) * 100; 
  const radius = 40;
  const strokeWidth = 6; 
  const circumference = 2 * Math.PI * radius; 
  const strokeDashoffset = circumference - (circumference * percentage) / 100; 

  return (
    <View style={styles.container}>
      <Svg width={width} height={width} viewBox="0 0 100 100">
       
        <Circle
          cx="50"
          cy="50"
          r={radius}
          stroke={colors.grey200}
          strokeWidth={strokeWidth}
          fill="none"
        />
        
        <Circle
          cx="50"
          cy="50"
          r={radius}
          stroke={colors.rating} 
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
        />
      </Svg>
     
      <View style={styles.textContainer}>
        <Text style={styles.ratingText}>{rating}</Text>
        <Text style={styles.maxRatingText}> /{maxRating}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  textContainer: {
    position: "absolute",
    alignItems: "center",
    flexDirection:'row',
    justifyContent: "flex-end",
  },
  ratingText: {
    fontSize: fonts.sizes.small,
    fontFamily:fonts.families.bold,
    color: colors.black,
  },
  maxRatingText: { 
    color: colors.black,
    fontFamily:fonts.families.primary,
    fontSize:fonts.sizes.vsmall
  },
});

export default RateView;
