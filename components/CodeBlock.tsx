import React, { useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { radius, spacing, shadow, CODE_COLORS, ColorPalette } from '../lib/theme';
import { useTheme } from '../lib/ThemeContext';
import { CodeExample } from '../lib/types';

const keywords = ['def', 'return', 'if', 'elif', 'else', 'for', 'while', 'in', 'import', 'from', 'as', 'class', 'try', 'except', 'finally', 'raise', 'with', 'lambda', 'yield', 'break', 'continue', 'pass', 'and', 'or', 'not', 'is', 'None', 'True', 'False', 'self', 'global', 'super', 'match', 'case'];

function highlightLine(line: string, keyPrefix: string, styles: ReturnType<typeof createStyles>) {
  const tokens = line.split(/(\s+|[(),.:=+\-*/[\]{}]|"[^"]*"|'[^']*')/g).filter((t) => t !== '');
  return (
    <Text key={keyPrefix} style={styles.codeLine}>
      {tokens.map((tok, i) => {
        let style = styles.plain;
        if (tok.trim().startsWith('#')) style = styles.comment;
        else if (/^".*"$/.test(tok) || /^'.*'$/.test(tok)) style = styles.string;
        else if (keywords.includes(tok)) style = styles.keyword;
        else if (/^\d+(\.\d+)?$/.test(tok)) style = styles.number;
        else if (/^[a-zA-Z_][a-zA-Z0-9_]*$/.test(tok) && line.includes(tok + '(')) style = styles.func;
        return (
          <Text key={keyPrefix + i} style={style}>
            {tok}
          </Text>
        );
      })}
    </Text>
  );
}

export default function CodeBlock({ example }: { example: CodeExample }) {
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);
  const lines = example.code.split('\n');
  return (
    <View style={styles.wrapper}>
      <View style={styles.header}>
        <View style={styles.dots}>
          <View style={[styles.dot, { backgroundColor: '#ff5f56' }]} />
          <View style={[styles.dot, { backgroundColor: '#ffbd2e' }]} />
          <View style={[styles.dot, { backgroundColor: '#27c93f' }]} />
        </View>
        <Text style={styles.headerLabel}>python3</Text>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.codeArea}>
          {lines.map((line, idx) => (
            <View key={idx} style={styles.lineRow}>
              <Text style={styles.lineNum}>{idx + 1}</Text>
              {highlightLine(line || ' ', `l${idx}-`, styles)}
            </View>
          ))}
        </View>
      </ScrollView>
      {example.output !== undefined && (
        <View style={styles.outputArea}>
          <View style={styles.outputHeader}>
            <Text style={styles.outputLabel}>OUTPUT</Text>
          </View>
          <Text style={styles.outputText}>{example.output}</Text>
        </View>
      )}
      {example.caption && <Text style={styles.caption}>{example.caption}</Text>}
    </View>
  );
}

function createStyles(colors: ColorPalette) {
  return StyleSheet.create({
    wrapper: {
      backgroundColor: CODE_COLORS.codeBg,
      borderRadius: radius.md,
      borderWidth: 1,
      borderColor: CODE_COLORS.codeBorder,
      marginVertical: spacing.sm,
      overflow: 'hidden',
      ...shadow.soft,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: spacing.md,
      paddingVertical: spacing.sm,
      backgroundColor: '#11151f',
      borderBottomWidth: 1,
      borderBottomColor: CODE_COLORS.codeBorder,
    },
    dots: { flexDirection: 'row', gap: 6 },
    dot: { width: 10, height: 10, borderRadius: 5 },
    headerLabel: { color: colors.textMuted, fontSize: 12, fontFamily: 'monospace' },
    codeArea: { paddingVertical: spacing.md, paddingHorizontal: spacing.sm, minWidth: '100%' },
    lineRow: { flexDirection: 'row', paddingHorizontal: spacing.sm },
    lineNum: { color: '#3d4657', fontSize: 13, fontFamily: 'monospace', width: 24, textAlign: 'right', marginRight: 12 },
    codeLine: { fontFamily: 'monospace', fontSize: 13, lineHeight: 20 },
    plain: { color: '#d4d9e2', fontFamily: 'monospace', fontSize: 13 },
    keyword: { color: '#ff79c6', fontFamily: 'monospace', fontSize: 13, fontWeight: '700' },
    string: { color: '#a6e22e', fontFamily: 'monospace', fontSize: 13 },
    comment: { color: '#6b7686', fontFamily: 'monospace', fontSize: 13, fontStyle: 'italic' },
    number: { color: '#bd93f9', fontFamily: 'monospace', fontSize: 13 },
    func: { color: '#4ec9ff', fontFamily: 'monospace', fontSize: 13 },
    outputArea: {
      backgroundColor: '#080b11',
      borderTopWidth: 1,
      borderTopColor: CODE_COLORS.codeBorder,
      paddingHorizontal: spacing.md,
      paddingVertical: spacing.sm,
    },
    outputHeader: { marginBottom: 4 },
    outputLabel: { color: colors.accent, fontSize: 10, fontFamily: 'monospace', letterSpacing: 1, fontWeight: '700' },
    outputText: { color: '#8be9a8', fontFamily: 'monospace', fontSize: 13, lineHeight: 19 },
    caption: {
      color: colors.textMuted,
      fontSize: 12,
      fontStyle: 'italic',
      paddingHorizontal: spacing.md,
      paddingVertical: spacing.sm,
      borderTopWidth: 1,
      borderTopColor: CODE_COLORS.codeBorder,
    },
  });
}
