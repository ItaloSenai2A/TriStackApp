import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");

export default function WelcomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      {/* Texto no canto superior esquerdo */}
      <Text style={styles.welcome}>Olá, Usuário!</Text>

      {/* Logo centralizada */}
      <Image
        source={require("../assets/LogoTriStack.png")}
        style={styles.logo}
        resizeMode="contain"
      />

      {/* Fundo verde curvado */}
      <View style={styles.cardWrapper}>
        {/* Card branco ocupando toda a largura */}
        <View style={styles.card}>
          <Text style={styles.subTitle}>Bem-Vindo!</Text>
          <Text style={styles.description}>
            <Text style={{ fontWeight: "bold" }}>Mapa Vivo do Campo</Text>, o app
            que conecta tecnologia e agricultura inteligente.
          </Text>

          {/* Botão Criar Conta */}
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("Home")}
          >
            <View style={styles.iconCircle}>
              <Ionicons name="chevron-forward" size={20} color="#fff" />
            </View>
            <Text style={styles.buttonText}>Criar Conta</Text>
            <Text style={styles.arrows}>{">>>"}</Text>
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
    width: width * 0.85,
    height: height * 0.35,
    marginTop: 30,
    marginBottom: 10,
  },
  cardWrapper: {
    flex: 1,
    width: "100%",
    backgroundColor: "#67BC45",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    overflow: "hidden", // garante que o branco siga o arredondado
  },
  card: {
    flex: 1,
    width: "100%", // ocupa toda a lateral da tela
    backgroundColor: "#fff",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 25,
    paddingTop: 30,
  },
  subTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#67BC45",
    marginBottom: 10,
  },
  description: {
    fontSize: 15,
    textAlign: "center",
    marginBottom: 20,
    color: "#333",
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F1F8E9",
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
    marginBottom: 15,
    minWidth: 220,
    maxWidth: 260,
  },
  iconCircle: {
    width: 35,
    height: 35,
    borderRadius: 35 / 2,
    backgroundColor: "#67BC45",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  buttonText: {
    color: "#67BC45",
    fontSize: 18,
    fontWeight: "500",
    flex: 1,
    textAlign: "center",
  },
  arrows: {
    color: "#A5D6A7",
    fontSize: 18,
    marginLeft: 5,
  },
  loginText: {
    fontSize: 15,
    color: "#333",
  },
  loginLink: {
    color: "#67BC45",
    fontWeight: "bold",
  },
});
