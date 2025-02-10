import React from "react";
import { StyleSheet,View,Text, Image } from "react-native";
import colors from "../../styles/colors";
import images from "../../styles/images";
import globalStyles from "../../styles/globalStyles";
import fonts from "../../styles/fonts";
import { screenWidth } from "../utils/util";



const IconCardList = ({text,image}) => {

return(
    <View style={styles.box}>
    <Image source={image} style={styles.image} />
    <Text style={styles.text}>{text}</Text>
    </View>
);    
};

const styles= StyleSheet.create({
box :{backgroundColor:colors.lightOrange200,padding:12,justifyContent:'center',alignItems:'center',borderRadius:20,width:screenWidth * 0.289,marginRight:10,marginVertical:8},
text :{fontFamily:fonts.families.secondary,fontSize:fonts.sizes.vsmall,marginTop:10},
image :{width:40,height:40,resizeMode:'contain'}
});

export default IconCardList;