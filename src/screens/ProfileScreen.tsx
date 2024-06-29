import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

const ProfileScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.avatar}
        source={{ uri: 'https://via.placeholder.com/150' }}
      />
      <Text style={styles.username}>@username</Text>
      <Text style={styles.bio}>Bio de l'utilisateur</Text>
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>100</Text>
          <Text style={styles.statLabel}>Abonnés</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>50</Text>
          <Text style={styles.statLabel}>Abonnements</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>1000</Text>
          <Text style={styles.statLabel}>Likes</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.editButton}>
        <Text style={styles.editButtonText}>Modifier le profil</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  username: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  bio: {
    textAlign: 'center',
    marginBottom: 20,
    color: '#666',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 20,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  statLabel: {
    fontSize: 12,
    color: 'gray',
  },
  editButton: {
    backgroundColor: '#FF4500',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  editButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default ProfileScreen;