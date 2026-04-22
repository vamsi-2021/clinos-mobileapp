import React from 'react';
import { View, Text } from 'react-native';
import { GlobalStyles } from '../../styles/GlobalStyles';
import SearchBar from './SearchBar';
import FilterBar, { FilterOption } from './FilterBar';

type Props = {
    headerTitle: string;
    headerSub: string;
    searchQuery: string;
    onSearchChange: (text: string) => void;
    selectedFilter: FilterOption;
    onFilterSelect: (option: FilterOption) => void;
    filterOptions: FilterOption[];
    selectedSecondaryFilter?: FilterOption;
    onSecondaryFilterSelect?: (option: FilterOption) => void;
    secondaryFilterOptions?: FilterOption[];
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
}: Props) => (
    <View style={GlobalStyles.headerCenter}>
        <Text style={GlobalStyles.headerTitle}>{headerTitle}</Text>
        <Text style={GlobalStyles.headerSub}>
            {headerSub}
        </Text>
        <SearchBar value={searchQuery} onChangeText={onSearchChange} />
        <FilterBar
            options={filterOptions}
            selected={selectedFilter}
            onSelect={onFilterSelect}
            variant="dropdown"
        />
        {secondaryFilterOptions && secondaryFilterOptions.length > 0 && selectedSecondaryFilter && onSecondaryFilterSelect ? (
            <FilterBar
                options={secondaryFilterOptions}
                selected={selectedSecondaryFilter}
                onSelect={onSecondaryFilterSelect}
                variant="dropdown"
                showFilterIcon={false}
            />
        ) : null}
    </View>
);

export default FlatListHeader;