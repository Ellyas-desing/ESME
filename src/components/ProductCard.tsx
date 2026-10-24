import { router } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Product } from '@/constants/products';
import { colors } from '@/constants/theme';

type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
  return (
    <View style={styles.card}>
      <View
        accessible
        accessibilityRole="image"
        accessibilityLabel={`Espaço reservado para a imagem de ${product.name}`}
        style={styles.imagePlaceholder}
      />
      <View style={styles.details}>
        <Text style={styles.category}>{product.category}</Text>
        <Text style={styles.name}>{product.name}</Text>
        <Text style={styles.price}>{product.price}</Text>
        <Pressable
          accessibilityRole="link"
          onPress={() =>
            router.push({ pathname: '/product-detail', params: { productId: product.id } })
          }
          style={({ pressed }) => [styles.action, pressed && styles.pressed]}>
          <Text style={styles.actionText}>Saber mais <Text aria-hidden>↗</Text></Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    minWidth: 0,
    paddingBottom: 16,
  },
  imagePlaceholder: {
    width: '100%',
    aspectRatio: 1,
    backgroundColor: 'rgba(246, 246, 243, 0.98)',
  },
  details: {
    padding: 12,
    backgroundColor: 'rgba(246, 246, 243, 0.94)',
  },
  category: {
    marginBottom: 4,
    color: colors.pinkDark,
    fontSize: 10,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  name: {
    color: colors.ink,
    fontSize: 15,
    fontWeight: '600',
  },
  price: {
    marginTop: 5,
    color: colors.ink,
    fontSize: 16,
    fontWeight: '700',
  },
  action: {
    minHeight: 40,
    marginTop: 10,
    justifyContent: 'center',
  },
  actionText: {
    color: colors.pinkDark,
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.6,
    textTransform: 'uppercase',
  },
  pressed: {
    opacity: 0.65,
  },
});
