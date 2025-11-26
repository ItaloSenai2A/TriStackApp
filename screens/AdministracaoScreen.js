import React, { useState } from "react";
import { View, Text, ScrollView, TextInput, TouchableOpacity, Modal, StyleSheet, Alert, Dimensions } from "react-native";
import MapView, { Circle, Marker } from "react-native-maps";
import { BarChart } from "react-native-chart-kit";
import { FontAwesome } from "@expo/vector-icons";

const screenWidth = Dimensions.get("window").width - 40;

// Simulação de áreas críticas
const areasCriticas = [
  { id: 1, lat: -3.4653, lng: -62.2159, tipo: "Queimada", descricao: "Fogo detectado próximo ao rio" },
  { id: 2, lat: -3.4753, lng: -62.2259, tipo: "Inundação", descricao: "Alagamento na comunidade" },
  { id: 3, lat: -3.4553, lng: -62.2059, tipo: "Deslizamento", descricao: "Risco de deslizamento de terra" }
];

export default function Administracao({ isDarkMode = false }) {
  const [modalAberto, setModalAberto] = useState(false);
  const [modalTipo, setModalTipo] = useState("");
  const [modalConteudo, setModalConteudo] = useState({ titulo: "", descricao: "" });

  const [novaOcorrencia, setNovaOcorrencia] = useState("");
  const [intervencao, setIntervencao] = useState("");
  const [checklist, setChecklist] = useState([]);
  const [voluntarios, setVoluntarios] = useState([]);
  const [novoVoluntario, setNovoVoluntario] = useState("");
  const [mensagemVoluntarios, setMensagemVoluntarios] = useState("");
  const [historico, setHistorico] = useState([]);

  // Tema
  const darkBg = "#1b3a2f";
  const tema = {
    fundo: isDarkMode ? darkBg : "#f4f6f3",
    text: isDarkMode ? "#fff" : "#000",
    inputBg: isDarkMode ? "#224236" : "#fff",
    modalBg: isDarkMode ? "#153026" : "#fff",
    cores: {
      emergencia: isDarkMode ? "#d46a6a" : "#f8d7da",
      comunicacao: isDarkMode ? "#8bcf9b" : "#d4edda",
      prevencao: isDarkMode ? "#82c1db" : "#d1ecf1",
      admin: isDarkMode ? "#ffd17f" : "#fff3cd"
    },
    modalButtonBg: isDarkMode ? "#256d49" : "#3498db",
    dangerButtonBg: isDarkMode ? "#c0392b" : "#e74c3c"
  };

  // Funções
  const abrirModal = (tipo, titulo, descricao) => {
    setModalTipo(tipo);
    setModalConteudo({ titulo, descricao });
    setModalAberto(true);
  };

  const fecharModal = () => setModalAberto(false);

  const registrarOcorrencia = () => {
    if (!novaOcorrencia.trim()) { Alert.alert("Digite os detalhes da ocorrência"); return; }
    setHistorico(prev => [...prev, { tipo: "Ocorrência", descricao: novaOcorrencia, data: new Date() }]);
    setNovaOcorrencia("");
    fecharModal();
  };

  const agendarIntervencao = () => {
    if (!intervencao.trim()) { Alert.alert("Digite os detalhes da intervenção"); return; }
    setHistorico(prev => [...prev, { tipo: "Intervenção", descricao: intervencao, data: new Date() }]);
    setIntervencao("");
    fecharModal();
  };

  const alternarChecklist = (item) => {
    setChecklist(prev => (prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]));
  };

  const adicionarVoluntario = () => {
    if (novoVoluntario.trim()) {
      setVoluntarios(prev => [...prev, novoVoluntario.trim()]);
      setNovoVoluntario("");
    }
  };

  const removerVoluntario = (nome) => setVoluntarios(prev => prev.filter(v => v !== nome));

  const enviarMensagemVoluntarios = () => {
    if (!mensagemVoluntarios.trim()) { Alert.alert("Digite a mensagem"); return; }
    Alert.alert(`Mensagem enviada para ${voluntarios.length} voluntários: "${mensagemVoluntarios}"`);
    setMensagemVoluntarios("");
  };

  const acionarAutoridade = (tipo) => Alert.alert(`${tipo} acionada!`);
  const orientacaoSeguranca = (mensagem) => Alert.alert("Orientação de segurança", mensagem);

  const dadosGrafico = {
    labels: ["2022", "2023", "2024", "2025"],
    datasets: [
      { data: [60, 80, 50, 40], color: (opacity = 1) => `rgba(49, 130, 255, ${opacity})` },
      { data: [45, 35, 25, 55], color: (opacity = 1) => `rgba(184, 121, 43, ${opacity})` }
    ]
  };

  const graficoConfig = {
    backgroundGradientFrom: tema.fundo,
    backgroundGradientTo: tema.fundo,
    color: (opacity = 1) => tema.text,
    barPercentage: 0.5,
    decimalPlaces: 0,
    labelColor: (opacity = 1) => tema.text
  };

  // ======================================================================
  // 🟩 INTERVENÇÕES AGRUPADAS EM BLOCOS DE 3 + ÁREA
  // ======================================================================

  const cards = [
    // 🔶 Administração e Planejamento
    { tipo: "titulo", titulo: "Administração e Planejamento" },
    { tipo: "ocorrencia", titulo: "Registrar nova ocorrência", icone: "file", cor: tema.cores.admin },
    { tipo: "intervencao", titulo: "Agendar intervenção preventiva", icone: "calendar", cor: tema.cores.admin },
    { tipo: "checklist", titulo: "Checklist de ações aplicadas", icone: "check", cor: tema.cores.admin },

    // 🟦 Comunicação e Apoio
    { tipo: "titulo", titulo: "Comunicação e Apoio" },
    { tipo: "voluntarios", titulo: "Gerenciar voluntários", icone: "users", cor: tema.cores.comunicacao },
    { tipo: "comunidade", titulo: "Notificar comunidade", icone: "bell", cor: tema.cores.comunicacao },
    { tipo: "seguranca", titulo: "Orientações de segurança", icone: "check", cor: tema.cores.comunicacao },

    // 🟪 Monitoramento e Prevenção
    { tipo: "titulo", titulo: "Monitoramento e Prevenção" },
    { tipo: "mapa", titulo: "Mapa de áreas críticas", icone: "map", cor: tema.cores.prevencao },
    { tipo: "historico", titulo: "Histórico de ocorrências", icone: "file", cor: tema.cores.prevencao },
    { tipo: "sensores", titulo: "Verificar sensores ambientais", icone: "bell", cor: tema.cores.prevencao },

    // 🟥 Ações Emergenciais
    { tipo: "titulo", titulo: "Ações Emergenciais" },
    { tipo: "autoridades", titulo: "Acionar autoridades", icone: "bell", cor: tema.cores.emergencia },
    { tipo: "defesaCivil", titulo: "Acionar Defesa Civil", icone: "fire", cor: tema.cores.emergencia },
    { tipo: "bombeiros", titulo: "Chamar Bombeiros", icone: "fire", cor: tema.cores.emergencia },
  ];

  // ======================================================================

  return (
    <ScrollView style={{ flex: 1, backgroundColor: tema.fundo, padding: 20 }}>
      <Text style={[styles.title, { color: tema.text }]}>Administração e Planejamento</Text>

      <Text style={[styles.subtitle, { color: tema.text }]}>Desafios enfrentados</Text>
      <BarChart
        data={{
          labels: dadosGrafico.labels,
          datasets: dadosGrafico.datasets.map(ds => ({ data: ds.data, color: ds.color }))
        }}
        width={screenWidth}
        height={220}
        fromZero
        chartConfig={graficoConfig}
        style={{ borderRadius: 12, marginBottom: 20 }}
      />

      {/* Cards */}
      {cards.map((card, index) =>
        card.tipo === "titulo" ? (
          <Text key={index} style={{ fontSize: 18, fontWeight: "700", marginTop: 20, marginBottom: 10, color: tema.text }}>
            {card.titulo}
          </Text>
        ) : (
          <TouchableOpacity
            key={card.tipo}
            style={[styles.card, { backgroundColor: card.cor }]}
            onPress={() => abrirModal(card.tipo, card.titulo, `Ação: ${card.titulo}`)}
          >
            <FontAwesome name={card.icone} size={20} color="#000" />
            <Text>{card.titulo}</Text>
          </TouchableOpacity>
        )
      )}

      {/* Modal */}
      <Modal visible={modalAberto} animationType="slide">
        <ScrollView contentContainerStyle={[styles.modalContent, { backgroundColor: tema.modalBg }]}>
          <Text style={[styles.modalTitle, { color: tema.text }]}>{modalConteudo.titulo}</Text>
          <Text style={{ color: tema.text, marginBottom: 10 }}>{modalConteudo.descricao}</Text>

          {/* Conteúdos de cada modal */}
          {modalTipo === "ocorrencia" && (
            <>
              <TextInput placeholder="Detalhes da ocorrência" value={novaOcorrencia} onChangeText={setNovaOcorrencia} style={[styles.input, { backgroundColor: tema.inputBg, color: tema.text }]} />
              <TouchableOpacity style={[styles.modalButton, { backgroundColor: tema.modalButtonBg }]} onPress={registrarOcorrencia}>
                <Text style={{ color: "#fff" }}>Registrar</Text>
              </TouchableOpacity>
            </>
          )}

          {modalTipo === "intervencao" && (
            <>
              <TextInput placeholder="Detalhes da intervenção" value={intervencao} onChangeText={setIntervencao} style={[styles.input, { backgroundColor: tema.inputBg, color: tema.text }]} />
              <TouchableOpacity style={[styles.modalButton, { backgroundColor: tema.modalButtonBg }]} onPress={agendarIntervencao}>
                <Text style={{ color: "#fff" }}>Agendar</Text>
              </TouchableOpacity>
            </>
          )}

          {modalTipo === "checklist" && (
            <>
              {["Acionar Defesa Civil", "Chamar Bombeiros", "Notificar comunidade", "Voluntários mobilizados"].map(item => (
                <TouchableOpacity key={item} onPress={() => alternarChecklist(item)} style={{ marginVertical: 5 }}>
                  <Text style={{ color: checklist.includes(item) ? 'green' : tema.text }}>{checklist.includes(item) ? '✔ ' : '◻︎ '}{item}</Text>
                </TouchableOpacity>
              ))}
            </>
          )}

          {modalTipo === "voluntarios" && (
            <>
              {voluntarios.map((v, i) => (
                <View key={i} style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 5 }}>
                  <Text style={{ color: tema.text }}>{v}</Text>
                  <TouchableOpacity onPress={() => removerVoluntario(v)} style={{ backgroundColor: "#e74c3c", paddingHorizontal: 8, borderRadius: 5 }}>
                    <Text style={{ color: "#fff" }}>Remover</Text>
                  </TouchableOpacity>
                </View>
              ))}

              <TextInput placeholder="Nome do voluntário" value={novoVoluntario} onChangeText={setNovoVoluntario} style={[styles.input, { backgroundColor: tema.inputBg, color: tema.text }]} />
              <TouchableOpacity style={[styles.modalButton, { backgroundColor: tema.modalButtonBg }]} onPress={adicionarVoluntario}>
                <Text style={{ color: "#fff" }}>Adicionar</Text>
              </TouchableOpacity>

              {voluntarios.length > 0 && (
                <>
                  <TextInput placeholder="Mensagem para todos" value={mensagemVoluntarios} onChangeText={setMensagemVoluntarios} style={{ backgroundColor: tema.inputBg, color: tema.text, height: 80, borderRadius: 8, padding: 10, borderWidth: 1, borderColor: "#ccc", marginTop: 10 }} />
                  <TouchableOpacity style={[styles.modalButton, { backgroundColor: tema.modalButtonBg }]} onPress={enviarMensagemVoluntarios}>
                    <Text style={{ color: "#fff" }}>Enviar</Text>
                  </TouchableOpacity>
                </>
              )}
            </>
          )}

          {modalTipo === "autoridades" && (
            <>
              {["Prefeitura", "Polícia Militar", "Guarda Municipal"].map(aut => (
                <TouchableOpacity key={aut} style={[styles.modalButton, { backgroundColor: tema.modalButtonBg, marginTop: 5 }]} onPress={() => acionarAutoridade(aut)}>
                  <Text style={{ color: "#fff" }}>Acionar {aut}</Text>
                </TouchableOpacity>
              ))}
            </>
          )}

          {modalTipo === "defesaCivil" && (
            <TouchableOpacity style={[styles.modalButton, { backgroundColor: tema.modalButtonBg, marginTop: 5 }]} onPress={() => acionarAutoridade("Defesa Civil")}>
              <Text style={{ color: "#fff" }}>Acionar Defesa Civil</Text>
            </TouchableOpacity>
          )}

          {modalTipo === "bombeiros" && (
            <TouchableOpacity style={[styles.modalButton, { backgroundColor: tema.modalButtonBg, marginTop: 5 }]} onPress={() => acionarAutoridade("Bombeiros")}>
              <Text style={{ color: "#fff" }}>Chamar Bombeiros</Text>
            </TouchableOpacity>
          )}

          {modalTipo === "comunidade" && (
            <TouchableOpacity style={[styles.modalButton, { backgroundColor: tema.modalButtonBg, marginTop: 5 }]} onPress={() => acionarAutoridade("Comunidade")}>
              <Text style={{ color: "#fff" }}>Notificar comunidade</Text>
            </TouchableOpacity>
          )}

          {modalTipo === "seguranca" && (
            <>
              {["Evacuar área", "Usar máscara de proteção", "Evitar áreas alagadas"].map((msg, i) => (
                <TouchableOpacity key={i} style={[styles.modalButton, { backgroundColor: tema.modalButtonBg, marginTop: 5 }]} onPress={() => orientacaoSeguranca(msg)}>
                  <Text style={{ color: "#fff" }}>{msg}</Text>
                </TouchableOpacity>
              ))}
            </>
          )}

          {/* MAPA DE ÁREAS CRÍTICAS */}
          {modalTipo === "mapa" && (
            <View style={{ width: "100%", height: 400, marginTop: 10, overflow: "hidden" }}>
              <MapView
                style={{ flex: 1 }}
                initialRegion={{
                  latitude: -3.4653,
                  longitude: -62.2159,
                  latitudeDelta: 0.1,
                  longitudeDelta: 0.1
                }}
              >
                {areasCriticas.map(alerta => (
                  <Marker
                    key={alerta.id}
                    coordinate={{ latitude: alerta.lat, longitude: alerta.lng }}
                    title={alerta.tipo}
                    description={alerta.descricao}
                  />
                ))}
                {areasCriticas.map(alerta => (
                  <Circle
                    key={`circle-${alerta.id}`}
                    center={{ latitude: alerta.lat, longitude: alerta.lng }}
                    radius={20000}
                    strokeColor={
                      alerta.tipo === "Queimada"
                        ? "red"
                        : alerta.tipo === "Inundação"
                        ? "blue"
                        : "orange"
                    }
                    fillColor={
                      alerta.tipo === "Queimada"
                        ? "rgba(255,0,0,0.3)"
                        : alerta.tipo === "Inundação"
                        ? "rgba(0,0,255,0.3)"
                        : "rgba(255,165,0,0.3)"
                    }
                  />
                ))}
              </MapView>
            </View>
          )}

