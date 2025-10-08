// screens/SettingsScreen.js
import React from "react";
import { SafeAreaView, View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function SettingsScreen() {
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        {/* Topo */}
        <View style={styles.header}>
          <Text style={styles.hIcon}>≡</Text>
          <Text style={styles.title}>Configurações</Text>
          <View style={{ width: 24 }} />
        </View>

        {/* Perfil */}
        <View style={styles.profileWrap}>
          <View style={styles.avatar}>
            <Text style={styles.avatarIcon}>👤</Text>
          </View>
          <Text style={styles.name}>Ana Almeida</Text>
        </View>

        {/* Opções */}
        <TouchableOpacity style={styles.option}>
          <Text style={styles.optionText}>Preferências de Alertas</Text>
          <Text style={styles.chev}>{'>'}</Text>
        </TouchableOpacity>

        {/* Card Limites Críticos */}
        <TouchableOpacity style={[styles.option, styles.card]}>
          <View style={{ flex: 1 }}>
            <Text style={styles.optionText}>Limites Críticos</Text>

            {/* barra de progresso */}
            <View style={styles.progressBg}>
              <View style={[styles.progressFill, { width: "60%" }]} />
            </View>
          </View>

          <Text style={styles.percent}>60%</Text>
          <Text style={styles.chev}>{'>'}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.option}>
          <Text style={styles.optionText}>Meu Perfil</Text>
          <Text style={styles.chev}>{'>'}</Text>
        </TouchableOpacity>

        <View style={{ height: 40 }} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#fff" },
  container: { flex: 1, backgroundColor: "#fff", paddingHorizontal: 18 },

  header: {
    marginTop: 40,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  hIcon: { fontSize: 22, marginRight: 10 },
  title: { fontSize: 22, fontWeight: "700" },

  profileWrap: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 25,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: "#000",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  avatarIcon: { fontSize: 28 },
  name: { fontSize: 18, fontWeight: "600" },

  option: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#f0f0f0",
    marginBottom: 12,
    padding: 14,
    borderRadius: 10,
  },
  card: {
    paddingVertical: 22, // maior altura
    paddingRight: 12,
  },
  optionText: { fontSize: 16, fontWeight: "600" },
  chev: { fontSize: 18, marginLeft: 8 },

  /* progress */
  progressBg: {
    width: "100%",
    height: 12, // barra um pouco maior
    backgroundColor: "#e6e6e6",
    borderRadius: 6,
    marginTop: 10,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#38b000",
    borderRadius: 6,
  },
  percent: { marginHorizontal: 10, fontSize: 15, fontWeight: "600" },
});
