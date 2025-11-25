import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  Modal,
  StyleSheet,
  Alert,
  ScrollView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";

export default function MeuPerfil({ isDarkMode }) {
  const [modalAberto, setModalAberto] = useState(false);
  const [nomeUsuario, setNomeUsuario] = useState("Usuário");
  const [email, setEmail] = useState("");
  const [fotoPerfil, setFotoPerfil] = useState(null);

  useEffect(() => {
    carregarPerfil();
  }, []);

  async function carregarPerfil() {
    try {
      const nome = await AsyncStorage.getItem("nomeUsuario");
      const emailSalvo = await AsyncStorage.getItem("email");
      const foto = await AsyncStorage.getItem("fotoPerfil");
      if (nome) setNomeUsuario(nome);
      if (emailSalvo) setEmail(emailSalvo);
      if (foto) setFotoPerfil(foto);
    } catch (error) {
      console.log("Erro ao carregar perfil:", error);
    }
  }

  async function salvarPerfil() {
    try {
      await AsyncStorage.setItem("nomeUsuario", nomeUsuario);
      await AsyncStorage.setItem("email", email);
      if (fotoPerfil) await AsyncStorage.setItem("fotoPerfil", fotoPerfil);
      Alert.alert("Sucesso", "Perfil atualizado com sucesso!");
      setModalAberto(false);
    } catch (error) {
      Alert.alert("Erro", "Não foi possível salvar o perfil.");
    }
  }

  const selecionarFoto = async () => {
    // Solicita permissão
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Permissão para acessar a galeria é necessária!");
      return;
    }

    // Abre a galeria
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      setFotoPerfil(uri);
    }
  };

  const bgContainer = isDarkMode ? "#1b3a2f" : "#f4f6f3";
  const bgCard = isDarkMode ? "#fff" : "#fff";
  const borderCard = isDarkMode ? "#205c31" : "#4CAF50";
  const colorText = isDarkMode ? "#000" : "#2e7d32";

  return (
    <ScrollView contentContainerStyle={[styles.container, { backgroundColor: bgContainer }]}>
      <View style={[styles.card, { borderColor: borderCard, backgroundColor: bgCard }]}>
        <View style={styles.perfil}>
          <View
            style={[
              styles.avatar,
              { backgroundColor: isDarkMode ? "#1b3a2f" : "#e8f5e9", borderColor: borderCard },
            ]}
          >
            <Image
              source={
                fotoPerfil
                  ? { uri: fotoPerfil }
                  : require("../assets/perfilanonimo.webp")
              }
              style={styles.avatarImg}
            />
          </View>
          <Text style={[styles.nome, { color: colorText }]}>{nomeUsuario}</Text>
          <Text style={{ fontSize: 14, color: "#777" }}>
            {email || "Sem e-mail cadastrado"}
          </Text>
        </View>

        <TouchableOpacity
          style={[styles.botaoEditar, { backgroundColor: "#4CB917" }]}
          onPress={() => setModalAberto(true)}
        >
          <Text style={{ color: "#fff", fontWeight: "bold" }}>Editar Perfil</Text>
        </TouchableOpacity>
      </View>

      {/* Modal de edição */}
      <Modal transparent visible={modalAberto} animationType="fade">
        <View style={styles.overlay}>
          <View style={[styles.modal, { backgroundColor: bgCard, borderColor: borderCard }]}>
            <TouchableOpacity style={styles.fecharBtn} onPress={() => setModalAberto(false)}>
              <Text style={{ fontSize: 20, color: "#4CAF50" }}>✕</Text>
            </TouchableOpacity>

            <Text style={[styles.tituloModal, { color: colorText }]}>Editar Perfil</Text>

            <TextInput
              placeholder="Nome"
              value={nomeUsuario}
              onChangeText={setNomeUsuario}
              style={[styles.input, { borderColor: borderCard, color: colorText }]}
              placeholderTextColor="#888"
            />

            <TextInput
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              style={[styles.input, { borderColor: borderCard, color: colorText }]}
              placeholderTextColor="#888"
            />

            <TouchableOpacity onPress={selecionarFoto} style={styles.botaoFoto}>
              <Text style={{ color: "#4CAF50", fontWeight: "bold" }}>Selecionar Foto</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={salvarPerfil}
              style={[styles.botaoSalvar, { backgroundColor: "#608759" }]}
            >
              <Text style={{ color: "#fff", fontWeight: "bold" }}>Salvar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  card: {
    borderWidth: 1,
    borderRadius: 25,
    width: 340,
    padding: 25,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  perfil: {
    alignItems: "center",
    marginBottom: 20,
  },
  avatar: {
    borderRadius: 50,
    width: 90,
    height: 90,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  avatarImg: {
    width: "100%",
    height: "100%",
    borderRadius: 50,
  },
  nome: {
    fontSize: 20,
    fontWeight: "600",
    marginTop: 10,
  },
  botaoEditar: {
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 10,
    marginTop: 10,
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.7)",
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    borderWidth: 1,
    borderRadius: 20,
    padding: 25,
    width: "85%",
    alignItems: "center",
  },
  fecharBtn: {
    position: "absolute",
    top: 15,
    right: 15,
  },
  tituloModal: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginVertical: 8,
  },
  botaoFoto: {
    marginTop: 10,
  },
  botaoSalvar: {
    marginTop: 15,
    padding: 10,
    borderRadius: 10,
    width: "100%",
    alignItems: "center",
  },
});
