import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import Video from 'react-native-video';
import Icon from 'react-native-vector-icons/FontAwesome';
import auth from '@react-native-firebase/auth';
import { BottomSheet } from 'react-native-elements';

const { width, height } = Dimensions.get('window');

interface VideoItemProps {
  videoUri: string;
  username: string;
  description: string;
  userId: string;
  comments: Record<string, string>;
  likes: Record<string, boolean>;
  paused: boolean;
}

const VideoItem: React.FC<VideoItemProps> = ({ videoUri, username, description, comments, likes, paused }) => {
  const [isCommentVisible, setCommentVisible] = useState(false);
  const currentUser = auth().currentUser;
  const currentUserId = currentUser ? currentUser.uid : null;
  const hasLiked = currentUserId ? likes[currentUserId] : false;

  const renderComments = () => {
    return Object.entries(comments).map(([userId, comment]) => (
      <Text key={userId} style={styles.comment}>
        {userId}: {comment}
      </Text>
    ));
  };

  return (
    <View style={styles.container}>
      <Video
        source={{ uri: videoUri }}
        style={styles.video}
        resizeMode="cover"
        repeat
        paused={paused}  // Controls the video playback based on the paused prop
      />
      <View style={styles.uiContainer}>
        <View style={styles.bottomContainer}>
          <Text style={styles.username}>@{username}</Text>
          <Text style={styles.description}>{description}</Text>
        </View>
        <View style={styles.iconsContainer}>
          <TouchableOpacity>
            <Icon
              name="heart"
              size={30}
              color={hasLiked ? 'red' : 'white'}
              onPress={() => console.log('Like button pressed')}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setCommentVisible(true)}>
            <Icon
              name="comment"
              size={30}
              color="white"
            />
          </TouchableOpacity>
        </View>
      </View>

      <BottomSheet isVisible={isCommentVisible}>
        <View style={styles.commentsContainer}>
          <Text style={styles.commentsTitle}>Comments</Text>
          {renderComments()}
          <TouchableOpacity onPress={() => setCommentVisible(false)}>
            <Text style={styles.closeButton}>Close</Text>
          </TouchableOpacity>
        </View>
      </BottomSheet>
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
    justifyContent: 'space-between', // Adjust to align components vertically
    padding: 10,
  },
  bottomContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
    padding: 10,
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
  iconsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  commentsContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  commentsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  comment: {
    fontSize: 14,
    marginBottom: 5,
  },
  closeButton: {
    fontSize: 16,
    color: 'blue',
    marginTop: 10,
    textAlign: 'center',
  },
});

export default VideoItem;
