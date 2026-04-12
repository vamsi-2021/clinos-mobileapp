import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  Pressable,
  FlatList,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { FilterIcon, ChevronDownIcon } from '../../assets/icons';
import { Colors } from '../../constants/theme';
import { GlobalStyles } from '../../styles/GlobalStyles';

export type FilterOption = {
  label: string;
  value: string;
};

type Props = {
  options: FilterOption[];
  selected: FilterOption;
  onSelect: (option: FilterOption) => void;
  placeholder?: string;
};

const DEFAULT_OPTION: FilterOption = { label: 'All Cancer Types', value: 'all' };

const FilterBar = ({ options, selected, onSelect, placeholder = 'All Cancer Types' }: Props) => {
  const [visible, setVisible] = useState(false);

  const handleSelect = (option: FilterOption) => {
    onSelect(option);
    setVisible(false);
  };

  const handleReset = () => {
    onSelect(DEFAULT_OPTION);
    setVisible(false);
  };

  return (
    <>
      <View style={GlobalStyles.filterWrapper}>
        <TouchableOpacity
          style={GlobalStyles.filterBtn}
          activeOpacity={0.7}
          onPress={() => setVisible(true)}
        >
          <FilterIcon width={16} height={16} stroke={Colors.textMuted} />
          <Text style={GlobalStyles.filterText}>
            {selected.value === 'all' ? placeholder : selected.label}
          </Text>
          <ChevronDownIcon width={16} height={16} stroke={Colors.textMuted} />
        </TouchableOpacity>
      </View>

      <Modal
        visible={visible}
        transparent
        animationType="fade"
        onRequestClose={() => setVisible(false)}
      >
        <Pressable style={styles.overlay} onPress={() => setVisible(false)}>
          <Pressable style={styles.sheet} onPress={e => e.stopPropagation()}>

            <View style={styles.header}>
              <Text style={styles.headerTitle}>Filter by cancer type</Text>
              <TouchableOpacity onPress={() => setVisible(false)} hitSlop={8}>
                <Text style={styles.closeBtn}>✕</Text>
              </TouchableOpacity>
            </View>

            <FlatList
              data={options}
              keyExtractor={item => item.value}
              ItemSeparatorComponent={() => <View style={styles.separator} />}
              renderItem={({ item }) => {
                const isSelected = item.value === selected.value;
                return (
                  <TouchableOpacity
                    style={styles.option}
                    activeOpacity={0.6}
                    onPress={() => handleSelect(item)}
                  >
                    <Text style={[styles.optionText, isSelected && styles.optionTextSelected]}>
                      {item.label}
                    </Text>
                  </TouchableOpacity>
                );
              }}
            />

            <TouchableOpacity
              style={styles.resetBtn}
              activeOpacity={0.7}
              onPress={handleReset}
            >
              <Text style={styles.resetText}>Reset filter</Text>
            </TouchableOpacity>

          </Pressable>
        </Pressable>
      </Modal>
    </>
  );
};

export default FilterBar;




const { height: SCREEN_HEIGHT } = Dimensions.get('window');

export const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'flex-end',
  },
  sheet: {
    backgroundColor: Colors.searchBackground,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: SCREEN_HEIGHT * 0.55,
    paddingBottom: 32,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.inputBorder,
  },
  headerTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: Colors.textPrimary,
  },
  closeBtn: {
    fontSize: 16,
    color: Colors.textMuted,
  },
  option: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 14,
  },
  optionText: {
    fontSize: 14,
    color: Colors.textPrimary,
  },
  optionTextSelected: {
    color: Colors.primary,
    fontWeight: '500',
  },
  separator: {
    height: 1,
    backgroundColor: Colors.inputBorder,
    marginHorizontal: 20,
  },
  resetBtn: {
    marginHorizontal: 20,
    marginTop: 12,
    paddingVertical: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.inputBorder,
    alignItems: 'center',
  },
  resetText: {
    fontSize: 14,
    color: Colors.textMuted,
  },
});