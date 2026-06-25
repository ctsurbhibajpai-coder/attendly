import React, { useState } from 'react';
import { View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Button } from './src/components/Button';
import DesignSystemShowcase from './app/design-system';
import LoginScreen from './app/auth/login';

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
        <LoginScreen onNavigate={() => setShowDesignSystem(true)} />
      )}
    </SafeAreaProvider>
  );
}
