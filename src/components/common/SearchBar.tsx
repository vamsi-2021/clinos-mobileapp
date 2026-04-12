import React from 'react';
import { View, TextInput } from 'react-native';
import { SearchIcon } from '../../assets/icons';
import { Colors } from '../../constants/theme';
import { GlobalStyles } from '../../styles/GlobalStyles';

type Props = {
  value?: string;
  onChangeText?: (text: string) => void;
  placeholder?: string;
};

const SearchBar = ({ value, onChangeText, placeholder = 'Search patients...' }: Props) => (
  <View style={GlobalStyles.searchBar}>
    <SearchIcon width={16} height={16} stroke={Colors.textMuted} />
    <TextInput
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      placeholderTextColor={Colors.textMuted}
      style={GlobalStyles.searchInput}
    />
  </View>
);

export default SearchBar;