import React, { useEffect } from 'react';
import { View, Button, StyleSheet } from 'react-native';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
    Login: undefined;
    Profile: undefined;
};

type LoginScreenNavigationProp = StackNavigationProp<
    RootStackParamList,
    'Login'
>;

type Props = {
    navigation: LoginScreenNavigationProp;
};

const LoginScreen: React.FC<Props> = ({ navigation }) => {
    useEffect(() => {
        GoogleSignin.configure({
        webClientId: '940000145282-phku0793de7jba3jmllp7d74sapgpmd0.apps.googleusercontent.com',
        });
    }, []);

    const onGoogleButtonPress = async () => {
        try {
        // Récupérer l'identifiant et le jeton d'authentification de Google
        const { idToken } = await GoogleSignin.signIn();

        // Créer une crédential Firebase avec le jeton d'authentification Google
        const googleCredential = auth.GoogleAuthProvider.credential(idToken);

        // Se connecter à Firebase avec les crédentials Google
        await auth().signInWithCredential(googleCredential);
        console.log('Signed in with Google!');
        } catch (error) {
        console.error(error);
        }
    };

    return (
        <View style={styles.container}>
        <Button
            title="Sign in with Google"
            onPress={onGoogleButtonPress}
        />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black',
    },
});

export default LoginScreen;
