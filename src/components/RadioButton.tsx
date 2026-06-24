import React from 'react';
import { Pressable, View, Text } from 'react-native';

interface RadioButtonProps {
  selected: boolean;
  onSelect: () => void;
  disabled?: boolean;
  label?: string;
  className?: string;
}

export const RadioButton: React.FC<RadioButtonProps> = ({
  selected,
  onSelect,
  disabled = false,
  label,
  className = '',
}) => {
  const handlePress = () => {
    if (!disabled && !selected) {
      onSelect();
    }
  };

  const borderStyle = disabled
    ? 'border-neutral-200'
    : selected
    ? 'border-primary-600'
    : 'border-neutral-300 active:border-primary-500';

  const bgStyle = disabled
    ? 'bg-neutral-50'
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
          w-5 h-5 border rounded-full items-center justify-center
          ${borderStyle} ${bgStyle}
        `}
      >
        {selected && (
          <View
            className={`
              w-2.5 h-2.5 rounded-full
              ${disabled ? 'bg-neutral-300' : 'bg-primary-600'}
            `}
          />
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
