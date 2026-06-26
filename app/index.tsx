import React, { useEffect } from 'react';
import { View, StatusBar, Image } from 'react-native';
import { useRouter } from 'expo-router';
// import '../global.css';


export default function IndexScreen() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace('/auth/login');
    }, 2500);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <View className="flex-1 items-center justify-center bg-[#5B51E8]">
      <StatusBar barStyle="light-content" backgroundColor="#5B51E8" />
      <Image
        source={require('../assets/splash.png')}
        className="h-full w-full"
        resizeMode="contain"
      />
    </View>
  );
}
