import React, { useState, useEffect, useRef } from 'react';
import { View, FlatList, Dimensions, ActivityIndicator, TouchableOpacity } from 'react-native';
import VideoItem from '../components/VideoItem';
import firestore from '@react-native-firebase/firestore';
import { useIsFocused } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import Icon from 'react-native-vector-icons/FontAwesome';

const { height } = Dimensions.get('window');

interface Video {
  id: string;
  videoUrl: string;
  username: string;
  description: string;
  userId: string;
  comments?: Record<string, string>;
  likes?: Record<string, boolean>;
}

const HomeScreen: React.FC = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const isFocused = useIsFocused();
  const flatListRef = useRef<FlatList<Video>>(null);
  const currentUser = auth().currentUser;

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        console.log('Récupération initiale des vidéos depuis Firestore...');
        const videosSnapshot = await firestore().collection('upload').get();
        const fetchedVideos: Video[] = videosSnapshot.docs.map(doc => ({
          id: doc.id,
          videoUrl: doc.data().videoUrl || '', // Vérifiez que videoUrl est toujours défini
          username: doc.data().username || '',
          description: doc.data().description || '',
          userId: doc.data().userId || '',
          comments: doc.data().comments || {}, // Initialise comments à un objet vide si non défini
          likes: doc.data().likes || {}, // Initialise likes à un objet vide si non défini
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
        videoUrl: doc.data().videoUrl || '',
        username: doc.data().username || '',
        description: doc.data().description || '',
        userId: doc.data().userId || '',
        comments: doc.data().comments || {},
        likes: doc.data().likes || {},
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
        comments={item.comments || {}} // Assurez-vous que comments est toujours un objet
        likes={item.likes || {}} // Assurez-vous que likes est toujours un objet
        paused={!isFocused}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', marginBottom: 10 }}>
          <TouchableOpacity>
            <Icon
              name="heart"
              size={30}
              color={item.likes && item.likes[currentUser?.uid] ? 'red' : 'white'}
              onPress={() => console.log('Like button pressed')}
            />
          </TouchableOpacity>
          <TouchableOpacity style={{ marginLeft: 10 }} onPress={() => console.log('Show comments')}>
            <Icon
              name="comment"
              size={30}
              color="white"
            />
          </TouchableOpacity>
        </View>
      </VideoItem>
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
