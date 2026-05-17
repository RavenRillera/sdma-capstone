import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

export default function AdminStudents() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Violation Report</Text>

      <View style={styles.filterRow}>
        <Text style={styles.filter}>All</Text>
        <Text style={styles.filter}>Computer</Text>
        <Text style={styles.filter}>Engineering</Text>
        <Text style={styles.filter}>Business</Text>
      </View>

      <View style={styles.studentCard}>
        <Text style={styles.studentName}>John Mendoza</Text>
        <Text style={styles.studentMeta}>Computer Science • 3rd Year</Text>
      </View>

      <View style={styles.studentCard}>
        <Text style={styles.studentName}>Carlos Reyes</Text>
        <Text style={styles.studentMeta}>Business Administration • 2nd Year</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  title: { fontSize: 18, fontWeight: "700", marginBottom: 12 },
  filterRow: { flexDirection: "row", gap: 8, marginBottom: 12 },
  filter: { paddingHorizontal: 12, paddingVertical: 6, backgroundColor: "#fff", borderRadius: 20, borderWidth: 1, borderColor: "#DDD" },
  studentCard: { backgroundColor: "#fff", padding: 12, borderRadius: 10, marginBottom: 10, borderWidth: 1, borderColor: "#E4E4E4" },
  studentName: { fontWeight: "700" },
  studentMeta: { color: "#666", marginTop: 6 },
});
