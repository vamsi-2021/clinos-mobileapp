import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MainStackParamList } from '../types/navigation';
import MainNavigator from './MainNavigator';
import PatientReviewScreen from '../screens/main/PatientQueue/PatientReviewScreen';
import ProtocolCriteriaScreen from '../screens/main/Protocols/ProtocolCriteriaScreen';

const Stack = createNativeStackNavigator<MainStackParamList>();

function MainStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="DrawerMain" component={MainNavigator} />
      <Stack.Screen name="PatientReview" component={PatientReviewScreen} />
      <Stack.Screen name="ProtocolCriteria" component={ProtocolCriteriaScreen} />
    </Stack.Navigator>
  );
}

export default MainStackNavigator;
