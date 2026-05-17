import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";

export default function AdminScanner() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>QR Scanner</Text>

      <View style={styles.metricsRow}>
        <View style={styles.metric}><Text style={styles.metricNumber}>4</Text><Text style={styles.metricLabel}>Today's Scans</Text></View>
        <View style={styles.metric}><Text style={styles.metricNumber}>3</Text><Text style={styles.metricLabel}>Time Ins</Text></View>
        <View style={styles.metric}><Text style={styles.metricNumber}>1</Text><Text style={styles.metricLabel}>Timeouts</Text></View>
      </View>

      <View style={styles.scannerBox}>
        <Text style={{color:'#fff'}}>Camera preview placeholder</Text>
      </View>

      <Pressable style={styles.button}><Text style={styles.buttonText}>Generate QR Code</Text></Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  title: { fontSize: 18, fontWeight: "700", marginBottom: 12 },
  metricsRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 12 },
  metric: { backgroundColor: "#fff", padding: 10, borderRadius: 8, alignItems: "center", flex: 1, marginHorizontal: 4 },
  metricNumber: { fontWeight: "700", fontSize: 18 },
  metricLabel: { fontSize: 11, color: "#666" },
  scannerBox: { height: 220, backgroundColor: "#2E2A4A", borderRadius: 12, alignItems: "center", justifyContent: "center", marginBottom: 12 },
  button: { backgroundColor: "#4869D8", padding: 10, borderRadius: 8, alignItems: "center" },
  buttonText: { color: "#fff", fontWeight: "700" },
});
