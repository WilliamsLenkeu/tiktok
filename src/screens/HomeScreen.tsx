import React from 'react';
import { View, FlatList, Dimensions } from 'react-native';
import VideoItem from '../components/VideoItem';

const { height } = Dimensions.get('window');

interface Video {
  id: string;
  videoUri: string;
  username: string;
  description: string;
}

const dummyData: Video[] = [
  {
    id: '1',
    videoUri: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    username: 'user1',
    description: 'Big Buck Bunny',
  },
  {
    id: '2',
    videoUri: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    username: 'user2',
    description: 'Elephant\'s Dream',
  },
  {
    id: '3',
    videoUri: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    username: 'user3',
    description: 'For Bigger Blazes',
  },
  {
    id: '4',
    videoUri: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
    username: 'user4',
    description: 'For Bigger Blazes',
  },
  {
    id: '5',
    videoUri: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
    username: 'user5',
    description: 'For Bigger Blazes',
  },
  {
    id: '6',
    videoUri: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
    username: 'user6',
    description: 'For Bigger Blazes',
  },
];

const HomeScreen: React.FC = () => {
  const renderItem = ({ item }: { item: Video }) => (
    <VideoItem
      videoUri={item.videoUri}
      username={item.username}
      description={item.description}
    />
  );

  return (
    <View style={{ flex: 1, backgroundColor: 'black' }}>
      <FlatList
        data={dummyData}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        snapToInterval={height}
        snapToAlignment="start"
        decelerationRate="fast"
        pagingEnabled
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default HomeScreen;