import React from 'react';
import { Pressable, Text, ActivityIndicator, View } from 'react-native';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'link';
export type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps {
  label?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  onPress?: () => void;
  disabled?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  label,
  variant = 'primary',
  size = 'md',
  onPress,
  disabled = false,
  loading = false,
  icon,
  iconPosition = 'left',
  className = '',
}) => {
  const isLink = variant === 'link';
  const isIconOnly = !label && !!icon;

  const variantStyles: Record<ButtonVariant, string> = {
    primary: 'bg-primary-600 border-primary-600 active:bg-primary-700',
    secondary: 'bg-neutral-800 border-neutral-800 active:bg-neutral-900',
    outline: 'bg-transparent border-neutral-300 active:bg-neutral-50',
    ghost: 'bg-transparent border-transparent active:bg-neutral-100',
    link: 'bg-transparent border-transparent active:opacity-70 p-0',
  };

  const textStyles: Record<ButtonVariant, string> = {
    primary: 'text-white font-medium',
    secondary: 'text-white font-medium',
    outline: 'text-neutral-800 font-medium',
    ghost: 'text-neutral-700 font-medium',
    link: 'text-primary-600 font-semibold underline',
  };

  // Centering alignment explicitly by removing padding in iconOnly styling
  const sizeStyles: Record<ButtonSize, { container: string; text: string; iconOnly: string }> = {
    sm: {
      container: isLink ? '' : 'px-3 py-1.5 border',
      text: 'text-b4',
      iconOnly: 'border w-9 h-9 p-0 justify-center items-center',
    },
    md: {
      container: isLink ? '' : 'px-5 py-2.5 border',
      text: 'text-b2',
      iconOnly: 'border w-12 h-12 p-0 justify-center items-center',
    },
    lg: {
      container: isLink ? '' : 'px-7 py-3.5 border',
      text: 'text-b1',
      iconOnly: 'border w-[56px] h-[56px] p-0 justify-center items-center',
    },
  };

  const currentVariantStyle = variantStyles[variant];
  const currentTextStyle = textStyles[variant];
  const currentSizeStyle = sizeStyles[size];

  const isDisabled = disabled || loading;

  return (
    <Pressable
      onPress={isDisabled ? undefined : onPress}
      disabled={isDisabled}
      className={`
        flex-row items-center justify-center rounded-full
        ${currentVariantStyle}
        ${isIconOnly ? currentSizeStyle.iconOnly : currentSizeStyle.container}
        ${isDisabled ? 'opacity-40' : 'opacity-100'}
        ${className}
      `}
      style={({ pressed }) => (pressed && !isDisabled ? { transform: [{ scale: 0.97 }] } : {})}>
      {loading ? (
        <ActivityIndicator
          size="small"
          color={
            variant === 'outline' || variant === 'ghost' || variant === 'link'
              ? '#4F46E5'
              : '#FFFFFF'
          }
        />
      ) : isIconOnly ? (
        <View className="items-center justify-center">{icon}</View>
      ) : (
        <View className="flex-row items-center justify-center">
          {icon && iconPosition === 'left' && <View className="mr-2">{icon}</View>}

          <Text className={`${currentTextStyle} ${currentSizeStyle.text} text-center font-sans`}>
            {label}
          </Text>

          {icon && iconPosition === 'right' && <View className="ml-2">{icon}</View>}
        </View>
      )}
    </Pressable>
  );
};
