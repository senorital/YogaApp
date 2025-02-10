import React, { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Common Screens
import Login from '../common/onBoard/login/login';
import Onboarding from '../common/onBoard/onboarding/onboarding';
import Otp from '../common/onBoard/otp/otp';
import Register from '../common/onBoard/register/register';
import Role from '../common/onBoard/role/role';

// Instructor Screens
import TabNavigator from '../instructor/components/navigation/TabNavigator';
import ProfileList from '../instructor/components/tabComponent/profile/profileList';
import CompleteProfile from '../instructor/components/tabComponent/profile/completeProfile';
import Review from '../instructor/components/reviews/review';
import Wallet from '../instructor/components/wallet/wallet';
import UserNavigator from '../user/components/navigation/UserNavigator';



const Stack = createStackNavigator();

const Instructor = () => (
  <Stack.Navigator initialRouteName="TabNavigator">
    <Stack.Screen name="TabNavigator" component={TabNavigator} options={{ headerShown: false }} />
    <Stack.Screen name="ProfileList" component={ProfileList} options={{ headerShown: false }} />
    <Stack.Screen name="CompleteProfile" component={CompleteProfile} options={{ headerShown: false }} />
    <Stack.Screen name="Review" component={Review} options={{ headerShown: false }} />
    <Stack.Screen name="Wallet" component={Wallet} options={{ headerShown: false }} />
  </Stack.Navigator>
);

const User = () => (
  <Stack.Navigator initialRouteName="UserNavigator">
    <Stack.Screen name="UserNavigator" component={UserNavigator} options={{ headerShown: false }} />
    {/* <Stack.Screen name="InstructorCourses" component={InstructorCourses} options={{ headerShown: false }} />
    <Stack.Screen name="InstructorEarnings" component={InstructorEarnings} options={{ headerShown: false }} />
   */}
  </Stack.Navigator>
);

const AuthStack = () => (
  <Stack.Navigator initialRouteName="Onboarding">
    <Stack.Screen name="Onboarding" component={Onboarding} options={{ headerShown: false }} />
    <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
    <Stack.Screen name="Otp" component={Otp} options={{ headerShown: false }} />
    <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
    <Stack.Screen name="Role" component={Role} options={{ headerShown: false }} />
  </Stack.Navigator>
);

const AppNavigator = () => {
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUserRole = async () => {
      try {
        const storedRole = await AsyncStorage.getItem('userRole');
        setRole('user');
      } catch (error) {
        console.error('Error fetching user role:', error);
      } finally {
        setLoading(false);
      }
    };
    getUserRole();
  }, []);

  if (loading) return null; 

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <BottomSheetModalProvider>
          {role === 'instructor' ? <Instructor /> : role === 'user' ? <User/> : <AuthStack />}
        </BottomSheetModalProvider>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
};

export default AppNavigator;
