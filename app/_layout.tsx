import { Drawer } from "expo-router/drawer";

export default function Layout() {
  return (
    <Drawer
      screenOptions={{
        headerShown: true,
        drawerActiveTintColor: "#6F4E37",
        drawerStyle: { backgroundColor: "#fffaf0" },
      }}
    >
      <Drawer.Screen
        name="tabs"
        options={{ title: "Main" }}
      />
      <Drawer.Screen
        name="settings"
        options={{ title: "Settings" }}
      />
    </Drawer>
  );
}
