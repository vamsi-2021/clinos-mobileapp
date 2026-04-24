import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { DrawerParamList } from '../../../types/navigation';
import { Colors } from '../../../constants/theme';
import AppHeader from '../../../components/common/AppHeader';

type Props = {
  navigation: DrawerNavigationProp<DrawerParamList, 'AiChatbot'>;
};

const AiChatbotScreen = ({ navigation }: Props) => (
  <SafeAreaView style={styles.container}>
    <AppHeader />
    <View style={styles.center}>
      <Text style={styles.title}>AI Chatbot</Text>
      <Text style={styles.sub}>Coming soon</Text>
    </View>
  </SafeAreaView>
);

export default AiChatbotScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.backgroundPage },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', gap: 8 },
  title: { fontSize: 22, fontWeight: '700', color: Colors.textHeading },
  sub: { fontSize: 14, color: Colors.textMuted },
});
