import React, { useState, useRef } from "react";
import {
  Animated,
  Image,
  Modal,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
  TextInput,
} from "react-native";
import BackgroundSvg from "@/assets/icon/icon3.svg";
import { useCart } from "@/context/CartContext";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useThemeColor } from "@/components/useThemeColors";

type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: any;
};

type CartProps = {
  items?: CartItem[];
};

const heightMultiplier = 2;

const Cart: React.FC<CartProps> = ({ items }) => {
  const { width, height } = useWindowDimensions();
  const svgHeight = width * heightMultiplier;

  const {
    cartItems,
    removeFromCart,
    incrementQuantity,
    decrementQuantity,
  } = useCart();
  const router = useRouter();

  const [ville, setVille] = useState("");
  const [quartier, setQuartier] = useState("");
  const { colors, isDark } = useThemeColor();

  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showAlertModal, setShowAlertModal] = useState(false);

  const scrollRef = useRef<Animated.ScrollView>(null);

  const products = items ?? cartItems;

  const totalPrice = products.reduce(
    (sum, item) => sum + Number(item.price) * item.quantity,
    0
  );

  const handlePayNowPress = () => {
    if (!ville.trim() || !quartier.trim()) {
      setShowAlertModal(true);
      return;
    }
    setShowAuthModal(true);
  };

  const goToRegister = () => {
    setShowAuthModal(false);
    router.push("/(auth)/register");
  };

  const goToLogin = () => {
    setShowAuthModal(false);
    router.push("/(auth)/login");
  };

  const handleScroll = (event) => {
    const y = event.nativeEvent.contentOffset.y;
    if (y < 0 && scrollRef.current) {
      scrollRef.current.scrollTo({ y: 0, animated: false });
    }
  };

  const headerHeight = Platform.OS === "ios" ? 90 : 70;
  const footerHeight = 70;
  const scrollViewHeight = height - headerHeight - footerHeight;

  if (products.length === 0) {
    return (
      <View style={[styles.emptyContainer, { backgroundColor: colors.background }]}>
        <View
          style={{ width, height: svgHeight, position: "absolute", top: 0, left: 0, zIndex: 0 }}
        >
          <BackgroundSvg
            width={width}
            height={svgHeight}
            preserveAspectRatio="none"
          />
        </View>

        <Image
          source={require("@/assets/images/add.png")}
          style={styles.emptyImage}
          resizeMode="center"
        />

        <Text style={[styles.emptyText, { color: colors.text }]}>Ajoutez des produits au panier</Text>
        <TouchableOpacity style={styles.backButtonEmpty} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={28} color={colors.text} />
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
   <Modal
  visible={showAlertModal}
  transparent
  animationType="fade"
  onRequestClose={() => setShowAlertModal(false)}
>
  <View style={styles.modalOverlay}>
    <View style={[styles.modalContent, { maxWidth: 320, backgroundColor: "#7E57C2" }]}>
      <TouchableOpacity
        style={styles.closeModalButton}
        onPress={() => setShowAlertModal(false)}
      >
        <Ionicons name="close" size={28} color="#fff" />
      </TouchableOpacity>

      <Text
        style={{
          fontSize: 16,
          fontWeight: "300",
          marginBottom: 20,
          textAlign: "center",
          color: "#fff",
        }}
      >
        Veuillez entrer la ville et le quartier
      </Text>
    </View>
  </View>
</Modal>


      <View style={{ width, height: svgHeight, position: "absolute", top: 0, left: 0, zIndex: 0 }}>
        <BackgroundSvg
          width={width}
          height={svgHeight}
          preserveAspectRatio="none"
        />
      </View>

      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={28} color={colors.text} />
        </TouchableOpacity>
        
      </View>

      <Animated.ScrollView
        ref={scrollRef}
        style={{ zIndex: 1, height: scrollViewHeight, marginTop: headerHeight + 20 }}
        contentContainerStyle={{
          paddingHorizontal: 15,
          paddingBottom: 20,
          paddingTop: 15,
        }}
        scrollEventThrottle={16}
        onScroll={handleScroll}
      >
        {products.map((item) => (
          <View
            key={item.id}
            style={[
              styles.itemCard,
              { backgroundColor: isDark ? "#1E1E1E" : "#fff" },
            ]}
          >
            {item.image && (
              <Image source={item.image} style={styles.productImage} resizeMode="contain" />
            )}
            <View style={styles.details}>
              <Text style={[styles.name, { color: colors.text }]}>{item.name}</Text>
              <Text style={[styles.text, { color: colors.text }]}>PU : {item.price} FCFA</Text>

              <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
                <TouchableOpacity
                  onPress={() => decrementQuantity(item.id)}
                  style={{
                    backgroundColor: "#ddd",
                    paddingHorizontal: 8,
                    paddingVertical: 2,
                    borderRadius: 6,
                    marginRight: 10,
                  }}
                >
                  <Text style={{ fontSize: 18, fontWeight: "bold" }}>−</Text>
                </TouchableOpacity>

                <Text style={[styles.text, { color: colors.text }]}> {item.quantity}</Text>

                <TouchableOpacity
                  onPress={() => incrementQuantity(item.id)}
                  style={{
                    backgroundColor: "#ddd",
                    paddingHorizontal: 8,
                    paddingVertical: 2,
                    borderRadius: 6,
                    marginLeft: 10,
                  }}
                >
                  <Text style={{ fontSize: 18, fontWeight: "bold" }}>+</Text>
                </TouchableOpacity>
              </View>

              <Text style={[styles.total, { color: "#2EC861" }]}>
                Total : {Number(item.price) * item.quantity} FCFA
              </Text>
            </View>

            <TouchableOpacity
              onPress={() => setSelectedItemId(item.id)}
              style={styles.menuButton}
              activeOpacity={0.7}
            >
              <Ionicons name="ellipsis-vertical" size={24} color={colors.text} />
            </TouchableOpacity>

            {!items && (
              <Modal
                transparent
                animationType="fade"
                visible={selectedItemId === item.id}
                onRequestClose={() => setSelectedItemId(null)}
              >
                <View style={styles.modalOverlay}>
                  <TouchableOpacity
                    style={{ flex: 1, width: "100%" }}
                    activeOpacity={1}
                    onPress={() => setSelectedItemId(null)}
                  />
                  <View style={[styles.modalContent, { backgroundColor: colors.background }]}>
                    <TouchableOpacity
                      onPress={() => {
                        removeFromCart(item.id);
                        setSelectedItemId(null);
                      }}
                      style={styles.deleteOption}
                    >
                      <Ionicons name="trash-outline" size={20} color={colors.primary} />
                      <Text style={[styles.deleteText, { color: colors.primary }]}>Supprimer</Text>
                    </TouchableOpacity>
                  </View>
                  <TouchableOpacity
                    style={{ flex: 1, width: "100%" }}
                    activeOpacity={1}
                    onPress={() => setSelectedItemId(null)}
                  />
                </View>
              </Modal>
            )}
          </View>
        ))}

        <Text style={[styles.totalText, { color: colors.text, textAlign: "right", marginTop: 10 }]}>
          Total : {totalPrice.toLocaleString()} FCFA
        </Text>

        <TextInput
          placeholder="Entrez votre ville"
          placeholderTextColor={colors.text + "99"}
          value={ville}
          onChangeText={setVille}
          style={{
            borderRadius: 10,
            padding: 10,
            marginTop: 30,
            marginBottom: 10,
            color: colors.text,
            backgroundColor: isDark ? "#1E1E1E" : "#F0F0F0",
          }}
        />

        <TextInput
          placeholder="Entrez votre quartier"
          placeholderTextColor={colors.text + "99"}
          value={quartier}
          onChangeText={setQuartier}
          style={{
            borderRadius: 10,
            padding: 10,
            marginBottom: 20,
            color: colors.text,
            backgroundColor: isDark ? "#1E1E1E" : "#F0F0F0",
          }}
        />

        <TextInput
        />
      </Animated.ScrollView>

      <View
        style={[
          styles.footerContainer,
          { backgroundColor: colors.background, borderTopColor: colors.border || "#ccc" },
        ]}
      >
        <TouchableOpacity onPress={handlePayNowPress} style={[styles.payButton, { backgroundColor: "#7E57C2" }]}>
          <Text style={styles.payButtonText}>Payer maintenant</Text>
        </TouchableOpacity>
      </View>

      {/* Modal d'authentification stylisée */}
      <Modal
        visible={showAuthModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowAuthModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.authModalContent, { backgroundColor: "#7E57C2",borderWidth:1,  }]}>
            <TouchableOpacity
              style={styles.closeModalButton}
              onPress={() => setShowAuthModal(false)}
            >
              <Ionicons name="close" size={28} color="#fff" />
            </TouchableOpacity>

            <Text style={styles.authModalText}>
              Connectez-vous ou inscrivez-vous pour continuer.
            </Text>

            <View style={styles.authButtonsRow}>
              <TouchableOpacity onPress={goToRegister} style={styles.authButtonTextWrapper}>
                <Text style={styles.authButtonTextNoBg}>S'inscrire</Text>
              </TouchableOpacity>

              <View style={styles.separator} />

              <TouchableOpacity onPress={goToLogin} style={styles.authButtonTextWrapper}>
                <Text style={styles.authButtonTextNoBg}>Se connecter</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    position: "absolute",
    top: Platform.OS === "ios" ? 40 : 20,
    left: 20,
    right: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    zIndex: 10,
    paddingVertical: 10,
    marginTop: 30,
  },
  backButton: {
    marginTop: Platform.OS === "ios" ? 10 : 0,
  },
  backButtonEmpty: {
    position: "absolute",
    top: Platform.OS === "ios" ? 110 : 80,
    left: 20,
    zIndex: 10,
  },
  itemCard: {
    borderRadius: 20,
    padding: 15,
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 10,
    elevation: 5,
    borderWidth: 0.2,
    borderColor: "#FFFFFF",
    marginTop: 30,
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 20,
  },
  details: {
    flex: 1,
    marginLeft: 15,
  },
  name: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 4,
  },
  text: {
    fontSize: 14,
  },
  total: {
    fontSize: 14,
    fontWeight: "700",
    marginTop: 5,
  },
  menuButton: {
    padding: 5,
  },
  modalOverlay: {
    flex: 1,
  
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  modalContent: {
    padding: 25,
    borderRadius: 15,
    width: "100%",
    maxWidth: 350,
    alignItems: "center",
    elevation: 10,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
  },
  authButton: {
    paddingVertical: 12,
    paddingHorizontal: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  authButtonText: {
    color: "#fff",
    fontWeight: "100",
    fontSize: 12,
  },
  deleteOption: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
  },
  deleteText: {
    marginLeft: 10,
    fontWeight: "700",
    fontSize: 16,
  },
  footerContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingVertical: 15,
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderTopWidth: 0.15,
    zIndex: 15,
  },
  totalText: {
    fontWeight: "700",
    fontSize: 15,
  },
  payButton: {
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
  },
  payButtonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },
  authModalContent: {
    padding: 25,
    borderRadius: 0,
    width: "100%",
    maxWidth: 350,
    alignItems: "center",
    elevation: 10,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    position: "relative"
  
},
closeModalButton: {
position: "absolute",
top: 10,
right: 10,
zIndex: 20,
},
authModalText: {
fontSize: 14,
fontWeight: "300",
marginBottom: 20,
textAlign: "center",
color: "#fff",
},
authButtonsRow: {
flexDirection: "row",
alignItems: "center",
justifyContent: "center",
marginTop: 1,
width: "100%",
},
authButtonTextWrapper: {
paddingHorizontal: 20,
paddingVertical: 10,
},
authButtonTextNoBg: {
color: "#fff",
fontWeight: "400",
fontSize: 14,
},
separator: {
width: 2,
height: 24,
backgroundColor: "#2EC861",
marginHorizontal: 15,
},
emptyContainer: {
flex: 1,
justifyContent: "center",
alignItems: "center",
},
emptyText: {
fontSize: 20,
fontWeight: "700",
marginBottom: 100,
},
emptyImage: {
width: 300,
height: 300,
marginBottom: 1,
},
});

export default Cart;