import React from 'react';
import { View, StyleProp, ViewStyle } from 'react-native';
import { useBreakpoint } from '../lib/breakpoints';

// Centers content and caps its width on tablet/desktop viewports (mirroring a
// Tailwind `container mx-auto max-w-*` pattern), while staying 100% fluid width
// on mobile. Wrap page-level scroll content with this to keep large web/tablet
// viewports readable instead of stretching cards edge-to-edge.
export default function ResponsiveContainer({
  children,
  style,
  fullBleed = false,
}: {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  fullBleed?: boolean; // when true, skip the max-width cap (e.g. full-width hero banners)
}) {
  const { contentMaxWidth } = useBreakpoint();

  return (
    <View
      style={[
        {
          width: '100%',
          alignSelf: 'center',
          maxWidth: fullBleed ? undefined : contentMaxWidth,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
}
