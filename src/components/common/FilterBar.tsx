import React, { useRef, useState } from 'react';
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
  variant?: 'sheet' | 'dropdown';
  showFilterIcon?: boolean;
};

const FilterBar = ({ options, selected, onSelect, placeholder, variant = 'sheet', showFilterIcon = true }: Props) => {
  const [visible, setVisible] = useState(false);
  const [dropdownPos, setDropdownPos] = useState({ x: 0, y: 0, width: 0 });
  const buttonRef = useRef<React.ComponentRef<typeof TouchableOpacity>>(null);

  const defaultOption = options[0] ?? { label: 'All', value: 'all' };
  const displayLabel = placeholder ?? defaultOption.label;

  const handleOpen = () => {
    if (variant === 'dropdown') {
      buttonRef.current?.measureInWindow((x: number, y: number, width: number, height: number) => {
        setDropdownPos({ x, y: y + height + 4, width });
        setVisible(true);
      });
    } else {
      setVisible(true);
    }
  };

  const handleSelect = (option: FilterOption) => {
    onSelect(option);
    setVisible(false);
  };

  const handleReset = () => {
    onSelect(defaultOption);
    setVisible(false);
  };

  return (
    <>
      <View style={GlobalStyles.filterWrapper}>
        <TouchableOpacity
          ref={buttonRef}
          style={GlobalStyles.filterBtn}
          activeOpacity={0.7}
          onPress={handleOpen}
        >
          {showFilterIcon && <FilterIcon width={16} height={16} stroke={Colors.textMuted} />}
          <Text style={GlobalStyles.filterText}>
            {selected.value === 'all' ? displayLabel : selected.label}
          </Text>
          <ChevronDownIcon width={16} height={16} stroke={Colors.textMuted} />
        </TouchableOpacity>
      </View>

      {variant === 'dropdown' ? (
        <Modal
          visible={visible}
          transparent
          animationType="none"
          onRequestClose={() => setVisible(false)}
        >
          <Pressable style={styles.dropdownOverlay} onPress={() => setVisible(false)}>
            <View
              style={[
                styles.dropdownSheet,
                { position: 'absolute', top: dropdownPos.y, left: dropdownPos.x, minWidth: dropdownPos.width },
              ]}
            >
              {options.map((item, index) => {
                const isSelected = item.value === selected.value;
                return (
                  <TouchableOpacity
                    key={item.value}
                    style={[
                      styles.dropdownOption,
                      isSelected && styles.dropdownOptionSelected,
                      index === 0 && styles.dropdownOptionFirst,
                      index === options.length - 1 && styles.dropdownOptionLast,
                    ]}
                    activeOpacity={0.7}
                    onPress={() => handleSelect(item)}
                  >
                    {isSelected && (
                      <Text style={styles.checkmark}>✓ </Text>
                    )}
                    <Text style={[styles.dropdownOptionText, isSelected && styles.dropdownOptionTextSelected]}>
                      {item.label}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </Pressable>
        </Modal>
      ) : (
        <Modal
          visible={visible}
          transparent
          animationType="fade"
          onRequestClose={() => setVisible(false)}
        >
          <Pressable style={styles.overlay} onPress={() => setVisible(false)}>
            <Pressable style={styles.sheet} onPress={e => e.stopPropagation()}>

              <View style={styles.header}>
                <Text style={styles.headerTitle}>Filter by {displayLabel.toLowerCase()}</Text>
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
      )}
    </>
  );
};

export default FilterBar;




const { height: SCREEN_HEIGHT } = Dimensions.get('window');

export const styles = StyleSheet.create({
  // ── Bottom sheet (default) ──────────────────────────────────────────────
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

  // ── Dropdown ────────────────────────────────────────────────────────────
  dropdownOverlay: {
    flex: 1,
  },
  dropdownSheet: {
    backgroundColor: Colors.searchBackground,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 6,
    overflow: 'hidden',
  },
  dropdownOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 13,
    backgroundColor: Colors.searchBackground,
  },
  dropdownOptionFirst: {
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  dropdownOptionLast: {
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  dropdownOptionSelected: {
    backgroundColor: Colors.primary,
  },
  dropdownOptionText: {
    fontSize: 14,
    color: Colors.textPrimary,
  },
  dropdownOptionTextSelected: {
    color: '#fff',
    fontWeight: '600',
  },
  checkmark: {
    fontSize: 14,
    color: '#fff',
    fontWeight: '600',
  },
});
