import React, { useEffect } from 'react';
import { Text, View } from 'react-native';

const MessageScreen = () => {
  useEffect(() => {
    console.log('MessageScreen mounted');
  }, []);

  return (
    <View style={{ padding: 24 }}>
      <Text style={{ fontSize: 18, color: 'green', textAlign: 'center' }}>
        ProfileScreen is mounted!
      </Text>
    </View>
  );
};

export default MessageScreen;