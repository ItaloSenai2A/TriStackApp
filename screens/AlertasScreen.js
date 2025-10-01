import { SafeAreaView } from "react-native-safe-area-context";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  Pressable,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";

export default function AlertasScreen() {
  const [modalVisible, setModalVisible] = useState(null); // null = nenhum aberto

  return (
    <SafeAreaView style={styles.container}>
      {/* Título */}
      <Text style={styles.title}>Alertas</Text>

      {/* Lista de notificações */}
      <View style={styles.list}>
        {/* Notificação Crítica */}
        <TouchableOpacity
          style={styles.card}
          onPress={() => setModalVisible("critico")}
        >
          <Ionicons name="alert-circle" size={28} color="red" />
          <Text style={styles.cardText}>Notificação Crítica</Text>
          <Ionicons name="chevron-forward" size={22} color="#000" />
        </TouchableOpacity>

        {/* Notificação Moderada */}
        <TouchableOpacity
          style={styles.card}
          onPress={() => setModalVisible("moderado")}
        >
          <Ionicons name="alert" size={28} color="#D4C200" />
          <Text style={styles.cardText}>Notificação Moderada</Text>
          <Ionicons name="chevron-forward" size={22} color="#000" />
        </TouchableOpacity>

        {/* Notificação Informativa */}
        <TouchableOpacity
          style={styles.card}
          onPress={() => setModalVisible("informativo")}
        >
          <Ionicons name="information-circle" size={28} color="#4DA6FF" />
          <Text style={styles.cardText}>Notificação Informativa</Text>
          <Ionicons name="chevron-forward" size={22} color="#000" />
        </TouchableOpacity>
      </View>

      {/* MODAL - Notificação Crítica */}
      <Modal
        visible={modalVisible === "critico"}
        animationType="slide"
        transparent={true}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Ionicons name="alert" size={60} color="#FF0000" />
            <Text style={styles.modalTitle}>Notificação Crítica</Text>
            <View style={[styles.alertBox, { backgroundColor: "#FF0000" }]}>
              <Text style={styles.alertText}>Alerta de incêndio</Text>
            </View>
            <Text style={styles.modalSubtitle}>Condição de alto risco!</Text>
            <Text style={styles.modalText}>
              Os sensores detectaram uma combinação de alta temperatura e baixa
              umidade no canavial, aumentando significativamente o risco de
              incêndio. A situação exige atenção imediata do produtor, pois há
              chance de propagação rápida de fogo. Recomendamos verificar a área
              afetada e acionar medidas preventivas para evitar perdas e danos
              ambientais.
            </Text>

            <Pressable
              style={styles.okButton}
              onPress={() => setModalVisible(null)}
            >
              <Text style={styles.okText}>ENTENDIDO</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      {/* MODAL - Notificação Moderada */}
      <Modal
        visible={modalVisible === "moderado"}
        animationType="slide"
        transparent={true}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Ionicons name="alert" size={60} color="#B4BB53" />
            <Text style={styles.modalTitle}>Notificação Moderada</Text>
            <View style={[styles.alertBox, { backgroundColor: "#B4BB53" }]}>
              <Text style={styles.alertText}>Alerta de atenção</Text>
            </View>
            <Text style={styles.modalSubtitle}>Condição moderada</Text>
            <Text style={styles.modalText}>
              Foi detectada uma situação que requer atenção, mas não apresenta
              risco imediato. Recomendamos monitorar o ambiente e verificar
              possíveis mudanças nas condições.
            </Text>

            <Pressable
              style={styles.okButton}
              onPress={() => setModalVisible(null)}
            >
              <Text style={styles.okText}>ENTENDIDO</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      {/* MODAL - Notificação Informativa */}
      <Modal
        visible={modalVisible === "informativo"}
        animationType="slide"
        transparent={true}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Ionicons name="information-circle" size={60} color="#5392BB" />
            <Text style={styles.modalTitle}>Notificação Informativa</Text>
            <View style={[styles.alertBox, { backgroundColor: "#5392BB" }]}>
              <Text style={styles.alertText}>Informação</Text>
            </View>
            <Text style={styles.modalSubtitle}>Condição normal</Text>
            <Text style={styles.modalText}>
              Nenhum risco foi detectado. Continue acompanhando as informações
              do sistema para se manter atualizado sobre a situação.
            </Text>

            <Pressable
              style={styles.okButton}
              onPress={() => setModalVisible(null)}
            >
              <Text style={styles.okText}>ENTENDIDO</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 16 },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 16,
  },
  list: { marginTop: 8 },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f2f2f2",
    padding: 14,
    borderRadius: 8,
    marginBottom: 12,
  },
  cardText: { flex: 1, marginLeft: 10, fontSize: 16, fontWeight: "500" },

  // Estilo dos modais
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    width: "90%",
    alignItems: "center",
  },
  modalTitle: { fontSize: 20, fontWeight: "bold", marginVertical: 10 },
  alertBox: {
    backgroundColor: "red",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 6,
    marginVertical: 8,
  },
  alertText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
  modalSubtitle: { fontSize: 16, fontWeight: "bold", marginVertical: 8 },
  modalText: { fontSize: 14, textAlign: "center", marginBottom: 16 },
  okButton: {
    backgroundColor: "#4CB917",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 6,
  },
  okText: { color: "#fff", fontWeight: "bold" },
});
