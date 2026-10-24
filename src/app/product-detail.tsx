import { Image } from 'expo-image';
import { router, useLocalSearchParams } from 'expo-router';
import { Pressable, StyleSheet, Text, View, useWindowDimensions } from 'react-native';

import { AppShell } from '@/components/AppShell';
import { products } from '@/constants/products';
import { colors } from '@/constants/theme';

export default function ProductDetailPage() {
  const { productId } = useLocalSearchParams<{ productId: string }>();
  const product = products.find(item => item.id === productId);
  const { width } = useWindowDimensions();

  return (
    <AppShell activeTab="store">
      <Pressable
        accessibilityRole="link"
        onPress={() => router.replace('/store')}
        style={styles.backButton}>
        <Text style={styles.backText}>← Voltar à loja</Text>
      </Pressable>

      {product ? (
        <View style={[styles.detail, width > 760 && styles.wideDetail]}>
          <Image
            source={product.image}
            contentFit="contain"
            accessible
            accessibilityLabel={product.name}
            style={[styles.imagePlaceholder, width > 760 && styles.wideImagePlaceholder]}
          />
          <View style={styles.information}>
            <Text style={styles.category}>{product.category}</Text>
            <Text style={styles.name}>{product.name}</Text>
            <Text style={styles.price}>{product.price}</Text>
            <View style={styles.description}>
              <Text style={styles.descriptionTitle}>Descrição do dispositivo</Text>
              <Text style={styles.descriptionText}>{product.description}</Text>
            </View>
            <Pressable
              accessibilityRole="button"
              onPress={() => router.push('/login')}
              style={({ pressed }) => [styles.button, pressed && styles.pressed]}>
              <Text style={styles.buttonText}>Adicionar ao carrinho</Text>
            </Pressable>
          </View>
        </View>
      ) : (
        <View style={styles.missingProduct}>
          <Text style={styles.name}>Produto não encontrado</Text>
          <Text style={styles.descriptionText}>Volte à loja para ver os produtos disponíveis.</Text>
        </View>
      )}
    </AppShell>
  );
}

const styles = StyleSheet.create({
  backButton: {
    alignSelf: 'flex-start',
    marginBottom: 20,
    paddingVertical: 8,
  },
  backText: {
    color: colors.ink,
    fontSize: 13,
  },
  detail: {
    gap: 22,
    padding: 20,
    backgroundColor: 'rgba(246, 246, 243, 0.94)',
  },
  wideDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 34,
  },
  imagePlaceholder: {
    width: '100%',
    aspectRatio: 1,
    maxHeight: 390,
    backgroundColor: 'rgba(246, 246, 243, 0.9)',
  },
  wideImagePlaceholder: {
    width: '44%',
    maxWidth: 390,
  },
  information: {
    flex: 1,
    minWidth: 0,
  },
  category: {
    color: colors.pinkDark,
    fontSize: 11,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  name: {
    marginTop: 8,
    color: colors.ink,
    fontFamily: 'sans-serif',
    fontSize: 28,
    fontWeight: '700',
  },
  price: {
    marginTop: 8,
    color: colors.ink,
    fontSize: 20,
    fontWeight: '700',
  },
  description: {
    marginTop: 20,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: colors.line,
  },
  descriptionTitle: {
    marginBottom: 8,
    color: colors.ink,
    fontSize: 13,
    fontWeight: '700',
  },
  descriptionText: {
    color: colors.muted,
    fontSize: 14,
    lineHeight: 22,
  },
  button: {
    minHeight: 48,
    alignSelf: 'flex-start',
    marginTop: 22,
    paddingHorizontal: 20,
    justifyContent: 'center',
    backgroundColor: colors.ink,
  },
  buttonText: {
    color: colors.paperLight,
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.8,
    textTransform: 'uppercase',
  },
  missingProduct: {
    padding: 22,
    backgroundColor: colors.glass,
  },
  pressed: {
    opacity: 0.72,
  },
});
