import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface CustomCheckboxProps {
  label: string;
  checked: boolean;
  onToggle: () => void;
}

export default function CustomCheckbox({ label, checked, onToggle }: CustomCheckboxProps) {
  return (
    <TouchableOpacity onPress={onToggle} style={styles.container}>
      <View style={[styles.box, checked && styles.checkedBox]}>
        {checked && <Text style={styles.check}>✓</Text>}
      </View>
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  box: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: '#0091eb',
    borderRadius: 4,
    marginRight: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkedBox: {
    backgroundColor: '#0091eb',
  },
  check: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  label: {
    color: '#444',
  },
});
