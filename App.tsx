import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import './global.css';

export default function App() {
  return (
    <SafeAreaProvider>
      <View className="flex-1 items-center justify-center bg-white">
        <Text className="text-2xl font-bold text-gray-800">Hello </Text>
        <StatusBar style="auto" />
      </View>
    </SafeAreaProvider>
  );
}

