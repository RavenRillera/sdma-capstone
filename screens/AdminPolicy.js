import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

export default function AdminPolicy() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Policy Assistant</Text>
      <View style={styles.card}>
        <Text style={styles.cardText}>Ask the assistant about community service, violations, appeals, dress code, and more.</Text>
      </View>

      <Text style={styles.faqTitle}>Frequently Asked Questions</Text>
      <View style={styles.faqItem}><Text>How many community service hours do I need per violation?</Text></View>
      <View style={styles.faqItem}><Text>What happens if I don't complete my community service?</Text></View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  title: { fontSize: 18, fontWeight: "700", marginBottom: 12 },
  card: { backgroundColor: "#fff", padding: 12, borderRadius: 8, borderWidth: 1, borderColor: "#E2E2E2", marginBottom: 12 },
  cardText: { color: "#666" },
  faqTitle: { fontWeight: "700", marginTop: 8, marginBottom: 8 },
  faqItem: { backgroundColor: "#fff", padding: 12, borderRadius: 8, marginBottom: 8 },
});
