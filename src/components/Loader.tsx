import React, { useEffect, useRef } from 'react';
import { View, ActivityIndicator, Animated, Easing } from 'react-native';

export type LoaderType = 'spinner' | 'dots' | 'bar';
export type LoaderSize = 'sm' | 'md' | 'lg';

interface LoaderProps {
  type?: LoaderType;
  size?: LoaderSize;
  color?: string;
  className?: string;
}

export const Loader: React.FC<LoaderProps> = ({
  type = 'spinner',
  size = 'md',
  color = '#4F46E5', // Primary color
  className = '',
}) => {
  // Setup animations
  const dot1 = useRef(new Animated.Value(0)).current;
  const dot2 = useRef(new Animated.Value(0)).current;
  const dot3 = useRef(new Animated.Value(0)).current;
  const barAnim = useRef(new Animated.Value(-100)).current;

  useEffect(() => {
    if (type === 'dots') {
      const animateDot = (animatedValue: Animated.Value, delay: number) => {
        return Animated.loop(
          Animated.sequence([
            Animated.delay(delay),
            Animated.timing(animatedValue, {
              toValue: -8,
              duration: 350,
              easing: Easing.bezier(0.4, 0, 0.2, 1),
              useNativeDriver: true,
            }),
            Animated.timing(animatedValue, {
              toValue: 0,
              duration: 350,
              easing: Easing.bezier(0.4, 0, 0.2, 1),
              useNativeDriver: true,
            }),
            Animated.delay(200),
          ])
        );
      };

      const group = Animated.parallel([
        animateDot(dot1, 0),
        animateDot(dot2, 150),
        animateDot(dot3, 300),
      ]);
      group.start();

      return () => group.stop();
    } else if (type === 'bar') {
      const barLoop = Animated.loop(
        Animated.timing(barAnim, {
          toValue: 100,
          duration: 1200,
          easing: Easing.linear,
          useNativeDriver: true,
        })
      );
      barLoop.start();

      return () => barLoop.stop();
    }
  }, [type]);

  // Size mapping
  const sizeMap: Record<LoaderSize, number> = {
    sm: 16,
    md: 28,
    lg: 42,
  };

  const currentSize = sizeMap[size];

  if (type === 'spinner') {
    return (
      <View className={`items-center justify-center ${className}`}>
        <ActivityIndicator size={size === 'lg' ? 'large' : 'small'} color={color} />
      </View>
    );
  }

  if (type === 'dots') {
    const dotSize = size === 'sm' ? 6 : size === 'md' ? 10 : 14;
    const spacing = size === 'sm' ? 'mx-1' : size === 'md' ? 'mx-1.5' : 'mx-2';

    return (
      <View className={`h-10 flex-row items-center justify-center ${className}`}>
        <Animated.View
          style={[
            {
              width: dotSize,
              height: dotSize,
              borderRadius: dotSize / 2,
              backgroundColor: color,
              transform: [{ translateY: dot1 }],
            },
          ]}
          className={spacing}
        />
        <Animated.View
          style={[
            {
              width: dotSize,
              height: dotSize,
              borderRadius: dotSize / 2,
              backgroundColor: color,
              transform: [{ translateY: dot2 }],
            },
          ]}
          className={spacing}
        />
        <Animated.View
          style={[
            {
              width: dotSize,
              height: dotSize,
              borderRadius: dotSize / 2,
              backgroundColor: color,
              transform: [{ translateY: dot3 }],
            },
          ]}
          className={spacing}
        />
      </View>
    );
  }

  if (type === 'bar') {
    const barHeight = size === 'sm' ? 4 : size === 'md' ? 6 : 8;
    const barWidth = size === 'sm' ? 80 : size === 'md' ? 140 : 200;

    // Use translateX percentage or offset
    const translateX = barAnim.interpolate({
      inputRange: [-100, 100],
      outputRange: [-barWidth, barWidth],
    });

    return (
      <View
        style={{ width: barWidth, height: barHeight }}
        className={`justify-center overflow-hidden rounded-full bg-slate-100 ${className}`}>
        <Animated.View
          style={[
            {
              width: barWidth * 0.4,
              height: barHeight,
              borderRadius: barHeight / 2,
              backgroundColor: color,
              transform: [{ translateX }],
            },
          ]}
        />
      </View>
    );
  }

  return null;
};
