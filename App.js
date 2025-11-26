import React, { useState } from "react";
import { View, Text, TouchableOpacity, Modal } from "react-native";
import {
  NavigationContainer,
  useNavigation,
  CommonActions,
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { GestureHandlerRootView } from "react-native-gesture-handler";

// Ícones das Tabs
import { Home as HomeIcon, User, Settings, Bell } from "lucide-react-native";

// Telas
import HomeScreen from "./screens/HomeScreen";
import ProfileScreen from "./screens/ProfileScreen";
import SettingsScreen from "./screens/SettingsScreen";
import WelcomeScreen from "./screens/WelcomeScreen";
import LoginScreen from "./screens/LoginScreen";
import CadastroScreen from "./screens/CadastroScreen";

// Telas adicionais
import AdministracaoScreen from "./screens/AdministracaoScreen";
import AlertasScreen from "./screens/AlertasScreen";
import DashboardScreen from "./screens/DashboardScreen";
import SairScreen from "./screens/SairScreen";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

/* -------------------------------------
   HEADER PERSONALIZADO
-------------------------------------- */
function CustomHeader({ title }) {
  const navigation = useNavigation();
  const [menuVisible, setMenuVisible] = useState(false);

  // Simulação de alertas
  const alertas = [
    { id: 1, texto: "Temperatura alta na garagem" },
    { id: 2, texto: "Movimento detectado no quintal" },
  ];

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
        {/* Menu lateral */}
        <TouchableOpacity
          onPress={() => setMenuVisible(true)}
          style={{ position: "absolute", left: 15 }}
        >
          <Text style={{ fontSize: 30 }}>☰</Text>
        </TouchableOpacity>

        {/* Título */}
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>{title}</Text>

        {/* Notificações */}
        <TouchableOpacity
          onPress={() => navigation.navigate("Alertas")}
          style={{ position: "absolute", right: 15 }}
        >
          <View>
            <Bell size={26} color="#4CB917" />

            {alertas.length > 0 && (
              <View
                style={{
                  position: "absolute",
                  top: -2,
                  right: -2,
                  width: 10,
                  height: 10,
                  backgroundColor: "red",
                  borderRadius: 10,
                }}
              />
            )}
          </View>
        </TouchableOpacity>
      </View>

      {/* MENU LATERAL */}
      <Modal visible={menuVisible} transparent animationType="fade">
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => setMenuVisible(false)}
          style={{
            flex: 1,
            backgroundColor: "rgba(0,0,0,0.2)",
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
                navigation.navigate("MainTabs", { screen: "Home" });
              }}
            >
              <Text style={{ fontSize: 18 }}>Home</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                setMenuVisible(false);
                navigation.navigate("MainTabs", { screen: "Perfil" });
              }}
            >
              <Text style={{ fontSize: 18 }}>Meu Perfil</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                setMenuVisible(false);
                navigation.navigate("MainTabs", { screen: "Configurações" });
              }}
            >
              <Text style={{ fontSize: 18 }}>Configurações</Text>
            </TouchableOpacity>

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

/* -------------------------------------
   WRAPPER COM HEADER
-------------------------------------- */
function ScreenWithHeader({ title, children }) {
  return (
    <>
      <CustomHeader title={title} />
      {children}
    </>
  );
}

/* -------------------------------------
   TABS COM ÍCONES
-------------------------------------- */
function Tabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#4CB917",
        tabBarInactiveTintColor: "#777",
        tabBarStyle: {
          height: 60,
          paddingBottom: 5,
        },
      }}
    >
      {/* HOME */}
      <Tab.Screen
        name="Home"
        children={() => (
          <ScreenWithHeader title="Home">
            <HomeScreen />
          </ScreenWithHeader>
        )}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size }) => (
            <HomeIcon color={color} size={size} />
          ),
        }}
      />

      {/* PERFIL */}
      <Tab.Screen
        name="Perfil"
        children={() => (
          <ScreenWithHeader title="Meu Perfil">
            <ProfileScreen />
          </ScreenWithHeader>
        )}
        options={{
          tabBarLabel: "Perfil",
          tabBarIcon: ({ color, size }) => (
            <User color={color} size={size} />
          ),
        }}
      />

      {/* CONFIGURAÇÕES */}
      <Tab.Screen
        name="Configurações"
        children={() => (
          <ScreenWithHeader title="Configurações">
            <SettingsScreen />
          </ScreenWithHeader>
        )}
        options={{
          tabBarLabel: "Config",
          tabBarIcon: ({ color, size }) => (
            <Settings color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

/* -------------------------------------
   STACK FINAL
-------------------------------------- */
export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Welcome" component={WelcomeScreen} />
          <Stack.Screen name="Cadastro" component={CadastroScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />

          <Stack.Screen name="MainTabs" component={Tabs} />

          <Stack.Screen
            name="Administracao"
            children={() => (
              <ScreenWithHeader title="Administração">
                <AdministracaoScreen />
              </ScreenWithHeader>
            )}
          />

          <Stack.Screen
            name="Alertas"
            children={() => (
              <ScreenWithHeader title="Alertas">
                <AlertasScreen />
              </ScreenWithHeader>
            )}
          />

          <Stack.Screen
            name="Dashboard"
            children={() => (
              <ScreenWithHeader title="Dashboard">
                <DashboardScreen />
              </ScreenWithHeader>
            )}
          />

          <Stack.Screen
            name="Sair"
            children={() => (
              <ScreenWithHeader title="Sair">
                <SairScreen />
              </ScreenWithHeader>
            )}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}
