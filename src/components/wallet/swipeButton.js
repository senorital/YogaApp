import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, Animated, PanResponder, Image } from 'react-native';
import colors from '../styles/colors';
import fonts from '../styles/fonts';
import images from '../styles/images';
import { screenWidth } from '../utils/util';

const SwipeButton = ({ onSwipe }) => {
  const panX = useRef(new Animated.Value(0)).current;
  const [swipeCompleted, setSwipeCompleted] = useState(false);

  const maxX = screenWidth * 0.3;      
  const threshold = screenWidth * 0.3;   

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (evt, gestureState) => {
        return Math.abs(gestureState.dx) > 5;
      },
      onPanResponderMove: (evt, gestureState) => {
        let newX = gestureState.dx;
        if (newX < 0) newX = 0;
        if (newX > maxX) newX = maxX;
        panX.setValue(newX);
      },
      onPanResponderRelease: (evt, gestureState) => {
        if (gestureState.dx > threshold) {
          setSwipeCompleted(true);
          onSwipe && onSwipe();
          Animated.timing(panX, {
            toValue: maxX,
            duration: 100,
            useNativeDriver: true,
          }).start(() => {
            setTimeout(() => {
              Animated.spring(panX, {
                toValue: 0,
                useNativeDriver: true,
              }).start(() => {
                setSwipeCompleted(false);
              });
            }, 300);
          });
        } else {
          Animated.spring(panX, {
            toValue: 0,
            useNativeDriver: true,
          }).start();
        }
      },
    })
  ).current;

  return (
    <View style={styles.buttonContainer}>
      <View style={styles.leftSection}>
        
        <Animated.View
          style={[styles.handleContainer, { transform: [{ translateX: panX }] }]}
          {...panResponder.panHandlers}>
          <View style={styles.imageCircle}>
            {swipeCompleted ? (
              <Image source={images.arrow_right} style={styles.image} />
            ) : (
              <Image source={images.arrow_right} style={styles.image} />
            )}
          </View>
        </Animated.View>
        <Text style={styles.buttonText}>Swipe to Withdraw</Text>
      </View>
      <View style={styles.rightSection}>
        <Text style={styles.balanceLabel}>Wallet Balance</Text>
        <Text style={styles.balanceValue}>₹ 5,800</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.purple300,
    borderRadius: 50,
    padding: 4,
    marginHorizontal: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  image :{
  width:20,
  height:20,
  resizeMode:'contain'
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  handleContainer: {
    zIndex: 2,
  },
  imageCircle: {
    backgroundColor: colors.white,
    padding: 15,
    borderRadius: 50,
  },
  handleText: {
    fontSize: 14,
    fontFamily: fonts.families.bold,
    color: colors.themem,
  },
  buttonText: {
    marginLeft: 10,
    fontSize: fonts.sizes.semismall,
    fontFamily: fonts.families.primary,
    color: colors.white,
  },
  rightSection: {
    flex: 1,
    alignItems: 'flex-end',
    paddingHorizontal: 10,
  },
  balanceLabel: {
    fontSize: fonts.sizes.small,
    fontFamily: fonts.families.primary,
    color: colors.white,
  },
  balanceValue: {
    fontSize: 16,
    fontFamily: fonts.families.bold,
    color: colors.orange100,
  },
});

export default SwipeButton;
