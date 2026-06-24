import { Text, View } from 'react-native';
import { Link } from 'expo-router';

export default function IndexScreen() {
  return (
    <View className="flex-1 items-center justify-center bg-slate-50 p-6">
      <Text className="text-3xl font-extrabold text-slate-900 mb-2 font-sans">Attendly</Text>
      <Text className="text-slate-600 text-center mb-8 font-sans">Welcome to the Attendance Management System</Text>
      <Link href="/login" className="text-blue-600 font-semibold text-lg mb-4 font-sans">Go to Login</Link>
      <Link href="/design-system" className="text-indigo-600 font-semibold text-lg font-sans">View Design System Showcase</Link>
    </View>
  );
}
