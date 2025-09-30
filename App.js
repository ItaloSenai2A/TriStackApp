import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack"; // IMPORTANTE
import { Text } from "react-native";
import { enableScreens } from "react-native-screens";
import { GestureHandlerRootView } from "react-native-gesture-handler";


// Importa as telas
import HomeScreen from "./screens/HomeScreen";
import ProfileScreen from "./screens/ProfileScreen";
import SettingsScreen from "./screens/SettingsScreen";
import WelcomeScreen from "./screens/WelcomeScreen"; // NOVA

enableScreens();

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Tabs principais
function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#007AFF",
        tabBarInactiveTintColor: "#666",
        tabBarHideOnKeyboard: true,
        animation: "shift",
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Text style={{ fontSize: size * 0.8, color }}>🏠</Text>
          ),
        }}
      />

      <Tab.Screen
        name="Perfil"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Text style={{ fontSize: size * 0.8, color }}>👤</Text>
          ),
        }}
      />

      <Tab.Screen
        name="Configurações"
        component={SettingsScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Text style={{ fontSize: size * 0.8, color }}>⚙️</Text>
          ),
        }}
      />
    </Tab.Navigator>
  );
}

// Stack principal
export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {/* Tela inicial */}
          <Stack.Screen name="Welcome" component={WelcomeScreen} />
          {/* Tabs */}
          <Stack.Screen name="MainTabs" component={MainTabs} />
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}
