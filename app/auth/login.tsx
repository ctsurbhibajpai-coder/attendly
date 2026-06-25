import React from 'react';
import { Text, View, Pressable, StatusBar, SafeAreaView, Image } from 'react-native';
import { FontAwesome, Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

interface LoginScreenProps {
  onNavigate?: () => void;
}

export default function LoginScreen({ onNavigate }: LoginScreenProps) {
  let router: any = null;
  try {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    router = useRouter();
  } catch (e) {
    // Router context not available (e.g., when rendered directly in App.tsx)
  }

  const handleGoogleLogin = () => {
    if (router) {
      router.push('/design-system');
    } else if (onNavigate) {
      onNavigate();
    }
  };

  const handleEmailLogin = () => {
    if (router) {
      router.push('/design-system');
    } else if (onNavigate) {
      onNavigate();
    }
  };

  return (
    <View className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />

      {/* Soft Purple/Lavender Glow at the Top */}
      <View
        className="absolute left-0 right-0 top-0 h-[42%] bg-[#EEF2FF]"
        style={{
          borderBottomLeftRadius: 180,
          borderBottomRightRadius: 180,
          transform: [{ scaleX: 1.5 }],
          opacity: 0.7,
        }}
      />

      <SafeAreaView className="flex-1 justify-between px-8 pb-8">
        {/* Top Spacer / Graphic Area */}
        <View className="flex-1 items-center justify-center pt-10">
          {/* Custom Envelope Graphic Image */}
          <Image
            source={require('../../assets/login-graphic.png')}
            className="h-44 w-52"
            resizeMode="contain"
          />

          {/* Title & Subtitle */}
          <Text className="mt-8 text-center font-sans text-[32px] font-bold leading-[40px] tracking-tight text-neutral-900">
            Verify your email
          </Text>
          <Text className="mt-3 text-center font-sans text-[15px] font-normal leading-[22px] text-neutral-500">
            Enter your email to setup your account
          </Text>
        </View>

        {/* Action Buttons Section */}
        <View className="mb-10 w-full">
          {/* Continue with Google */}
          <Pressable
            onPress={handleGoogleLogin}
            className="mb-4 h-14 w-full flex-row items-center justify-center rounded-full bg-[#4F46E5]"
            style={({ pressed }) => [
              {
                transform: [{ scale: pressed ? 0.98 : 1 }],
                shadowColor: '#4F46E5',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.2,
                shadowRadius: 8,
                elevation: 3,
              },
            ]}>
            <FontAwesome name="google" size={18} color="white" style={{ marginRight: 8 }} />
            <Text className="font-sans text-[16px] font-semibold tracking-wide text-white">
              Continue with Google
            </Text>
          </Pressable>

          {/* Continue with Email */}
          <Pressable
            onPress={handleEmailLogin}
            className="h-14 w-full flex-row items-center justify-center rounded-full bg-[#F1F5F9]"
            style={({ pressed }) => [
              {
                transform: [{ scale: pressed ? 0.98 : 1 }],
              },
            ]}>
            <Feather name="mail" size={18} color="#1E293B" style={{ marginRight: 8 }} />
            <Text className="font-sans text-[16px] font-semibold tracking-wide text-[#1E293B]">
              Continue with Email
            </Text>
          </Pressable>
        </View>

        {/* Footer Terms & Privacy */}
        <View className="items-center pb-2">
          <Text className="text-center font-sans text-[12px] leading-5 text-neutral-400">
            By continuing you agree to the{'\n'}
            <Text className="font-medium text-neutral-500 underline">
              Terms & Conditions
            </Text> & <Text className="font-medium text-neutral-500 underline">Privacy Policy</Text>
          </Text>
        </View>
      </SafeAreaView>
    </View>
  );
}
