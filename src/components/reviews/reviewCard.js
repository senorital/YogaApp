import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import colors from '../styles/colors';
import images from '../styles/images';
import fonts from '../styles/fonts';
import { screenHeight, screenWidth } from '../utils/util';

const ReviewCard = ({ username, rating, date, reviewText, avatar }) => {
    const baseWidth = 375; // Reference screen width (e.g., iPhone X)
    const baseIconSize = 12; // Icon size for the reference screen width
    const iconSize = (screenWidth / baseWidth) * baseIconSize; 
  return (
    <View style={styles.reviewCard}>
      <Image source={avatar || images.avatar} style={styles.avatar} />
      <View style={styles.reviewContent}>
        <Text style={styles.username}>{username}</Text>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <View style={styles.stars}>
            {[...Array(rating)].map((_, index) => (
              <FontAwesome key={index} name="star" size={iconSize} color={colors.rating} />
            ))}
            {[...Array(5 - rating)].map((_, index) => (
              <FontAwesome key={index + rating} name="star-o" size={iconSize} color={colors.rating} />
            ))}
          </View>
          <Text style={styles.date}>{date}</Text>
        </View>
        <Text style={styles.reviewText}>{reviewText}</Text>
        <TouchableOpacity style={styles.helpfulButton}>
          <Text style={styles.helpfulText}>Helpful</Text>
          <MaterialIcons name="thumb-up" size={15} color={colors.grey} style={{ marginHorizontal: 5, marginTop: -5 }} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  reviewCard: {
    flexDirection: 'row',
    marginBottom: 20,
    padding: 12,
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 2,
  },
  avatar: {
    position: 'absolute',
    top: -10,
    left: -10,
    width: 50,
    height: 50,
    borderRadius: 10,
  },
  reviewContent: {
    marginLeft: 12,
    flex: 1,
    marginTop: 20,
  },
  username: {
    fontFamily: fonts.families.secondary,
    fontSize: fonts.sizes.regular,
  },
  stars: {
    flexDirection: 'row',
    marginVertical: 4,
  },
  date: {
    fontSize: fonts.sizes.vsmall,
    color: colors.grey,
    fontFamily: fonts.families.primary,
  },
  reviewText: {
    marginVertical: 8,
    fontSize: fonts.sizes.small,
    fontFamily: fonts.families.primary,
  },
  helpfulButton: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  helpfulText: {
    color: colors.grey,
    fontFamily: fonts.families.primary,
    fontSize: fonts.sizes.vsmall,
  },
});

export default ReviewCard;
