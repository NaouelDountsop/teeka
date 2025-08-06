import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  useWindowDimensions,
  TextInput,
  TouchableOpacity,
  Modal,
  ScrollView,
  Image,
} from 'react-native';
import { useFavorites } from '@/context/FavoritesContext';
import { useCart } from '@/context/CartContext';
import { useThemeColor } from '@/components/useThemeColors';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import BackgroundSvg from '@/assets/icon/icon3.svg';
import ProductCard from '@/app/(navigation)/(apps)/ProductCard';
import { useAvatar } from '@/context/AvatarContext';

export default function FavoritesScreen() {
  const { favorites } = useFavorites();
  const { addToCart } = useCart();
  const { colors, isDark } = useThemeColor();
  const { width, height } = useWindowDimensions();
  const { avatarUri } = useAvatar();
  const router = useRouter();

  const [search, setSearch] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [quantity, setQuantity] = useState('1');
  const [showDetails, setShowDetails] = useState(false);

  const filteredFavorites = favorites.filter(p =>
    p.name?.toLowerCase().includes(search.toLowerCase())
  );

  const svgHeight = Math.min(width * 2, 600);
  const searchMarginTop = height * 0.12;

  const handleCloseModal = () => {
    setModalVisible(false);
    setSelectedProduct(null);
    setShowDetails(false);
    setQuantity('1');
  };

  const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.svgContainer, { height: svgHeight }]}>
        <BackgroundSvg width={width} height={svgHeight} preserveAspectRatio="none" />
      </View>

      <View style={styles.menuBar}>
        <TouchableOpacity onPress={() => router.push('./settings')}>
          <Ionicons name="menu" size={28} color={colors.text} />
        </TouchableOpacity>

        <View
         
        >
          <Image
            source={require('@/assets/images/logo.png')}
            style={styles.logo}
            resizeMode="center"
          />
        </View>

        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
          <TouchableOpacity onPress={() => router.push('./notification')}>
            <Ionicons name="notifications-outline" size={25} color={colors.text} />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => router.push('/(auth)/profil')}>
            {avatarUri ? (
              <Image
                source={{ uri: avatarUri }}
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 20,
                  borderWidth: 1,
                  borderColor: colors.text,
                }}
              />
            ) : (
              <Ionicons name="person-circle-outline" size={40} color={colors.text} />
            )}
          </TouchableOpacity>
        </View>
      </View>

      <View style={{ marginTop: searchMarginTop, alignItems: 'center' }}>
        <View
          style={[
            styles.searchContainer,
            {
              width: width * 0.87,
              backgroundColor: colors.searchBackground || '#fff',
              borderColor: isDark ? colors.primary : '#000',
            },
          ]}
        >
          <Ionicons name="search" size={20} color={colors.text} style={{ marginRight: 15 }} />
          <TextInput
            style={[styles.input, { color: colors.text }]}
            placeholder="Rechercher un favori..."
            placeholderTextColor={colors.placeholder || '#999'}
            value={search}
            onChangeText={setSearch}
          />
        </View>
      </View>

      {filteredFavorites.length === 0 ? (
        <View style={{ alignItems: 'center', marginTop: 50 }}>
          <Image
            source={require('@/assets/images/like.png')}
            style={{ width: width * 0.8, height: width * 0.8, marginBottom: 20 }}
            resizeMode="contain"
          />
          <Text style={[styles.emptyText, { color: colors.text }]}>Aucun produit dans les favoris.</Text>
        </View>
      ) : (
        <FlatList
          data={filteredFavorites}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          contentContainerStyle={{
            paddingHorizontal: width < 350 ? 8 : 16,
            paddingBottom: 24,
          }}
          columnWrapperStyle={{ justifyContent: 'space-between' }}
          renderItem={({ item }) => (
            <ProductCard
              product={item}
              onAddToCart={() => {
                setSelectedProduct(item);
                setModalVisible(true);
              }}
              onImagePress={() => {
                setSelectedProduct(item);
                setModalVisible(true);
              }}
            />
          )}
        />
      )}

      {selectedProduct && (
        <Modal
          visible={modalVisible}
          transparent
          animationType="slide"
          onRequestClose={handleCloseModal}
        >
          <View style={styles.modalContentContainer}>
            <View style={[styles.modalContent, { backgroundColor: colors.card }]}>
              <ScrollView
                style={{ width: '100%' }}
                contentContainerStyle={{ alignItems: 'center', paddingBottom: 20 }}
                showsVerticalScrollIndicator={false}
              >
                <TouchableOpacity style={styles.closeButton} onPress={handleCloseModal}>
                  <Ionicons name="close" size={24} color={colors.text} />
                </TouchableOpacity>

                <Text style={[styles.modalTitle, { color: colors.text }]}> {selectedProduct?.name} </Text>

                {selectedProduct?.image && (
                  <Image
                    source={selectedProduct.image}
                    style={{ width: 120, height: 120, borderRadius: 8, marginVertical: 10 }}
                    resizeMode="cover"
                  />
                )}

                <Text style={[styles.modalText, { color: colors.text }]}> {selectedProduct?.description} </Text>

                <Text style={[styles.modalText, { fontWeight: 'bold', color: colors.text }]}>Prix : {selectedProduct?.price} FCFA</Text>

                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10, gap: 10 }}>
                  <Text style={[styles.modalText, { color: colors.text }]}>Quantité :</Text>
                  <TextInput
                    value={quantity}
                    onChangeText={setQuantity}
                    keyboardType="numeric"
                    placeholder="1"
                    style={{
                      borderWidth: 0.5,
                      borderColor: colors.border,
                      backgroundColor: colors.background,
                      borderRadius: 8,
                      padding: 8,
                      color: colors.text,
                      width: 80,
                      textAlign: 'center',
                    }}
                  />
                </View>

                <TouchableOpacity
                  style={[styles.modalButton, { backgroundColor: colors.primary, marginTop: 20 }]}
                  onPress={() => {
                    const qty = Math.max(1, parseInt(quantity) || 1);
                    const productToAdd = { ...selectedProduct, quantity: qty };
                    addToCart(productToAdd);
                    handleCloseModal();
                  }}
                >
                  <Text style={{ color: '#fff', fontWeight: 'bold' }}>Ajouter au panier</Text>
                </TouchableOpacity>

                {!showDetails ? (
                  <TouchableOpacity style={{ marginTop: 10 }} onPress={() => setShowDetails(true)}>
                    <Text style={{ color: colors.primary10 }}>Voir les détails</Text>
                  </TouchableOpacity>
                ) : (
                  <View style={{ marginTop: 20, width: '90%' }}>
                    <Text style={{ color: colors.primary10, fontWeight: 'bold', marginBottom: 10 }}>Spécifications :</Text>
                    {Object.entries(selectedProduct.specs || {}).map(([key, value]) => (
                      <Text
                        key={key}
                        style={[styles.modalText, { color: colors.text, textAlign: 'left' }]}
                      >
                        • {capitalize(key)} : {value}
                      </Text>
                    ))}
                    <TouchableOpacity style={{ marginTop: 15 }} onPress={() => setShowDetails(false)}>
                      <Text style={{ color: colors.primary10 }}>Réduire les détails</Text>
                    </TouchableOpacity>
                  </View>
                )}
              </ScrollView>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  svgContainer: { flex: 1, position: 'absolute' },
  menuBar: {
    position: 'absolute',
    top: 40,
    left: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 10,
    marginTop: 10,
  },
  logoWrapper: {
    width: 90,
    height: 90,
    borderRadius: 45,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
   
  },
  logo: {
    width: 80,
    height: 80,
    marginLeft: 35,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 20,
    paddingHorizontal: 15,
    height: 38,
    marginBottom: 10,
    borderWidth: 1,
    marginTop: 40,
  },
  input: {
    flex: 1,
    fontSize: 14,
    paddingVertical: 0,
  },
  emptyText: {
    fontSize: 16,
    textAlign: 'center',
    marginTop:-25
  },
  modalContentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '85%',
    padding: 20,
    borderRadius: 25,
    alignItems: 'center',
    position: 'relative',
    borderWidth: 0.25,
    borderColor: '#fff',
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
    textAlign: 'center',
  },
  modalText: {
    fontSize: 15,
    textAlign: 'center',
  },
  modalButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
});
