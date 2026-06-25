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

  const bgStyle = disabled ? 'bg-neutral-100' : isActive ? 'bg-primary-600' : 'bg-white';

  return (
    <Pressable
      onPress={handlePress}
      disabled={disabled}
      className={`
        flex-row items-center py-2
        ${disabled ? 'opacity-40' : 'opacity-100'}
        ${className}
      `}>
      <View
        className={`
          h-5 w-5 items-center justify-center rounded-md border
          ${borderStyle} ${bgStyle}
        `}>
        {checked && !indeterminate && (
          <Feather name="check" size={13} color="#FFFFFF" style={{ fontWeight: 'bold' }} />
        )}
        {indeterminate && <View className="h-0.5 w-2.5 rounded bg-white" />}
      </View>
      {label && (
        <Text className="ml-3 font-sans text-b2 font-medium text-neutral-700">{label}</Text>
      )}
    </Pressable>
  );
};
