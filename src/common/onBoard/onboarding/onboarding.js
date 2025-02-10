import React, { useRef, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Dimensions,
  ScrollView,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import images from '../../../styles/images';
import colors from '../../../styles/colors';
import fonts from '../../../styles/fonts';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const Button = ({ text, icon, onPress, buttonStyle, textStyle, iconStyle }) => {
  return (
    <TouchableOpacity style={[styles.button, buttonStyle]} onPress={onPress}>
      <View style={styles.content}>
        <Text style={[styles.text, textStyle]}>{text}</Text>
        <Image source={icon} style={[styles.icon, iconStyle]} />
      </View>
    </TouchableOpacity>
  );
};

const calculateTextContainerTop = () => screenHeight * 0.45 + screenHeight * 0.05 + 90;

const Onboarding = ({ navigation }) => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const scrollRef = useRef(null);
  const intervalRef = useRef(null);

  const image = [images.image2, images.image2, images.image2];

  useEffect(() => {
    let currentIndex = 0;

    const startSliding = () => {
      intervalRef.current = setInterval(() => {
        currentIndex = (currentIndex + 1) % image.length;
        if (scrollRef.current) {
          scrollRef.current.scrollTo({
            x: currentIndex * screenWidth,
            animated: true,
          });
        }
      }, 3000);
    };

    startSliding();

    return () => {
      clearInterval(intervalRef.current);
    };
  }, []);

  const getDynamicMargin = () => {
    if (screenWidth < 320) return 5; 
    if (screenWidth >= 320 && screenWidth < 360) return 0; 
    if (screenWidth >= 360 && screenWidth < 480) return 20; 
    if (screenWidth >= 480 && screenWidth <= 768) return 40; 
    if (screenWidth > 768 && screenWidth <= 1024) return 80; 
    if (screenWidth > 1024 && screenWidth <= 1440) return 100; 
    return 120; 
  };
  

  const dynamicMargin = getDynamicMargin();


  return (
    <SafeAreaView style={styles.container}>
      <StatusBar translucent={true} backgroundColor="transparent" barStyle="light-content" />

      
      <View style={styles.topPurpleLayer} />
      <View style={styles.whiteLayer} />

     
      <View style={styles.imageSliderContainer}>
        <Animated.ScrollView
          ref={scrollRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: false }
          )}
          scrollEventThrottle={16}
        >
          {image.map((image, index) => (
            <Image
              key={index}
              source={image}
              style={[styles.image, { height: screenHeight * 0.4 }]} 
            />
          ))}
        </Animated.ScrollView>

       
        <View style={styles.dotsContainer}>
          {image.map((_, index) => {
            const dotOpacity = scrollX.interpolate({
              inputRange: [
                screenWidth * (index - 1),
                screenWidth * index,
                screenWidth * (index + 1),
              ],
              outputRange: [0.3, 1, 0.3],
              extrapolate: 'clamp',
            });
            return (
              <Animated.View
                key={index}
                style={[styles.dot, { opacity: dotOpacity }]}
              />
            );
          })}
        </View>
      </View>

      {/* Text and Button */}
      <View style={[styles.textContainer, { marginVertical: dynamicMargin }]}>
        <Text style={styles.largeTitle}>
          Grow your insight with inspiring news
        </Text>
        <Text style={styles.smallText}>
          Explore the world of analyzing news and sports where you will be submerged to games!
        </Text>
        <View  style={styles.footerContainer}>
          <Button
            text="GET STARTED"
            icon={images.arrow}
            onPress={() => navigation.navigate("Login")}
            buttonStyle={{ backgroundColor: colors.white }}
            textStyle={{ fontSize: fonts.sizes.medium, color: colors.themelight }}
            iconStyle={{ tintColor: colors.themelight }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.purple400,
  },
  topPurpleLayer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    // height: screenHeight * 0.10,
    backgroundColor: colors.purple400,
    zIndex: 1,
  },
  whiteLayer: {
    position: 'absolute',
    top: screenHeight * 0.1,
    left: 0,
    right: 0,
    height: screenHeight * 0.3,
    backgroundColor: colors.white,
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    zIndex: 2,
  },
  imageSliderContainer: {
    position: 'absolute',
    top: screenHeight * 0.17,
    alignSelf: 'center',
    width: '100%',
    aspectRatio: 16 / 9,
    height: screenHeight * 0.45,
    alignItems: 'center',
    zIndex: 3,
  },
  image: {
    width: screenWidth, 
    height: screenHeight * 0.3, 
    resizeMode: 'contain', 
  },
  dotsContainer: {
    flexDirection: 'row',
  
  },
  dot: {
    height: 5,
    width: 20,
    borderRadius: 4,
    backgroundColor: '#FFF',
    marginHorizontal: 5,
    
  },
  footerContainer: {
    // position: "absolute",
    // bottom: 0,
    width: "80%",
    alignSelf: "flex-end",
    paddingHorizontal: screenWidth * 0.1,
     marginBottom:10
  },
  textContainer: {
  
    // alignItems: 'center',
    // alignSelf: 'center',
    zIndex: 3,
    // justifyContent:'center',
    // flex:2,
    position: 'absolute',
    top: calculateTextContainerTop(),
    alignSelf: 'center',
  },
  largeTitle: {
    fontSize: fonts.sizes.semilarge,
    color: '#FFFFFF',
    fontFamily: fonts.families.bold,
    marginBottom: 10,
    textAlign: 'center',
    marginHorizontal:20
    
  },
  smallText: {
    fontSize: fonts.sizes.regular,
    color: '#FFFFFF',
    textAlign: 'center',
    marginHorizontal: 20,
    marginBottom: 20,
    fontFamily: fonts.families.primary,
  },
  button: {
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 14,
    width: screenWidth * 0.6,
    justifyContent: 'center',
    marginVertical: 10,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  text: {
    color: colors.white,
    fontSize: 16,
    fontFamily: fonts.families.bold,
  },
  icon: {
    width: 15,
    height: 15,
    resizeMode: 'contain',
  },
});

export default Onboarding;