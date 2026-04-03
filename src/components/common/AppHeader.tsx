import React, { useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';
import {
  MenuIcon,
  NotifyIcon
} from '../../assets/icons';
import { GlobalStyles } from '../../styles/GlobalStyles';
import { Colors } from '../../constants/theme';

type AppHeaderProps = {
  showNotification?: boolean;
  onNotificationPress?: () => void;
  hasNewNotifications?: boolean;
};

const AppHeader = ({
  showNotification = true,
  onNotificationPress,
  hasNewNotifications = false,
}: AppHeaderProps) => {
  const navigation = useNavigation<DrawerNavigationProp<any>>();

  return (
    <View style={GlobalStyles.header}>
      <TouchableOpacity
        onPress={() => navigation.openDrawer()}
        style={GlobalStyles.menuButton}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
        <MenuIcon width={24} height={24} stroke={Colors.textMuted} pointerEvents="none" />
      </TouchableOpacity>

      {showNotification && (
        <TouchableOpacity
          onPress={onNotificationPress}
          style={GlobalStyles.notifButton}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
          <NotifyIcon width={24} height={24} stroke={Colors.textHeading} />
          {hasNewNotifications && <View style={GlobalStyles.notifBadge} />}
        </TouchableOpacity>
      )}
    </View>
  );
};

export default AppHeader;