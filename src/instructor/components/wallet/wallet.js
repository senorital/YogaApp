import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView,Alert, Image, TouchableOpacity } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Header } from '../../../common/header/header';
import images from '../../../styles/images';
import globalStyles from '../../../styles/globalStyles';
import colors from '../../../styles/colors';
import fonts from '../../../styles/fonts';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { screenWidth } from '../../../common/utils/util';
import SwipeButton from './swipeButton';
import { useNavigation } from '@react-navigation/native';

const Cards = ({ name, amount, dateTime, trans_id }) => (
  <View style={globalStyles.cardContainer}>
    <View style={globalStyles.row}>
      
      <View style={[styles.left, { flexDirection: 'row',  position: 'relative',flex: 1 }]}>
        <Image source={images.wallet_profile} style={globalStyles.image} />
        <View style={{ flexDirection: 'column', marginLeft: 15 }}>
          <Text style={globalStyles.nameText}>{name}</Text>
          <Text style={styles.dateText}>{dateTime}</Text>
        </View>
        <View style={{position: 'absolute', 
          right: 0, 
           }}>
      <Text style={[styles.amountText, { color: colors.green200, fontSize: fonts.sizes.regular}]}>
        + ₹ {amount}
      </Text>
    </View>
        {/* Transaction ID - Positioned at Bottom Right */}
        <Text style={[styles.dateText, { 
          fontSize: fonts.sizes.small, 
          fontFamily: fonts.families.secondary, 
          position: 'absolute', 
          right: 0, 
          bottom: 0 
        }]}>
          Transaction id: {trans_id}
        </Text>
      </View>
    </View>

    {/* Amount Display */}
  

    {/* Expand Icon */}
    <View style={[globalStyles.row, { justifyContent: 'center' }]}>
      <TouchableOpacity>
        <FontAwesome name="angle-down" size={20} color={colors.grey200} />
      </TouchableOpacity>
    </View>
  </View>
);



const DashedLine = ({ text }) => (
  <View style={styles.row}>
    <View style={styles.line} />
    <Text style={styles.text}>{text}</Text>
    <View style={styles.line} />
  </View>
);

const Wallet = () => {
  const [activeTab, setActiveTab] = useState('transactions');
  const navigation = useNavigation();
  return (
    <GestureHandlerRootView style={globalStyles.container}>
      <Header title={'Wallet'} icon={images.back} />
      <View style={styles.container}>
        <View style={styles.walletBox}>
          <View style={styles.column}>
            <Text style={[styles.amountText, { color: colors.blue100 }]}>₹ 5,800.00</Text>
            <Text style={styles.amountEr}>Total Earning</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.column}>
            <Text style={[styles.amountText, { color: colors.green200 }]}>₹ 5,800.00</Text>
            <Text style={styles.amountEr}>Amount Withdrawal</Text>
          </View>
        </View>
      </View>
      <SwipeButton
        containerWidth={screenWidth * 0.9} 
        handleWidth={screenWidth * 0.9}
        onSwipe={() => {
        //   Alert.alert("Swiped!", "Navigating to the next screen.");
          navigation.navigate("Review");
        }}
      />
      <View style={styles.bottomContainer}>
      
        <View style={{paddingHorizontal:20,marginTop:10}}>
        <View style={styles.customTabBar}>
          <TouchableOpacity
            style={[styles.tabButton, activeTab === 'transactions' && styles.activeTabButton]}
            onPress={() => setActiveTab('transactions')}
          >
            <Text style={[styles.tabText, activeTab === 'transactions' && styles.activeTabText]}>
              DashBoard
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tabButton, activeTab === 'history' && styles.activeTabButton]}
            onPress={() => setActiveTab('history')}
          >
            <Text style={[styles.tabText, activeTab === 'history' && styles.activeTabText]}>
              Transactions
            </Text>
          </TouchableOpacity>
        </View>
        </View>
        {/* Tab Content */}
        <View style={styles.tabContent}>
          {activeTab === 'transactions' ? (
            <ScrollView contentContainerStyle={styles.scrollContent}>
              <DashedLine text={'1 Jan, 2025'} />
              <Cards name={'Ankush Gupta'} amount={'5,800.00'} dateTime={'01 Jan 2025, 10:30 AM'} trans_id={'1234567890'} />
              <Cards name={'Ankush Gupta'} amount={'5,800.00'} dateTime={'01 Jan 2025, 10:30 AM'} trans_id={'1234567890'} />
              <Cards name={'Ankush Gupta'} amount={'5,800.00'} dateTime={'01 Jan 2025, 10:30 AM'} trans_id={'1234567890'} />
            </ScrollView>
          ) : (
            <View style={styles.historyContent}>
              <Text style={{ fontSize: fonts.sizes.large, fontFamily: fonts.families.bold }}>
                Transactions
              </Text>
            </View>
          )}
          </View>
        
      </View>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  walletBox: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#D9D9D9',
    borderRadius: 10,
    overflow: 'hidden',
    width: screenWidth * 0.9,
    alignSelf: 'center',
  },
  column: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
  },
  divider: {
    width: 1,
    backgroundColor: '#D9D9D9',
  },
  amountText: {
    fontSize: fonts.sizes.large,
    letterSpacing: 0.0001,
    fontFamily: fonts.families.bold,
  },
  amountEr: {
    fontFamily: fonts.families.primary,
    fontSize: fonts.sizes.small,
    color: colors.grey200,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
   
  },
  line: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: colors.grey200,
    borderStyle: 'dashed',
  },
  text: {
    marginHorizontal: 10,
    color: colors.grey200,
    fontSize: fonts.sizes.small,
    fontFamily: fonts.families.primary,
  },
  dateText: {
    fontFamily: fonts.families.primary,
    fontSize: fonts.sizes.vsmall,
    color: colors.grey200,
  },
  left: {
    flexDirection: 'row',
    flex: 1,
  },
  bottomContainer: {
    backgroundColor: colors.lightPink100,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    flex: 1,
    marginTop:20,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  customTabBar: {
    flexDirection: 'row',
    borderRadius:30,
    paddingVertical: 5,paddingHorizontal:2,
    backgroundColor: '#4C1D3D',
    justifyContent: 'center',
  },
  tabButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    marginHorizontal: 5,
    borderRadius: 30,
  },
  activeTabButton: {
    backgroundColor: 'white',
  },
  tabText: {
    fontSize: fonts.sizes.semismall,
    fontFamily: fonts.families.secondary,
    color: colors.white,
  },
  activeTabText: {
    color: colors.themelight,
  },
  tabContent: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
  },
  historyContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Wallet;
