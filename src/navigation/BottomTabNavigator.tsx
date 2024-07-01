import React, { useEffect, useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';

import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import ProfileScreen from '../screens/ProfileScreen';
import FriendsScreen from '../screens/FriendsScreen';
import TimeManagerScreen from '../screens/TimeManagerScreen';
import LiveScreen from '../screens/LiveScreen'; // Importez la nouvelle screen LiveScreen

const Tab = createBottomTabNavigator();

const BottomTabNavigator: React.FC = () => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);

  const onAuthStateChanged = (user: FirebaseAuthTypes.User | null) => {
    setUser(user);
    if (initializing) setInitializing(false);
  };

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

          switch (route.name) {
            case 'Home':
              iconName = 'home';
              break;
            case 'Profile':
              iconName = 'account';
              break;
            case 'Amis':
              iconName = 'message-text';
              break;
            case 'Time Manager':
              iconName = 'clock';
              break;
            case 'Live': // Mettez à jour le nom de l'onglet pour Live
              iconName = 'video';
              break;
            default:
              iconName = 'help-circle';
              break;
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Amis" component={FriendsScreen} />
      <Tab.Screen name="Time Manager" component={TimeManagerScreen} />
      <Tab.Screen
        name="Profile"
        component={user ? ProfileScreen : LoginScreen}
      />
      <Tab.Screen
        name="Live" // Mettez à jour le nom de l'onglet pour Live
        component={LiveScreen} // Assurez-vous d'avoir créé et importé LiveScreen
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
