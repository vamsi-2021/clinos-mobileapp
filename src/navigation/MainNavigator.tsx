import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {DrawerParamList} from '../types/navigation';
import CustomDrawer from '../components/navigation/CustomDrawer';
import DashboardScreen from '../screens/main/Dashboard/DashboardScreen';
import PatientsScreen from '../screens/main/Patients/PatientsScreen';
import TrialsScreen from '../screens/main/Trails/TrialsScreen';
import MatchesScreen from '../screens/main/Matches/MatchesScreen';
import PatientQueueScreen from '../screens/main/PatientQueue/PatientQueueScreen';
import InvestigateScreen from '../screens/main/Investigate/InvestigateScreen';
import ProtocolsScreen from '../screens/main/Protocols/ProtocolsScreen';
import AiChatbotScreen from '../screens/main/AiChatbot/AiChatbotScreen';

const Drawer = createDrawerNavigator<DrawerParamList>();

function MainNavigator() {
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawer {...props} />}
      detachInactiveScreens={false}
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
      <Drawer.Screen name="PatientQueue" component={PatientQueueScreen} />
      <Drawer.Screen name="Investigate" component={InvestigateScreen} />
      <Drawer.Screen name="Protocols" component={ProtocolsScreen} />
      <Drawer.Screen name="AiChatbot" component={AiChatbotScreen} />
    </Drawer.Navigator>
  );
}

export default MainNavigator;
