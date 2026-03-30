import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import Card from '../../components/common/Card';
import {Colors} from '../../constants/theme';

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundScreen,
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 8,
    backgroundColor: Colors.white,
  },
  greeting: {
    fontSize: 14,
    color: Colors.systemGray,
    marginBottom: 4,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  listContent: {
    padding: 16,
    gap: 12,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  itemDescription: {
    fontSize: 14,
    color: Colors.systemGray,
    marginBottom: 12,
  },
  actionButton: {
    alignSelf: 'flex-start',
    paddingVertical: 6,
    paddingHorizontal: 14,
    backgroundColor: Colors.systemBlue,
    borderRadius: 8,
  },
  actionButtonText: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.white,
  },
});

export default HomeScreen;
