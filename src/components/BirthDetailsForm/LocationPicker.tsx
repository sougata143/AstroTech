import React from 'react';
import { View, TextInput } from 'react-native';

interface Props {
  value?: {
    latitude: number;
    longitude: number;
    locationName: string;
  };
  onChange: (location: { latitude: number; longitude: number; locationName: string }) => void;
}

export default function LocationPicker({ value, onChange }: Props) {
  return (
    <View>
      <TextInput
        placeholder="Search location"
        value={value?.locationName}
        onChangeText={(text: string) => {
          // Implement location search logic
        }}
      />
    </View>
  );
} 