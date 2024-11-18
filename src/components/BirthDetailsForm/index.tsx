import React from 'react';
import { Platform, View, Text, TextInput } from 'react-native';
import { BirthDetails } from '../../types/BirthDetails';
import PlatformTimePicker from './TimePicker';
import PlatformLocationPicker from './LocationPicker';

interface Props {
  onSubmit: (details: BirthDetails) => void;
  initialValues?: Partial<BirthDetails>;
}

export default function BirthDetailsForm({ onSubmit, initialValues }: Props) {
  return Platform.select({
    web: (
      <View>
        <Text>Web Form</Text>
        <PlatformTimePicker value={initialValues?.timeOfBirth} onChange={() => {}} />
      </View>
    ),
    default: (
      <View>
        <Text>Mobile Form</Text>
        <PlatformTimePicker value={initialValues?.timeOfBirth} onChange={() => {}} />
      </View>
    ),
  });
} 