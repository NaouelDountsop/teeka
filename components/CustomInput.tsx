import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';

interface CustomInputProps extends TextInputProps {
  label?: string;
  error?: string;
  icon?: any;
  isPassword?: boolean;
  innerStyle?: string;
}

const CustomInput: React.FC<CustomInputProps> = ({
  label,
  error,
  icon,
  isPassword,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false); 

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}

      <View
        style={[
          styles.inputContainer,
          isFocused && styles.inputFocused, 
          error && styles.inputError,
        ]}
      >
        {icon && (
          typeof icon === 'string' ? (
            <Ionicons name={icon} size={20} color="#888" style={styles.icon} />
          ) : (
            <View style={styles.icon}>{icon}</View>
          )
        )}

        <TextInput
          {...props}
          style={styles.input}
          secureTextEntry={isPassword && !showPassword}
          placeholder={props.placeholder || (isPassword ? ' ' : '')}
          placeholderTextColor="#aaa"
          onFocus={() => setIsFocused(true)} 
          onBlur={() => setIsFocused(false)} 
        />

        {isPassword && (
          <TouchableOpacity onPress={togglePasswordVisibility}>
            <Ionicons
              name={showPassword ? 'eye-outline' : 'eye-off-outline'}
              size={20}
              color="#888"
              style={styles.iconRight}
            />
          </TouchableOpacity>
        )}
      </View>

      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

export default CustomInput;

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    marginBottom: 6,
    fontWeight: '600',
    color: '#333',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  inputFocused: {
    borderColor: '#0066ffff', 
  },
  input: {
    flex: 1,
    height:50,
    color: '#000',
    paddingHorizontal: 8,
    fontSize: 16,
  },
  icon: {
    marginRight: 8,
  },
  iconRight: {
    marginLeft: 8,
  },
  inputError: {
    borderColor: 'red',
  },
  errorText: {
    marginTop: 4,
    color: 'red',
    fontSize: 13,
  },
});
