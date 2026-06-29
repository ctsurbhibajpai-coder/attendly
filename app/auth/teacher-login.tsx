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

export default function TeacherLoginScreen() {
  const router = useRouter();
  const [teacherId, setTeacherId] = useState('');
  const [password, setPassword] = useState('');

  const [teacherIdError, setTeacherIdError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleSignIn = () => {
    let isValid = true;

    if (!teacherId) {
      setTeacherIdError('Teacher ID is required');
      isValid = false;
    } else {
      setTeacherIdError('');
    }

    if (!password) {
      setPasswordError('Password is required');
      isValid = false;
    } else {
      setPasswordError('');
    }

    if (isValid) {
      // Navigate to teacher dashboard
      router.push('/teacher/dashboard');
    }
  };

  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.push('/auth/role-selection');
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
                Teacher Sign In
              </Text>
              <Text className="mt-3 font-sans text-[15px] font-normal leading-[22px] text-neutral-500">
                Enter your Teacher ID and password to access your attendance dashboard.
              </Text>

              {/* Form Fields */}
              <View className="mt-8">
                {/* Teacher ID Input Field */}
                <Input
                  label="Teacher ID"
                  placeholder="e.g. TCH1024"
                  value={teacherId}
                  onChangeText={(text) => {
                    setTeacherId(text);
                    if (teacherIdError) setTeacherIdError('');
                  }}
                  error={teacherIdError}
                  autoCapitalize="characters"
                  autoCorrect={false}
                />

                {/* Password Input Field */}
                <View className="mt-4">
                  <Input
                    label="Password"
                    placeholder="••••••••"
                    value={password}
                    onChangeText={(text) => {
                      setPassword(text);
                      if (passwordError) setPasswordError('');
                    }}
                    error={passwordError}
                    isPassword={true}
                    autoCapitalize="none"
                    autoCorrect={false}
                  />
                </View>

                {/* Forgot Password Link - Aligned Right for natural thumb reach */}
                <View className="mt-1 flex-row justify-end">
                  <Pressable
                    onPress={() => router.push('/auth/forgot-password')}
                    className="py-1 active:opacity-60">
                    <Text className="font-sans text-sm font-normal text-[#818CF8]">
                      Forgot Password?
                    </Text>
                  </Pressable>
                </View>
              </View>
            </View>

            {/* Actions Section */}
            <View className="mt-auto px-8 pb-8 pt-4">
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
                <Text className="font-sans text-[16px] font-bold tracking-wide text-white">
                  Sign In
                </Text>
              </Pressable>
            </View>
          </ScrollView>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </View>
  );
}
