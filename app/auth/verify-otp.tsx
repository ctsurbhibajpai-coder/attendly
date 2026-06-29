import React, { useState, useEffect, useRef } from 'react';
import {
  Text,
  View,
  Pressable,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';

export default function VerifyOtpScreen() {
  const router = useRouter();
  const [code, setCode] = useState<string[]>(['', '', '', '']);
  const [error, setError] = useState<string>('');
  const [timer, setTimer] = useState<number>(59);

  // Refs for auto-focusing code inputs
  const ref1 = useRef<TextInput>(null);
  const ref2 = useRef<TextInput>(null);
  const ref3 = useRef<TextInput>(null);
  const ref4 = useRef<TextInput>(null);
  const refs = [ref1, ref2, ref3, ref4];

  useEffect(() => {
    // Start countdown timer
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const handleTextChange = (text: string, index: number) => {
    const newCode = [...code];
    // Only take the last character typed (useful for web & copy-paste simulation)
    newCode[index] = text.slice(-1);
    setCode(newCode);
    if (error) setError('');

    // Auto-focus next input box if typed
    if (text.length > 0 && index < 3) {
      refs[index + 1].current?.focus();
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    // Focus previous input box on backspace press
    if (e.nativeEvent.key === 'Backspace' && !code[index] && index > 0) {
      refs[index - 1].current?.focus();
    }
  };

  const handleVerify = () => {
    const completeCode = code.join('');
    if (completeCode.length < 4) {
      setError('Please enter the complete 4-digit code');
      return;
    }

    // Verify successful redirection
    router.push('/design-system');
  };

  const handleResendCode = () => {
    if (timer === 0) {
      setTimer(59);
      setCode(['', '', '', '']);
      setError('');
      ref1.current?.focus();
    }
  };

  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.push('/auth/forgot-password');
    }
  };

  return (
    <View className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />

      {/* Decorative Premium Soft Background Glow (Top Right) */}
      <View
        className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-primary-100/40"
        style={{ filter: Platform.OS === 'web' ? 'blur(60px)' : undefined, opacity: 0.6 }}
      />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1">
        <SafeAreaView className="flex-1">
          {/* Header Navigation Area */}
          <View className="flex-row items-center px-6 py-4">
            <Pressable
              onPress={handleBack}
              className="h-10 w-10 items-center justify-center rounded-full bg-neutral-100 active:opacity-60">
              <Feather name="arrow-left" size={20} color="#1E293B" />
            </Pressable>
          </View>

          <ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled">
            {/* Main Content Form Section */}
            <View className="px-8 pb-6 pt-4">
              {/* Title & Subtitle */}
              <Text className="font-sans text-[32px] font-bold leading-[38px] tracking-tight text-neutral-900">
                Verification Code
              </Text>
              <Text className="mt-3 font-sans text-[15px] font-normal leading-[22px] text-neutral-500">
                {'Enter the 4-digit code sent to your registered email address.'}
              </Text>

              {/* OTP Input Grid */}
              <View className="mt-10 flex-row justify-between px-4">
                {refs.map((ref, index) => (
                  <View key={index} className="h-[64px] w-[64px]">
                    <TextInput
                      ref={ref}
                      value={code[index]}
                      onChangeText={(text) => handleTextChange(text, index)}
                      onKeyPress={(e) => handleKeyPress(e, index)}
                      keyboardType="number-pad"
                      maxLength={1}
                      textAlign="center"
                      className="h-full w-full rounded-2xl border border-neutral-200 bg-white text-center font-sans text-[22px] font-bold text-neutral-900"
                      style={{
                        borderColor: error ? '#EF4444' : code[index] ? '#4F46E5' : '#E2E8F0',
                      }}
                    />
                  </View>
                ))}
              </View>

              {/* Error Helper Text */}
              {error ? (
                <Text className="mt-4 text-center font-sans text-xs font-semibold text-[#EF4444]">
                  {error}
                </Text>
              ) : null}

              {/* Resend Timer Text */}
              <View className="mt-8 items-center">
                {timer > 0 ? (
                  <Text className="font-sans text-sm text-neutral-400">
                    Resend code in{' '}
                    <Text className="font-semibold text-neutral-600">
                      00:{timer < 10 ? `0${timer}` : timer}
                    </Text>
                  </Text>
                ) : (
                  <Pressable onPress={handleResendCode} className="active:opacity-60">
                    <Text className="font-sans text-sm font-bold text-[#4F46E5]">Resend Code</Text>
                  </Pressable>
                )}
              </View>
            </View>

            {/* Actions Section */}
            <View className="mt-auto px-8 pb-8 pt-4">
              {/* Primary Action Button */}
              <Pressable
                onPress={handleVerify}
                className="h-14 w-full flex-row items-center justify-center rounded-full bg-[#4F46E5]"
                style={({ pressed }) => [
                  {
                    transform: [{ scale: pressed ? 0.97 : 1 }],
                    shadowColor: '#4F46E5',
                    shadowOffset: { width: 0, height: 4 },
                    shadowOpacity: 0.25,
                    shadowRadius: 10,
                    elevation: 4,
                  },
                ]}>
                <Text className="font-sans text-[16px] font-bold tracking-wide text-white">
                  Verify
                </Text>
              </Pressable>
            </View>
          </ScrollView>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </View>
  );
}
