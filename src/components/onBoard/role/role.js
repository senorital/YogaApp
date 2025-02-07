import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { RadioButton } from 'react-native-paper'; 
import {Header} from '../../header/header';
import colors from '../../styles/colors';
import images from '../../styles/images';
import fonts from '../../styles/fonts';
import Footer from '../../footer/footer';
import globalStyles from '../../styles/globalStyles';
import Button from '../../button/button';
import { screenHeight, screenWidth } from '../../utils/util';
const calculatePadding = () => {
  if (screenWidth <= 320) return 10; 
  if (screenWidth <= 768) return 15; 
  return 20; 
};

const getCardHeight = () => {
  if (screenWidth < 360) return screenWidth * 0.35; // Small screens
  if (screenWidth < 600) return screenWidth * 0.3; // Medium screens
  return screenWidth * 0.25; // Large screens
};

const Role = ({ navigation }) => {
  const [selectedRole, setSelectedRole] = useState(null);

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
  };


  return (
    <View style={globalStyles.container}>
      <Header title={'Select Role'} icon={images.back} />

      <View style={styles.modalContent}>
        <Text style={styles.modalTitle}>What Best Defines You?</Text>
        <Text style={styles.text}>
          Choose the role that best describes how you want to engage with the world of yoga.
        </Text>

       
        <TouchableOpacity
          style={[
            styles.card,
            selectedRole === 'Learner' && styles.selectedCard, 
          ]}
          onPress={() => handleRoleSelect('Learner')}
        >
          <View style={styles.rowContainer}>
            <Image source={images.role} style={styles.image} />
            <View style={styles.textContainer}>
              <Text style={styles.cardText}>Learner</Text>
              <Text style={styles.subText}>
              Explore yoga, learn techniques, join tailored sessions
              </Text>
            </View>
            <RadioButton
              value="Learner"
              status={selectedRole === 'Learner' ? 'checked' : 'unchecked'}
              onPress={() => handleRoleSelect('Learner')}
              color={colors.theme}
              uncheckedColor={colors.grey}
            />
          </View>
        </TouchableOpacity>

       
        <TouchableOpacity
          style={[
            styles.card,
            selectedRole === 'Instructor' && styles.selectedCard, 
          ]}
          onPress={() => handleRoleSelect('Instructor')}
        >
          <View style={styles.rowContainer}>
            <Image source={images.role} style={styles.image} />
            <View style={styles.textContainer}>
              <Text style={styles.cardText}>Instructor</Text>
              <Text style={styles.subText}>
              List classes, connect with learners, grow clients
             </Text>
            </View>
            <RadioButton
              value="Instructor"
              status={selectedRole === 'Instructor' ? 'checked' : 'unchecked'}
              onPress={() => handleRoleSelect('Instructor')}
              color={colors.theme}
              uncheckedColor={colors.grey}
            />
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.footerContainer}>
        <Button
          text="Get Started"
          icon={images.arrow}
          onPress={() => navigation.navigate('TabNavigator')}
          buttonStyle={{ backgroundColor: colors.purple300 }}
          textStyle={{ fontSize: fonts.sizes.medium }}
          iconStyle={{ tintColor: colors.white }}
        />
      </View>
      <Footer />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  modalContent: {
    padding: 20,
    backgroundColor: 'white',
  },
  image: {
    width: 80,
    height: 80,
  },
  text: {
    fontFamily: fonts.families.primary,
    color: colors.grey,
    fontSize: fonts.sizes.regular,
    marginBottom: 10,
  },
  modalTitle: {
    fontSize: fonts.sizes.medium,
    fontFamily: 'Poppins-Medium',
    marginBottom: 10,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: calculatePadding(),
    marginVertical: 8,
    borderRadius: 8,
    backgroundColor: colors.purple200,
    elevation: 2,
    borderWidth: 1,
    borderColor: 'transparent',
    height: getCardHeight(), // Adjust the multiplier as needed
  },
  selectedCard: {
    borderColor: colors.theme, // Highlight border when selected
    borderWidth: 2,
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex:1
  },
  textContainer: {
    flex: 1,
    marginLeft: 15,
  },
  cardText: {
    fontSize: fonts.sizes.regular,
    color: colors.purple100,
    fontWeight: '600',
    fontFamily: fonts.families.secondary,
  },
  subText: {
    fontSize: fonts.sizes.semismall,
    color: '#5D5259',
    fontFamily: fonts.families.light,
  },
  footerContainer: {
    position: "absolute",
    bottom: 0,
    width: "80%",
    alignSelf: "flex-end",
    paddingHorizontal: screenWidth * 0.1,
     marginBottom:screenHeight * 0.1
  }
});

export default Role;
