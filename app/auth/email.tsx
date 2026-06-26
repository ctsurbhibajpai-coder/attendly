import React, { useState } from 'react';
import {
  Text,
  View,
  Pressable,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { Input } from '../../src/components/Input';

export default function EmailAuthScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleSignIn = () => {
    let isValid = true;

    if (!email) {
      setEmailError('Email address is required');
      isValid = false;
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        setEmailError('Please enter a valid email address');
        isValid = false;
      } else {
        setEmailError('');
      }
    }

    if (!password) {
      setPasswordError('Password is required');
      isValid = false;
    } else if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters');
      isValid = false;
    } else {
      setPasswordError('');
    }

    if (isValid) {
      router.push('/design-system');
    }
  };

  const handleForgotPassword = () => {
    router.push('/auth/forgot-password');
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
          <ScrollView
            contentContainerStyle={{ flexGrow: 1, justifyContent: 'between' }}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled">
            
            {/* Upper Content Section */}
            <View className="px-8 pt-10">
              
              {/* Soft, modern mini-branding icon/accent */}
              <View className="mb-8 h-12 w-12 items-center justify-center rounded-2xl bg-primary-50">
                <Feather name="shield" size={24} color="#4F46E5" />
              </View>

              {/* Title & Subtitle */}
              <Text className="font-sans text-[32px] font-bold leading-[38px] tracking-tight text-neutral-900">
                Sign in
              </Text>
              <Text className="mt-3 font-sans text-[15px] font-normal leading-[22px] text-neutral-500">
                Enter your registered email and password to secure your account access.
              </Text>

              {/* Form Fields */}
              <View className="mt-10">
                {/* Email Input Field */}
                <Input
                  label="Email Address"
                  placeholder="name@example.com"
                  type="email"
                  value={email}
                  onChangeText={(text) => {
                    setEmail(text);
                    if (emailError) setEmailError('');
                  }}
                  error={emailError}
                  autoCapitalize="none"
                  autoCorrect={false}
                  keyboardType="email-address"
                  leadingIcon={<Feather name="mail" size={18} color="#94A3B8" />}
                />

                {/* Password Input Field */}
                <Input
                  label="Password"
                  placeholder="••••••••"
                  type="password"
                  value={password}
                  onChangeText={(text) => {
                    setPassword(text);
                    if (passwordError) setPasswordError('');
                  }}
                  error={passwordError}
                  autoCapitalize="none"
                  autoCorrect={false}
                  leadingIcon={<Feather name="lock" size={18} color="#94A3B8" />}
                />

                {/* Forgot Password Link - Aligned Right for natural thumb reach */}
                <View className="flex-row justify-end mt-1">
                  <Pressable
                    onPress={handleForgotPassword}
                    className="py-1 active:opacity-60">
                    <Text className="font-sans text-sm font-semibold text-[#4F46E5]">
                      Forgot Password?
                    </Text>
                  </Pressable>
                </View>
              </View>
            </View>

            {/* Bottom Actions Section */}
            <View className="px-8 pb-8 pt-6 mt-auto">
              {/* Primary Action Button */}
              <Pressable
                onPress={handleSignIn}
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
                <Text className="font-sans text-[16px] font-bold tracking-wide text-white mr-2">
                  Sign In
                </Text>
                <Feather name="arrow-right" size={16} color="white" />
              </Pressable>

              {/* Secondary Sign Up Footer */}
              <View className="flex-row justify-center mt-6">
                <Text className="font-sans text-sm text-neutral-400">
                  Don't have an account?{' '}
                </Text>
                <Pressable className="active:opacity-60">
                  <Text className="font-sans text-sm font-bold text-[#4F46E5]">
                    Sign Up
                  </Text>
                </Pressable>
              </View>
            </View>

          </ScrollView>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </View>
  );
}
