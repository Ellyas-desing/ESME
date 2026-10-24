import { FirebaseError } from 'firebase/app';
import { onAuthStateChanged, signInWithEmailAndPassword, signOut, User } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View, useWindowDimensions } from 'react-native';

import { AppShell } from '@/components/AppShell';
import { PasswordField } from '@/components/PasswordField';
import { colors } from '@/constants/theme';
import { getFirebaseAuth } from '@/lib/firebase';

export default function LoginPage() {
  const { width } = useWindowDimensions();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [user, setUser] = useState<User | null>(null);
  const [isCheckingSession, setIsCheckingSession] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    let isActive = true;
    let unsubscribe: (() => void) | undefined;

    void Promise.resolve().then(() => {
      if (!isActive) return;

      try {
        unsubscribe = onAuthStateChanged(
          getFirebaseAuth(),
          signedInUser => {
            setUser(signedInUser);
            setIsCheckingSession(false);
          },
          error => {
            setMessage(getAuthErrorMessage(error));
            setIsCheckingSession(false);
          },
        );
      } catch (error) {
        setMessage(getAuthErrorMessage(error));
        setIsCheckingSession(false);
      }
    });

    return () => {
      isActive = false;
      unsubscribe?.();
    };
  }, []);

  async function submitLogin() {
    setMessage('');
    if (!email.trim() || !password) {
      setMessage('Informe seu e-mail e sua senha.');
      return;
    }

    setIsSubmitting(true);
    try {
      await signInWithEmailAndPassword(getFirebaseAuth(), email.trim(), password);
    } catch (error) {
      setMessage(getAuthErrorMessage(error));
    } finally {
      setIsSubmitting(false);
    }
  }

  async function submitLogout() {
    setMessage('');
    setIsSubmitting(true);
    try {
      await signOut(getFirebaseAuth());
      setMessage('Sessão encerrada.');
    } catch (error) {
      setMessage(getAuthErrorMessage(error));
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <AppShell activeTab="login">
      <View style={[styles.panel, width < 480 && styles.mobilePanel]}>
        <Text style={[styles.title, width < 480 && styles.mobileTitle]}>
          {isCheckingSession
            ? 'Verificando sessão'
            : user
              ? 'Você está conectado'
              : 'Acesse sua conta'}
        </Text>
        {isCheckingSession ? (
          <Text style={styles.message}>Aguarde enquanto verificamos seu acesso.</Text>
        ) : user ? (
          <View style={styles.form}>
            <Text style={styles.accountEmail}>{user.email}</Text>
            <Pressable
              accessibilityRole="button"
              disabled={isSubmitting}
              onPress={submitLogout}
              style={({ pressed }) => [
                styles.submitButton,
                isSubmitting && styles.disabledButton,
                pressed && !isSubmitting && styles.pressed,
              ]}>
              <Text style={styles.submitText}>{isSubmitting ? 'Saindo...' : 'Sair da conta'}</Text>
            </Pressable>
          </View>
        ) : (
          <View style={styles.form}>
            <View style={styles.field}>
              <Text style={styles.label}>E-mail</Text>
              <TextInput
                accessibilityLabel="E-mail"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoComplete="email"
                placeholder="voce@email.com"
                placeholderTextColor="#686864"
                style={styles.input}
              />
            </View>

            <PasswordField value={password} onChangeText={setPassword} />

            <Pressable
              accessibilityRole="button"
              disabled={isSubmitting}
              onPress={submitLogin}
              style={({ pressed }) => [
                styles.submitButton,
                isSubmitting && styles.disabledButton,
                pressed && !isSubmitting && styles.pressed,
              ]}>
              <Text style={styles.submitText}>{isSubmitting ? 'Entrando...' : 'Entrar'}</Text>
            </Pressable>
          </View>
        )}
        {message ? (
          <Text accessibilityLiveRegion="polite" style={styles.message}>
            {message}
          </Text>
        ) : null}
      </View>
    </AppShell>
  );
}

function getAuthErrorMessage(error: unknown) {
  if (!(error instanceof FirebaseError)) {
    return error instanceof Error
      ? error.message
      : 'Não foi possível acessar sua conta. Tente novamente.';
  }

  switch (error.code) {
    case 'auth/invalid-email':
      return 'Confira o formato do e-mail e tente novamente.';
    case 'auth/invalid-credential':
    case 'auth/invalid-login-credentials':
      return 'E-mail ou senha inválidos.';
    case 'auth/user-disabled':
      return 'Esta conta está desativada. Entre em contato com o suporte.';
    case 'auth/too-many-requests':
      return 'Muitas tentativas. Aguarde um pouco e tente novamente.';
    case 'auth/network-request-failed':
      return 'Sem conexão com o Firebase. Verifique a internet e tente novamente.';
    case 'auth/operation-not-allowed':
      return 'Ative o provedor E-mail/Senha em Authentication nas configurações do Firebase.';
    default:
      return 'Não foi possível acessar sua conta. Verifique os dados e tente novamente.';
  }
}

const styles = StyleSheet.create({
  panel: {
    width: '100%',
    maxWidth: 470,
    alignSelf: 'center',
    marginTop: 36,
    padding: 28,
    backgroundColor: 'rgba(246, 246, 243, 0.98)',
  },
  mobilePanel: {
    marginTop: 20,
    padding: 20,
  },
  title: {
    marginBottom: 28,
    color: colors.ink,
    fontFamily: 'sans-serif',
    fontSize: 30,
    fontWeight: '700',
  },
  mobileTitle: {
    marginBottom: 22,
    fontSize: 27,
  },
  form: {
    gap: 22,
  },
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
  input: {
    minHeight: 48,
    paddingVertical: 11,
    borderBottomWidth: 1,
    borderBottomColor: colors.line,
    color: colors.ink,
    fontSize: 15,
  },
  submitButton: {
    minWidth: 140,
    minHeight: 48,
    alignSelf: 'flex-start',
    marginTop: 6,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.ink,
  },
  submitText: {
    color: colors.paperLight,
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  message: {
    marginTop: -12,
    color: colors.muted,
    fontSize: 13,
    lineHeight: 20,
  },
  accountEmail: {
    color: colors.ink,
    fontSize: 15,
  },
  disabledButton: {
    opacity: 0.58,
  },
  pressed: {
    opacity: 0.72,
  },
});
