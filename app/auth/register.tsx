import React, { useState } from 'react';
import {
  Text,
  View,
  Pressable,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { Input } from '../../src/components/Input';

export default function RegisterScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(true);

  const handleSignUp = () => {
    let isValid = true;

    // Email validation
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

    // Password validation
    if (!password) {
      setPasswordError('Password is required');
      isValid = false;
    } else if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters');
      isValid = false;
    } else {
      setPasswordError('');
    }

    // Confirm password validation
    if (!confirmPassword) {
      setConfirmPasswordError('Please confirm your password');
      isValid = false;
    } else if (password !== confirmPassword) {
      setConfirmPasswordError('Passwords do not match');
      isValid = false;
    } else {
      setConfirmPasswordError('');
    }

    if (isValid && termsAccepted) {
      // Simulate registration and go to design-system or home
      router.push('/design-system');
    }
  };

  const handleBackToLogin = () => {
    // Navigate back if possible, otherwise go to email auth
    if (router.canGoBack()) {
      router.back();
    } else {
      router.push('/auth/email');
    }
  };

  const handleGoogleLogin = () => {
    router.push('/design-system');
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
              onPress={handleBackToLogin}
              className="h-10 w-10 items-center justify-center rounded-full bg-neutral-100 active:opacity-60">
              <Feather name="arrow-left" size={20} color="#1E293B" />
            </Pressable>
          </View>

          <ScrollView
            contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled">
            {/* Main Content Form Section */}
            <View className="px-8 pb-6 pt-4">
              {/* Title & Subtitle */}
              <Text className="font-sans text-[32px] font-bold leading-[38px] tracking-tight text-neutral-900">
                Create Account
              </Text>
              <Text className="mt-2.5 font-sans text-[15px] font-normal leading-[22px] text-neutral-500">
                Sign up to start tracking attendance and scheduling with ease.
              </Text>

              {/* Form Fields */}
              <View className="mt-8">
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
                />

                {/* Confirm Password Input Field */}
                <Input
                  label="Confirm Password"
                  placeholder="••••••••"
                  type="password"
                  value={confirmPassword}
                  onChangeText={(text) => {
                    setConfirmPassword(text);
                    if (confirmPasswordError) setConfirmPasswordError('');
                  }}
                  error={confirmPasswordError}
                  autoCapitalize="none"
                  autoCorrect={false}
                />
              </View>

              {/* Consent checkmark row */}
              <Pressable
                onPress={() => setTermsAccepted(!termsAccepted)}
                className="mt-4 flex-row items-start px-2 active:opacity-85">
                <View
                  className={`mt-0.5 h-[18px] w-[18px] items-center justify-center rounded border ${
                    termsAccepted ? 'border-[#4F46E5] bg-[#4F46E5]' : 'border-neutral-300 bg-white'
                  }`}
                  style={{ marginRight: 10 }}>
                  {termsAccepted && <Feather name="check" size={12} color="white" />}
                </View>

                <Text className="flex-1 font-sans text-[13px] leading-5 text-neutral-500">
                  I agree to the{' '}
                  <Text className="font-semibold text-[#4F46E5] underline">Terms of Service</Text>{' '}
                  and <Text className="font-semibold text-[#4F46E5] underline">Privacy Policy</Text>
                  .
                </Text>
              </Pressable>
            </View>

            {/* Actions Section */}
            <View className="px-8 pb-8 pt-4">
              {/* Primary Action Button */}
              <Pressable
                onPress={handleSignUp}
                disabled={!termsAccepted}
                className={`h-14 w-full flex-row items-center justify-center rounded-full ${
                  termsAccepted ? 'bg-[#4F46E5]' : 'bg-[#C7D2FE]'
                }`}
                style={({ pressed }) => [
                  {
                    transform: [{ scale: pressed && termsAccepted ? 0.97 : 1 }],
                    shadowColor: '#4F46E5',
                    shadowOffset: { width: 0, height: 4 },
                    shadowOpacity: termsAccepted ? 0.25 : 0,
                    shadowRadius: 10,
                    elevation: termsAccepted ? 4 : 0,
                  },
                ]}>
                <Text className="font-sans text-[16px] font-bold tracking-wide text-white">
                  Create Account
                </Text>
              </Pressable>

              {/* Or divider */}
              <View className="my-5 flex-row items-center">
                <View className="h-[1px] flex-1 bg-neutral-200" />
                <Text className="mx-4 font-sans text-xs font-bold uppercase tracking-wider text-neutral-400">
                  Or continue with
                </Text>
                <View className="h-[1px] flex-1 bg-neutral-200" />
              </View>

              {/* Google Button */}
              <Pressable
                onPress={handleGoogleLogin}
                className="h-14 w-full flex-row items-center justify-center rounded-full bg-[#F1F5F9]"
                style={({ pressed }) => [
                  {
                    transform: [{ scale: pressed ? 0.98 : 1 }],
                  },
                ]}>
                <Image
                  source={require('../../assets/google-logo.png')}
                  style={{ width: 20, height: 20, marginRight: 10 }}
                  resizeMode="contain"
                />
                <Text className="font-sans text-[16px] font-bold tracking-wide text-neutral-800">
                  Continue with Google
                </Text>
              </Pressable>

              {/* Redirect back to Login */}
              <View className="mt-6 flex-row justify-center">
                <Text className="font-sans text-sm text-neutral-400">
                  Already have an account?{' '}
                </Text>
                <Pressable onPress={handleBackToLogin} className="active:opacity-60">
                  <Text className="font-sans text-sm font-bold text-[#4F46E5]">Sign In</Text>
                </Pressable>
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </View>
  );
}
