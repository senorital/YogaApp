import React,{useState} from 'react';
import { View, Text, StyleSheet, ImageBackground, Image, Dimensions,TouchableOpacity,FlatList } from 'react-native';
import images from '../../styles/images';
import fonts from '../../styles/fonts';
import colors from '../../styles/colors';
import { screenHeight,screenWidth } from '../utils/util';
import globalStyles from '../../styles/globalStyles';
import RateView from './rateView';




const YogaTypes = ({ yogaList }) => {
const [showAll, setShowAll] = useState(false);
 
const CurveComp = ({text}) => {
    return(
       <View style={styles.box}>
       <Text style={globalStyles.curveText}>{text}</Text>
       </View>
    );
   };
    const visibleItems = showAll ? yogaList : yogaList.slice(0, 2);
    const remainingCount = yogaList.length - 2;
  
    return (
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <FlatList
          data={visibleItems}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => <CurveComp text={item} />}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
        
        {/* Show +X Button if more than 2 items */}
        {!showAll && remainingCount > 0 && (
          <TouchableOpacity onPress={() => setShowAll(true)} style={styles.plusButton}>
            <Text style={styles.plusText}>+{remainingCount}</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  };



const InstructorCard = ({ text, profile, slot, width,description,exp }) => {
  return (
    <View style={[styles.card, { width: screenWidth*0.7}]}>
    <View style={[globalStyles.row,{alignItems:'flex-start'}]}>
     <Text style={[styles.experience,{color:colors.white}]}>{exp} Year Experience</Text>   
    <View style={{position:'absolute',right:0}}>
    <RateView rating={4} maxRating={5} width={'80'} />
    </View>
    </View>  
     <View style={styles.row}>
     <Image source={images.avatar_3} style={globalStyles.image}/> 
     <Text style={styles.text}>{text}</Text>
     <Text style={styles.small}>{profile}</Text>
     <View style={globalStyles.row}>
      <Image source={images.fire} style={styles.image}/>  
      <Text style={[styles.small,{color:colors.green200}]}>{slot} Available Slots</Text>  
     </View>
     <YogaTypes yogaList={["Hatha Yoga", "Vinyasa Yoga", "Ashtanga Yoga", "Kundalini Yoga"]} />
     <Text style={[styles.small,{marginVertical:5}]}>{description}</Text>
     <View style={styles.horizontalRow}/>
     <Text style={globalStyles.curveText}>VIEW PROFILE</Text>
    </View>  
    </View>      
   
  );
};

const styles = StyleSheet.create({
horizontalRow: {
borderBottomWidth: 2,  
borderBottomColor: 'black', 
width: '50%', 
marginVertical: 10, 
      },
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
    padding:10,
    overflow: 'hidden',
    minHeight: screenHeight * 0.2,
   
  },
  plusButton :{
  backgroundColor:colors.blue100,
  borderRadius:20,
  paddingHorizontal:8
  },
  plusText:{
  fontFamily:fonts.families.primary,
  fontSize:fonts.sizes.vsmall,
  color:colors.white,
  textAlign:'center'
  },
  horizontalrow :{
  color:colors.black,
  width:10,
  height:4,
  },
  image: {
    width: 15,
    height: 15, 
    marginRight:5,
    resizeMode:'contain'
  },
  row:{
  justifyContent:'center',
  alignItems:'center',
  marginVertical:10
  },
  text:{
  fontFamily:fonts.families.secondary,
  fontSize:fonts.sizes.semismall,
  marginTop:5 
  },
  small:{
  fontFamily:fonts.families.primary,
  fontSize:fonts.sizes.vsmall,
  color:colors.grey200  
  },
  box :{
  borderRadius:20,
  borderColor:colors.grey300,
  borderWidth:1,
  paddingHorizontal:8,
  paddingVertical:2,
  marginHorizontal:8,
  marginVertical:5,
    
  },
  experience:{
  borderRadius:20,
  borderColor:colors.green200,
  borderWidth:1,
  backgroundColor:colors.green200,
  paddingHorizontal:10,
  paddingVertical:5
  
 
  }
  
});

export default InstructorCard;
