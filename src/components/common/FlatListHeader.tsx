import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { GlobalStyles } from '../../styles/GlobalStyles';
import SearchBar from './SearchBar';
import FilterBar, { FilterOption } from './FilterBar';
import { Colors } from '../../constants/theme';

type Props = {
    headerTitle: string;
    headerSub: string;
    searchQuery?: string;
    onSearchChange?: (text: string) => void;
    selectedFilter?: FilterOption;
    onFilterSelect?: (option: FilterOption) => void;
    filterOptions?: FilterOption[];
    selectedSecondaryFilter?: FilterOption;
    onSecondaryFilterSelect?: (option: FilterOption) => void;
    secondaryFilterOptions?: FilterOption[];
    tabFilterOptions?: FilterOption[];
    selectedTabFilter?: FilterOption;
    onTabFilterSelect?: (option: FilterOption) => void;
};

const FlatListHeader = ({
    headerTitle,
    headerSub,
    searchQuery,
    onSearchChange,
    selectedFilter,
    onFilterSelect,
    filterOptions,
    selectedSecondaryFilter,
    onSecondaryFilterSelect,
    secondaryFilterOptions,
    tabFilterOptions,
    selectedTabFilter,
    onTabFilterSelect,
}: Props) => (
    <View style={GlobalStyles.headerCenter}>
        <Text style={GlobalStyles.headerTitle}>{headerTitle}</Text>
        <Text style={GlobalStyles.headerSub}>{headerSub}</Text>
        {searchQuery !== undefined && onSearchChange ? (
            <SearchBar value={searchQuery} onChangeText={onSearchChange} />
        ) : null}
        {filterOptions && filterOptions.length > 0 && selectedFilter && onFilterSelect ? (
            <FilterBar
                options={filterOptions}
                selected={selectedFilter}
                onSelect={onFilterSelect}
                variant="dropdown"
            />
        ) : null}
        {secondaryFilterOptions && secondaryFilterOptions.length > 0 && selectedSecondaryFilter && onSecondaryFilterSelect ? (
            <FilterBar
                options={secondaryFilterOptions}
                selected={selectedSecondaryFilter}
                onSelect={onSecondaryFilterSelect}
                variant="dropdown"
                showFilterIcon={false}
            />
        ) : null}
        {tabFilterOptions && tabFilterOptions.length > 0 && selectedTabFilter && onTabFilterSelect ? (
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.tabRow}>
                {tabFilterOptions.map(tab => {
                    const isActive = selectedTabFilter.value === tab.value;
                    return (
                        <TouchableOpacity
                            key={tab.value}
                            style={[styles.tab, isActive && styles.tabActive]}
                            activeOpacity={0.75}
                            onPress={() => onTabFilterSelect(tab)}>
                            <Text style={[styles.tabText, isActive && styles.tabTextActive]}>
                                {tab.label}
                            </Text>
                        </TouchableOpacity>
                    );
                })}
            </ScrollView>
        ) : null}
    </View>
);

export default FlatListHeader;

const styles = StyleSheet.create({
    tabRow: {
        flexDirection: 'row',
        gap: 8,
        paddingVertical: 2,
        marginTop: 16,
    },
    tab: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        borderWidth: 1.5,
        borderColor: Colors.inputBorder,
        backgroundColor: Colors.white,
    },
    tabActive: {
        borderColor: Colors.textHeading,
    },
    tabText: {
        fontSize: 13,
        fontWeight: '500',
        color: Colors.textMuted,
    },
    tabTextActive: {
        fontWeight: '700',
        color: Colors.textHeading,
    },
});