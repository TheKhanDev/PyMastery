import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../lib/ThemeContext';

export default function ProgressBar({
  progress,
  height = 8,
  color,
  gradientColors,
  trackColor,
}: {
  progress: number; // 0..1
  height?: number;
  color?: string;
  gradientColors?: readonly [string, string, ...string[]];
  trackColor?: string;
}) {
  const { colors } = useTheme();
  const fillColor = color ?? colors.primary;
  const track = trackColor ?? colors.border;
  const anim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(anim, {
      toValue: Math.max(0, Math.min(1, progress)),
      duration: 600,
      useNativeDriver: false,
    }).start();
  }, [progress]);

  const width = anim.interpolate({ inputRange: [0, 1], outputRange: ['0%', '100%'] });

  return (
    <View style={[styles.track, { height, backgroundColor: track, borderRadius: height / 2 }]}>
      <Animated.View style={{ width, height, borderRadius: height / 2, overflow: 'hidden' }}>
        {gradientColors ? (
          <LinearGradient
            colors={gradientColors}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={{ flex: 1 }}
          />
        ) : (
          <View style={{ flex: 1, backgroundColor: fillColor }} />
        )}
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  track: { width: '100%', overflow: 'hidden' },
});
