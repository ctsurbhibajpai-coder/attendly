import React from 'react';
import { View, Text } from 'react-native';

export type BadgeType = 'primary' | 'success' | 'warning' | 'error' | 'neutral' | 'info';
export type BadgeVariant = 'solid' | 'subtle' | 'outline';
export type BadgeSize = 'sm' | 'md';

interface BadgeProps {
  label: string;
  type?: BadgeType;
  variant?: BadgeVariant;
  size?: BadgeSize;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  label,
  type = 'primary',
  variant = 'solid',
  size = 'md',
  className = '',
}) => {
  // Styling mappings based on type and variant
  const stylesMap: Record<
    BadgeType,
    Record<BadgeVariant, { bg: string; border: string; text: string }>
  > = {
    primary: {
      solid: { bg: 'bg-primary', border: 'border-transparent', text: 'text-white' },
      subtle: { bg: 'bg-primary-light', border: 'border-transparent', text: 'text-primary' },
      outline: { bg: 'bg-transparent', border: 'border-primary', text: 'text-primary' },
    },
    success: {
      solid: { bg: 'bg-emerald-600', border: 'border-transparent', text: 'text-white' },
      subtle: { bg: 'bg-emerald-50', border: 'border-transparent', text: 'text-emerald-700' },
      outline: { bg: 'bg-transparent', border: 'border-emerald-600', text: 'text-emerald-600' },
    },
    warning: {
      solid: { bg: 'bg-amber-500', border: 'border-transparent', text: 'text-white' },
      subtle: { bg: 'bg-amber-50', border: 'border-transparent', text: 'text-amber-700' },
      outline: { bg: 'bg-transparent', border: 'border-amber-500', text: 'text-amber-600' },
    },
    error: {
      solid: { bg: 'bg-rose-600', border: 'border-transparent', text: 'text-white' },
      subtle: { bg: 'bg-rose-50', border: 'border-transparent', text: 'text-rose-700' },
      outline: { bg: 'bg-transparent', border: 'border-rose-600', text: 'text-rose-600' },
    },
    neutral: {
      solid: { bg: 'bg-slate-700', border: 'border-transparent', text: 'text-white' },
      subtle: { bg: 'bg-slate-100', border: 'border-transparent', text: 'text-slate-700' },
      outline: { bg: 'bg-transparent', border: 'border-slate-300', text: 'text-slate-600' },
    },
    info: {
      solid: { bg: 'bg-blue-600', border: 'border-transparent', text: 'text-white' },
      subtle: { bg: 'bg-blue-50', border: 'border-transparent', text: 'text-blue-700' },
      outline: { bg: 'bg-transparent', border: 'border-blue-600', text: 'text-blue-600' },
    },
  };

  const sizeStyles: Record<BadgeSize, { container: string; text: string }> = {
    sm: {
      container: 'px-2 py-0.5 border',
      text: 'text-[10px] font-bold',
    },
    md: {
      container: 'px-3 py-1 border',
      text: 'text-xs font-semibold',
    },
  };

  const currentStyles = stylesMap[type][variant];
  const currentSize = sizeStyles[size];

  return (
    <View
      className={`
        flex-row items-center justify-center self-start rounded-full
        ${currentStyles.bg}
        ${currentStyles.border}
        ${currentSize.container}
        ${className}
      `}>
      <Text
        className={`${currentStyles.text} ${currentSize.text} font-sans uppercase tracking-wider`}>
        {label}
      </Text>
    </View>
  );
};
