import React,{useState} from 'react';
import { View, Text, StyleSheet, Image, Dimensions,TouchableOpacity,FlatList } from 'react-native';
import images from '../../../styles/images';
import fonts from '../../../styles/fonts';
import colors from '../../../styles/colors';
import { screenHeight,screenWidth } from '../../../common/utils/util';
import globalStyles from '../../../styles/globalStyles';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const YogaTypes = ({ yogaList }) => {
const [showAll, setShowAll] = useState(false);
 
const CurveComp = ({text}) => {
    return(
       <View style={styles.box}>
       <Text style={globalStyles.curveText}>{text}</Text>
       </View>
    );
   };
    const visibleItems = showAll ? yogaList : yogaList.slice(0, 3);
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



const ResultCard = ({ text, profile, slot, description,exp }) => {
  return (
    <View style={[styles.card]}>
    <View style={[globalStyles.row,{justifyContent:'space-evenly'}]}>
     <Image source={images.avatar_3} style={globalStyles.image}/>
    
     <View style={styles.column}>
     <View style={[globalStyles.row,{alignItems:'center',justifyContent:'space-evenly'}]}>   
     <Text style={styles.text}>{text}</Text>  
     <View
                  style={[
                    globalStyles.row,{marginLeft:20}
                  ]}
                >
                  {[...Array(5)].map(() => (
                    <FontAwesome
                      
                      name="star"
                      size={20}
                      color={colors.rating}
                    />
                  ))}
                </View>
     </View>
     <Text style={styles.small}>{profile}</Text>

     <View style={[globalStyles.row, { alignItems: 'center', marginVertical: 10, justifyContent: 'space-between', }]}>   
  <View style={{}}>
    <View style={styles.exp}>
      <Text style={[styles.experience, { color: colors.white }]}>{exp} Years</Text>
    </View>   
  </View>
  
  <View style={{flex:1,  flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>
    <Image source={images.fire} style={styles.image}/>  
    <Text style={[styles.small, { color: colors.green200, marginLeft: 5 }]}>{slot} Available Slots</Text>  
  </View>
</View>

     </View>
     </View>
     <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
     <YogaTypes yogaList={["Hatha Yoga", "Vinyasa Yoga", "Ashtanga Yoga", "Kundalini Yoga"]} />
     <Text style={[styles.small,{marginVertical:5}]}>{description}</Text>
      </View>  
   
    </View>      
   
  );
};

const styles = StyleSheet.create({
exp :{
    borderRadius:20,
    borderColor:colors.green200,
    borderWidth:1,
    backgroundColor:colors.green200,
    paddingHorizontal:8,
    paddingVertical:4
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
    padding:20,
   
    
   
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
 
  },
  image: {
    width: 15,
    height: 15, 
    
    resizeMode:'contain'
  },
  column:{
   flexDirection:'column',
   marginHorizontal:10
  },
  text:{
  fontFamily:fonts.families.secondary,
  fontSize:fonts.sizes.regular,
  marginTop:5 
  },
  small:{
  fontFamily:fonts.families.primary,
  fontSize:fonts.sizes.small,
  color:colors.grey200  
  },
  box :{
  borderRadius:20,
  borderColor:colors.grey300,
  borderWidth:1,
  paddingHorizontal:8,
  paddingVertical:2,
  marginHorizontal:5,
  marginVertical:5,
    
  },
  experience:{
  fontFamily:fonts.families.primary,
  fontSize:fonts.sizes.vsmall
  }
  
});

export default ResultCard;
