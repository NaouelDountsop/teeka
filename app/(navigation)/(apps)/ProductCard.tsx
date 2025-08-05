import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Image,
  Platform,
  useColorScheme,
  useWindowDimensions,
} from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { useFavorites } from '@/context/FavoritesContext'; 

type Product = {
  id: number;
  name: string;
  category: string;
  price: string;
  image: any;
  description: string;
};

const ProductCard: React.FC<{
  product: Product;
  onAddToCart: () => void;
  onImagePress: () => void; 
}> = ({ product, onAddToCart, onImagePress }) => {
  const { width } = useWindowDimensions();
  const scheme = useColorScheme();

  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();
  const [liked, setLiked] = useState(isFavorite(product.id));

  useEffect(() => {
    setLiked(isFavorite(product.id));
  }, [isFavorite(product.id)]);

  const toggleLike = () => {
    if (liked) {
      removeFromFavorites(product.id);
    } else {
      addToFavorites(product);
    }
    setLiked(!liked);
  };

  const cardWidth = width * 0.45;
  const cardHeight = cardWidth * 0.6;

  return (
    <View
      style={[
        styles.card,
        {
          width: cardWidth,
          height: cardHeight,
          backgroundColor: scheme === 'dark' ? '#1E1E1E' : '#fff',
          borderColor: '#33218F',
        },
      ]}
    >
      <TouchableOpacity onPress={onImagePress} activeOpacity={0.9} style={{ flex: 1 }}>
        <View style={[styles.imageContainer, { height: 110 }]}>
          <Image source={product.image} style={styles.image} resizeMode="cover" />
          <TouchableOpacity
            style={[
              styles.heartIcon,
              { backgroundColor: scheme === 'dark' ? '#1E1E1E' : '#fff' },
            ]}
            onPress={(e) => {
              e.stopPropagation?.();
              toggleLike();
            }}
          >
            <Ionicons
              name={liked ? 'heart' : 'heart-outline'}
              size={20}
              color={liked ? '#F43F5E' : '#33218F'}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.infoContainer}>
          <Text
            style={[styles.name, { color: scheme === 'dark' ? '#fff' : '#000', fontSize: 15 }]}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {product.name}
          </Text>

          <View style={styles.row}>
            <View style={styles.starsContainer}>
              {Array.from({ length: 5 }).map((_, index) => (
                <Ionicons
                  key={index}
                  name={index < 4 ? 'star' : 'star-outline'}
                  size={12}
                  color="#FACC15"
                  style={{ marginRight: 1 }}
                />
              ))}
            </View>

            <TouchableOpacity style={styles.addButton} onPress={onAddToCart}>
              <Ionicons name="cart-outline" size={18} color="#fff" />
              <Text style={[styles.addText, { fontSize: 13 }]}>Add</Text>
            </TouchableOpacity>
          </View>

          <Text style={[styles.price, { color: '#6F51F8', fontSize: 15 }]}>
            {product.price} FCFA
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 15,
    overflow: 'hidden',
    marginBottom: 15,
    marginRight: 10,
    minHeight: 220,
    borderWidth: 1,
    ...Platform.select({
      ios: { shadowColor: '#000', shadowOffset: { width: 1, height: 1 }, shadowOpacity: 0.1, shadowRadius: 3 },
      android: { elevation: 2 },
    }),
  },
  imageContainer: { position: 'relative', width: '100%', height: 130 },
  image: { width: '100%', height: '100%' },
  heartIcon: {
    position: 'absolute',
    top: 8,
    right: 8,
    borderRadius: 20,
    padding: 4,
    ...Platform.select({
      ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.2, shadowRadius: 2 },
      android: { elevation: 2 },
    }),
  },
  infoContainer: {
    padding: 8,
    flex: 1,
    justifyContent: 'space-between',
  },
  name: {
    fontWeight: '500',
    fontSize: 14,
    maxHeight: 36,
    lineHeight: 18,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 4,
    marginBottom: 4,
  },
  starsContainer: {
    flexDirection: 'row',
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#22C55E',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  addText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 4,
  },
  price: {
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default ProductCard;
