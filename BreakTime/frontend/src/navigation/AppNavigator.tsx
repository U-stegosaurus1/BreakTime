import React from 'react';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text, StyleSheet, View, Platform } from 'react-native';
import { useTheme } from '../theme/useTheme';

import { useAuthStore } from '../store/authStore';

// Screens
import SplashScreen from '../screens/Auth/SplashScreen';
import OnboardingScreen from '../screens/Auth/OnboardingScreen';
import LoginScreen from '../screens/Auth/LoginScreen';
import RegisterScreen from '../screens/Auth/RegisterScreen';
import ForgotPasswordScreen from '../screens/Auth/ForgotPasswordScreen';
import HomeScreen from '../screens/Home/HomeScreen';
import ChallengesScreen from '../screens/Challenges/ChallengesScreen';
import LeaderboardScreen from '../screens/Leaderboard/LeaderboardScreen';
import StatsScreen from '../screens/Stats/StatsScreen';
import ProfileScreen from '../screens/Profile/ProfileScreen';
import ActivityBreakScreen from '../screens/Activity/ActivityBreakScreen';
import BadgesScreen from '../screens/Badges/BadgesScreen';
import NotificationsScreen from '../screens/Notifications/NotificationsScreen';
import RewardsScreen from '../screens/Rewards/RewardsScreen';
import FriendsScreen from '../screens/Friends/FriendsScreen';
import GoalsScreen from '../screens/Goals/GoalsScreen';
import SettingsScreen from '../screens/Profile/SettingsScreen';
import ActivityHistoryScreen from '../screens/Activity/ActivityHistoryScreen';
import AboutScreen from '../screens/Profile/AboutScreen';
import PlayScreen from '../screens/Activity/PlayScreen';
import EditProfileScreen from '../screens/Profile/EditProfileScreen';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export type RootStackParamList = {
  Splash: undefined;
  Onboarding: undefined;
  Login: undefined;
  Register: undefined;
  ForgotPassword: undefined;
  Main: undefined;
  ActivityBreak: { type: string };
  Badges: undefined;
  Notifications: undefined;
  Rewards: undefined;
  Friends: undefined;
  Goals: undefined;
  Settings: undefined;
  ActivityHistory: undefined;
  About: undefined;
  EditProfile: undefined;
  Stats: undefined;
  Logout: undefined;
};

export type TabParamList = {
  Home: undefined;
  Challenges: undefined;
  Play: undefined;
  Stats: undefined;
  Profile: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<TabParamList>();

// Matches mockup: flat icons with labels, active = purple, inactive = grey
function MainTabs() {
  const { colors, isDarkMode } = useTheme();

  const activeColor = '#635BFF';
  const inactiveColor = '#A0A0B0';

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: activeColor,
        tabBarInactiveTintColor: inactiveColor,
        tabBarLabelStyle: {
          fontFamily: 'Poppins-Medium',
          fontSize: 11,
          marginTop: -2,
          marginBottom: Platform.OS === 'ios' ? 0 : 8,
        },
        tabBarStyle: [
          styles.floatingTabBar,
          {
            backgroundColor: isDarkMode ? colors.card : '#FFFFFF',
            shadowColor: '#1A1A2E',
          }
        ],
        tabBarIcon: ({ focused, color }) => {
          const icons: Record<string, [string, string]> = {
            Home:       ['home', 'home-outline'],
            Challenges: ['target', 'target'],
            Play:       ['play-circle', 'play-circle-outline'],
            Stats:      ['chart-bar', 'chart-bar'],
            Profile:    ['account', 'account-outline'],
          };
          const [filled, outlined] = icons[route.name] || ['circle', 'circle-outline'];
          return <Icon name={focused ? filled : outlined} size={24} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Challenges" component={ChallengesScreen} />
      <Tab.Screen name="Play" component={PlayScreen} />
      <Tab.Screen name="Stats" component={StatsScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  const { isAuthenticated, loadStoredAuth } = useAuthStore();
  const { colors, isDarkMode } = useTheme();

  React.useEffect(() => {
    loadStoredAuth();
  }, []);

  const navigationTheme = {
    ...(isDarkMode ? DarkTheme : DefaultTheme),
    colors: {
      ...(isDarkMode ? DarkTheme.colors : DefaultTheme.colors),
      primary: colors.primary,
      background: isDarkMode ? colors.background : '#F7F7FA',
      card: colors.card,
      text: colors.text,
      border: colors.border,
    },
  };

  return (
    <NavigationContainer theme={navigationTheme}>
      <Stack.Navigator screenOptions={{ headerShown: false, animation: 'fade' }}>
        {!isAuthenticated ? (
          <>
            <Stack.Screen name="Splash" component={SplashScreen} />
            <Stack.Screen name="Onboarding" component={OnboardingScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
            <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
          </>
        ) : (
          <>
            <Stack.Screen name="Main" component={MainTabs} />
            <Stack.Screen name="ActivityBreak" component={ActivityBreakScreen} />
            <Stack.Screen name="Badges" component={BadgesScreen} />
            <Stack.Screen name="Notifications" component={NotificationsScreen} />
            <Stack.Screen name="Rewards" component={RewardsScreen} />
            <Stack.Screen name="Friends" component={FriendsScreen} />
            <Stack.Screen name="Goals" component={GoalsScreen} />
            <Stack.Screen name="Settings" component={SettingsScreen} />
            <Stack.Screen name="ActivityHistory" component={ActivityHistoryScreen} />
            <Stack.Screen name="About" component={AboutScreen} />
            <Stack.Screen name="EditProfile" component={EditProfileScreen} />
            <Stack.Screen name="Stats" component={StatsScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  floatingTabBar: {
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? 28 : 20,
    left: 20,
    right: 20,
    height: 70,
    borderRadius: 35,
    borderTopWidth: 0,
    paddingTop: 8,
    paddingBottom: Platform.OS === 'ios' ? 8 : 4,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 8,
  },
});
