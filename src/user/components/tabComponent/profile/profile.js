import React from "react";
import { StyleSheet,Image,View,Text, TouchableOpacity } from "react-native";
import globalStyles from "../../../../styles/globalStyles";
import images from "../../../../styles/images";
import fonts from "../../../../styles/fonts";
import { Header } from "../../../../common/header/header";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import colors from "../../../../styles/colors";
import { screenHeight, screenWidth } from "../../../../common/utils/util";

const Container = ({text,image,desc}) => {

return(
    <View style={styles.row}>
    <Image source={image} style={globalStyles.camera}/>
    <View style={styles.column}>
    <Text style={styles.containerText}>{text}</Text>
    <Text style={[styles.small]}>{desc}</Text>
    </View>
    <FontAwesome name="angle-right" size={25} color={colors.darkGrey100} style={styles.icon} />

    </View>
);    
};

const UserProfile = () => {

 return(
    <View style={globalStyles.container}>
    <Header title={'Profile'} icon={images.back}/> 
    <View style={globalStyles.flex}>  
    <View style={[globalStyles.row,{marginBottom:10}]}>
    <Image source={images.avatar} style={{width:screenWidth * 0.25,height:screenHeight*0.12,resizeMode:'contain'}}/>
    <View style={styles.column}>
    <Text style={styles.text}>Ankush Gupta</Text> 
    <View style={globalStyles.row}>
    {[...Array(5)].map((_, index) => (
    <FontAwesome key={index} name="star" size={18} color={colors.rating} />
    ))}
    </View> 
    <TouchableOpacity style={styles.viewProfile}><Text style={styles.profileButton}>View Profile</Text></TouchableOpacity>
    </View>  
    </View>
    <Text style={[styles.medium]}>WorkSpace</Text>
    <View style={styles.subComponents}>
    <Container text={'Help and Support'} image={images.settings} desc={'stuck in something, Solve it out'} />
    <Container text={'Help and Support'} image={images.alert} desc={'stuck in something, Solve it out'} />
    <Container text={'Help and Support'} image={images.speed} desc={'stuck in something, Solve it out'} />
    <Container text={'Help and Support'} image={images.bell} desc={'stuck in something, Solve it out'} />
    </View>
    </View> 
    </View>
 );   
};

const styles = StyleSheet.create({
text :{fontFamily:fonts.families.bold,fontSize:fonts.sizes.medium},
small :{fontFamily:fonts.families.secondary,fontSize:fonts.sizes.small},
subComponents :{backgroundColor:colors.lightPink300,borderRadius:10,borderColor:colors.lightPink300},
icon :{position:'absolute',right:0},
containerText :{fontFamily:fonts.families.secondary,fontSize:fonts.sizes.regular},
row :{flexDirection:'row',alignItems:'center',padding:10,margin:10,borderBottomColor:colors.white,borderBottomWidth:1},
image :{width:20,height:20,resizeMode:'contain'},
medium :{fontFamily:fonts.families.secondary,color:colors.grey,fontSize:fonts.sizes.regular,marginVertical:10},
column :{flexDirection:'column',marginLeft:20},
profileButton :{color:colors.themelight,fontFamily:fonts.families.secondary,fontSize:fonts.sizes.semismall},
viewProfile:{backgroundColor:colors.purple200,padding:5,borderRadius:20,marginVertical:10}
});

export default UserProfile;