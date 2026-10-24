import { SymbolView } from 'expo-symbols';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import { colors } from '@/constants/theme';

type PasswordFieldProps = {
  value: string;
  onChangeText: (value: string) => void;
};

export function PasswordField({ value, onChangeText }: PasswordFieldProps) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <View style={styles.field}>
      <Text style={styles.label}>Senha</Text>
      <View style={styles.inputRow}>
        <TextInput
          accessibilityLabel="Senha"
          value={value}
          onChangeText={onChangeText}
          autoCapitalize="none"
          autoComplete="current-password"
          secureTextEntry={!isVisible}
          placeholder="Sua senha"
          placeholderTextColor="#686864"
          style={styles.input}
        />
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={isVisible ? 'Ocultar senha' : 'Mostrar senha'}
          accessibilityState={{ selected: isVisible }}
          onPress={() => setIsVisible(visible => !visible)}
          hitSlop={8}
          style={styles.eyeButton}>
          <SymbolView
            name={
              isVisible
                ? { ios: 'eye.slash', android: 'visibility_off', web: 'visibility_off' }
                : { ios: 'eye', android: 'visibility', web: 'visibility' }
            }
            size={21}
            tintColor={colors.muted}
          />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  field: {
    gap: 8,
  },
  label: {
    color: colors.ink,
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  inputRow: {
    minHeight: 48,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: colors.line,
  },
  input: {
    flex: 1,
    minWidth: 0,
    paddingVertical: 11,
    color: colors.ink,
    fontSize: 15,
  },
  eyeButton: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
