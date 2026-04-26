import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RootStackParamList} from '../types/navigation';
import AuthNavigator from './AuthNavigator';
import MainStackNavigator from './MainStackNavigator';
import {useAuth} from '../context/AuthContext';

const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  const {isAuthenticated} = useAuth();

  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      {isAuthenticated ? (
        <Stack.Screen name="Main" component={MainStackNavigator} />
      ) : (
        <Stack.Screen name="Auth" component={AuthNavigator} />
      )}
    </Stack.Navigator>
  );
}

export default RootNavigator;
