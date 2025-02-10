import React, { useState,useEffect } from "react";
import { View, Text, TextInput,StatusBar,ScrollView,  Keyboard,TouchableOpacity, StyleSheet, Alert,Image } from "react-native";
import { Header } from '../../../../common/header/header';
import images from "../../../../styles/images";
import colors from "../../../../styles/colors";
import fonts from "../../../../styles/fonts";
import TextBox from "../../../../styles/textInput";
import Button from "../../../../common/button/button";
import { screenHeight, screenWidth } from "../../../../common/utils/util";
import { RadioButton } from 'react-native-paper'; 
import { launchImageLibrary } from 'react-native-image-picker'; // Import ImagePicker
import Ionicons from 'react-native-vector-icons/Ionicons';
import DatePicker from "../../../../styles/datePicker";


let cameraSize, uploadButtonSize,gender;

if (screenWidth <= 360) {  
  cameraSize = 50;
  uploadButtonSize = 130;
  gender = 40;
} else if (screenWidth > 360 && screenWidth <= 768) { 
  cameraSize = 90;
  uploadButtonSize = 190;
  gender = 40;
} else { 
  cameraSize = 70;
  gender=40;
  uploadButtonSize = 200;
}

const AccountDetails = ({ accountNo, ifscCode, branch,bankName,isSelected, onSelect }) => {
return (
        <TouchableOpacity 
        style={[styles.component, isSelected && styles.selectedComponent]} 
        onPress={onSelect}>
         <View style={styles.row}>
        <Text style={styles.bankName}>{bankName}</Text>
        <View style={styles.radioButton}>
        <RadioButton
         color={colors.theme}
         uncheckedColor={colors.grey}
         status={isSelected ? 'checked' : 'unchecked'}
     
       />
       </View>
      </View>
        <View style={styles.detailRow}>
          <Text style={styles.label}>Account No</Text>
          <Text style={styles.value}>{accountNo}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.label}>IFSC Code</Text>
          <Text style={styles.value}>{ifscCode}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.label}>Branch</Text>
          <Text style={styles.value}>{branch}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  

