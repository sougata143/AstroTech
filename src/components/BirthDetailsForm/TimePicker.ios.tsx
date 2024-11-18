import React from 'react';
import { DatePickerIOS } from 'react-native';

interface Props {
  value?: string;
  onChange: (value: string) => void;
}

export default function TimePicker({ value, onChange }: Props) {
  const date = value ? new Date(`1970-01-01T${value}`) : new Date();

  return (
    <DatePickerIOS
      mode="time"
      date={date}
      onDateChange={(newDate: Date) => {
        onChange(newDate.toLocaleTimeString('en-US', { hour12: false }));
      }}
    />
  );
} 