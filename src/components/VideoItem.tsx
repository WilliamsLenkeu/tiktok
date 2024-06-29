import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import Video from 'react-native-video';
import Icon from 'react-native-vector-icons/FontAwesome';


const { width, height } = Dimensions.get('window');

interface VideoItemProps {
  videoUri: string;
  username: string;
  description: string;
}

const VideoItem: React.FC<VideoItemProps> = ({ videoUri, username, description }) => {
    const [likes, setLikes] = useState(0);
  
    return (
      <View style={styles.container}>
        <Video
          source={{ uri: videoUri }}
          style={styles.video}
          resizeMode="cover"
          repeat
          paused={false}
        />
        <View style={styles.uiContainer}>
          <View style={styles.rightContainer}>
            <TouchableOpacity style={styles.iconContainer} onPress={() => setLikes(likes + 1)}>
              <Text style={styles.icon}>❤️</Text>
              <Text style={styles.statsLabel}>{likes}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconContainer}>
              <Text style={styles.icon}>💬</Text>
              <Text style={styles.statsLabel}>0</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconContainer}>
              <Text style={styles.icon}>🔗</Text>
              <Text style={styles.statsLabel}>0</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.bottomContainer}>
            <Text style={styles.username}>@{username}</Text>
            <Text style={styles.description}>{description}</Text>
          </View>
        </View>
      </View>
    );
  };

const styles = StyleSheet.create({
  container: {
    width: width,
    height: height,
  },
  video: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  uiContainer: {
    height: '100%',
    justifyContent: 'flex-end',
  },
  rightContainer: {
    alignSelf: 'flex-end',
    height: 300,
    justifyContent: 'space-between',
    marginRight: 5,
  },
  bottomContainer: {
    padding: 10,
    paddingBottom: 20,
  },
  icon: {
    fontSize: 40,
    marginBottom: 5,
  },

  username: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 5,
  },
  description: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '300',
    marginBottom: 10,
  },
  iconContainer: {
    alignItems: 'center',
  },
  statsLabel: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginTop: 5,
  },
});

export default VideoItem;