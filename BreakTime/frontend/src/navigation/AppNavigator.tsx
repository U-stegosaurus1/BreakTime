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
  Leaderboard: undefined;
  Profile: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<TabParamList>();

// Bottom tab navigator matching the design exactly:
// Home | Challenges | Play (center) | Leaderboard | Profile
function MainTabs() {
  const activeColor = '#6C3AE0';
  const inactiveColor = '#9890B8';

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: activeColor,
        tabBarInactiveTintColor: inactiveColor,
        tabBarShowLabel: true,
        tabBarLabelStyle: {
          fontFamily: 'Poppins-Medium',
          fontSize: 10,
          marginBottom: Platform.OS === 'ios' ? 0 : 6,
        },
        tabBarStyle: styles.tabBar,
        tabBarIcon: ({ focused, color }) => {
          // Exact icons matching the design mockup
          const iconMap: Record<string, string> = {
            Home:        focused ? 'home'            : 'home-outline',
            Challenges:  focused ? 'trophy'          : 'trophy-outline',
            Play:        focused ? 'gamepad-variant' : 'gamepad-variant-outline',
            Leaderboard: focused ? 'podium'          : 'podium',
            Profile:     focused ? 'account-circle'  : 'account-circle-outline',
          };

          // Play is the special center tab — bigger icon
          if (route.name === 'Play') {
            return (
              <View style={[
                styles.playTabIcon,
                { backgroundColor: focused ? '#6C3AE0' : '#EAE6FF' }
              ]}>
                
              </View>
            );
          }

          return ;
        },
      })}
    >
      <Tab.Screen name="Home"        component={HomeScreen}        options={{ title: 'Home' }} />
      <Tab.Screen name="Challenges"  component={ChallengesScreen}  options={{ title: 'Challenges' }} />
      <Tab.Screen name="Play"        component={PlayScreen}         options={{ title: 'Play', tabBarLabel: () => null }} />
      <Tab.Screen name="Leaderboard" component={LeaderboardScreen}  options={{ title: 'Leaderboard' }} />
      <Tab.Screen name="Profile"     component={ProfileScreen}      options={{ title: 'Profile' }} />
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
  // Flat tab bar exactly matching the design
  tabBar: {
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#F0EFF5',
    height: Platform.OS === 'ios' ? 84 : 68,
    paddingTop: 8,
    paddingBottom: Platform.OS === 'ios' ? 28 : 8,
    shadowColor: '#1A1A2E',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 8,
  },
  // Raised circle for the Play center tab
  playTabIcon: {
    width: 52,
    height: 52,
    borderRadius: 26,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
    shadowColor: '#6C3AE0',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 6,
  },
});
