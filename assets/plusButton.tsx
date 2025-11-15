import { AntDesign } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';

interface PlusButtonProps {
  gradientColors?: string[];
}

const PlusButton: React.FC<PlusButtonProps> = ({ gradientColors = ['#7ffcff', '#19d4e9'] }) => (
  <LinearGradient
    colors={[...gradientColors] as [string, string]}
    style={{
      width: 64,
      height: 64,
      borderRadius: 32,
      justifyContent: 'center',
      alignItems: 'center',
      shadowColor: '#19d4e9',
      shadowOpacity: 0.2,
      shadowRadius: 8,
      elevation: 6,
    }}
    start={{ x: 0.2, y: 0.2 }}
    end={{ x: 0.8, y: 0.8 }}
  >
    <AntDesign name="plus" size={32} color="#fff" />
  </LinearGradient>
);

export default PlusButton;