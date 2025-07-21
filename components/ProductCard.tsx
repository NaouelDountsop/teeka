import React from 'react';
import { View, Text, Image, StyleSheet, Platform, useWindowDimensions, TouchableOpacity, ViewStyle, StyleProp } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

type Product = {
  id: number;
  name: string;
  price: string;
  image: any;
  rating?: number;
};

type Props = {
  product: Product;
  style?: StyleProp<ViewStyle>;  // Permet de recevoir style externe
};

const ProductCard: React.FC<Props> = ({ product, style }) => {
  const { width } = useWindowDimensions();
  const router = useRouter();

  const cardWidth = width * 0.45;
  const cardHeight = cardWidth * 1.3;

  const goToDetails = () => {
    router.push({ pathname: "/productDetail", params: { id: product.id } });
  };

  return (
    <TouchableOpacity onPress={goToDetails} activeOpacity={0.9}>
      <View style={[styles.card, { width: cardWidth, height: cardHeight }, style]}>
        {/* Image + coeur */}
        <View style={styles.imageContainer}>
          <Image source={product.image} style={styles.image} resizeMode="cover" />
          <TouchableOpacity style={styles.heartIcon} onPress={() => {}}>
            <Ionicons name="heart-outline" size={20} color="#33218F" />
          </TouchableOpacity>
        </View>

        {/* Infos produit */}
        <View style={styles.infoContainer}>
          <Text style={styles.name} numberOfLines={2} ellipsizeMode="tail">{product.name}</Text>

          <View style={styles.row}>
            <View style={styles.starsContainer}>
              {Array.from({ length: 5 }).map((_, index) => (
                <Ionicons
                  key={index}
                  name={index < (product.rating || 4) ? "star" : "star-outline"}
                  size={12}
                  color="#FACC15"
                  style={{ marginRight: 1 }}
                />
              ))}
            </View>

            <TouchableOpacity style={styles.viewButton} onPress={goToDetails}>
              <Text style={styles.viewText}>View</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.price}>{product.price} FCFA</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 15,
    overflow: 'hidden',
    marginBottom: 15,
    marginRight: 10,  // Cette marge sera parfois écrasée par style externe
    borderWidth: 1,
    borderColor: '#33218F',
    ...Platform.select({
      ios: { shadowColor: '#000', shadowOffset: { width: 1, height: 1 }, shadowOpacity: 0.1, shadowRadius: 3 },
      android: { elevation: 2 },
    }),
  },
  imageContainer: { position: 'relative', width: '100%', height: 110 },
  image: { width: '100%', height: '100%' },
  heartIcon: {
    position: 'absolute', top: 8, right: 8, backgroundColor: '#fff', borderRadius: 20, padding: 4,
    ...Platform.select({
      ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.2, shadowRadius: 2 },
      android: { elevation: 2 },
    }),
  },
  infoContainer: { padding: 8, flex: 1, justifyContent: 'space-between' },
  name: { fontWeight: '500', fontSize: 14, color: '#333', maxHeight: 36, lineHeight: 18 },
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 4, marginBottom: 4 },
  starsContainer: { flexDirection: 'row' },
  viewButton: { backgroundColor: '#22C55E', paddingHorizontal: 8, paddingVertical: 3, borderRadius: 8 },
  viewText: { color: '#fff', fontSize: 10, fontWeight: 'bold' },
  price: { fontWeight: 'bold', fontSize: 16, color: '#6F51F8' },
});

export default ProductCard;
