import React, { useEffect, useRef } from 'react';
import { Animated, ViewStyle, StyleProp } from 'react-native';

export default function FadeInView({
  children,
  delay = 0,
  duration = 400,
  style,
  translateY = 12,
}: {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  style?: StyleProp<ViewStyle>;
  translateY?: number;
}) {
  const opacity = useRef(new Animated.Value(0)).current;
  const ty = useRef(new Animated.Value(translateY)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, { toValue: 1, duration, delay, useNativeDriver: true }),
      Animated.timing(ty, { toValue: 0, duration, delay, useNativeDriver: true }),
    ]).start();
  }, []);

  return (
    <Animated.View style={[style, { opacity, transform: [{ translateY: ty }] }]}>
      {children}
    </Animated.View>
  );
}
