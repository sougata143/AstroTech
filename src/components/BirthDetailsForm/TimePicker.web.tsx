import React from 'react';
import { TextInput } from 'react-native-web';

interface Props {
  value?: string;
  onChange: (value: string) => void;
}

export default function TimePicker({ value, onChange }: Props) {
  return (
    <TextInput
      type="time"
      value={value}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
    />
  );
} 