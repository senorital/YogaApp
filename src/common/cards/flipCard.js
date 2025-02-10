import React, { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity, Image, FlatList } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import globalStyles from "../../styles/globalStyles";
import colors from "../../styles/colors";
import fonts from "../../styles/fonts";
import images from "../../styles/images";

const CourseFlipCard = ({ text, desc, image, videosList }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <TouchableOpacity onPress={() => setExpanded(!expanded)} style={styles.cardContainer}>
      <View style={[globalStyles.row,{alignItems:'center'}]}>
        <Image source={image} style={globalStyles.image} />
        <View style={styles.column}>
          <Text style={styles.containerText}>{text}</Text>
          <View style={styles.videos}>
            <Text style={styles.small}>{videosList.length} Videos</Text>
          </View>
        </View>

        <Ionicons
          name={expanded ? "chevron-up" : "chevron-down"}
          size={30}
          color={colors.darkGrey}
          style={styles.arrowIcon}
        />
      </View>

      {/* Expanded List of Videos with Questions and Time */}
      {expanded && (
        <FlatList
          data={videosList}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.videoRow}>
              <Image source={images.video_play} style={styles.image} />
              <Text style={styles.desc} numberOfLines={2}>{item.question}</Text>
              <Text style={styles.time}>{item.time} mins</Text>
            </View>
          )}
        />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    overflow: "hidden",
    borderColor: colors.grey300,
    borderWidth: 1,
    borderRadius: 20,
    marginVertical: 10,
    backgroundColor: colors.white,
    elevation: 3,
    padding: 10,
  },
  row: {
    flexDirection: "row",
  },
  column: {
    flexDirection: "column",
    marginLeft: 20,
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  containerText: {
    fontFamily: fonts.families.secondary,
    fontSize: fonts.sizes.regular,
    color: colors.black,
  },
  arrowIcon: {
    position: "absolute",
    right: 20,
  },
  small: {
    color: colors.themelight,
    fontFamily: fonts.families.secondary,
    fontSize: fonts.sizes.vsmall,
    marginHorizontal: 10,
  },
  videos: {
    backgroundColor: colors.lightPurple100,
    borderRadius: 20,
    padding: 5,
    marginVertical:5
  },
  videoRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    marginHorizontal: 10,
  },
  image: {
    width: 40,
    height: 40,
    resizeMode: "contain",
  },
  desc: {
    fontFamily: fonts.families.primary,
    fontSize: fonts.sizes.small,
    width: "70%",
    marginLeft: 10,
  },
  time: {
    fontFamily: fonts.families.secondary,
    fontSize: fonts.sizes.small,
    position: "absolute",
    right: 10,
  },
});

export default CourseFlipCard;
