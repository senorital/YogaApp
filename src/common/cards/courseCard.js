import React,{useState} from 'react';
import { View, Text, StyleSheet, ImageBackground, Image, Dimensions,TouchableOpacity,FlatList } from 'react-native';
import images from '../../styles/images';
import fonts from '../../styles/fonts';
import colors from '../../styles/colors';
import { screenHeight,screenWidth } from '../utils/util';
import globalStyles from '../../styles/globalStyles';
import RateView from './rateView';
import FontAwesome from 'react-native-vector-icons/FontAwesome';


const CourseCard = ({ text,time,description,rate}) => {
  return (
    <View style={[styles.card, { width: screenWidth*0.7}]}> 
    
     <Image source={images.course1} style={{width:screenWidth *0.7,height:screenHeight*0.15,borderRadius:10}}/> 
      <View style={{padding:10}}>
     <View style={[styles.row]}>
      <RateView maxRating={5} rating={4} width={'50'} /> 
      <FontAwesome  name="star" size={20} color={colors.rating}/>
     <View style={{position:'absolute',right:0}}>
      <View style={styles.row}> 
     <Image source={images.time_circle} style={styles.image}/>  
     <Text style={[styles.small,{color:colors.grey200}]}>{time}</Text>  
     </View>
     </View> 
     </View>
     <Text style={[styles.small,{marginVertical:5}]}>{description}</Text>
     <View style={styles.row}>
     <Image source={images.avatar_3} style={globalStyles.camera} />
     <Text style={styles.text}>{text}</Text>
     <View style={styles.rate}>
     <Text style={styles.rateText}>₹ {rate} Only</Text>
    </View>
     </View>
    </View>  
    </View>   
   
  );
};

const styles = StyleSheet.create({

  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    marginVertical: 10,
    shadowOffset: { width: 0, height: 3 },
    borderColor:'#D9D9D9',
    borderWidth:1,
    
    overflow: 'hidden',
    minHeight: screenHeight * 0.2,
   
  },
  
  image: {
    width: 15,
    height: 15, 
    marginRight:5,
    resizeMode:'contain'
  },
  row:{
  alignItems:'center',
  flexDirection:'row'
  },
  rateText :{
  fontFamily:fonts.families.primary,
  fontSize:fonts.sizes.vsmall,
  color:colors.orange
  },
  small:{
  fontFamily:fonts.families.secondary,
  fontSize:fonts.sizes.vsmall,
  color:colors.black  
  },
  text : {
  fontFamily:fonts.families.primary,
  fontSize:fonts.sizes.vsmall,
  marginHorizontal:10
  },
  rate :{
  backgroundColor:colors.lightOrange100,
  padding:5,
  borderRadius:20,
  position:'absolute',
  right:0  
  }
  
});

export default CourseCard;
