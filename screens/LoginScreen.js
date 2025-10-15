import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

export default function LoginScreen() {
  const navigation = useNavigation();

  const [formData, setFormData] = useState({ email: "", senha: "" });
  const [error, setError] = useState("");

  const handleChange = (name, value) =>
    setFormData({ ...formData, [name]: value });

  const handleSubmit = async () => {
    try {
      const usuariosJSON = await AsyncStorage.getItem("usuarios");
      const usuarios = usuariosJSON ? JSON.parse(usuariosJSON) : [];

      const usuarioEncontrado = usuarios.find(
        (u) =>
          u.email.toLowerCase() === formData.email.trim().toLowerCase() &&
          u.senha === formData.senha
      );

      if (usuarioEncontrado) {
        await AsyncStorage.setItem(
          "usuarioLogado",
          JSON.stringify(usuarioEncontrado)
        );
        navigation.replace("MainTabs");
      } else {
        setError("Email ou senha incorretos");
      }
    } catch (err) {
      Alert.alert("Erro", "Ocorreu um problema ao fazer login.");
      console.log(err);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.textMuted}>Seja bem-vindo!</Text>
        <Text style={styles.title}>Entrar</Text>

        {error ? <Text style={styles.error}>{error}</Text> : null}

        <TextInput
          style={styles.input}
          placeholder="Email"
          keyboardType="email-address"
          autoCapitalize="none"
          value={formData.email}
          onChangeText={(value) => handleChange("email", value)}
        />

        <TextInput
          style={styles.input}
          placeholder="Senha"
          secureTextEntry
          value={formData.senha}
          onChangeText={(value) => handleChange("senha", value)}
        />

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>

        <Text style={styles.footerText}>
          Não possui conta?{" "}
          <Text
            style={styles.link}
            onPress={() => navigation.navigate("Cadastro")}
          >
            Cadastrar
          </Text>
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  card: {
    width: "100%",
    backgroundColor: "#fff",
    padding: 25,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#4CB917",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  textMuted: {
    color: "#888",
    fontSize: 14,
    marginBottom: 4,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
  },
  error: {
    color: "red",
    textAlign: "center",
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 12,
  },
  button: {
    backgroundColor: "#4CB917",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 5,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "500",
    fontSize: 16,
  },
  footerText: {
    textAlign: "center",
    fontSize: 14,
    marginTop: 15,
  },
  link: {
    fontWeight: "bold",
    color: "#4CB917",
  },
});
