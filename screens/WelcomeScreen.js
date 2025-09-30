import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

export default function WelcomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      {/* Texto no canto superior esquerdo */}
      <Text style={styles.welcome}>Olá, Usuário!</Text>

      {/* Logo centralizada e bem maior */}
      <Image
        source={require("../assets/LogoTriStack.png")}
        style={styles.logo}
        resizeMode="contain"
      />

      {/* Card branco ovalado com borda verde */}
      <View style={styles.cardWrapper}>
        <View style={styles.card}>
          <Text style={styles.subTitle}>Bem-Vindo!</Text>
          <Text style={styles.description}>
            <Text style={{ fontWeight: "bold" }}>Mapa Vivo do Campo</Text>, o app
            que conecta tecnologia e agricultura inteligente.
          </Text>

          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("Home")}
          >
            <Text style={styles.buttonText}>Criar Conta</Text>
          </TouchableOpacity>

          <Text style={styles.loginText}>
            Já possui cadastro?{" "}
            <Text
              style={styles.loginLink}
              onPress={() => navigation.navigate("Profile")}
            >
              Entrar
            </Text>
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#DDE5CC",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  welcome: {
    fontSize: 35,
    fontWeight: "bold",
    color: "#4CAF50",
    alignSelf: "flex-start",
    marginTop: 40,
    marginLeft: 20,
  },
  logo: {
    width: width * 0.9,
    height: height * 0.35,
    marginTop: 40,
    marginBottom: 20,
  },
  cardWrapper: {
    flex: 1,
    width: "100%",
    backgroundColor: "#4CAF50", // verde para ser o contorno
    borderTopLeftRadius: 180,
    borderTopRightRadius: 180,
    padding: 4, // espessura do contorno
  },
  card: {
    flex: 1,
    backgroundColor: "#fff", // fundo branco
    borderTopLeftRadius: 180,
    borderTopRightRadius: 180,
    alignItems: "center",
    justifyContent: "center",
    padding: 30,
  },
  subTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#4CAF50",
    marginBottom: 10,
    marginTop: 30,
  },
  description: {
    fontSize: 15,
    textAlign: "center",
    marginBottom: 20,
    color: "#333",
  },
  button: {
    backgroundColor: "#8BC34A",
    paddingVertical: 14,
    paddingHorizontal: 60,
    borderRadius: 30,
    elevation: 3,
    marginBottom: 15,
  },
  buttonText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "bold",
  },
  loginText: {
    fontSize: 15,
    color: "#333",
  },
  loginLink: {
    color: "#4CAF50",
    fontWeight: "bold",
  },
});
