import React from "react";
import { View, Text, ScrollView, StyleSheet, Dimensions } from "react-native";
import { LineChart, BarChart } from "react-native-chart-kit";

const screenWidth = Dimensions.get("window").width;

export default function DashboardScreen() {
  const temperatureData = {
    labels: ["1m", "2m", "3m", "4m", "5m", "6m"],
    datasets: [{ data: [22, 24, 26, 25, 23, 27] }]
  };

  const soilMoistureData = {
    labels: ["1m", "2m", "3m", "4m", "5m", "6m"],
    datasets: [{ data: [40, 45, 50, 48, 52, 55] }]
  };

  const lightIntensityData = {
    labels: ["1h", "2h", "3h", "4h", "5h", "6h"],
    datasets: [
      { data: [300, 320, 310, 330, 340, 350], color: () => "#0d6efd" },
      { data: [250, 270, 260, 280, 290, 300], color: () => "#20c997" }
    ]
  };

  const chartWidth = screenWidth - 60; // ajuste para não vazar do card

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Painel Ambiental 🌿</Text>

      <View style={styles.row}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Nível de Água</Text>
          <Text style={[styles.cardValue, { color: "#007bff", fontSize: 28 }]}>30%</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Vento</Text>
          <Text style={[styles.cardValue, { color: "#fd7e14", fontSize: 28 }]}>60 km/h</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Qualidade do Ar</Text>
          <Text style={[styles.cardValue, { color: "#28a745", fontSize: 28 }]}>Boa</Text>
        </View>
      </View>

      <View style={styles.chartBox}>
        <Text style={styles.chartTitle}>Temperatura (°C)</Text>
        <LineChart
          data={temperatureData}
          width={chartWidth}
          height={220}
          yAxisSuffix="°"
          chartConfig={chartConfig}
          bezier
          style={styles.chart}
        />
      </View>

      <View style={styles.chartBox}>
        <Text style={styles.chartTitle}>Umidade do Solo (%)</Text>
        <LineChart
          data={soilMoistureData}
          width={chartWidth}
          height={220}
          yAxisSuffix="%"
          chartConfig={chartConfigGreen}
          bezier
          style={styles.chart}
        />
      </View>

      <View style={styles.chartBox}>
        <Text style={styles.chartTitle}>Intensidade da Luz</Text>
        <BarChart
          data={lightIntensityData}
          width={chartWidth}
          height={260}
          chartConfig={chartConfig}
          fromZero
          style={styles.chart}
          showValuesOnTopOfBars
        />
      </View>
    </ScrollView>
  );
}

const chartConfig = {
  backgroundGradientFrom: "#ffffff",
  backgroundGradientTo: "#ffffff",
  decimalPlaces: 1,
  color: () => "#dc3545",
  labelColor: () => "#333",
};

const chartConfigGreen = {
  backgroundGradientFrom: "#ffffff",
  backgroundGradientTo: "#ffffff",
  decimalPlaces: 1,
  color: () => "#198754",
  labelColor: () => "#333",
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 100,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
  card: {
    backgroundColor: "#fff",
    width: "32%",
    height: 180,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: "600",
    marginBottom: 8,
  },
  cardValue: {
    fontSize: 36, // padrão, mas ajustado inline nos cards para 28
    fontWeight: "bold",
  },
  chartBox: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 10,
    marginTop: 20,
    elevation: 4,
    alignItems: "center",
  },
  chartTitle: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
  },
  chart: {
    borderRadius: 12,
    alignSelf: "center",
  },
});
