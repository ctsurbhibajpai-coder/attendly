import React from 'react';
import { Pressable, View, Text } from 'react-native';
import { Feather } from '@expo/vector-icons';

interface CheckboxProps {
  checked: boolean;
  onChange: (value: boolean) => void;
  indeterminate?: boolean;
  disabled?: boolean;
  label?: string;
  className?: string;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  checked,
  onChange,
  indeterminate = false,
  disabled = false,
  label,
  className = '',
}) => {
  const handlePress = () => {
    if (!disabled) {
      onChange(!checked);
    }
  };

  const isActive = checked || indeterminate;
  const borderStyle = disabled
    ? 'border-neutral-200'
    : isActive
    ? 'border-primary-600'
    : 'border-neutral-300 active:border-primary-500';

  const bgStyle = disabled
    ? 'bg-neutral-100'
    : isActive
    ? 'bg-primary-600'
    : 'bg-white';

  return (
    <Pressable
      onPress={handlePress}
      disabled={disabled}
      className={`
        flex-row items-center py-2
        ${disabled ? 'opacity-40' : 'opacity-100'}
        ${className}
      `}
    >
      <View
        className={`
          w-5 h-5 border rounded-md items-center justify-center
          ${borderStyle} ${bgStyle}
        `}
      >
        {checked && !indeterminate && (
          <Feather name="check" size={13} color="#FFFFFF" style={{ fontWeight: 'bold' }} />
        )}
        {indeterminate && (
          <View className="w-2.5 h-0.5 bg-white rounded" />
        )}
      </View>
      {label && (
        <Text className="ml-3 text-neutral-700 text-b2 font-sans font-medium">
          {label}
        </Text>
      )}
    </Pressable>
  );
};
