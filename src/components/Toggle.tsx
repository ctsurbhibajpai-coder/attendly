import React, { useEffect, useRef } from 'react';
import { Pressable, Animated } from 'react-native';

interface ToggleProps {
  checked: boolean;
  onChange: (value: boolean) => void;
  disabled?: boolean;
  className?: string;
}

export const Toggle: React.FC<ToggleProps> = ({
  checked,
  onChange,
  disabled = false,
  className = '',
}) => {
  const animatedValue = useRef(new Animated.Value(checked ? 1 : 0)).current;

  useEffect(() => {
    Animated.spring(animatedValue, {
      toValue: checked ? 1 : 0,
      tension: 180,
      friction: 14,
      useNativeDriver: false,
    }).start();
  }, [checked]);

  const handlePress = () => {
    if (!disabled) {
      onChange(!checked);
    }
  };

  // Toggle Track: Width 52px, Height 28px.
  // Knob: Width 24px, Height 24px (leaves exactly 2px padding on all sides)
  const translateX = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [2, 26],
  });

  const backgroundColor = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['#D1D5DB', '#4F46E5'], // Slate/Gray-300 to Indigo-600 (Primary)
  });

  return (
    <Pressable
      onPress={handlePress}
      disabled={disabled}
      className={`
        h-[28px] w-[52px] justify-center rounded-full
        ${disabled ? 'opacity-40' : 'opacity-100'}
        ${className}
      `}>
      <Animated.View
        style={{
          backgroundColor,
          width: '100%',
          height: '100%',
          borderRadius: 9999,
          justifyContent: 'center',
        }}>
        <Animated.View
          style={{
            transform: [{ translateX }],
            width: 24,
            height: 24,
            borderRadius: 12,
            backgroundColor: '#FFFFFF',
          }}
        />
      </Animated.View>
    </Pressable>
  );
};
