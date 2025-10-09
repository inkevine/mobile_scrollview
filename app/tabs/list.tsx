import React, { useState } from "react";
import { View, Text, Image, StyleSheet, FlatList, ActivityIndicator,Linking } from "react-native";

const coffeeMenu = [
  { id: "1", name: "Espresso", image: "https://upload.wikimedia.org/wikipedia/commons/4/45/A_small_cup_of_coffee.JPG" },
  ];

export default function SettingsScreen() {
  const [loadingIds, setLoadingIds] = useState<string[]>([]);

  const renderItem = ({ item }: { item: typeof coffeeMenu[0] }) => {
    const isLoading = loadingIds.includes(item.id);

    return (
      <View style={styles.card}>
        <Text style={styles.title}>{item.name}</Text>
        <View style={styles.imageContainer}>
          {isLoading && <ActivityIndicator size="large" color="#6F4E37" style={styles.loader} />}
          <Image
            source={{ uri: item.image }}
            style={styles.image}
            onLoadStart={() => setLoadingIds((prev) => [...prev, item.id])}
            onLoadEnd={() =>
              setLoadingIds((prev) => prev.filter((id) => id !== item.id))
            }
          />
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={coffeeMenu}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ padding: 16 }}
      />
      
      <Text>
      View other options:{' '}
      <Text
        onPress={() => Linking.openURL('https://www.costacoffee.in/menu/drinks')}
      >
        https://www.costacoffee.in/menu/drinks
      </Text>
    </Text>

    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFF8F0" },
  card: {
    marginBottom: 20,
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 12,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  imageContainer: {
    width: 300,
    height: 200,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "#eee",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  loader: {
    position: "absolute",
  },
});
