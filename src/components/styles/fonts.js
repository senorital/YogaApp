import { Dimensions } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

const { width } = Dimensions.get("window");

const guidelineBaseWidth = 375; 

const scale = (size) => (width / guidelineBaseWidth) * size;

const fonts = {
  families: {
    primary: "Poppins-Regular", 
    secondary : "Poppins-Medium",  
    bold: "Poppins-SemiBold", 
    light : "Poppins-Light",       
    italic: "Poppins-Italic",   
  },
  sizes: {
    vsmall: RFValue(10),
    small: RFValue(12),
    semismall: RFValue(13),          
    regular: RFValue(14),      
    medium: RFValue(16),         
    large: RFValue(18),      
    semilarge: RFValue(20),      
   
    extraLarge: RFValue(24),     
  },
  weights: {
    light: "300",              
    normal: "400",               
    bold: "700",                 
  },
  spacing: {
    small: scale(4),            
    regular: scale(8),          
    large: scale(16),  
    semilarge : scale(32),
    extraLarge : scale(64)        
  },
};

export default fonts;
