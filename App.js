// Importa o criador de abas (Bottom Tabs) do React Navigation
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// Importa o container principal de navegação do React Navigation
import { NavigationContainer } from "@react-navigation/native";

// Importa o enableScreens do react-native-screens para melhorar performance
import { enableScreens } from "react-native-screens";

// Importa o GestureHandlerRootView
import { GestureHandlerRootView } from "react-native-gesture-handler";

// Importa Ionicons para os ícones da barra inferior
import { Ionicons } from "@expo/vector-icons";

// Importa as telas
import HomeScreen from "./screens/HomeScreen";
import ProfileScreen from "./screens/ProfileScreen";
import DashboardScreen from "./screens/DashboardScreen";
import AlertasScreen from "./screens/AlertasScreen";
import AdminAreaScreen from "./screens/AdminAreaScreen";

// Ativa otimizações de telas nativas
enableScreens();

// Cria o componente de navegação por abas (Tab Navigator)
const Tab = createBottomTabNavigator();

export default function App() {
  return (
    // É o provedor que gerencia o estado da navegação
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            headerShown: false, // Oculta o cabeçalho superior
            tabBarStyle: { backgroundColor: "#246816" }, // Fundo verde
            tabBarActiveTintColor: "#fff", // Ícone ativo branco
            tabBarInactiveTintColor: "#fff", // Ícone inativo branco também
            tabBarHideOnKeyboard: true,

            // Define os ícones de cada aba
            tabBarIcon: ({ color, size }) => {
              let iconName;

              switch (route.name) {
                case "Home":
                  iconName = "home-outline";
                  break;
                case "Perfil":
                  iconName = "person-outline";
                  break;
                case "Dashboard":
                  iconName = "stats-chart-outline";
                  break;
                case "Alertas":
                  iconName = "warning-outline";
                  break;
                case "Administração":
                  iconName = "location-outline";
                  break;
                default:
                  iconName = "ellipse-outline"; // fallback
              }

              return <Ionicons name={iconName} size={size} color={color} />;
            },
          })}
        >
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="Perfil" component={ProfileScreen} />
          <Tab.Screen name="Dashboard" component={DashboardScreen} />
          <Tab.Screen name="Alertas" component={AlertasScreen} />
          <Tab.Screen name="Administração" component={AdminAreaScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}
