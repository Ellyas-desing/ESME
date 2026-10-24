import { router } from 'expo-router';
import { Pressable, StyleSheet, Text, View, useWindowDimensions } from 'react-native';

import { AppShell } from '@/components/AppShell';
import { colors } from '@/constants/theme';

const featuredCategories = [
  {
    name: 'Segurança',
    description:
      'Fechaduras e câmeras inteligentes para acompanhar os acessos e ter mais tranquilidade em casa.',
  },
  {
    name: 'Iluminação',
    description:
      'Lâmpadas e fitas LED para ajustar cores, criar cenas e programar a luz de cada ambiente.',
  },
  {
    name: 'Energia',
    description:
      'Tomadas inteligentes para acompanhar o consumo e controlar seus aparelhos pelo app.',
  },
];

export default function HomePage() {
  const { width } = useWindowDimensions();
  const isWide = width > 720;
  const isCompact = width < 480;

  function openCategory(category: string) {
    router.push({ pathname: '/store', params: { category } });
  }

  return (
    <AppShell activeTab="home">
      <View style={[styles.hero, isWide && styles.wideHero]}>
        <Text style={[styles.title, isWide && styles.wideTitle, isCompact && styles.compactTitle]}>
          Sinta a harmonia da sua <Text style={styles.titleAccent}>Casa Inteligente.</Text>
        </Text>
        <Text style={styles.introduction}>
          Tecnologia conectada com tranquilidade. Gerencie iluminação, segurança e energia no seu
          ecossistema ESME.
        </Text>
        <Pressable
          accessibilityRole="link"
          onPress={() => router.push('/store')}
          style={({ pressed }) => [styles.primaryButton, pressed && styles.pressed]}>
          <Text style={styles.primaryButtonText}>Explorar catálogo</Text>
          <Text style={styles.arrow}>→</Text>
        </Pressable>
      </View>

      <View style={styles.categories}>
        <Text style={[styles.sectionTitle, isCompact && styles.compactSectionTitle]}>
          Categorias em destaque
        </Text>
        <View style={[styles.categoryList, isWide && styles.wideCategoryList]}>
          {featuredCategories.map(category => (
            <Pressable
              key={category.name}
              accessibilityRole="link"
              onPress={() => openCategory(category.name)}
              style={({ pressed }) => [
                styles.categoryCard,
                isWide && styles.wideCategoryCard,
                pressed && styles.categoryPressed,
              ]}>
              <Text style={styles.categoryName}>{category.name}</Text>
              <Text style={styles.categoryDescription}>{category.description}</Text>
              <Text style={styles.categoryLink}>Ver seleção <Text aria-hidden>↗</Text></Text>
            </Pressable>
          ))}
        </View>
      </View>
    </AppShell>
  );
}

const styles = StyleSheet.create({
  hero: {
    minHeight: 480,
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingVertical: 30,
    backgroundColor: 'rgba(246, 246, 243, 0.94)',
  },
  wideHero: {
    minHeight: 520,
    paddingHorizontal: 42,
    paddingVertical: 42,
  },
  title: {
    maxWidth: 620,
    color: colors.ink,
    fontFamily: 'sans-serif',
    fontSize: 42,
    fontWeight: '800',
    letterSpacing: -2,
    lineHeight: 45,
  },
  wideTitle: {
    fontSize: 64,
    lineHeight: 65,
  },
  compactTitle: {
    fontSize: 34,
    lineHeight: 38,
    letterSpacing: -1.3,
  },
  titleAccent: {
    color: colors.pinkDark,
  },
  introduction: {
    maxWidth: 460,
    marginTop: 18,
    marginBottom: 22,
    color: colors.muted,
    fontSize: 15,
    lineHeight: 24,
  },
  primaryButton: {
    minHeight: 48,
    alignSelf: 'flex-start',
    paddingHorizontal: 22,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: colors.ink,
  },
  primaryButtonText: {
    color: colors.paperLight,
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  arrow: {
    color: colors.paperLight,
    fontSize: 19,
  },
  categories: {
    paddingTop: 32,
    paddingBottom: 10,
  },
  sectionTitle: {
    alignSelf: 'flex-start',
    marginBottom: 18,
    paddingHorizontal: 12,
    paddingVertical: 7,
    color: colors.ink,
    fontFamily: 'serif',
    fontSize: 30,
    backgroundColor: 'rgba(246, 246, 243, 0.96)',
    textTransform: 'uppercase',
  },
  compactSectionTitle: {
    fontSize: 25,
    lineHeight: 30,
  },
  categoryList: {
    gap: 10,
  },
  wideCategoryList: {
    flexDirection: 'row',
  },
  categoryCard: {
    minHeight: 160,
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingVertical: 18,
    backgroundColor: 'rgba(246, 246, 243, 0.94)',
  },
  wideCategoryCard: {
    width: '32%',
    minHeight: 200,
  },
  categoryPressed: {
    opacity: 0.76,
  },
  categoryName: {
    marginBottom: 10,
    color: colors.ink,
    fontFamily: 'serif',
    fontSize: 24,
  },
  categoryDescription: {
    color: colors.muted,
    fontSize: 13,
    lineHeight: 20,
  },
  categoryLink: {
    marginTop: 14,
    color: colors.pinkDark,
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.8,
    textTransform: 'uppercase',
  },
  pressed: {
    opacity: 0.72,
  },
});
