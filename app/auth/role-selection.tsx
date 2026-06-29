import React, { useState } from 'react';
import {
  Text,
  View,
  Pressable,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

type Role = 'admin' | 'teacher' | 'student';

export default function RoleSelectionScreen() {
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState<Role>('admin');

  const handleContinue = () => {
    if (selectedRole === 'admin') {
      router.push('/auth/login');
    } else if (selectedRole === 'teacher') {
      router.push('/auth/teacher-login');
    } else if (selectedRole === 'student') {
      router.push('/parent/dashboard');
    }
  };

  const rolesList = [
    {
      id: 'admin' as Role,
      title: "I'm Admin",
      image: require('../../assets/Admin.png'),
    },
    {
      id: 'teacher' as Role,
      title: "I'm Teacher",
      image: require('../../assets/Teacher.png'),
    },
    {
      id: 'student' as Role,
      title: "I'm Parent",
      image: require('../../assets/Parent.png'),
    },
  ];

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
          <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
            {/* Header / Title Section */}
            <View className="px-8 pb-6 pt-16">
              <Text className="text-center font-sans text-[30px] font-bold leading-[38px] tracking-tight text-neutral-900">
                Select User Type
              </Text>
              <Text className="mt-2 text-center font-sans text-[15px] font-normal leading-[22px] text-neutral-400">
                Please Choose Your Role
              </Text>
            </View>

            {/* Grid Selection Cards Section */}
            <View className="mt-8 flex-row justify-between px-6">
              {rolesList.map((role) => {
                const isSelected = selectedRole === role.id;
                return (
                  <Pressable
                    key={role.id}
                    onPress={() => setSelectedRole(role.id)}
                    className="w-[31%] flex-col items-center rounded-[28px] border bg-white px-2 py-6"
                    style={{
                      borderColor: isSelected ? '#4F46E5' : '#E2E8F0',
                      backgroundColor: isSelected ? '#4F46E5' : '#FFFFFF',
                      shadowColor: '#4F46E5',
                      shadowOffset: { width: 0, height: 10 },
                      shadowOpacity: isSelected ? 0.35 : 0,
                      shadowRadius: 15,
                      elevation: isSelected ? 8 : 0,
                    }}>
                    {/* Circle Avatar Wrapper */}
                    <View
                      className="h-20 w-20 items-center justify-center rounded-full bg-[#E0F2FE]"
                      style={{
                        borderWidth: isSelected ? 2 : 0,
                        borderColor: '#FFFFFF',
                      }}>
                      <Image
                        source={role.image}
                        className="h-[72px] w-[72px] rounded-full"
                        resizeMode="cover"
                      />
                    </View>

                    {/* Role Title */}
                    <Text
                      className="mt-4 text-center font-sans text-[13px] font-bold leading-4"
                      style={{
                        color: isSelected ? '#FFFFFF' : '#1E293B',
                      }}>
                      {role.title}
                    </Text>
                  </Pressable>
                );
              })}
            </View>

            {/* Bottom Continue Action */}
            <View className="mt-auto px-8 pb-8 pt-4">
              <Pressable
                onPress={handleContinue}
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
                  Continue
                </Text>
              </Pressable>
            </View>
          </ScrollView>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </View>
  );
}
