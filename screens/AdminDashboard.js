import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function AdminDashboard() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Admin Dashboard</Text>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Service Hours Overview</Text>
        <Text style={styles.cardText}>Total served: 12h
Pending review: 3
Resolved cases: 6</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  title: { fontSize: 18, fontWeight: "700", marginBottom: 12 },
  card: { backgroundColor: "#fff", padding: 12, borderRadius: 8, borderWidth: 1, borderColor: "#E2E2E2" },
  cardTitle: { fontWeight: "700", marginBottom: 6 },
  cardText: { color: "#666" },
});
