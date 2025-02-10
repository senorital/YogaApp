import React,{useState} from "react";
import { StyleSheet,TextInput,View,Image } from "react-native";
import colors from "../../styles/colors";
import fonts from "../../styles/fonts";
import images from "../../styles/images";

const Search = () => {
const [searchText, setSearchText] = useState(""); 

  return (
    
    <View style={styles.input}>
    <TextInput
     value={searchText}
     placeholder={'Search Yoga Instructor'}
     style={styles.text}
     onChangeText={setSearchText}
     placeholderTextColor={colors.grey200}
     />
     <Image source={images.searchBar} style={styles.image}/>
    </View>
   
  )  
};

const styles = StyleSheet.create({

input :{flexDirection:'row',alignItems:'center',justifyContent:'space-between',borderRadius:20,backgroundColor:colors.white,elevation:5,paddingHorizontal:10},
text :{fontFamily:fonts.families.primary,color:colors.black,fontSize:fonts.sizes.regular},
image :{width:20,height:20,resizeMode:'contain'}

});
export default Search;