import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
// import Splash from '../splash/splash';
import Role from '../onBoard/role/role';
import Otp from '../onBoard/otp/otp';
import Register from '../onBoard/register/register';
import Login from '../onBoard/login/login';
import Onboarding from '../onBoard/onboarding/onboarding';
import TabNavigator from './TabNavigator';
import ProfileList from '../tabComponent/profile/profileList';
import CompleteProfile from '../tabComponent/profile/completeProfile';
import Review from '../reviews/review';
import { NavigationContainer } from '@react-navigation/native';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Wallet from '../wallet/wallet';
const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <GestureHandlerRootView style={{flex:1}}>
    <NavigationContainer>
    <BottomSheetModalProvider>
   
    <Stack.Navigator initialRouteName="Onboarding">
      {/* <Stack.Screen name="Splash" component={Splash} options={{ headerShown: false }} /> */}
      <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
      <Stack.Screen name="Onboarding" component={Onboarding} options={{ headerShown: false }} />
      <Stack.Screen name="Role" component={Role} options={{ headerShown: false }} />
      <Stack.Screen name="Otp" component={Otp} options={{ headerShown: false }} />
      <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
    
      <Stack.Screen name="TabNavigator" component={TabNavigator} options={{ headerShown: false }} />
      <Stack.Screen name="ProfileList" component={ProfileList} options={{ headerShown: false }} />
      <Stack.Screen name="CompleteProfile" component={CompleteProfile} options={{ headerShown: false }} />
      <Stack.Screen name="Review" component={Review} options={{ headerShown: false }} />
      <Stack.Screen name="Wallet" component={Wallet} options={{ headerShown: false }} />


    </Stack.Navigator>
   
    </BottomSheetModalProvider>
    </NavigationContainer>
    </GestureHandlerRootView>
  );
};

export default AppNavigator;
