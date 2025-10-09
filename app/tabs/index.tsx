import React, { useState } from "react";
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Alert,
  StyleSheet,
  FlatList,
  TextInput,
} from "react-native";

type Product = {
  id: number;
  name: string;
  color: string;
  price: string;
  delivery: string;
  stock: number;
  volume: number;
};

const productsData: Product[] = [
  { id: 1, name: "Espresso", color: "#A0522D", price: "$3", delivery: "5 min", stock: 10, volume: 0.1 },
  { id: 2, name: "Latte", color: "#D2B48C", price: "$4", delivery: "7 min", stock: 8, volume: 0.2 },
  { id: 3, name: "Cappuccino", color: "#C19A6B", price: "$4.5", delivery: "6 min", stock: 5, volume: 0.2 },
  { id: 4, name: "Mocha", color: "#8B4513", price: "$5", delivery: "8 min", stock: 7, volume: 0.25 },
  { id: 5, name: "Macchiato", color: "#CD853F", price: "$3.5", delivery: "5 min", stock: 9, volume: 0.15 },
  { id: 6, name: "Americano", color: "#A0522D", price: "$2.5", delivery: "4 min", stock: 12, volume: 0.3 },
  { id: 7, name: "Flat White", color: "#DEB887", price: "$4", delivery: "7 min", stock: 6, volume: 0.2 },
];

export default function App() {
  const [cart, setCart] = useState<Product[]>([]);
  const [products, setProducts] = useState(productsData);
  const [search, setSearch] = useState("");

  const addToCart = (product: Product) => {
    if (product.stock <= 0) {
      Alert.alert("Out of stock", `${product.name} is no longer available.`);
      return;
    }

    setProducts((prev) =>
      prev.map((p) =>
        p.id === product.id ? { ...p, stock: p.stock - 1 } : p
      )
    );

    setCart([...cart, product]);
  };

  const removeFromCart = (product: Product) => {
    setCart((prev) => prev.filter((p, idx) => idx !== prev.findIndex(i => i.id === product.id)));
    setProducts((prev) =>
      prev.map((p) =>
        p.id === product.id ? { ...p, stock: p.stock + 1 } : p
      )
    );
  };

  const filteredProducts = products.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  const totalLiters = cart.reduce((sum, item) => sum + item.volume, 0);
  const totalPrice = cart.reduce((sum, item) => sum + parseFloat(item.price.replace("$", "")), 0);


  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>☕ Cozy Coffee Shop</Text>

     
      <TextInput
        style={styles.search}
        placeholder="Search coffee..."
        value={search}
        onChangeText={setSearch}
      />

   
      {filteredProducts.map((item) => (
        <View key={item.id} style={[styles.card, { backgroundColor: item.color }]}>
          <Text style={styles.productName}>{item.name}</Text>
          <Text>Price: {item.price}</Text>
          <Text>Delivery: {item.delivery}</Text>
          <Text>Stock: {item.stock}</Text>
          <Text>Volume: {item.volume}L</Text>

          <TouchableOpacity
            style={[
              styles.button,
              item.stock === 0 ? styles.buttonDisabled : null,
            ]}
            onPress={() => addToCart(item)}
            disabled={item.stock === 0}
          >
            <Text style={styles.buttonText}>
              {item.stock === 0 ? "Out of Stock" : "Add to Cart"}
            </Text>
          </TouchableOpacity>
        </View>
      ))}

   
      <Text style={styles.subtitle}>Featured Coffees</Text>
      <FlatList
        horizontal
        data={products.slice(0, 4)}
        keyExtractor={(item) => item.id.toString()}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16 }}
        renderItem={({ item }) => (
          <View style={[styles.hCard, { backgroundColor: item.color }]}>
            <Text style={styles.productName}>{item.name}</Text>
            <Text>{item.price}</Text>
            <Text>Stock: {item.stock}</Text>
          </View>
        )}
      />

  
      <Text style={styles.subtitle}>🛒 Cart Items</Text>
      {cart.length === 0 ? (
        <Text style={{ textAlign: "center", fontStyle: "italic" }}>Cart is empty</Text>
      ) : (
        cart.map((item, index) => (
          <View key={index} style={styles.cartItem}>
            <Text>{item.name} - {item.volume}L</Text>
            <TouchableOpacity style={styles.removeButton} onPress={() => removeFromCart(item)}>
              <Text style={{ color: "#fff" }}>Remove</Text>
            </TouchableOpacity>
          </View>
        ))
      )}

{cart.length > 0 && (
  <View style={styles.submitContainer}>
    <Text style={{ fontSize: 18 }}>
      Total Volume: {totalLiters.toFixed(2)}L
    </Text>
    <Text style={{ fontSize: 18 }}>
      Total Price: ${totalPrice.toFixed(2)}
    </Text>
    <TouchableOpacity
      style={styles.submitButton}
      onPress={() =>
        Alert.alert(
          "Order Submitted",
          `Total volume: ${totalLiters.toFixed(2)}L\nTotal price: $${totalPrice.toFixed(2)}`
        )
      }
    >
      <Text style={styles.buttonText}>Submit Order</Text>
    </TouchableOpacity>
  </View>
)}

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFF8F0", paddingTop: 40 },
  title: { fontSize: 26, fontWeight: "bold", textAlign: "center", marginBottom: 10 },
  search: {
    backgroundColor: "#fff",
    margin: 16,
    padding: 10,
    borderRadius: 8,
    borderColor: "#ccc",
    borderWidth: 1,
  },
  card: {
    margin: 12,
    padding: 16,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  hCard: {
    width: 180,
    marginRight: 12,
    padding: 14,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  productName: { fontSize: 18, fontWeight: "600", marginBottom: 6, color: "#333" },
  price: { fontSize: 16, marginBottom: 4 },
  delivery: { fontSize: 14, marginBottom: 4 },
  stock: { fontSize: 14, fontStyle: "italic", marginTop: 4 },
  button: {
    backgroundColor: "#6F4E37",
    paddingVertical: 10,
    borderRadius: 8,
    marginTop: 8,
  },
  buttonSmall: {
    backgroundColor: "#6F4E37",
    paddingVertical: 6,
    borderRadius: 8,
    marginTop: 8,
  },
  buttonDisabled: {
    backgroundColor: "#ccc",
  },
  buttonText: { color: "#fff", fontWeight: "bold", textAlign: "center" },
  subtitle: { fontSize: 20, fontWeight: "bold", marginLeft: 16, marginVertical: 10 },
  cartItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 6,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
  },
  removeButton: {
    backgroundColor: "#a52a2a",
    paddingHorizontal: 8,
    borderRadius: 6,
    justifyContent: "center",
  },
  submitContainer: {
    alignItems: "center",
    marginVertical: 20,
  },
  submitButton: {
    backgroundColor: "#6F4E37",
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
    marginTop: 10,
  },
});
