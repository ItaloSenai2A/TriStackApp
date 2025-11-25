import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  ScrollView,
} from "react-native";

export default function Alertas({ isDarkMode }) {
  const alerts = [
    {
      id: 1,
      type: "critical",
      title: "Notificação crítica",
      desc: "Ação imediata necessária",
      alertTitle: "Alerta de incêndio",
      description:
        "Os sensores detectaram uma combinação de alta temperatura e baixa umidade no canavial, aumentando significativamente o risco de incêndio. A situação exige atenção imediata do produtor.",
      buttonText: "ENTENDIDO",
    },
    {
      id: 2,
      type: "moderate",
      title: "Notificação moderada",
      desc: "Verificar em breve",
      alertTitle: "Umidade baixa",
      description:
        "Os sensores indicaram uma leve diminuição na umidade. Não é uma emergência, mas precisa ser monitorado.",
      buttonText: "OK",
    },
    {
      id: 3,
      type: "info",
      title: "Notificação informativa",
      desc: "Somente para conhecimento",
      alertTitle: "Condições normais",
      description:
        "Os sensores indicam que tudo está dentro da normalidade.",
      buttonText: "Certo",
    },
  ];

  const COLORS = {
    critical: { border: "#E74C3C", iconBg: "#FCECEC" },
    moderate: { border: "#F1C40F", iconBg: "#FFF8E6" },
    info: { border: "#3498DB", iconBg: "#EAF4FF" },
  };

  const [selectedAlert, setSelectedAlert] = useState(null);

  return (
    <View
      style={[
        styles.app,
        { backgroundColor: isDarkMode ? "#1b3a2f" : "#f6f8fb" },
      ]}
    >
      <ScrollView contentContainerStyle={styles.list}>
        {alerts.map((a) => {
          const c = COLORS[a.type];

          return (
            <TouchableOpacity
              key={a.id}
              style={[
                styles.item,
                {
                  borderColor: isDarkMode ? "#fff" : c.border + "55",
                  backgroundColor: isDarkMode ? "#1b3a2f" : "#fff",
                },
              ]}
              onPress={() => setSelectedAlert(a)}
            >
              <View style={styles.itemLeft}>
                <View
                  style={[
                    styles.iconWrap,
                    { borderColor: c.border, backgroundColor: c.iconBg },
                  ]}
                >
                  <Text style={{ fontSize: 28 }}>⚠️</Text>
                </View>

                <View>
                  <Text
                    style={[
                      styles.itemTitle,
                      { color: isDarkMode ? "#fff" : "#0f172a" },
                    ]}
                  >
                    {a.title}
                  </Text>
                  <Text
                    style={[
                      styles.itemDesc,
                      { color: isDarkMode ? "#d1d5db" : "#6b7280" },
                    ]}
                  >
                    {a.desc}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* MODAL */}
      <Modal visible={!!selectedAlert} transparent animationType="fade">
        {selectedAlert && (
          <View style={styles.modalBackground}>
            <View
              style={[
                styles.modalCard,
                {
                  backgroundColor: isDarkMode ? "#246816" : "#fff",
                  borderColor: isDarkMode ? "#fff" : "#ddd",
                },
              ]}
            >
              <TouchableOpacity
                style={[
                  styles.closeBtn,
                  { backgroundColor: COLORS[selectedAlert.type].border },
                ]}
                onPress={() => setSelectedAlert(null)}
              >
                <Text style={styles.closeTxt}>✕</Text>
              </TouchableOpacity>

              <Text style={styles.modalTitle}>{selectedAlert.title}</Text>

              <View
                style={[
                  styles.alertHeader,
                  { backgroundColor: COLORS[selectedAlert.type].border },
                ]}
              >
                <Text style={styles.alertHeaderText}>
                  {selectedAlert.alertTitle}
                </Text>
              </View>

              <ScrollView
                style={[
                  styles.modalDescription,
                  { borderColor: COLORS[selectedAlert.type].border },
                ]}
              >
                <Text style={{ color: isDarkMode ? "#fff" : "#111" }}>
                  {selectedAlert.description}
                </Text>
              </ScrollView>

              <TouchableOpacity
                style={[
                  styles.modalButton,
                  { backgroundColor: COLORS[selectedAlert.type].border },
                ]}
                onPress={() => setSelectedAlert(null)}
              >
                <Text style={styles.modalButtonText}>
                  {selectedAlert.buttonText}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  app: {
    flex: 1,
    padding: 20,
  },

  list: {
    gap: 12,
    paddingBottom: 40,
  },

  item: {
    padding: 16,
    borderWidth: 1,
    borderRadius: 22,
  },

  itemLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },

  iconWrap: {
    width: 68,
    height: 68,
    borderRadius: 16,
    borderWidth: 3,
    justifyContent: "center",
    alignItems: "center",
  },

  itemTitle: {
    fontSize: 17,
    fontWeight: "700",
  },

  itemDesc: {
    fontSize: 13,
    marginTop: 4,
  },

  /* MODAL */
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },

  modalCard: {
    width: "90%",
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
  },

  closeBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "flex-end",
  },

  closeTxt: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },

  modalTitle: {
    textAlign: "center",
    fontWeight: "700",
    fontSize: 20,
    marginTop: 10,
  },

  alertHeader: {
    padding: 10,
    borderRadius: 6,
    marginTop: 16,
  },

  alertHeaderText: {
    textAlign: "center",
    color: "#fff",
    fontWeight: "700",
  },

  modalDescription: {
    borderWidth: 1,
    marginTop: 16,
    padding: 12,
    borderRadius: 6,
    maxHeight: 200,
  },

  modalButton: {
    marginTop: 20,
    padding: 12,
    borderRadius: 10,
  },

  modalButtonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "700",
  },
});
