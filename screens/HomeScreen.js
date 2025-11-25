import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import MapView, { Marker, Circle } from "react-native-maps";

export default function HomeScreen() {
  const dadosAmbientais = [
    { label: "Temperatura", valor: "28°C" },
    { label: "Umidade do Solo", valor: "80%" },
    { label: "Qualidade do Ar", valor: "65%" },
    { label: "Luz", valor: "70%" },
    { label: "Água", valor: "85%" },
    { label: "Vento", valor: "10 km/h" },
  ];

  const alertas = [
    {
      lat: -3.4653,
      lng: -62.2159,
      tipo: "Queimada",
      descricao: "Fogo detectado próximo ao rio",
    },
    {
      lat: -2.1631,
      lng: -55.1266,
      tipo: "Enchente",
      descricao: "Inundação em área ribeirinha",
    },
    {
      lat: -4.944,
      lng: -60.0,
      tipo: "Praga",
      descricao: "Infestação de pragas em floresta",
    },
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.titulo}>Visão Geral</Text>

      <View style={styles.cardsContainer}>
        {dadosAmbientais.map((item, index) => (
          <View key={index} style={styles.card}>
            <Text style={styles.cardLabel}>{item.label}</Text>
            <Text style={styles.cardValor}>{item.valor}</Text>
          </View>
        ))}
      </View>

      <Text style={styles.subtitulo}>Mapa do Território - Alertas Ambientais</Text>
      <View style={styles.mapaContainer}>
        <MapView
          style={styles.mapa}
          initialRegion={{
            latitude: -3.4653,
            longitude: -62.2159,
            latitudeDelta: 10,
            longitudeDelta: 10,
          }}
          mapType="standard"
        >
          {alertas.map((alerta, idx) => (
            <React.Fragment key={idx}>
              <Marker
                coordinate={{ latitude: alerta.lat, longitude: alerta.lng }}
                title={alerta.tipo}
                description={alerta.descricao}
              />
              <Circle
                center={{ latitude: alerta.lat, longitude: alerta.lng }}
                radius={20000}
                strokeColor={
                  alerta.tipo === "Queimada"
                    ? "red"
                    : alerta.tipo === "Enchente"
                    ? "blue"
                    : "orange"
                }
                fillColor={
                  alerta.tipo === "Queimada"
                    ? "rgba(255,0,0,0.2)"
                    : alerta.tipo === "Enchente"
                    ? "rgba(0,0,255,0.2)"
                    : "rgba(255,165,0,0.2)"
                }
              />
            </React.Fragment>
          ))}
        </MapView>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    padding: 20,
    paddingTop: 60, // 🔹 aumenta o espaçamento superior
    backgroundColor: "#fff",
    flexGrow: 1,
    justifyContent: "flex-start",
  },
  titulo: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 25,
    textAlign: "center",
    color: "#000",
  },
  subtitulo: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 15,
    marginTop: 20,
    textAlign: "center",
  },
  cardsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginBottom: 35,
  },
  card: {
    backgroundColor: "#f1f8e9",
    borderWidth: 1,
    borderColor: "#4CAF50",
    borderRadius: 12,
    padding: 12,
    margin: 6,
    width: "28%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 3,
    elevation: 2,
  },
  cardLabel: {
    fontSize: 13,
    fontWeight: "600",
    color: "#333",
  },
  cardValor: {
    fontSize: 14,
    fontWeight: "700",
    color: "#000",
  },
  mapaContainer: {
    width: "100%",
    height: 400,
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 60,
  },
  mapa: {
    flex: 1,
  },
});
