import { Stack } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import '../global.css';

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="auth/role-selection" />
        <Stack.Screen name="auth/teacher-login" />
        <Stack.Screen name="auth/login" />
        <Stack.Screen name="auth/email" />
        <Stack.Screen name="auth/register" />
        <Stack.Screen name="auth/forgot-password" />
        <Stack.Screen name="auth/verify-otp" />
      </Stack>
    </SafeAreaProvider>
  );
}
