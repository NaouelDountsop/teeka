import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Platform,
  StatusBar,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useThemeColor } from '@/components/useThemeColors';
import { useRouter } from 'expo-router';

type Order = {
  id: string;
  date: string;
  trackingNumber: string;
  products: { name: string; quantity: number }[];
  amount: string;
  status: 'Delivered' | 'Processing' | 'Cancelled';
};

const allOrders: Order[] = [
  {
    id: '1',
    date: '05-12-2025',
    trackingNumber: 'IW3475453455',
    products: [
      { name: 'camera', quantity: 2 },
      { name: 'panneau solaire', quantity: 1 },
    ],
    amount: '15 FCFA',
    status: 'Delivered',
  },
  {
    id: '2',
    date: '06-12-2025',
    trackingNumber: 'IW3475453466',
    products: [
      { name: 'camera', quantity: 1 },
      { name: 'panneau solaire', quantity: 2 },
    ],
    amount: '5000 FCFA',
    status: 'Processing',
  },
  {
    id: '3',
    date: '07-12-2025',
    trackingNumber: 'IW3475453477',
    products: [{ name: 'camera', quantity: 3 }],
    amount: '3000 FCFA',
    status: 'Cancelled',
  },
];

export default function SearchScreen() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Order[]>([]);
  const [showSearch, setShowSearch] = useState(false);

  const { colors } = useThemeColor();
  const router = useRouter();

  const handleSearch = (text: string) => {
    setQuery(text);

    const filtered = allOrders.filter(order => {
      return (
        order.id.includes(text) ||
        order.trackingNumber.toLowerCase().includes(text.toLowerCase()) ||
        order.status.toLowerCase().includes(text.toLowerCase()) ||
        order.products.some(p => p.name.toLowerCase().includes(text.toLowerCase()))
      );
    });

    setResults(filtered);
  };

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.background,
          paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
        },
      ]}
    >
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>

        <Text style={[styles.title, { color: colors.primary }]}>Recherche Commande</Text>

        <TouchableOpacity onPress={() => setShowSearch(!showSearch)}>
          <Ionicons name="search" size={24} color={colors.primary} />
        </TouchableOpacity>
      </View>

      {/* Barre de recherche affichée dynamiquement */}
      {showSearch && (
        <TextInput
          value={query}
          onChangeText={handleSearch}
          placeholder="Rechercher par produit, statut, ID..."
          placeholderTextColor={colors.textSecondary || '#aaa'}
          style={[
            styles.input,
            { color: colors.text, borderColor: colors.border, borderRadius: 25 },
          ]}
          autoFocus
        />
      )}

     
      <FlatList
        data={results}
        keyExtractor={(item, index) => item.id + index}
        ListEmptyComponent={() =>
          query !== '' && results.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Image
                source={require('@/assets/images/order.png')}
                style={styles.emptyImage}
                resizeMode="contain"
              />
              <Text style={[styles.emptyText, { color: colors.text }]}>
                Aucune commande trouvée.
              </Text>
            </View>
          ) : null
        }
        renderItem={({ item }) => (
          <View
            style={[
              styles.card,
              {
                borderColor: colors.primary,
                backgroundColor: colors.searchBackground1 || '#f5f5f5',
              },
            ]}
          >
            <View style={styles.rowBetween}>
              <Text style={[styles.boldText, { color: colors.text }]}>
                Commande #{item.id}
              </Text>
              <Text style={{ color: '#999' }}>{item.date}</Text>
            </View>

            <Text style={[styles.tracking, { color: colors.text }]}>
              📦 Tracking: {item.trackingNumber}
            </Text>

            <Text style={[styles.sectionTitle, { color: colors.primary2 }]}>Produits:</Text>
            {item.products.map((prod, idx) => (
              <Text key={idx} style={{ color: colors.text }}>
                • {prod.name} (x{prod.quantity})
              </Text>
            ))}

            <View style={styles.rowBetween}>
              <Text style={[styles.amount, { color: colors.text }]}>
                Montant: {item.amount}
              </Text>
              <Text
                style={[
                  styles.status,
                  {
                    color:
                      item.status === 'Delivered'
                        ? 'green'
                        : item.status === 'Processing'
                        ? '#2607C5'
                        : 'red',
                  },
                ]}
              >
                {item.status}
              </Text>
            </View>
          </View>
        )}
        contentContainerStyle={{ paddingBottom: 30 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
  },
  card: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 12,
    marginBottom: 15,
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  boldText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  tracking: {
    marginBottom: 5,
    fontStyle: 'italic',
  },
  sectionTitle: {
   
    marginTop: 8,
    marginBottom: 4,
  },
  amount: {
    fontWeight: 'bold',
  },
  status: {
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
  emptyContainer: {
    alignItems: 'center',
    marginTop: 40,
    
  },
  emptyImage: {
    width: 300,
    height: 300,
    marginBottom: 10,
    
  },
  emptyText: {
    fontSize: 16,
    fontWeight: '500',
  },
});