{modalTipo === "sensores" && (
  <>
    <Text style={{ color: tema.text, fontSize: 16, marginBottom: 10 }}>
      Leituras em tempo real dos sensores ambientais
    </Text>

    <View style={{ marginBottom: 10 }}>
      <Text style={{ color: tema.text }}>🌡 Temperatura: 29°C</Text>
      <Text style={{ color: tema.text }}>💧 Umidade: 72%</Text>
      <Text style={{ color: tema.text }}>🔥 Risco de incêndio: Moderado</Text>
      <Text style={{ color: tema.text }}>🌬 Qualidade do ar: Boa</Text>
    </View>

    <BarChart
      data={{
        labels: ["Temp", "Umid", "Fogo", "Ar"],
        datasets: [
          { data: [29, 72, 60, 85] }
        ]
      }}
      width={screenWidth - 40}
      height={220}
      fromZero
      chartConfig={{
        backgroundGradientFrom: tema.fundo,
        backgroundGradientTo: tema.fundo,
        decimalPlaces: 0,
        color: () => tema.text,
        labelColor: () => tema.text
      }}
      style={{ borderRadius: 12, marginTop: 10 }}
    />

    <TouchableOpacity
      style={[styles.modalButton, { backgroundColor: tema.modalButtonBg, marginTop: 20 }]}
      onPress={() => Alert.alert("Sensores atualizados!")}
    >
      <Text style={{ color: "#fff" }}>Atualizar leituras</Text>
    </TouchableOpacity>
  </>
)}

          {modalTipo === "historico" && (
            <>
              {historico.map((item, i) => (
                <View key={i} style={{ marginVertical: 5 }}>
                  <Text style={{ color: tema.text }}>{item.tipo}: {item.descricao} ({item.data.toLocaleString()})</Text>
                </View>
              ))}
            </>
          )}

          <TouchableOpacity style={[styles.modalButton, { backgroundColor: tema.dangerButtonBg, marginTop: 15 }]} onPress={fecharModal}>
            <Text style={{ color: "#fff" }}>Fechar</Text>
          </TouchableOpacity>
        </ScrollView>
      </Modal>

      <View style={{ height: 50 }} />
      
    </ScrollView>

    
  );
}

const styles = StyleSheet.create({
  title: { fontSize: 22, fontWeight: "700", marginBottom: 15 },
  subtitle: { fontSize: 18, fontWeight: "600", marginBottom: 10 },
  card: { flexDirection: "row", alignItems: "center", padding: 12, marginBottom: 10, borderRadius: 12, gap: 10 },
  modalContent: { padding: 20, borderRadius: 12, width: "100%" },
  modalTitle: { fontSize: 20, fontWeight: "700", marginBottom: 10 },
  modalButton: { padding: 10, borderRadius: 8, alignItems: "center", marginTop: 10 },
  input: { width: "100%", padding: 10, borderRadius: 8, borderWidth: 1, borderColor: "#ccc", marginBottom: 10 }
});
