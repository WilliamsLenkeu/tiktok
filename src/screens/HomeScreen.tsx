import React, { useState, useEffect, useRef } from 'react';
import { View, FlatList, Dimensions, ActivityIndicator } from 'react-native';
import VideoItem from '../components/VideoItem';
import firestore from '@react-native-firebase/firestore';
import { useIsFocused } from '@react-navigation/native';

const { height } = Dimensions.get('window');

interface Video {
  id: string;
  videoUrl: string;
  username: string;
  description: string;
  userId: string;
}

const HomeScreen: React.FC = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const isFocused = useIsFocused();
  const flatListRef = useRef<FlatList<Video>>(null);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        console.log('Récupération initiale des vidéos depuis Firestore...');
        const videosSnapshot = await firestore().collection('upload').get();
        const fetchedVideos: Video[] = videosSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        })) as Video[];
        console.log('Vidéos récupérées:', fetchedVideos);
        setVideos(fetchedVideos);
        setLoading(false);
      } catch (error) {
        console.error('Erreur lors de la récupération des vidéos:', error);
        setLoading(false);
      }
    };

    const unsubscribe = firestore().collection('upload').onSnapshot(snapshot => {
      console.log('Mise à jour en temps réel des vidéos depuis Firestore...');
      const updatedVideos: Video[] = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      })) as Video[];
      setVideos(updatedVideos);
    });

    fetchVideos();

    return () => unsubscribe();
  }, []);

  const renderItem = ({ item }: { item: Video }) => {
    console.log('Affichage de la vidéo:', item);
    return (
      <VideoItem
        videoUri={item.videoUrl}
        username={item.username}
        description={item.description}
        userId={item.userId}
        paused={!isFocused}
      />
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: 'black' }}>
      {loading ? (
        <ActivityIndicator size="large" color="#fff" />
      ) : (
        <FlatList
          ref={flatListRef}
          data={videos}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          snapToInterval={height}
          snapToAlignment="start"
          decelerationRate="fast"
          pagingEnabled
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
};

export default HomeScreen;
