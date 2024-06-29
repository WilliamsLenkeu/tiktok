import React, { useEffect, useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import auth from '@react-native-firebase/auth';

import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import ProfileScreen from '../screens/ProfileScreen';
import FriendsScreen from '../screens/FriendsScreen';
import InboxScreen from '../screens/InboxScreen';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null; // Affiche un écran de chargement pendant l'initialisation

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'Profile') {
            iconName = 'account';
          } else if (route.name === 'Amis') {
            iconName = 'message-text';
          } else if (route.name === 'Boîte de réception') {
            iconName = 'inbox';
          } else {
            iconName = 'help-circle';
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Amis" component={FriendsScreen} />
      <Tab.Screen name="Boîte de réception" component={InboxScreen} />
      <Tab.Screen
        name="Profile"
        component={user ? ProfileScreen : LoginScreen}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
