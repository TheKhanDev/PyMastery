import React, { useRef } from 'react';
import { Pressable, Animated, ViewStyle, StyleProp, PressableProps, GestureResponderEvent } from 'react-native';
import { haptics } from '../lib/haptics';

interface Props extends Omit<PressableProps, 'style'> {
  style?: StyleProp<ViewStyle>;
  scaleTo?: number;
  haptic?: 'light' | 'medium' | 'selection' | 'none';
  children: React.ReactNode;
}

export default function AnimatedPressable({
  style,
  scaleTo = 0.96,
  haptic = 'light',
  onPressIn,
  onPressOut,
  onPress,
  children,
  ...rest
}: Props) {
  const scale = useRef(new Animated.Value(1)).current;

  const handlePressIn = (e: GestureResponderEvent) => {
    Animated.spring(scale, { toValue: scaleTo, useNativeDriver: true, speed: 40, bounciness: 6 }).start();
    onPressIn?.(e);
  };

  const handlePressOut = (e: GestureResponderEvent) => {
    Animated.spring(scale, { toValue: 1, useNativeDriver: true, speed: 30, bounciness: 8 }).start();
    onPressOut?.(e);
  };

  const handlePress = (e: GestureResponderEvent) => {
    if (haptic === 'light') haptics.light();
    else if (haptic === 'medium') haptics.medium();
    else if (haptic === 'selection') haptics.selection();
    onPress?.(e);
  };

  return (
    <Pressable onPressIn={handlePressIn} onPressOut={handlePressOut} onPress={handlePress} {...rest}>
      <Animated.View style={[style, { transform: [{ scale }] }]}>{children}</Animated.View>
    </Pressable>
  );
}
