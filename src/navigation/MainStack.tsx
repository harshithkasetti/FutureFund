import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import DashboardScreen from '../screens/Dashboard/DashboardScreen';
import GoalListScreen from '../screens/Goals/GoalListScreen';
import WalletScreen from '../screens/Wallet/WalletScreen';
import AutoSaveScreen from '../screens/AutoSave/AutoSaveScreen';
import GroupGoalsScreen from '../screens/GroupGoals/GroupGoalsScreen';
import NotificationsScreen from '../screens/Notifications/NotificationsScreen';
import MarketplaceScreen from '../screens/Marketplace/MarketplaceScreen';
import AnalyticsScreen from '../screens/Analytics/AnalyticsScreen';
import ProfileScreen from '../screens/Profile/ProfileScreen';
import ThemeSettingsScreen from '../screens/Profile/ThemeSettingsScreen';
import VaultScreen from '../screens/Vault/VaultScreen';
import TransactionHistoryScreen from '../screens/Transactions/TransactionHistoryScreen';
import EditGoalScreen from '../screens/Goals/EditGoalScreen';
import CreateGoalScreen from '../screens/Goals/CreateGoalScreen';
import CurrencyScreen from '../screens/Profile/CurrencyScreen';
import LanguageScreen from '../screens/Profile/LanguageScreen';
import GoalDetailsScreen from '../screens/Goals/GoalDetailsScreen';



const Stack = createNativeStackNavigator();

export default function MainStack() {
  return (
    <Stack.Navigator
      initialRouteName="Dashboard"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="Dashboard"
        component={DashboardScreen}
      />

      <Stack.Screen
        name="Goals"
        component={GoalListScreen}
      />

      <Stack.Screen
        name="Wallet"
        component={WalletScreen}
      />

      <Stack.Screen
        name="AutoSave"
        component={AutoSaveScreen}
      />

      <Stack.Screen
        name="GroupGoals"
        component={GroupGoalsScreen}
      />

      <Stack.Screen
        name="Notifications"
        component={NotificationsScreen}
      />

      <Stack.Screen
        name="Marketplace"
        component={MarketplaceScreen}
      />

      <Stack.Screen
        name="Analytics"
        component={AnalyticsScreen}
      />
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
      />
      <Stack.Screen
  name="ThemeSettings"
  component={ThemeSettingsScreen}
/>
      <Stack.Screen
        name="Vault"
        component={VaultScreen}
      />

      <Stack.Screen
  name="Transactions"
  component={TransactionHistoryScreen}
/>

      <Stack.Screen
  name="EditGoal"
  component={EditGoalScreen}
/>
      <Stack.Screen
  name="CreateGoal"
  component={CreateGoalScreen}
/>
      <Stack.Screen
  name="Currency"
  component={CurrencyScreen}
/>
      <Stack.Screen
  name="Language"
  component={LanguageScreen}
/>
       <Stack.Screen
  name="GoalDetails"
  component={GoalDetailsScreen}
  options={{ headerShown: false }}
/>
    </Stack.Navigator>
  );
}