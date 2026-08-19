import React from 'react';
import { Platform, View, StyleProp, ViewStyle } from 'react-native';
import { WebView } from 'react-native-webview';

export default function YouTubeEmbed({
  url,
  style,
}: {
  url: string;
  style?: StyleProp<ViewStyle>;
}) {
  if (Platform.OS === 'web') {
    return (
      <View style={style}>
        {React.createElement('iframe', {
          src: url,
          style: { width: '100%', height: '100%', border: 'none' },
          allow:
            'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share',
          allowFullScreen: true,
          title: 'YouTube video player',
        })}
      </View>
    );
  }

  return (
    <View style={style}>
      <WebView
        source={{ uri: url }}
        style={{ flex: 1, backgroundColor: 'transparent' }}
        allowsFullscreenVideo
        javaScriptEnabled
        domStorageEnabled
        mediaPlaybackRequiresUserAction={false}
        startInLoadingState
      />
    </View>
  );
}
