import BackgroundSvg from "@/assets/icon/icon3.svg";
import { useThemeColor } from "@/components/useThemeColors";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { useCart } from "@/context/CartContext";
import { useAvatar } from "@/context/AvatarContext";
import { AvatarProvider } from "@/context/AvatarContext";
import {
  FlatList,
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import ProductCard from "./ProductCard";

const categories = [
  "Tous", "Electroniques", "Maison", "Accessoires", "Beauté",
  "Mode", "Sport", "Jeux", "Livres",
];

const categoryImages: Record<string, any> = {
  Tous: require("@/assets/images/im3.png"),
  Electroniques: require("@/assets/images/im3.png"),
  Maison: require("@/assets/images/im3.png"),
  Accessoires: require("@/assets/images/im3.png"),
  Beauté: require("@/assets/images/im3.png"),
  Mode: require("@/assets/images/im3.png"),
  Sport: require("@/assets/images/im3.png"),
  Jeux: require("@/assets/images/im3.png"),
  Livres: require("@/assets/images/im3.png"),
};

type Product = {
  id: number;
  name: string;
  category: string; 
  price: string;
  image: any;
  description: string;
  specs: Record<string, string>; 
};

const products = [
  {
    id: 1,
    name: "HP Pavilion 15",
    price: "350000",
    image: require("@/assets/images/im3.png"),
    description: "Un ordinateur portable performant pour la bureautique et le multimédia.",
    category: "Electroniques",
    specs: {
      marque: "HP",
      modele: "Pavilion 15",
      couleur: "Gris",
      clavier: "AZERTY",
      processeur: "Intel Core i5",
      ram: "8 Go",
      disque: "512 Go SSD",
    },

  },

  
  {
    id: 2,
    name: "iPhone 14",
    price: "800000",
    image: require("@/assets/images/im3.png"),
    description: "Smartphone Apple dernière génération avec appareil photo performant.",
    category: "Maison",
    specs: {
      marque: "Apple",
      modele: "iPhone 14",
      couleur: "Noir",
      stockage: "128 Go",
      appareilPhoto: "12 MP",
      batterie: "3200 mAh",
    },
  },
  {
    id: 3,
    name: "Canon Pixma G3411",
    price: "120000",
    image: require("@/assets/images/im3.png"),
    description: "Imprimante multifonction avec réservoirs d'encre rechargeables.",
    category: "imprimante",
    specs: {
      marque: "Canon",
      type: "Multifonction",
      couleur: "Noir",
      resolution: "4800 x 1200 dpi",
      connectivite: "Wi-Fi, USB",
    },
  },

  {
    id: 1,
    name: "HP Pavilion 15",
    price: "350000",
    image: require("@/assets/images/im3.png"),
    description: "Un ordinateur portable performant pour la bureautique et le multimédia.",
    category: "ordinateur",
    specs: {
      marque: "HP",
      modele: "Pavilion 15",
      couleur: "Gris",
      clavier: "AZERTY",
      processeur: "Intel Core i5",
      ram: "8 Go",
      disque: "512 Go SSD",
    },
  },
  {
    id: 2,
    name: "iPhone 14",
    price: "800000",
    image: require("@/assets/images/im3.png"),
    description: "Smartphone Apple dernière génération avec appareil photo performant.",
    category: "smartphone",
    specs: {
      marque: "Apple",
      modele: "iPhone 14",
      couleur: "Noir",
      stockage: "128 Go",
      appareilPhoto: "12 MP",
      batterie: "3200 mAh",
      endurance: "30",
      marque2: "555",
      marque3: "555",
      marque5: "555"
    },
  },
  {
    id: 3,
    name: "Canon Pixma G3411",
    price: "120000",
    image: require("@/assets/images/im3.png"),
    description: "Imprimante multifonction avec réservoirs d'encre rechargeables.",
    category: "imprimante",
    specs: {
      marque: "Canon",
      type: "Multifonction",
      couleur: "Noir",
      resolution: "4800 x 1200 dpi",
      connectivite: "Wi-Fi, USB",

    },
  },
];

const Page6: React.FC = () => {
  const { width } = useWindowDimensions();
  const { colors, isDark } = useThemeColor();
  const router = useRouter();
  const { addToCart } = useCart(); 

  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("Tous");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [quantity, setQuantity] = useState("1");
  const [showDetails, setShowDetails] = useState(false); 

  const handleCloseModal = () => {
    setModalVisible(false);
    setSelectedProduct(null);
    setShowDetails(false);
  };

  const filteredProducts = products.filter((p) => {
    const matchCategory = activeCategory === "Tous" || p.category === activeCategory;
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    return matchCategory && matchSearch;
  });

  const AVATAR_KEY = "user_avatar_uri";
  const { avatarUri } = useAvatar();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
    
      <View style={styles.svgContainer}>
        <BackgroundSvg width={width} height={width * 1.5} preserveAspectRatio="none" />
      </View>

     
     <View style={styles.menuBar}>
  {/* Menu icon */}
  <TouchableOpacity onPress={() => router.push("./settings")}>
    <Ionicons name="menu" size={28} color={colors.text} />
  </TouchableOpacity>

  {/* Logo au centre */}
  <Image
     source={require('@/assets/images/logo.png')} 
    style={{ width: 100, height: 80, resizeMode: "center", marginLeft: 40}}
  />

  {/* Notifications + Profil */}
  <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
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


     
      <View style={{ flex: 1, marginTop: 110 }}>
        <View style={[styles.header, { backgroundColor: colors.background }]}>
          <View style={[
            styles.searchContainer,
            {
              width: width * 0.87,
              backgroundColor: colors.searchBackground || "#fff",
              borderColor: isDark ? colors.primary : "#000",
            },
          ]}>
            <Ionicons name="search" size={20} color={colors.text} style={{ marginRight: 15 }} />
            <TextInput
              style={[styles.input, { color: colors.text }]}
              placeholder="Search..."
              placeholderTextColor={colors.placeholder || "#999"}
              value={search}
              onChangeText={setSearch}
            />
          </View>

          {/* Liste des catégories */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoriesRow}>
            {categories.map((cat) => (
              <TouchableOpacity
                key={cat}
                onPress={() => setActiveCategory(cat)}
                style={styles.categoryButton}
              >
                <View style={[
                  styles.categoryCircle,
                  activeCategory === cat && { borderColor: colors.primary5, borderWidth: 6},
                ]}>
                  <Image source={categoryImages[cat]} style={styles.categoryImage} resizeMode="contain" />
                </View>
                <Text style={[
                  styles.categoryText,
                  { color: isDark ? "#fff" : "#333" },
                  activeCategory === cat && { color: colors.primary, fontWeight: "bold" },
                ]}>
                  {cat}
                </Text>
                {activeCategory === cat && (
                  <View style={[styles.activeBar, { backgroundColor: colors.primary }]} />
                )}
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

     
        <FlatList
          data={filteredProducts}
          numColumns={2}
          contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 24 }}
          columnWrapperStyle={{ justifyContent: "space-between" }}
          keyExtractor={(item) => item.id.toString()}
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
      </View>

      {/* MODAL PRODUIT */}
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
                style={{ width: "100%" }}
                contentContainerStyle={{ alignItems: "center", paddingBottom: 20 }}
                showsVerticalScrollIndicator={false}
              >
                {/* Fermer */}
                <TouchableOpacity style={styles.closeButton} onPress={handleCloseModal}>
                  <Ionicons name="close" size={24} color={colors.text} />
                </TouchableOpacity>

                <Text style={[styles.modalTitle, { color: colors.text }]}>{selectedProduct.name}</Text>

                <Image
                  source={selectedProduct.image}
                  style={{ width: 120, height: 120, borderRadius: 8, marginVertical: 10 }}
                  resizeMode="cover"
                />

                <Text style={[styles.modalText, { color: colors.text }]}>{selectedProduct.description}</Text>

                <Text style={[styles.modalText, { color: colors.text, fontWeight: "bold" }]}>
                  Prix : {selectedProduct.price} FCFA
                </Text>

                <View style={{ flexDirection: "row", alignItems: "center", marginTop: 10, gap: 10 }}>
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
                   textAlign: "center",
                 }}
                />
                </View>


                <TouchableOpacity
                  style={[styles.modalButton, { backgroundColor: colors.primary, marginTop: 20 }]}
                  onPress={() => {
                    const qty = Math.max(1, parseInt(quantity) || 1);
                    const productToAdd = { ...selectedProduct, quantity: qty };
                    addToCart(productToAdd);
                    handleCloseModal()
                  
                  }}
                >
                  <Text style={{ color: "#fff", fontWeight: "bold" }}>Ajouter au panier</Text>
                </TouchableOpacity>

            
                {!showDetails && (
                  <TouchableOpacity
                    style={{ marginTop: 10 }}
                    onPress={() => setShowDetails(true)}
                  >
                    <Text style={{ color: colors.primary10 }}>Voir les détails</Text>
                  </TouchableOpacity>
                )}

              
                {showDetails && (
                  <View style={{ marginTop: 20, width: "90%" }}>
                    <Text style={{ color: colors.primary10, fontWeight: "bold", marginBottom: 10 }}>
                      Spécifications :
                    </Text>
                    {Object.entries(selectedProduct.specs || {}).map(([key, value]) => (
                      <Text key={key} style={[styles.modalText, { color: colors.text, textAlign: "left" }]}>
                        • {capitalize(key)} : {value}
                      </Text>
                    ))}
                    <TouchableOpacity
                      style={{ marginTop: 15 }}
                      onPress={() => setShowDetails(false)}
                    >
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
};


function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  svgContainer: { flex: 1 },
  menuBar: {
    position: "absolute",
    top: 50,
    left: 20,
    right: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    zIndex: 10,
  },
  menuitem: { marginTop: 40 },
  topRightIcons: { flexDirection: "row", alignItems: "center", marginTop: 20 },
  iconSpacing: { marginRight: 8 },
  header: { paddingBottom: 10, alignItems: "center", marginTop: -300 },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 20,
    paddingHorizontal: 15,
    height: 38,
    marginBottom: 10,
    borderWidth: 1,
    marginTop:25
  },
  input: { flex: 1, fontSize: 14, paddingVertical: 0 },
  categoriesRow: { flexDirection: "row", paddingHorizontal: 15, paddingVertical: 8 },
  categoryButton: { alignItems: "center", justifyContent: "center", marginHorizontal: 8, minWidth: 60, paddingVertical: 2 },
  categoryCircle: {
    width: 50, height: 50, borderRadius: 25, backgroundColor: "#eee",
    justifyContent: "center", alignItems: "center", marginBottom: 5,
  },
  categoryImage: { width: 30, height: 30 },
  categoryText: { fontSize: 14, textAlign: "center" },
  activeBar: { height: 2, borderRadius: 2, width: "30%", alignSelf: "center", marginTop: 2 },
  modalContentContainer: {
    flex: 1, backgroundColor: "none", justifyContent: "center", alignItems: "center",borderColor:"#FFFFFF",  
  },
  modalContent: {
    width: "85%", padding: 20, borderRadius: 25, alignItems: "center", position: "relative",borderColor:"#FFFFFF",borderWidth: 0.20,
  },
  closeButton: { position: "absolute", top: 10, right: 10, zIndex: 10 },
  modalTitle: { fontSize: 18, fontWeight: "600", marginBottom: 10, textAlign: "center" },
  modalText: { fontSize: 15, textAlign: "center" },
  modalButton: { paddingVertical: 10, paddingHorizontal: 20, borderRadius: 8, alignItems: 'center' },
});

export default Page6;
