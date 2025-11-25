import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Dimensions } from "react-native";
import MapView, { Marker, Polygon } from "react-native-maps";
import { Feather } from "@expo/vector-icons";
import { BarChart } from "react-native-chart-kit";

export default function AdministracaoScreen() {
  const [search, setSearch] = useState("");
  const [soilPH, setSoilPH] = useState("");
  const [nutrients, setNutrients] = useState("");

  const screenWidth = Dimensions.get("window").width - 30;

  const region = {
    latitude: -22.2966,
    longitude: -48.5570,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  };

  const polygonCoords = [
    { latitude: -22.2969, longitude: -48.5575 },
    { latitude: -22.2967, longitude: -48.5565 },
    { latitude: -22.2974, longitude: -48.5562 },
    { latitude: -22.2976, longitude: -48.5573 },
  ];

  const chartData = {
    labels: ["Jan", "Fev", "Mar", "Abr"],
    datasets: [
      {
        data: [20, 24, 18, 28],
      },
    ],
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Dashboard Agrícola 🌱</Text>

      {/* BARRA DE PESQUISA */}
      <View style={styles.searchContainer}>
        <Feather name="search" size={20} color="#777" />
        <TextInput
          placeholder="Buscar área..."
          value={search}
          onChangeText={setSearch}
          style={styles.searchInput}
        />
      </View>

      {/* MAPA */}
      <MapView style={styles.map} initialRegion={region}>
        <Marker coordinate={region} title="Minha Área" />
        <Polygon
          coordinates={polygonCoords}
          strokeColor="#67BC45"
          fillColor="rgba(103,188,69,0.3)"
          strokeWidth={2}
        />
      </MapView>

      {/* CARDS */}
      <View style={styles.cardContainer}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>pH do Solo</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            placeholder="Ex: 6.5"
            value={soilPH}
            onChangeText={setSoilPH}
          />
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Nutrientes do Solo</Text>
          <TextInput
            style={styles.input}
            placeholder="Ex: Nitrogênio alto"
            value={nutrients}
            onChangeText={setNutrients}
          />
        </View>
      </View>

      {/* GRÁFICO COMPATÍVEL COM EXPO */}
      <Text style={styles.chartTitle}>Medições Mensais</Text>
      <BarChart
        data={chartData}
        width={screenWidth}
        height={220}
        yAxisLabel=""
        chartConfig={{
          backgroundColor: "#fff",
          backgroundGradientFrom: "#f0f0f0",
          backgroundGradientTo: "#e8e8e8",
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(103, 188, 69, ${opacity})`,
          labelColor: () => "#333",
        }}
        style={styles.chart}
      />

      {/* BOTÃO */}
      <TouchableOpacity style={styles.actionButton}>
        <Text style={styles.actionButtonText}>Salvar Dados</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 15 },
  title: { fontSize: 26, fontWeight: "bold", marginBottom: 15, textAlign: "center" },

  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#eee",
    paddingHorizontal: 10,
    borderRadius: 8,
    marginBottom: 15,
    height: 45,
  },
  searchInput: { marginLeft: 10, fontSize: 16, flex: 1 },

  map: {
    height: 250,
    borderRadius: 12,
    marginBottom: 20,
  },

  cardContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },

  card: {
    backgroundColor: "#fff",
    padding: 15,
    width: "48%",
    borderRadius: 12,
    elevation: 4,
  },

  cardTitle: { fontSize: 16, fontWeight: "600", marginBottom: 8 },

  input: {
    backgroundColor: "#f5f5f5",
    padding: 10,
    borderRadius: 8,
    fontSize: 16,
  },

  chartTitle: { fontSize: 18, fontWeight: "600", textAlign: "center", marginBottom: 10 },

  chart: {
    borderRadius: 12,
    marginBottom: 20,
    alignSelf: "center",
  },

  actionButton: {
    backgroundColor: "#67BC45",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 40,
  },

  actionButtonText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
});
