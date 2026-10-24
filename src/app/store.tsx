import { useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, View, useWindowDimensions } from 'react-native';

import { AppShell } from '@/components/AppShell';
import { ProductCard } from '@/components/ProductCard';
import { categories, products } from '@/constants/products';
import { colors } from '@/constants/theme';

export default function StorePage() {
  const params = useLocalSearchParams<{ category?: string }>();
  const initialCategory = typeof params.category === 'string' ? params.category : 'Todos';
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const { width } = useWindowDimensions();
  const columns = width > 1000 ? 4 : width > 700 ? 3 : 2;
  const visibleProducts =
    selectedCategory === 'Todos'
      ? products
      : products.filter(product => product.category === selectedCategory);

  return (
    <AppShell activeTab="store">
      <View style={styles.heading}>
        <Text style={styles.title}>Loja ESME</Text>
        <Text style={styles.subtitle}>Dispositivos para automação residencial</Text>
      </View>

      <View style={styles.filters} accessibilityRole="tablist">
        {categories.map(category => {
          const selected = category === selectedCategory;
          return (
            <Pressable
              key={category}
              accessibilityRole="tab"
              accessibilityState={{ selected }}
              onPress={() => setSelectedCategory(category)}
              style={[styles.filter, selected && styles.selectedFilter]}>
              <Text style={[styles.filterText, selected && styles.selectedFilterText]}>
                {category}
              </Text>
            </Pressable>
          );
        })}
      </View>

      {visibleProducts.length > 0 ? (
        <View style={styles.productGrid}>
          {visibleProducts.map(product => (
            <View
              key={product.id}
              style={[styles.productCell, { width: `${100 / columns}%` }]}>
              <ProductCard product={product} />
            </View>
          ))}
        </View>
      ) : (
        <Text style={styles.emptyMessage}>Nenhum produto nesta categoria.</Text>
      )}
    </AppShell>
  );
}

const styles = StyleSheet.create({
  heading: {
    marginBottom: 24,
    padding: 20,
    backgroundColor: 'rgba(246, 246, 243, 0.94)',
  },
  title: {
    color: colors.ink,
    fontFamily: 'sans-serif',
    fontSize: 30,
    fontWeight: '700',
  },
  subtitle: {
    marginTop: 5,
    color: colors.muted,
    fontSize: 14,
  },
  filters: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  filter: {
    paddingHorizontal: 12,
    paddingVertical: 9,
    borderWidth: 1,
    borderColor: colors.line,
    backgroundColor: 'rgba(246, 246, 243, 0.92)',
  },
  selectedFilter: {
    borderColor: colors.pinkDark,
  },
  filterText: {
    color: colors.muted,
    fontSize: 11,
    letterSpacing: 0.6,
    textTransform: 'uppercase',
  },
  selectedFilterText: {
    color: colors.pinkDark,
    fontWeight: '700',
  },
  productGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 22,
    marginHorizontal: -8,
  },
  productCell: {
    paddingHorizontal: 8,
    paddingBottom: 20,
  },
  emptyMessage: {
    marginTop: 28,
    color: colors.muted,
    fontSize: 14,
  },
});
