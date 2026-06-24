import React, { useState } from 'react';
import { ScrollView, Text, View, Pressable, SafeAreaView } from 'react-native';
import { Link } from 'expo-router';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { Badge } from '@/components/Badge';
import { Loader } from '@/components/Loader';
import { Toggle } from '@/components/Toggle';
import { Checkbox } from '@/components/Checkbox';
import { RadioButton } from '@/components/RadioButton';
import { Feather } from '@expo/vector-icons';

export default function DesignSystemShowcase() {
  // Input states
  const [textVal, setTextVal] = useState('');
  const [passVal, setPassVal] = useState('');
  const [phoneVal, setPhoneVal] = useState('');
  const [richVal, setRichVal] = useState('');
  const [errorVal, setErrorVal] = useState('Incorrect formatting');

  // Toggle states
  const [toggle1, setToggle1] = useState(true);
  const [toggle2, setToggle2] = useState(false);

  // Checkbox states
  const [check1, setCheck1] = useState(true);
  const [check2, setCheck2] = useState(false);

  // Radio button states
  const [radioVal, setRadioVal] = useState<'A' | 'B'>('A');

  // Interactive states
  const [btnLoading, setBtnLoading] = useState(false);

  return (
    <SafeAreaView className="flex-1 bg-neutral-50">
      {/* Header */}
      <View className="px-6 py-5 bg-white border-b border-neutral-200 flex-row items-center justify-between">
        <View>
          <Text className="text-h2 font-extrabold text-neutral-900 font-sans">Design System</Text>
          <Text className="text-b4 text-neutral-500 font-sans mt-0.5">Fundamentals & Adjusted Components</Text>
        </View>
        <Link href="/" asChild>
          <Pressable className="px-4 py-2 bg-neutral-100 rounded-full active:bg-neutral-200">
            <Text className="text-neutral-700 text-b4 font-semibold font-sans">Back Home</Text>
          </Pressable>
        </Link>
      </View>

      <ScrollView contentContainerStyle={{ padding: 24 }} className="flex-1">
        {/* SECTION: FUNDAMENTALS */}
        <View className="mb-8">
          <Text className="text-h3 font-bold text-neutral-900 mb-4 font-sans">1. Fundamentals</Text>

          {/* Colors Card */}
          <View className="bg-white p-5 rounded-3xl border border-neutral-200 shadow-sm mb-4">
            <Text className="text-b2 font-semibold text-neutral-800 mb-3 font-sans">Colors Palette (10 Shades Primary & Neutral, 3 Shades Semantics)</Text>
            
            {/* Primary Shades */}
            <Text className="text-b4 font-bold text-neutral-400 mb-2 font-sans">PRIMARY SHADES</Text>
            <View className="flex-row flex-wrap gap-2 mb-4">
              {['50', '100', '200', '300', '400', '500', '600', '700', '800', '900'].map((shade) => (
                <View key={shade} className="items-center">
                  <View
                    className={`w-10 h-10 rounded-full justify-center items-center`}
                    style={{ backgroundColor: shade === '50' ? '#EEF2FF' : shade === '100' ? '#E0E7FF' : shade === '200' ? '#C7D2FE' : shade === '300' ? '#A5B4FC' : shade === '400' ? '#818CF8' : shade === '500' ? '#6366F1' : shade === '600' ? '#4F46E5' : shade === '700' ? '#4338CA' : shade === '800' ? '#3730A3' : '#312E81' }}
                  >
                    <Text className={`text-[8px] font-bold ${Number(shade) >= 500 ? 'text-white' : 'text-primary-900'}`}>{shade}</Text>
                  </View>
                </View>
              ))}
            </View>

            {/* Neutral Shades */}
            <Text className="text-b4 font-bold text-neutral-400 mb-2 font-sans">NEUTRAL SHADES</Text>
            <View className="flex-row flex-wrap gap-2 mb-4">
              {['50', '100', '200', '300', '400', '500', '600', '700', '800', '900'].map((shade) => (
                <View key={shade} className="items-center">
                  <View
                    className={`w-10 h-10 rounded-full justify-center items-center`}
                    style={{ backgroundColor: shade === '50' ? '#F8FAFC' : shade === '100' ? '#F1F5F9' : shade === '200' ? '#E2E8F0' : shade === '300' ? '#CBD5E1' : shade === '400' ? '#94A3B8' : shade === '500' ? '#64748B' : shade === '600' ? '#475569' : shade === '700' ? '#334155' : shade === '800' ? '#1E293B' : '#0F172A' }}
                  >
                    <Text className={`text-[8px] font-bold ${Number(shade) >= 500 ? 'text-white' : 'text-neutral-900'}`}>{shade}</Text>
                  </View>
                </View>
              ))}
            </View>

            {/* Semantic Shades */}
            <Text className="text-b4 font-bold text-neutral-400 mb-2 font-sans">SEMANTIC SHADES (LIGHT, DEFAULT, DARK)</Text>
            <View className="flex-row flex-wrap gap-4">
              <View className="flex-row gap-1">
                <View className="w-8 h-8 rounded-full bg-success-light" />
                <View className="w-8 h-8 rounded-full bg-success" />
                <View className="w-8 h-8 rounded-full bg-success-dark" />
                <Text className="text-b4 text-neutral-500 font-medium self-center ml-1">Success</Text>
              </View>
              <View className="flex-row gap-1">
                <View className="w-8 h-8 rounded-full bg-warning-light" />
                <View className="w-8 h-8 rounded-full bg-warning" />
                <View className="w-8 h-8 rounded-full bg-warning-dark" />
                <Text className="text-b4 text-neutral-500 font-medium self-center ml-1">Warning</Text>
              </View>
              <View className="flex-row gap-1">
                <View className="w-8 h-8 rounded-full bg-error-light" />
                <View className="w-8 h-8 rounded-full bg-error" />
                <View className="w-8 h-8 rounded-full bg-error-dark" />
                <Text className="text-b4 text-neutral-500 font-medium self-center ml-1">Error</Text>
              </View>
            </View>
          </View>

          {/* Typography Card */}
          <View className="bg-white p-5 rounded-3xl border border-neutral-200 shadow-sm">
            <Text className="text-b2 font-semibold text-neutral-800 mb-3 font-sans">Typography Scale (H1-H4 & B1-B4)</Text>
            <View className="space-y-4">
              <View className="border-b border-neutral-50 pb-2">
                <Text className="text-h1 text-neutral-900 font-sans">Heading 1 (32px)</Text>
                <Text className="text-h2 text-neutral-900 font-sans">Heading 2 (24px)</Text>
                <Text className="text-h3 text-neutral-800 font-sans">Heading 3 (20px)</Text>
                <Text className="text-h4 text-neutral-800 font-sans">Heading 4 (18px)</Text>
              </View>
              <View>
                <Text className="text-b1 text-neutral-700 font-sans">Body 1 (16px) - The quick brown fox jumps over the lazy dog.</Text>
                <Text className="text-b2 text-neutral-600 font-sans">Body 2 (14px) - The quick brown fox jumps over the lazy dog.</Text>
                <Text className="text-b3 text-neutral-500 font-sans">Body 3 (13px) - The quick brown fox jumps over the lazy dog.</Text>
                <Text className="text-b4 text-neutral-400 font-sans">Body 4 (12px) - The quick brown fox jumps over the lazy dog.</Text>
              </View>
            </View>
          </View>
        </View>

        {/* SECTION: COMPONENTS */}
        <View className="mb-8 font-sans">
          <Text className="text-h3 font-bold text-neutral-900 mb-4">2. Components</Text>

          {/* BUTTONS */}
          <View className="bg-white p-5 rounded-3xl border border-neutral-200 shadow-sm mb-6 font-sans">
            <Text className="text-h4 font-bold text-neutral-800 mb-4">Buttons</Text>
            
            <View className="space-y-4">
              <View>
                <Text className="text-b4 font-bold text-neutral-400 mb-2">VARIANTS & SIZES</Text>
                <View className="flex-row flex-wrap items-center gap-3">
                  <Button variant="primary" size="sm" label="Small Primary" />
                  <Button variant="secondary" size="md" label="Medium Secondary" />
                  <Button variant="outline" size="lg" label="Large Outline" />
                </View>
              </View>

              <View className="mt-4">
                <Text className="text-b4 font-bold text-neutral-400 mb-2">LINK & GHOST BUTTONS</Text>
                <View className="flex-row flex-wrap items-center gap-4">
                  <Button variant="ghost" label="Ghost Button" />
                  <Button variant="link" label="Link Button style" />
                </View>
              </View>

              <View className="mt-4">
                <Text className="text-b4 font-bold text-neutral-400 mb-2">ICON-ONLY BUTTONS (Perfectly Center Aligned)</Text>
                <View className="flex-row flex-wrap items-center gap-3">
                  <Button
                    variant="primary"
                    size="sm"
                    icon={<Feather name="plus" size={14} color="#FFFFFF" />}
                  />
                  <Button
                    variant="secondary"
                    size="md"
                    icon={<Feather name="edit-2" size={16} color="#FFFFFF" />}
                  />
                  <Button
                    variant="outline"
                    size="lg"
                    icon={<Feather name="share-2" size={18} color="#1E293B" />}
                  />
                </View>
              </View>

              <View className="mt-4">
                <Text className="text-b4 font-bold text-neutral-400 mb-2">BUTTON STATES</Text>
                <View className="flex-row flex-wrap items-center gap-3">
                  <Button
                    variant="primary"
                    loading={btnLoading}
                    label="Tap to load"
                    onPress={() => {
                      setBtnLoading(true);
                      setTimeout(() => setBtnLoading(false), 2000);
                    }}
                  />
                  <Button variant="primary" disabled label="Disabled button" />
                </View>
              </View>
            </View>
          </View>

          {/* INPUT FIELDS */}
          <View className="bg-white p-5 rounded-3xl border border-neutral-200 shadow-sm mb-6">
            <Text className="text-h4 font-bold text-neutral-800 mb-4">Input Fields (Stateful & Rich)</Text>

            <View className="space-y-4">
              <Input
                label="Standard Text Input (Left Aligned, Taller Height)"
                placeholder="Click to see focus state highlighting..."
                value={textVal}
                onChangeText={setTextVal}
              />

              <Input
                label="Password Input (Eye icon toggle)"
                placeholder="Enter secure password"
                type="password"
                value={passVal}
                onChangeText={setPassVal}
              />

              <Input
                label="Phone Input (Interactive Country Dropdown, Defaults to India)"
                placeholder="98765 43210"
                type="phone"
                value={phoneVal}
                onChangeText={setPhoneVal}
              />

              <Input
                label="Rich Input Field (Leading icon + Clear button)"
                placeholder="Search database..."
                value={richVal}
                onChangeText={setRichVal}
                leadingIcon={<Feather name="search" size={16} color="#64748B" />}
                showClearButton
                onClear={() => setRichVal('')}
                helperText="Enter queries or tags."
              />

              <Input
                label="Error Input State (Red Styling)"
                value={errorVal}
                onChangeText={setErrorVal}
                error="Please enter a valid format."
              />
            </View>
          </View>

          {/* TOGGLES */}
          <View className="bg-white p-5 rounded-3xl border border-neutral-200 shadow-sm mb-6">
            <Text className="text-h4 font-bold text-neutral-800 mb-4">Toggles (Sleek Flat Switches)</Text>
            <View className="flex-row items-center justify-around">
              <View className="items-center">
                <Toggle checked={toggle1} onChange={setToggle1} />
                <Text className="text-b4 text-neutral-500 mt-1.5 font-sans">Checked</Text>
              </View>
              <View className="items-center">
                <Toggle checked={toggle2} onChange={setToggle2} />
                <Text className="text-b4 text-neutral-500 mt-1.5 font-sans">Unchecked</Text>
              </View>
              <View className="items-center">
                <Toggle checked={true} onChange={() => {}} disabled />
                <Text className="text-b4 text-neutral-500 mt-1.5 font-sans">Disabled</Text>
              </View>
            </View>
          </View>

          {/* CHECKBOXES */}
          <View className="bg-white p-5 rounded-3xl border border-neutral-200 shadow-sm mb-6">
            <Text className="text-h4 font-bold text-neutral-800 mb-4">Checkboxes (Simple Square Design)</Text>
            <View className="space-y-2">
              <Checkbox
                label="Checked state checkbox"
                checked={check1}
                onChange={setCheck1}
              />
              <Checkbox
                label="Unchecked state checkbox"
                checked={check2}
                onChange={setCheck2}
              />
              <Checkbox
                label="Disabled state checkbox"
                checked={true}
                disabled
                onChange={() => {}}
              />
            </View>
          </View>

          {/* RADIO BUTTONS */}
          <View className="bg-white p-5 rounded-3xl border border-neutral-200 shadow-sm">
            <Text className="text-h4 font-bold text-neutral-800 mb-4">Radio Buttons (Simple Circular Design)</Text>
            <View className="space-y-2">
              <RadioButton
                label="Radio Option A"
                selected={radioVal === 'A'}
                onSelect={() => setRadioVal('A')}
              />
              <RadioButton
                label="Radio Option B"
                selected={radioVal === 'B'}
                onSelect={() => setRadioVal('B')}
              />
              <RadioButton
                label="Radio Option C (Disabled)"
                selected={false}
                disabled
                onSelect={() => {}}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
