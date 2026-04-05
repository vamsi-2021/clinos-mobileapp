import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Card from '../../components/common/Card';
import {styles} from './HomeScreen.styles';

const MOCK_ITEMS = [
  {id: '1', title: 'Item One', description: 'Description for item one'},
  {id: '2', title: 'Item Two', description: 'Description for item two'},
  {id: '3', title: 'Item Three', description: 'Description for item three'},
  {id: '4', title: 'Item Four', description: 'Description for item four'},
  {id: '5', title: 'Item Five', description: 'Description for item five'},
];

const HomeScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.greeting}>Good Morning 👋</Text>
        <Text style={styles.title}>Clinos</Text>
      </View>

      <FlatList
        data={MOCK_ITEMS}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        renderItem={({item}) => (
          <Card>
            <Text style={styles.itemTitle}>{item.title}</Text>
            <Text style={styles.itemDescription}>{item.description}</Text>
            <TouchableOpacity style={styles.actionButton}>
              <Text style={styles.actionButtonText}>View Details</Text>
            </TouchableOpacity>
          </Card>
        )}
      />
    </SafeAreaView>
  );
}


export default HomeScreen;
