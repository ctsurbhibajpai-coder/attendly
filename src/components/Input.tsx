import React, { useState, useEffect } from 'react';
import {
  TextInput,
  View,
  Text,
  Pressable,
  TextInputProps,
  Platform,
} from 'react-native';
import { Feather } from '@expo/vector-icons';

export interface Country {
  name: string;
  code: string;
  flag: string;
}

const COUNTRIES: Country[] = [
  { name: 'India', code: '+91', flag: '🇮🇳' },
  { name: 'United States', code: '+1', flag: '🇺🇸' },
  { name: 'United Kingdom', code: '+44', flag: '🇬🇧' },
  { name: 'Canada', code: '+1', flag: '🇨🇦' },
  { name: 'Australia', code: '+61', flag: '🇦🇺' },
];

interface InputProps extends Omit<TextInputProps, 'secureTextEntry'> {
  label?: string;
  error?: string;
  helperText?: string;
  type?: 'text' | 'password' | 'email' | 'textarea' | 'phone';
  leadingIcon?: React.ReactNode;
  trailingIcon?: React.ReactNode;
  onClear?: () => void;
  showClearButton?: boolean;
  disabled?: boolean;
  onCountryChange?: (country: Country) => void;
  country?: Country; // Controlled country selection
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  helperText,
  type = 'text',
  leadingIcon,
  trailingIcon,
  onClear,
  showClearButton = false,
  disabled = false,
  editable = true,
  onFocus,
  onBlur,
  value,
  onCountryChange,
  country,
  style,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  
  // Default country is India (🇮🇳 +91), or controlled value if provided
  const [selectedCountry, setSelectedCountry] = useState<Country>(
    country || {
      name: 'India',
      code: '+91',
      flag: '🇮🇳',
    }
  );

  // Sync state if controlled country prop changes
  useEffect(() => {
    if (country) {
      setSelectedCountry(country);
    }
  }, [country]);

  const handleFocus = (e: any) => {
    setIsFocused(true);
    // Auto-close country dropdown when user clicks/focuses on the TextInput
    setShowCountryDropdown(false);
    if (onFocus) onFocus(e);
  };

  const handleBlur = (e: any) => {
    setIsFocused(false);
    if (onBlur) onBlur(e);
  };

  const selectCountry = (countryItem: Country) => {
    setSelectedCountry(countryItem);
    setShowCountryDropdown(false);
    if (onCountryChange) {
      onCountryChange(countryItem);
    }
  };

  const isEditable = editable && !disabled;
  const isPassword = type === 'password';
  const isTextArea = type === 'textarea';
  const isPhone = type === 'phone';

  let borderClass = 'border-neutral-200 bg-white';
  if (isFocused) {
    borderClass = error
      ? 'border-[#EF4444] bg-white ring-2 ring-red-100'
      : 'border-primary-500 bg-white ring-2 ring-primary-100';
  } else if (error) {
    borderClass = 'border-[#EF4444] bg-red-50/10';
  } else if (!isEditable) {
    borderClass = 'border-neutral-100 bg-neutral-50';
  } else if (value && value.length > 0) {
    borderClass = 'border-neutral-300 bg-white';
  }

  let keyboardType = props.keyboardType;
  if (type === 'email') {
    keyboardType = 'email-address';
  } else if (isPhone) {
    keyboardType = 'phone-pad';
  }

