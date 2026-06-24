import { Text, View } from 'react-native';
import { Link } from 'expo-router';

export default function IndexScreen() {
  return (
    <View className="flex-1 items-center justify-center bg-slate-50 p-6">
      <Text className="text-3xl font-extrabold text-slate-900 mb-2">Attendly</Text>
      <Text className="text-slate-600 text-center mb-8">Welcome to the Attendance Management System</Text>
      <Link href="/login" className="text-blue-600 font-semibold text-lg">Go to Login</Link>
    </View>
  );
}
