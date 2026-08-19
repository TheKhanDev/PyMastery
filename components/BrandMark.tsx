import React from 'react';
import { Text, StyleSheet, ViewStyle, StyleProp } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../lib/ThemeContext';

// The "TK" wordmark — TheKhanDev platform's logo. Used anywhere the app's own
// brand identity is shown (navbar, profile avatar, contact card badge), as
// distinct from the Python logo (which represents the course subject/language).
export default function BrandMark({
  size = 40,
  radius,
  style,
}: {
  size?: number;
  radius?: number;
  style?: StyleProp<ViewStyle>;
}) {
  const { colors, gradients } = useTheme();
  const borderRadius = radius ?? size * 0.28;

  return (
    <LinearGradient
      colors={gradients.python}
      style={[
        {
          width: size,
          height: size,
          borderRadius,
          alignItems: 'center',
          justifyContent: 'center',
        },
        style,
      ]}
    >
      <Text style={[styles.text, { fontSize: size * 0.42, color: colors.bg }]}>TK</Text>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  text: {
    fontWeight: '800',
    letterSpacing: -0.5,
  },
});
