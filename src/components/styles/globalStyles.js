
import { StyleSheet, Dimensions } from 'react-native';
import colors from './colors'; 
import fonts from './fonts';   
import { screenHeight } from '../utils/util';



const globalStyles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: colors.white,
    
  },
  image :{
  width:80,
  height:80,
  resizeMode:'contain'
  },
  cardContainer :{
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 8,
    marginVertical: 8,
    // Shadow for iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    // Elevation for Android
    elevation: 3,

  },
  nameText :{
      letterSpacing:0.001,
      fontFamily: fonts.families.bold,
      fontSize: fonts.sizes.regular,
      color:colors.themelight
  },
  avatar :{

  },
  row:{
    flexDirection: 'row',
  },
  button :{
    justifyContent:'flex-end',
    alignSelf: 'flex-end',
    marginRight: 20, 
    marginBottom:screenHeight * 0.1
    },
    small :{
    fontFamily:fonts.families.primary,
    fontSize:fonts.sizes.small,
    color:'#5A5A5A'    
    },
    medium :{  
        fontFamily:fonts.families.primary,
        fontSize:fonts.sizes.semismall,
        color:colors.grey 
    },
    edit :{  
      fontFamily:fonts.families.secondary,
      fontSize:fonts.sizes.semismall,
      color:colors.purple300 ,
      marginTop:10
  },
    imageBackground: {
        width: "100%",
        height: 60, 
        position: "absolute", 
        top: 0, 
        left: 0,
        right: 0,
        backgroundColor:'transparent'
      },
      camera :{
      width:50,
      height:50,
      resizeMode:'contain',
      borderRadius:10  
      }
  
});
  export default globalStyles;
