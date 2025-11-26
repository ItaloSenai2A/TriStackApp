import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function Sair({ isDarkMode }) {
  const navigation = useNavigation();

  const handleLogout = () => {
    // limpa usuário no AsyncStorage
    // caso esteja usando:
    // await AsyncStorage.removeItem("usuarioLogado");

    console.log("Usuário saiu");
    navigation.replace("Login"); // equivalente ao navigate("/login")
  };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: isDarkMode ? "#0f2b1a" : "#f5f5f5" },
      ]}
    >
      <View style={styles.card}>
        <Text style={styles.title}>Sair</Text>

        <Text style={styles.subtitle}>Até logo!</Text>

        <TouchableOpacity style={styles.button} onPress={handleLogout}>
          <Text style={styles.buttonText}>Sair</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
          <Text style={styles.link}>
            Voltar para <Text style={styles.linkHighlight}>Home</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  card: {
    width: 360,
    backgroundColor: "#fff",
    padding: 24,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: "#4CB917",
    alignItems: "center",
    elevation: 10,
  },

  title: {
    fontSize: 32,
    fontWeight: "700",
    marginBottom: 20,
    color: "#000",
  },

  subtitle: {
    fontSize: 16,
    color: "#333",
    marginBottom: 20,
  },

  button: {
    width: "100%",
    backgroundColor: "#7ED957",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 10,
  },

  buttonText: {
    color: "#000",
    fontWeight: "600",
    fontSize: 16,
  },

  link: {
    fontSize: 14,
    color: "#000",
  },

  linkHighlight: {
    color: "#4CB917",
    fontWeight: "700",
  },
});
