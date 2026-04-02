import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {DrawerParamList} from '../types/navigation';
import CustomDrawer from '../components/navigation/CustomDrawer';
import DashboardScreen from '../screens/main/DashboardScreen';
import PatientsScreen from '../screens/main/PatientsScreen';
import TrialsScreen from '../screens/main/TrialsScreen';
import MatchesScreen from '../screens/main/MatchesScreen';

const Drawer = createDrawerNavigator<DrawerParamList>();

function MainNavigator(): JSX.Element {
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawer {...props} />}
      screenOptions={{
        headerShown: false,
        drawerType: 'front',
        drawerStyle: {width: '75%'},
        overlayColor: 'rgba(0,0,0,0.55)',
      }}>
      <Drawer.Screen name="Dashboard" component={DashboardScreen} />
      <Drawer.Screen name="Patients" component={PatientsScreen} />
      <Drawer.Screen name="Trials" component={TrialsScreen} />
      <Drawer.Screen name="Matches" component={MatchesScreen} />
    </Drawer.Navigator>
  );
}

export default MainNavigator;