  return (
    <View 
      className="w-full mb-4"
      style={{ zIndex: showCountryDropdown ? 999 : 1 }}
    >
      {label && (
        <Text className={`text-b2 font-medium mb-1.5 font-sans ${error ? 'text-[#EF4444]' : 'text-neutral-700'}`}>
          {label}
        </Text>
      )}

      <View
        className={`
          flex-row items-center border w-full relative
          ${isTextArea ? 'rounded-2xl h-32 px-4 py-3' : 'rounded-full h-[52px] px-5'}
          ${borderClass}
        `}
      >
        {/* Country Flag & Country Code Dropdown Trigger */}
        {isPhone && (
          <Pressable
            onPress={() => isEditable && setShowCountryDropdown(!showCountryDropdown)}
            className="flex-row items-center mr-3 pr-3 border-r border-neutral-200 h-full active:opacity-75"
          >
            <Text className="text-lg mr-1">{selectedCountry.flag}</Text>
            <Text className="text-neutral-700 text-b2 font-sans font-medium mr-1">{selectedCountry.code}</Text>
            <Feather name={showCountryDropdown ? 'chevron-up' : 'chevron-down'} size={12} color="#64748B" />
          </Pressable>
        )}

        {leadingIcon && !isPhone && <View className="mr-3">{leadingIcon}</View>}

        <TextInput
          value={value}
          editable={isEditable}
          onFocus={handleFocus}
          onBlur={handleBlur}
          secureTextEntry={isPassword && !showPassword}
          multiline={isTextArea}
          numberOfLines={isTextArea ? 4 : 1}
          keyboardType={keyboardType}
          placeholderTextColor="#94A3B8"
          textAlign="left"
          textAlignVertical={isTextArea ? 'top' : 'center'}
          style={[
            {
              flex: 1,
              fontFamily: 'Google Sans Flex',
              fontSize: 14,
              color: isEditable ? (error ? '#EF4444' : '#0F172A') : '#94A3B8',
              height: '100%',
              paddingHorizontal: 0,
              paddingVertical: 0,
              margin: 0,
              textAlign: 'left',
            },
            style,
          ]}
          {...props}
        />

        {showClearButton && value && value.length > 0 && onClear && (
          <Pressable onPress={onClear} className="p-1 active:opacity-60">
            <Feather name="x-circle" size={16} color={error ? '#EF4444' : '#94A3B8'} />
          </Pressable>
        )}

        {isPassword && (
          <Pressable
            onPress={() => setShowPassword(!showPassword)}
            className="p-1 active:opacity-60 ml-2"
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Feather
              name={showPassword ? 'eye' : 'eye-off'}
              size={18}
              color={error ? '#EF4444' : '#6366F1'}
            />
          </Pressable>
        )}

        {trailingIcon && <View className="ml-2">{trailingIcon}</View>}

        {/* Floating Country Dropdown Overlay following Design System light mode tokens */}
        {isPhone && showCountryDropdown && (
          <View
            className="absolute left-4 top-[54px] w-[240px] bg-white border border-neutral-200 rounded-2xl shadow-xl p-1.5"
            style={{
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.15,
              shadowRadius: 8,
              elevation: 10,
              zIndex: 9999,
            }}
          >
            {COUNTRIES.map((item) => {
              const isSelected = selectedCountry.name === item.name;
              return (
                <Pressable
                  key={item.name}
                  onPress={() => selectCountry(item)}
                  className={`flex-row items-center px-3 py-2.5 my-0.5 rounded-xl active:opacity-85 ${
                    isSelected ? 'bg-primary-50' : 'bg-transparent'
                  }`}
                >
                  <Text className="text-lg mr-3">{item.flag}</Text>
                  <Text
                    className={`text-sm font-sans font-semibold flex-1 ${
                      isSelected ? 'text-primary-600' : 'text-neutral-800'
                    }`}
                  >
                    {item.name} ({item.code})
                  </Text>
                  {isSelected && (
                    <Feather name="check" size={14} color="#4F46E5" />
                  )}
                </Pressable>
              );
            })}
          </View>
        )}
      </View>

      {error ? (
        <Text className="text-b4 text-[#EF4444] mt-1.5 ml-2 font-medium font-sans">
          {error}
        </Text>
      ) : helperText ? (
        <Text className="text-b4 text-neutral-500 mt-1.5 ml-2 font-sans">
          {helperText}
        </Text>
      ) : null}
    </View>
  );
};
