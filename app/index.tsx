import React, { useEffect, useRef } from 'react';
import { View, Text, StatusBar, Animated, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function IndexScreen() {
  const router = useRouter();

  // Animation values
  const logoScale = useRef(new Animated.Value(0.4)).current;
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const titleOpacity = useRef(new Animated.Value(0)).current;
  const titleTranslateY = useRef(new Animated.Value(20)).current;
  const taglineOpacity = useRef(new Animated.Value(0)).current;
  const progressWidth = useRef(new Animated.Value(0)).current;
  const bgPulse = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Run background decorative pulse animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(bgPulse, {
          toValue: 1.15,
          duration: 3000,
          useNativeDriver: true,
        }),
        Animated.timing(bgPulse, {
          toValue: 1,
          duration: 3000,
          useNativeDriver: true,
        }),
      ])
    ).start();

    // Sequence for entry elements
    Animated.sequence([
      // 1. Logo pop-in
      Animated.parallel([
        Animated.spring(logoScale, {
          toValue: 1,
          tension: 40,
          friction: 7,
          useNativeDriver: true,
        }),
        Animated.timing(logoOpacity, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
      ]),
      // 2. Title slide up & fade in
      Animated.parallel([
        Animated.timing(titleTranslateY, {
          toValue: 0,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.timing(titleOpacity, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
      ]),
      // 3. Tagline fade in & progress start
      Animated.parallel([
        Animated.timing(taglineOpacity, {
          toValue: 0.8,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(progressWidth, {
          toValue: 1,
          duration: 1200,
          useNativeDriver: false, // width animation does not support native driver
        }),
      ]),
    ]).start();

    // Route transitions after 2.8 seconds to allow full animation lifecycle
    const timer = setTimeout(() => {
      router.replace('/auth/role-selection');
    }, 2800);

    return () => clearTimeout(timer);
  }, [
    router,
    logoScale,
    logoOpacity,
    titleOpacity,
    titleTranslateY,
    taglineOpacity,
    progressWidth,
    bgPulse,
  ]);

  // Interpolate progress width
  const loadingBarWidth = progressWidth.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  return (
    <View className="flex-1 items-center justify-between bg-[#4F46E5] px-6 py-16">
      <StatusBar barStyle="light-content" backgroundColor="#4F46E5" translucent />

      {/* Background Decorative Glowing Elements */}
      <View
        style={StyleSheet.absoluteFillObject}
        className="items-center justify-center overflow-hidden">
        <Animated.View
          style={{
            transform: [{ scale: bgPulse }],
            opacity: 0.12,
          }}
          className="absolute h-96 w-96 rounded-full bg-white blur-3xl"
        />
        <Animated.View
          style={{
            transform: [{ scale: bgPulse }],
            opacity: 0.06,
          }}
          className="absolute -bottom-10 -right-10 h-72 w-72 rounded-full bg-white blur-2xl"
        />
        <Animated.View
          style={{
            transform: [{ scale: bgPulse }],
            opacity: 0.05,
          }}
          className="absolute -left-10 -top-10 h-64 w-64 rounded-full bg-white blur-2xl"
        />
      </View>

      {/* Spacer for layout */}
      <View />

      {/* Main Branding Section */}
      <View className="items-center justify-center">
        {/* Animated Logo Container */}
        <Animated.View
          style={{
            transform: [{ scale: logoScale }],
            opacity: logoOpacity,
            shadowColor: '#000000',
            shadowOffset: { width: 0, height: 12 },
            shadowOpacity: 0.2,
            shadowRadius: 16,
            elevation: 10,
          }}
          className="h-28 w-28 items-center justify-center rounded-[32px] bg-white/20 p-[3px]">
          {/* Inner ring for sleek aesthetic */}
          <View className="h-full w-full items-center justify-center rounded-[29px] bg-white">
            <MaterialCommunityIcons name="calendar-check" size={54} color="#4F46E5" />
          </View>
        </Animated.View>

        {/* Brand Text Section */}
        <Animated.View
          style={{
            opacity: titleOpacity,
            transform: [{ translateY: titleTranslateY }],
          }}
          className="mt-6 items-center">
          <Text className="font-sans text-[42px] font-bold tracking-tight text-white">
            Attend<Text className="text-[#C7D2FE]">ly</Text>
          </Text>

          <Animated.Text
            style={{ opacity: taglineOpacity }}
            className="mt-2 text-center font-sans text-[15px] font-normal tracking-wider text-primary-100/90">
            Smart attendance, made simple
          </Animated.Text>
        </Animated.View>
      </View>

      {/* Bottom Footer Section */}
      <View className="w-full items-center px-8">
        {/* Sleek Progress Bar Container */}
        <View className="h-[3px] w-48 overflow-hidden rounded-full bg-white/20">
          <Animated.View
            style={{
              width: loadingBarWidth,
            }}
            className="h-full rounded-full bg-white"
          />
        </View>

        {/* Small version info */}
        <Text className="mt-6 font-sans text-[11px] font-medium uppercase tracking-widest text-[#C7D2FE]">
          Version 1.0.0
        </Text>
      </View>
    </View>
  );
}
