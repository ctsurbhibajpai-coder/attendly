import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Button } from './src/components/Button';
import DesignSystemShowcase from './app/design-system';

import './global.css';

export default function App() {
  const [showDesignSystem, setShowDesignSystem] = useState(false);

  return (
    <SafeAreaProvider>
      {showDesignSystem ? (
        <View className="flex-1">
          {/* Overriding back home link behavior inside App.tsx view */}
          <DesignSystemShowcase />
          <View className="absolute bottom-6 right-6 z-50">
            <Button
              variant="primary"
              label="Exit Showcase"
              onPress={() => setShowDesignSystem(false)}
            />
          </View>
        </View>
      ) : (
        <View className="flex-1 items-center justify-center bg-slate-50 p-6">
          <Text className="text-4xl font-extrabold text-slate-900 mb-2 font-sans">
            Attendly
          </Text>
          <Text className="text-slate-600 text-center mb-8 font-sans">
            Welcome to the Attendance Management System
          </Text>
          <Button
            variant="primary"
            label="View Design System"
            onPress={() => setShowDesignSystem(true)}
          />
          <StatusBar style="auto" />
        </View>
      )}
    </SafeAreaProvider>
  );
}


