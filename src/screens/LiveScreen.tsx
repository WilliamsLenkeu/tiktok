import React, { useEffect, useState, useRef } from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { MediaStream, RTCPeerConnection, mediaDevices } from 'react-native-webrtc';
import { RNCamera } from 'react-native-camera';

const LiveScreen: React.FC = () => {
    const [isStreaming, setIsStreaming] = useState(false);
    const [localStream, setLocalStream] = useState<MediaStream | null>(null);
    const peerConnectionRef = useRef<RTCPeerConnection | null>(null);

    useEffect(() => {
        if (isStreaming) {
        startStreaming();
        } else {
        stopStreaming();
        }
    }, [isStreaming]);

    const startStreaming = async () => {
        try {
        const stream = await mediaDevices.getUserMedia({ video: true, audio: true });
        setLocalStream(stream);
        peerConnectionRef.current = new RTCPeerConnection();

        stream.getTracks().forEach(track => {
            peerConnectionRef.current?.addTrack(track, stream);
        });

        // Implement signaling server logic here

        } catch (error) {
        console.error('Error starting streaming:', error);
        }
    };

    const stopStreaming = () => {
        if (localStream) {
        localStream.getTracks().forEach((track: { stop: () => any; }) => track.stop());
        setLocalStream(null);
        }
        if (peerConnectionRef.current) {
        peerConnectionRef.current.close();
        peerConnectionRef.current = null;
        }
    };

    const toggleStreaming = () => {
        setIsStreaming(!isStreaming);
    };

    return (
        <View style={styles.container}>
        {isStreaming ? (
            <RNCamera
            style={styles.cameraPreview}
            type={RNCamera.Constants.Type.front} // Use front camera
            captureAudio={true}
            />
        ) : (
            <Button
            title="Start Live"
            onPress={toggleStreaming}
            />
        )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cameraPreview: {
        flex: 1,
        width: '100%',
    },
});

export default LiveScreen;
