import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  Alert,
  Dimensions,
} from "react-native";
import Toast from "react-native-toast-message";

const { width, height } = Dimensions.get("window");

const parametrosIniciais = [
  { nome: "Luz", valor: 200, limite: 250, unidade: "lux", alerta: "" },
  { nome: "Vento", valor: 25, limite: 20, unidade: "km/h", alerta: "" },
  { nome: "Solo", valor: 75, limite: 60, unidade: "%", alerta: "" },
  { nome: "Qualidade do Ar", valor: 120, limite: 100, unidade: "AQI", alerta: "" },
  { nome: "Chuva", valor: 90, limite: 80, unidade: "mm", alerta: "" },
  { nome: "Umidade", valor: 65, limite: 60, unidade: "%", alerta: "" },
  { nome: "Água", valor: 75, limite: 50, unidade: "%", alerta: "" },
  { nome: "Temperatura", valor: 35, limite: 30, unidade: "°C", alerta: "" },
];

const gerarAlerta = (nome, valor, limite) => {
  if (valor <= limite) return "";
  switch (nome) {
    case "Água":
      return valor > limite + 20 ? "⚠️ Enchente!" : "⚠️ Nível elevado!";
    case "Vento":
      return "⚠️ Tempestade!";
    case "Solo":
      return "⚠️ Solo degradado!";
    case "Temperatura":
      return "⚠️ Temperatura crítica!";
    case "Chuva":
      return "⚠️ Chuvas intensas!";
    case "Umidade":
      return "⚠️ Seca!";
    case "Qualidade do Ar":
      return "⚠️ Poluição elevada!";
    default:
      return "⚠️ Limite ultrapassado!";
  }
};

export default function LimitesCriticos({ isDarkMode }) {
  const [parametros, setParametros] = useState(parametrosIniciais);

  useEffect(() => {
    const novos = parametros.map((p) => {
      const alerta = gerarAlerta(p.nome, p.valor, p.limite);
      if (alerta && alerta !== p.alerta) {
        Toast.show({
          type: "error",
          text1: `${p.nome}`,
          text2: alerta,
        });
      }
      return { ...p, alerta };
    });
    setParametros(novos);
  }, []);

  const atualizarLimite = (index, novoLimite) => {
    const copia = [...parametros];
    copia[index].limite = Number(novoLimite);
    const alerta = gerarAlerta(copia[index].nome, copia[index].valor, copia[index].limite);
    copia[index].alerta = alerta;
    setParametros(copia);

    if (alerta) {
      Toast.show({
        type: "error",
        text1: `${copia[index].nome}`,
        text2: alerta,
      });
    }
  };

  const bgContainer = isDarkMode ? "#121d18" : "#f4f6f3";
  const colorText = isDarkMode ? "#fff" : "#1b3a2f";
  const bgBox = isDarkMode ? "#1b3a2f" : "#fff";

  return (
    <View style={[styles.container, { backgroundColor: bgContainer }]}>
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        {parametros.map((p, index) => (
          <CardParametro
            key={p.nome}
            p={p}
            colorText={colorText}
            bgBox={bgBox}
            atualizarLimite={atualizarLimite}
            index={index}
          />
        ))}
      </ScrollView>
      <Toast />
    </View>
  );
}

function CardParametro({ p, colorText, bgBox, atualizarLimite, index }) {
  const ultrapassou = p.valor > p.limite;

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: bgBox,
          borderColor: ultrapassou ? "#FF4C4C" : "#4CAF50",
        },
      ]}
    >
      <Text style={[styles.nome, { color: colorText }]}>{p.nome}</Text>

      <View style={styles.barraContainer}>
        <View
          style={[
            styles.barra,
            {
              width: `${Math.min((p.valor / p.limite) * 100, 100)}%`,
              backgroundColor: ultrapassou ? "#FF4C4C" : "#4CAF50",
            },
          ]}
        />
      </View>

      <Text style={[styles.texto, { color: colorText }]}>
        Atual: {p.valor} {p.unidade} | Limite: {p.limite} {p.unidade}
      </Text>

      {ultrapassou && <Text style={styles.alerta}>{p.alerta}</Text>}

      <TextInput
        value={String(p.limite)}
        keyboardType="numeric"
        onChangeText={(valor) => atualizarLimite(index, valor)}
        style={styles.input}
        placeholder="Defina limite máximo"
        placeholderTextColor="#888"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center", // centraliza verticalmente
  },
  scroll: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 30,
    paddingBottom: 60,
  },
  card: {
    borderWidth: 2,
    borderRadius: 15,
    padding: 37,
    width: width * 0.85, // responsivo à tela
    marginBottom: 25,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  nome: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 10,
  },
  barraContainer: {
    width: "100%",
    height: 10,
    backgroundColor: "#ccc",
    borderRadius: 6,
    overflow: "hidden",
    marginBottom: 10,
  },
  barra: {
    height: "100%",
    borderRadius: 6,
  },
  texto: {
    fontSize: 14,
    fontWeight: "500",
  },
  alerta: {
    color: "#FF4C4C",
    fontWeight: "700",
    marginTop: 6,
  },
  input: {
    marginTop: 12,
    width: "90%",
    padding: 8,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#888",
    textAlign: "center",
    color: "#000",
    backgroundColor: "#f9f9f9",
  },
});
