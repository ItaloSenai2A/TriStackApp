import React, { useState } from "react";
import { View, Text, TouchableOpacity, Modal } from "react-native";
import {
  NavigationContainer,
  useNavigation,
  useRoute,
  CommonActions,
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { GestureHandlerRootView } from "react-native-gesture-handler";

// Telas
import HomeScreen from "./screens/HomeScreen";
import ProfileScreen from "./screens/ProfileScreen";
import SettingsScreen from "./screens/SettingsScreen";
import WelcomeScreen from "./screens/WelcomeScreen";
import LoginScreen from "./screens/LoginScreen";
import CadastroScreen from "./screens/CadastroScreen";

// Telas novas
import AdministracaoScreen from "./screens/AdministracaoScreen";
import AlertasScreen from "./screens/AlertasScreen";
import DashboardScreen from "./screens/DashboardScreen";
import SairScreen from "./screens/SairScreen";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

/* -------------------------------
   HEADER PERSONALIZADO
-------------------------------- */
function CustomHeader() {
  const navigation = useNavigation();
  const route = useRoute();
  const [menuVisible, setMenuVisible] = useState(false);

  return (
    <>
      <View
        style={{
          height: 70,
          backgroundColor: "#fff",
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: 15,
          paddingTop: 20,
          borderBottomWidth: 1,
          borderBottomColor: "#ddd",
          justifyContent: "center",
        }}
      >
        <TouchableOpacity
          onPress={() => setMenuVisible(true)}
          style={{ position: "absolute", left: 15, padding: 5 }}
        >
          <Text style={{ fontSize: 30, color: "#000" }}>☰</Text>
        </TouchableOpacity>

        <Text style={{ fontSize: 20, fontWeight: "bold" }}>
          {route.name}
        </Text>
      </View>

      <Modal
        visible={menuVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setMenuVisible(false)}
      >
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => setMenuVisible(false)}
          style={{
            flex: 1,
            backgroundColor: "rgba(0,0,0,0.2)",
            justifyContent: "flex-start",
          }}
        >
          <View
            style={{
              backgroundColor: "#fff",
              width: 250,
              padding: 20,
              borderBottomRightRadius: 12,
              gap: 20,
            }}
          >
            <TouchableOpacity
              onPress={() => {
                setMenuVisible(false);
                navigation.navigate("Administracao");
              }}
            >
              <Text style={{ fontSize: 18 }}>Administração</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                setMenuVisible(false);
                navigation.navigate("Alertas");
              }}
            >
              <Text style={{ fontSize: 18 }}>Alertas</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                setMenuVisible(false);
                navigation.navigate("Dashboard");
              }}
            >
              <Text style={{ fontSize: 18 }}>Dashboard</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                setMenuVisible(false);
                navigation.dispatch(
                  CommonActions.reset({
                    index: 0,
                    routes: [{ name: "Welcome" }],
                  })
                );
              }}
            >
              <Text style={{ fontSize: 18, color: "red" }}>Sair</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </>
  );
}

/* -------------------------------
   WRAPPER PARA TELAS
-------------------------------- */
function ScreenWithHeader({ children }) {
  return (
    <>
      <CustomHeader />
      {children}
    </>
  );
}

/* -------------------------------
   TABS
-------------------------------- */
function Tabs() {
  return (
    <ScreenWithHeader>
      <Tab.Navigator screenOptions={{ headerShown: false }}>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Perfil" component={ProfileScreen} />
        <Tab.Screen name="Configurações" component={SettingsScreen} />
      </Tab.Navigator>
    </ScreenWithHeader>
  );
}

/* -------------------------------
   STACK PRINCIPAL
-------------------------------- */
export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Welcome" component={WelcomeScreen} />
          <Stack.Screen name="Cadastro" component={CadastroScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />

          <Stack.Screen
            name="Administracao"
            children={() => (
              <ScreenWithHeader>
                <AdministracaoScreen />
              </ScreenWithHeader>
            )}
          />

          <Stack.Screen
            name="Alertas"
            children={() => (
              <ScreenWithHeader>
                <AlertasScreen />
              </ScreenWithHeader>
            )}
          />

          <Stack.Screen
            name="Dashboard"
            children={() => (
              <ScreenWithHeader>
                <DashboardScreen />
              </ScreenWithHeader>
            )}
          />

          <Stack.Screen
            name="Sair"
            children={() => (
              <ScreenWithHeader>
                <SairScreen />
              </ScreenWithHeader>
            )}
          />

          <Stack.Screen name="MainTabs" component={Tabs} />
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}