const CompleteProfile = ({route}) => {
  const { initialStep = 1 } = route.params || {}; 
  const [currentStep, setCurrentStep] = useState(initialStep);
  const [selectedGender, setSelectedGender] = useState(null);
  const [selectedAccount, setSelectedAccount] = useState(null); // Track selected account
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    dob: "",
    bio: "",
    qualification: "",
    university_name: "",
    year: "",
    photo: null,
    account_no : "",
    branch : "",
    ifsc : "",
    aadhar:""
    

  });

    useEffect(() => {
      const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
        setKeyboardVisible(true);
      });
      const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
        setKeyboardVisible(false);
      });
  
      return () => {
        showSubscription.remove();
        hideSubscription.remove();
      };
    }, []);
  
  
  const handleGenderSelect = (gender) => {
    setSelectedGender(gender); 
  };
  const handleInputChange = (name, value) => {
    if (name === "photo") {
       
        launchImageLibrary(
          {
            mediaType: 'photo', 
            includeBase64: false,  
            quality: 1, 
          },
          (response) => {
            if (response.didCancel) {
              console.log('User canceled image picker');
            } else if (response.errorCode) {
              console.log('ImagePicker Error: ', response.errorMessage);
            } else {
              const source = { uri: response.assets[0].uri };
              setFormData({ ...formData, photo: source.uri });
            }
          }
        );
      }
    setFormData({ ...formData, [name]: value });
  };

  const handleNext = () => {
    // if (currentStep === 0 && (!formData.fullName || !formData.email || !formData.phone)) {
    //   Alert.alert("Error", "All fields are required in Personal Info");
    //   return;
    // }
    // if (currentStep === 1 && (!formData.address || !formData.city || !formData.zip)) {
    //   Alert.alert("Error", "All fields are required in Address");
    //   return;
    // }
    setCurrentStep(currentStep + 1);
  };

  const handlePrevious = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleSubmit = () => {
    if (!formData.photo) {
      Alert.alert("Error", "Please upload a photo");
      return;
    }
    Alert.alert("Success", "Profile completed successfully!");
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <View>
             <Header title={'Personal Information'} icon={images.back} />
             <View style={styles.formContainer}>
              <View style={{justifyContent:'center',alignItems:'center'}}>
            <TouchableOpacity
              style={styles.uploadButton}
              onPress={() => handleInputChange("photo", "dummy_photo_url")}
            >
               <Image source={images.camera} style={styles.camera}/> 
              <Text style={[styles.heading,{fontFamily:fonts.families.primary}]}>Add your photos</Text>
            </TouchableOpacity>
            {formData.photo && <Text style={styles.successText}>Photo Uploaded!</Text>}
          </View>
            <TextBox
                heading="Name"
                placeholder="Enter your full name"
                value={formData.name}
                onChangeText={(value) => handleInputChange('name', value)}
             
              />
              
              <DatePicker
                heading="Date Of Birth"
                placeholder="Enter your DOB"
                value={formData.dob}
                onChangeText={(value) => handleInputChange('dob', value)}
                
              />
              <Text style={[styles.heading,{fontSize:fonts.sizes.semismall,marginBottom:5}]}>Gender</Text> 
               <View style={styles.genderRow}>
               <TouchableOpacity  style={[ styles.gender,selectedGender === 'male' && styles.selectedComponent]}
               onPress={() => handleGenderSelect('male')}>
                <Image source={images.male} style={{width:gender,height:gender,resizeMode:'contain'}}/>
                <Text style={styles.genderText}>Male</Text>
                </TouchableOpacity> 
                <TouchableOpacity style={[styles.gender,selectedGender === 'female' && styles.selectedComponent]} onPress={() => handleGenderSelect('female')}>
                <Image source={images.female} style={{width:gender,height:gender,resizeMode:'contain'}}/>
                <Text style={styles.genderText}>Female</Text>
                </TouchableOpacity> 
               </View>
              <TextBox
                heading="Bio"
                placeholder="Enter your Bio"
                value={formData.bio}
                onChangeText={(value) => handleInputChange('bio', value)}
                // error={errors.name}
              />
             </View>
          </View>
        );
      case 1:
        return (
            
          <View>
           <Header title={'Education Details'} icon={images.back} />
           <View style={styles.formContainer}>
           <TextBox
                heading="Highest Qualification"
                placeholder="Enter your Highest Qualification"
                value={formData.qualification}
                onChangeText={(value) => handleInputChange('qualification', value)}
                // error={errors.name}
              />
            <TextBox
                heading="University/ Institute Name"
                placeholder="Enter your University/ Institute Name"
                value={formData.university_name}
                onChangeText={(value) => handleInputChange('university_name', value)}
                // error={errors.name}
              />
            <TextBox
                heading="Year Of Completion"
                placeholder="Enter your Year Of Completion"
                value={formData.year}
                onChangeText={(value) => handleInputChange('year', value)}
                // error={errors.name}
              />
               <TouchableOpacity style={styles.addTimeSlot}>
                     <Text style={styles.addTimeSlotText}>Add</Text>
                     <View style={styles.divider} />
                     <Ionicons name="add" size={20} color="black" style={styles.plusIcon} />
                   </TouchableOpacity>
                   </View>
          </View>
        );
      case 2:
        return (

            <View>
         <Header title={'Bank Details'} icon={images.back} />
         <View style={styles.formContainer}>
            <TextBox
                 heading="Account Number"
                 placeholder="Enter your Account Number"
                 value={formData.account_no}
                 onChangeText={(value) => handleInputChange('account_no', value)}
                 // error={errors.name}
               />
             <TextBox
                 heading="Branch"
                 placeholder="Enter your Branch Name"
                 value={formData.branch}
                 onChangeText={(value) => handleInputChange('branch', value)}
                 // error={errors.name}
               />
             <TextBox
                 heading="IFSC code"
                 placeholder="Enter your IFSC code"
                 value={formData.ifsc}
                 onChangeText={(value) => handleInputChange('ifsc', value)}
                 // error={errors.name}
               />
               </View>
           </View>
       
        );

        case 3:
            const handleAccountSelect = (accountNo) => {
                setSelectedAccount(accountNo); 
              };
            return (
    
                <View>
                     <Header title={'Bank Details'} icon={images.back} />
                     <View style={styles.formContainer}>
                <View style={styles.row}>
               <Text style={styles.heading}>Added Account</Text>
               <Image source={images.trash} style={styles.image} />
               </View>
               <AccountDetails accountNo="1234567890987654" ifscCode="AX123456789" branch="Shamli"  bankName="Axis Bank"  isSelected={selectedAccount === '1234567890987654'}
        onSelect={() => handleAccountSelect('1234567890987654')}/>
               <AccountDetails accountNo="1234567890987654" ifscCode="AX123456789" branch="Shamli"  bankName="Axis Bank"   isSelected={selectedAccount === '2345678909876543'}
        onSelect={() => handleAccountSelect('2345678909876543')}/>
                </View>
               </View>
           
            );

            case 4:
               
                return (
        
                    <View>
                         <Header title={'Verification'} icon={images.back} />
                         <View style={styles.formContainer}>
                         <TextBox
                 heading="Aadhar Number "
                 placeholder="Enter your Aadhar Number "
                 value={formData.aadhar}
                 onChangeText={(value) => handleInputChange('aadhar', value)}
                 // error={errors.name}
               />
               </View>
                   </View>
               
                );
      default:
        return null;
    }
  };

  return (
   
    <View style={styles.container}>
    <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
    <ScrollView contentContainerStyle={{paddingBottom:50}}  keyboardShouldPersistTaps="handled">

      <View>
       
        {renderStepContent()}

        </View>
       
     
     </ScrollView>
     {!isKeyboardVisible && ( 
     <View style={styles.footerContainer}>
      
      {currentStep < 4 ? (
       <Button
       text="Save and Continue"
       icon={images.arrow}
       onPress={handleNext}
       buttonStyle={{ backgroundColor: colors.purple300 }}
       textStyle={{ fontSize: fonts.sizes.medium }}
       iconStyle={{ tintColor: colors.white }}
     />
      ) : (
          <Button
          text="Submit"
          icon={images.arrow}
          onPress={handleSubmit}
          buttonStyle={{ backgroundColor: colors.purple300 }}
          textStyle={{ fontSize: fonts.sizes.medium }}
          iconStyle={{ tintColor: colors.white }}
        />
      )}
    </View>
     )}
    </View>
  );
};

