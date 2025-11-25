import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import {
  VictoryLine,
  VictoryChart,
  VictoryAxis,
  VictoryBar,
  VictoryPie,
} from "victory-native";

export default function DashboardScreen() {
  const temperatureData = [
    { x: "1m", y: 22 },
    { x: "2m", y: 24 },
    { x: "3m", y: 26 },
    { x: "4m", y: 25 },
    { x: "5m", y: 23 },
    { x: "6m", y: 27 },
  ];

  const soilMoistureData = [
    { x: "1m", y: 40 },
    { x: "2m", y: 45 },
    { x: "3m", y: 50 },
    { x: "4m", y: 48 },
    { x: "5m", y: 52 },
    { x: "6m", y: 55 },
  ];

  const lightIntensityData = [
    { x: "1h", blue: 300, green: 250 },
    { x: "2h", blue: 320, green: 270 },
    { x: "3h", blue: 310, green: 260 },
    { x: "4h", blue: 330, green: 280 },
    { x: "5h", blue: 340, green: 290 },
    { x: "6h", blue: 350, green: 300 },
  ];

  const airQualityColors = [
    { x: "Boa", y: 33.3 },
    { x: "Moderada", y: 33.3 },
    { x: "Ruim", y: 33.3 },
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Painel Ambiental 🌿</Text>

      <View style={styles.row}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Nível de Água</Text>
          <Text style={[styles.cardValue, { color: "#007bff" }]}>30%</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Vento</Text>
          <Text style={[styles.cardValue, { color: "#fd7e14" }]}>60 km/h</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Qualidade do Ar</Text>
          <VictoryPie
            data={airQualityColors}
            width={160}
            height={160}
            innerRadius={40}
            colorScale={["#00C49F", "#FFBB28", "#FF4C4C"]}
            startAngle={180}
            endAngle={0}
          />
        </View>
      </View>

      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>Temperatura (°C)</Text>

        <VictoryChart>
          <VictoryAxis dependentAxis />
          <VictoryAxis />
          <VictoryLine
            data={temperatureData}
            interpolation="monotoneX"
            style={{ data: { stroke: "#dc3545", strokeWidth: 3 } }}
          />
        </VictoryChart>
      </View>

      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>Umidade do Solo (%)</Text>

        <VictoryChart>
          <VictoryAxis dependentAxis />
          <VictoryAxis />
          <VictoryLine
            data={soilMoistureData}
            interpolation="monotoneX"
            style={{ data: { stroke: "#198754", strokeWidth: 3 } }}
          />
        </VictoryChart>
      </View>

      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>Intensidade da Luz</Text>

        <VictoryChart>
          <VictoryAxis />
          <VictoryAxis dependentAxis />
          <VictoryBar
            data={lightIntensityData}
            x="x"
            y="blue"
            barWidth={12}
            style={{ data: { fill: "#0d6efd" } }}
          />
          <VictoryBar
            data={lightIntensityData}
            x="x"
            y="green"
            barWidth={12}
            style={{ data: { fill: "#20c997" } }}
          />
        </VictoryChart>
      </View>
    </ScrollView>
  );
}

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
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  card: {
    backgroundColor: "#fff",
    width: "32%",
    height: 180,
    borderRadius: 12,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    elevation: 4,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: "600",
    marginBottom: 8,
  },
  cardValue: {
    fontSize: 36,
    fontWeight: "bold",
  },
  chartContainer: {
    marginTop: 20,
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 10,
    elevation: 4,
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 10,
  },
});
