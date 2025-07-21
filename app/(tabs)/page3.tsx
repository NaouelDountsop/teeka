import React, { useState } from "react";
import { View, StyleSheet, useWindowDimensions, TouchableOpacity, TextInput, Text, ScrollView, Platform, FlatList } from "react-native";

import BackgroundSvg from "@/assets/icon/icon3.svg";
import { Ionicons } from '@expo/vector-icons';
import { router } from "expo-router";
import ProductCard from "@/components/ProductCard";

const categories = ['Tous', 'Electroniques', 'Maison', 'Accessoires', 'Beauté', 'Mode', 'Sport', 'Jeux', 'Livres'];

const products = [
  { id: 1, name: "Caméras de Surveillance", category: "Electroniques", price: "100 000", image: require("@/assets/images/im3.png") },
  { id: 2, name: "Canapé Design", category: "Maison", price: "300 000", image: require("@/assets/images/im3.png") },
  { id: 3, name: "Montre Luxe", category: "Accessoires", price: "80 000", image: require("@/assets/images/im3.png") },
  { id: 4, name: "Table Basse", category: "Maison", price: "150 000", image: require("@/assets/images/im3.png") },
  { id: 5, name: "Montre Luxe", category: "Accessoires", price: "80 000", image: require("@/assets/images/im3.png") },
  { id: 6, name: "Table Basse", category: "Maison", price: "150 000", image: require("@/assets/images/im3.png") },
];

const Page6: React.FC = () => {
  const { width, height } = useWindowDimensions();
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('Tous');

  const filteredProducts = activeCategory === 'Tous'
    ? products
    : products.filter(p => p.category === activeCategory);

  return (
    <View style={styles.container}>
      <BackgroundSvg
        width={width * 1.3}
        height={height}
        preserveAspectRatio="none"
        style={styles.svg}
      />

      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Ionicons name="arrow-back-outline" size={25} color="#000" />
      </TouchableOpacity>

      <View style={styles.topRightIcons}>
        <TouchableOpacity>
          <Ionicons name="notifications-outline" size={25} color="#000" style={{ marginRight: 8 }} />
        </TouchableOpacity>

        <TouchableOpacity>
          <Ionicons name="person-circle-outline" size={50} color="#5D2C9F" />
        </TouchableOpacity>
      </View>

      <View style={styles.mainContent}>

        <View style={[styles.searchContainer, { width: width * 0.87 }]}>
          <Ionicons name="search" size={20} color="#000" style={{ marginRight: 15 }} />
          <TextInput
            style={styles.input}
            placeholder="Search..."
            placeholderTextColor="#999"
            value={search}
            onChangeText={setSearch}
          />
        </View>

        <View style={styles.categoriesWrapper}>
          <View style={styles.categoriesShadow}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoriesRow}>
              {categories.map((cat) => (
                <TouchableOpacity key={cat} onPress={() => setActiveCategory(cat)} style={styles.categoryButton}>
                  <Text style={[styles.categoryText, activeCategory === cat && styles.activeCategoryText]}>
                    {cat}
                  </Text>
                  {activeCategory === cat && <View style={styles.activeBar} />}
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>

        {/* Liste des produits avec scroll propre */}
        <FlatList
          data={filteredProducts}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          columnWrapperStyle={styles.row}
          contentContainerStyle={{ paddingTop: 90, paddingBottom: 100 }}
          renderItem={({ item }) => <ProductCard product={item} />}
          showsVerticalScrollIndicator={true}
          indicatorStyle="black"
        />
        
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  svg: { position: 'absolute', top: 0, left: '-8%' },
  backButton: { position: 'absolute', top: 80, left: 20 },
  topRightIcons: { position: 'absolute', top: 50, right: 20, flexDirection: 'row', alignItems: 'center' },
  mainContent: { position: 'absolute', top: 110, width: '100%', alignItems: 'center' },
  searchContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#eee', borderRadius: 20, paddingHorizontal: 15, height: 38, borderWidth: 1, borderColor: '#000' },
  input: { flex: 1, fontSize: 12, color: '#333', paddingVertical: 0 },
  categoriesWrapper: { position: 'absolute', top: 55, width: '100%', alignItems: 'center', zIndex: 10 },
  categoriesShadow: { backgroundColor: '#fff', borderRadius: 10, paddingVertical: 1, ...Platform.select({ ios: { shadowColor: '#000', shadowOffset: { width: 1, height: 1 }, shadowOpacity: 0.1, shadowRadius: 3 }, android: { elevation: 3 } }) },
  categoriesRow: { flexDirection: 'row', paddingHorizontal: 15, paddingVertical: 8 },
  categoryButton: { alignItems: "center", justifyContent: "center", marginHorizontal: 3, minWidth: 60, paddingVertical: 2 },
  categoryText: { fontSize: 14, color: "#333", textAlign: "center" },
  activeCategoryText: { color: "#6F51F8", fontWeight: "bold" },
  activeBar: { height: 1, backgroundColor: '#6F51F8', borderRadius: 2, width: "30%", alignSelf: "center", marginTop: 2 },
  row: { justifyContent: "space-between", paddingHorizontal: 15, marginBottom: 15 },
});

export default Page6;
