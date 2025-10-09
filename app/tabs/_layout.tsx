import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function Layout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap = "home";

          if (route.name === "home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "list") {
            iconName = focused ? "list" : "list-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#6F4E37",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tabs.Screen name="home" options={{ title: "Home" }} />
      <Tabs.Screen name="list" options={{ title: "Menu" }} />
    </Tabs>
  );
}
