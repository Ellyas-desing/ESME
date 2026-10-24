import { Image } from 'expo-image';
import { router } from 'expo-router';
import { PropsWithChildren, useEffect } from 'react';
import {
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { colors } from '@/constants/theme';

type TabName = 'home' | 'store' | 'login';

type AppShellProps = PropsWithChildren<{
  activeTab: TabName;
}>;

const navigationItems: { label: string; page: TabName }[] = [
  { label: 'Início', page: 'home' },
  { label: 'Loja', page: 'store' },
  { label: 'Entrar', page: 'login' },
];

const pageRoutes = {
  home: '/',
  store: '/store',
  login: '/login',
} as const;

/*
THESIS: ESME presents a connected-home catalog instead of an Expo starter screen.
OWN-WORLD: A silver whale, mountain lake, pink frame, paper gray, black type, and rose accent.
STORY: Visitors discover home categories, browse products, and sign in with Firebase Authentication.
FIRST VIEWPORT: ESME and two quick links sit above the whale-led headline and catalog action.
FORM: The existing ESME editorial poster becomes a responsive, scrollable Expo web storefront.
*/
export function AppShell({ activeTab, children }: AppShellProps) {
  const { width } = useWindowDimensions();
  const horizontalPadding = width > 800 ? 42 : 22;

  useEffect(() => {
    if (Platform.OS !== 'web') return;

    function getLayer(id: string) {
      const layer = document.getElementById(id);
      if (!layer) throw new Error(`The ESME background layer "${id}" is unavailable.`);
      return layer;
    }

    const landscape = getLayer('esme-landscape-layer');
    const whale = getLayer('esme-whale-layer');

    const hoverQuery = window.matchMedia('(hover: hover) and (pointer: fine)');
    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const transition = 'transform 700ms cubic-bezier(0.22, 1, 0.36, 1)';

    function resetLayers() {
      landscape.style.transform = 'translate3d(0, 0, 0) scale(1.025)';
      whale.style.transform = 'translate3d(0, 0, 0) scale(1.035)';
    }

    function handlePointerMove(event: PointerEvent) {
      const x = Math.max(-1, Math.min(1, (event.clientX / window.innerWidth) * 2 - 1));
      const y = Math.max(-1, Math.min(1, (event.clientY / window.innerHeight) * 2 - 1));

      landscape.style.transform = `translate3d(${x * 16}px, ${y * 12}px, 0) scale(1.025)`;
      whale.style.transform = `translate3d(${x * 22}px, ${y * 16}px, 0) scale(1.035)`;
    }

    function syncMotionPreference() {
      const motionEnabled = hoverQuery.matches && !reducedMotionQuery.matches;
      landscape.style.transition = motionEnabled ? transition : 'none';
      whale.style.transition = motionEnabled ? transition : 'none';
      landscape.style.willChange = motionEnabled ? 'transform' : '';
      whale.style.willChange = motionEnabled ? 'transform' : '';

      if (motionEnabled) {
        window.addEventListener('pointermove', handlePointerMove);
        window.addEventListener('pointerleave', resetLayers);
      } else {
        window.removeEventListener('pointermove', handlePointerMove);
        window.removeEventListener('pointerleave', resetLayers);
        landscape.style.transform = '';
        whale.style.transform = '';
      }
    }

    syncMotionPreference();
    hoverQuery.addEventListener('change', syncMotionPreference);
    reducedMotionQuery.addEventListener('change', syncMotionPreference);

    return () => {
      hoverQuery.removeEventListener('change', syncMotionPreference);
      reducedMotionQuery.removeEventListener('change', syncMotionPreference);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerleave', resetLayers);
      landscape.style.transition = '';
      whale.style.transition = '';
      landscape.style.transform = '';
      whale.style.transform = '';
      landscape.style.willChange = '';
      whale.style.willChange = '';
    };
  }, []);

  function openPage(page: TabName) {
    router.replace(pageRoutes[page]);
  }

  return (
    <SafeAreaView style={styles.screen} edges={['top', 'bottom']}>
      <View nativeID="esme-landscape-layer" style={styles.backgroundLayer}>
        <Image
          source={require('@/assets/images/landscape.svg')}
          contentFit="cover"
          style={styles.background}
          accessibilityLabel=""
        />
      </View>
      <View nativeID="esme-whale-layer" style={styles.whaleLayer}>
        <Image
          source={require('@/assets/images/whale.svg')}
          contentFit="cover"
          style={styles.whale}
          accessibilityLabel=""
        />
      </View>

      <View style={styles.header}>
        <Pressable
          accessibilityRole="link"
          accessibilityLabel="ESME — início"
          onPress={() => openPage('home')}>
          <Text style={styles.brand}>ESME</Text>
        </Pressable>
        <View style={styles.headerLinks}>
          <Pressable accessibilityRole="link" onPress={() => openPage('store')}>
            <Text style={styles.headerLink}>Loja</Text>
          </Pressable>
          <Pressable accessibilityRole="link" onPress={() => openPage('login')}>
            <Text style={styles.headerLink}>Entrar</Text>
          </Pressable>
        </View>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[styles.content, { paddingHorizontal: horizontalPadding }]}
        keyboardShouldPersistTaps="handled">
        {children}
      </ScrollView>

      <View style={styles.bottomNavigation} accessibilityRole="navigation">
        {navigationItems.map(item => (
          <Pressable
            key={item.page}
            accessibilityRole="link"
            accessibilityState={{ selected: activeTab === item.page }}
            onPress={() => openPage(item.page)}
            style={styles.navigationButton}>
            <Text
              style={[
                styles.navigationText,
                activeTab === item.page && styles.currentNavigationText,
              ]}>
              {item.label}
            </Text>
          </Pressable>
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    minHeight: '100%',
    backgroundColor: colors.paper,
    overflow: 'hidden',
  },
  backgroundLayer: {
    ...StyleSheet.absoluteFill,
    opacity: 0.9,
    pointerEvents: 'none',
  },
  whaleLayer: {
    ...StyleSheet.absoluteFill,
    opacity: 1,
    pointerEvents: 'none',
  },
  background: {
    ...StyleSheet.absoluteFill,
  },
  whale: {
    ...StyleSheet.absoluteFill,
  },
  header: {
    width: '100%',
    maxWidth: 1160,
    alignSelf: 'center',
    minHeight: 64,
    paddingHorizontal: 22,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(237, 237, 234, 0.54)',
  },
  brand: {
    color: colors.ink,
    fontFamily: 'serif',
    fontSize: 25,
    fontWeight: '600',
    letterSpacing: 4,
  },
  headerLinks: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 22,
  },
  headerLink: {
    paddingVertical: 10,
    color: colors.ink,
    fontSize: 13,
    fontWeight: '600',
  },
  scroll: {
    flex: 1,
    width: '100%',
  },
  content: {
    width: '100%',
    maxWidth: 1100,
    alignSelf: 'center',
    paddingTop: 24,
    paddingBottom: 34,
  },
  bottomNavigation: {
    minHeight: 54,
    paddingHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 44,
    borderTopWidth: 1,
    borderTopColor: colors.line,
    backgroundColor: 'rgba(237, 237, 234, 0.92)',
  },
  navigationButton: {
    minWidth: 64,
    paddingVertical: 10,
    alignItems: 'center',
  },
  navigationText: {
    color: colors.muted,
    fontSize: 11,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  currentNavigationText: {
    color: colors.pinkDark,
  },
});
