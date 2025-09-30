import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function AlertasScreen() {
  return (
    <SafeAreaView style={styles.container}>
      {/* Título */}
      <Text style={styles.title}>Alertas</Text>

      {/* Lista de notificações */}
      <View style={styles.list}>
        {/* Notificação Crítica */}
        <TouchableOpacity style={styles.card}>
          <Ionicons name="alert-circle" size={28} color="red" />
          <Text style={styles.cardText}>Notificação crítica</Text>
          <Ionicons name="chevron-forward" size={22} color="#000" />
        </TouchableOpacity>

        {/* Notificação Moderada */}
        <TouchableOpacity style={styles.card}>
          <Ionicons name="alert" size={28} color="#D4C200" />
          <Text style={styles.cardText}>Notificação moderada</Text>
          <Ionicons name="chevron-forward" size={22} color="#000" />
        </TouchableOpacity>

        {/* Notificação Informativa */}
        <TouchableOpacity style={styles.card}>
          <Ionicons name="information-circle" size={28} color="#4DA6FF" />
          <Text style={styles.cardText}>Notificação informativa</Text>
          <Ionicons name="chevron-forward" size={22} color="#000" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 16,
  },
  list: {
    marginTop: 8,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f2f2f2",
    padding: 14,
    borderRadius: 8,
    marginBottom: 12,
  },
  cardText: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    fontWeight: "500",
  },
});