const styles = StyleSheet.create({
camera : {height:cameraSize,width:cameraSize,resizeMode:'contain'},    
uploadButton : {width: uploadButtonSize, height: uploadButtonSize, borderRadius: 100,  borderWidth: 1, alignItems: "center",justifyContent: "center",textAlign:'center'},   
radioButton : {alignItems:'center',marginTop:-5, transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }]},    
bankName : {fontFamily:fonts.families.bold,fontSize:fonts.sizes.regular,color:colors.themelight},    
image : {width:20,height:20,resizeMode:'contain'}, 
row :{flexDirection:'row',justifyContent:'space-between',marginVertical:5},   
footerContainer: { position: "absolute", bottom: 0, width: "80%", alignSelf: "flex-end",paddingHorizontal: screenWidth * 0.1, marginBottom:screenHeight * 0.04 },
text: {fontFamily: fonts.families.primary,color: colors.grey,fontSize:fonts.sizes.small},
details :{paddingHorizontal:20,marginTop:20,},
container: { flex: 1,  backgroundColor: "#fff" },
formContainer: {flex:1, paddingHorizontal:20,marginTop:10 },
successText: { color: "green", marginTop: 5 },
selectedComponent: {backgroundColor: colors.purple200, borderColor: colors.theme,borderWidth:2 },
component: {borderColor: '#D9D9D9',padding: 15,borderRadius: 10,borderWidth:1,marginVertical:10},
detailRow: {flexDirection: "row",justifyContent: "space-between",marginBottom: 5,},
label: {fontSize: fonts.sizes.regular,color:colors.grey200,fontFamily:fonts.families.secondary},
value: {fontSize: fonts.sizes.regular,fontFamily:fonts.families.primary,color:colors.grey200},
heading : {fontFamily:fonts.families.secondary,fontSize:fonts.sizes.semismall},
genderText :{fontFamily:fonts.families.primary,fontSize:fonts.sizes.vsmall,marginTop:5},
genderRow : {flexDirection:'row',justifyContent:'space-evenly',alignItems:'center'},
gender : {borderColor:colors.purple700,borderWidth:1,paddingHorizontal:55,paddingVertical:8,borderRadius:10,justifyContent:'center',alignItems:'center',alignContent:'center'},
addTimeSlot: {flexDirection: 'row',alignItems: 'center',padding: 8,alignSelf: 'flex-end',backgroundColor: colors.orange100,borderRadius: 10,elevation: 2,marginTop: 15,marginHorizontal: screenWidth*0.05,}, 
divider: {height: '100%',width: 1,backgroundColor: 'grey',marginHorizontal: 10,},
addTimeSlotText: {fontSize: fonts.sizes.small,fontFamily: fonts.families.secondary,color: colors.black,
  }, 
});

export default CompleteProfile;
