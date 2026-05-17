import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Pressable,
  SafeAreaView,
} from "react-native";
import { AdminPalette } from "../constants/theme";
import adminStyles from "../styles/adminStyles";

const VIOLATION_TYPES = [
  "Tardiness",
  "Absence",
  "Dress Code",
  "Misconduct",
  "Academic Dishonesty",
  "Disrespect",
  "Property Damage",
  "Others",
];

const SEVERITY_LEVELS = [
  { label: "Minor", sub: "1-2 hours service" },
  { label: "Moderate", sub: "5-10 hours service" },
  { label: "Major", sub: "11-20 hours service" },
];

export default function AdminReport() {
  const [selectedStudent, setSelectedStudent] = useState("");
  const [selectedViolation, setSelectedViolation] = useState(null);
  const [selectedSeverity, setSelectedSeverity] = useState(null);
  const [dateOfIncident, setDateOfIncident] = useState("2026/05/13");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>

        {/* ── Blue Header ── */}
        <View style={[adminStyles.header, styles.header]}>
          <View style={[adminStyles.topRow, styles.topRow]}>
            <View>
              <View style={[adminStyles.titleRow, styles.titleRow]}>
                <Text style={[adminStyles.appName, styles.appName]}>UniDiscipline</Text>
                <View style={[adminStyles.adminBadge, styles.adminBadge]}>
                  <Text style={[adminStyles.adminBadgeText, styles.adminBadgeText]}>Administrator</Text>
                </View>
              </View>
              <Text style={[adminStyles.school, styles.school]}>New Era University</Text>
            </View>
            <View style={[adminStyles.profileCircle, styles.profileCircle]}>
              <Text style={[adminStyles.profileInitial, styles.profileInitial]}>RF</Text>
            </View>
          </View>

          <Text style={[adminStyles.pageTitle, styles.pageTitle]}>Violation Report</Text>
          <Text style={[adminStyles.pageSubtitle, styles.pageSubtitle]}>Submit a student violation to OSA system</Text>

          <View style={styles.reporterBadge}>
            <Text style={styles.reporterIcon}>👤</Text>
            <Text style={styles.reporterText}>Reporting as: Sir Ramon Flores</Text>
          </View>
        </View>

        {/* ── Form Body ── */}
        <View style={styles.body}>

          {/* Select Student */}
          <View style={styles.card}>
            <View style={styles.sectionLabelRow}>
              <Text style={styles.sectionIcon}>👤</Text>
              <Text style={styles.sectionLabel}>Select Student</Text>
              <Text style={styles.required}> *</Text>
            </View>
            <Pressable style={styles.dropdown}>
              <Text style={styles.dropdownText}>
                {selectedStudent || ""}
              </Text>
              <Text style={styles.dropdownChevron}>⌄</Text>
            </Pressable>
          </View>

          {/* Violation Type */}
          <View style={styles.card}>
            <View style={styles.sectionLabelRow}>
              <Text style={styles.sectionIcon}>⚠️</Text>
              <Text style={styles.sectionLabel}>Violation Type</Text>
              <Text style={styles.required}> *</Text>
            </View>
            <View style={styles.chipGrid}>
              {VIOLATION_TYPES.map((v) => (
                <Pressable
                  key={v}
                  style={[styles.chip, selectedViolation === v && styles.chipActive]}
                  onPress={() => setSelectedViolation(v)}
                >
                  <Text style={[styles.chipText, selectedViolation === v && styles.chipTextActive]}>
                    {v}
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>

          {/* Severity Level */}
          <View style={styles.card}>
            <View style={styles.sectionLabelRow}>
              <Text style={styles.sectionIcon}>🔴</Text>
              <Text style={styles.sectionLabel}>Severity Level</Text>
              <Text style={styles.required}> *</Text>
            </View>
            <View style={styles.severityRow}>
              {SEVERITY_LEVELS.map((s) => (
                <Pressable
                  key={s.label}
                  style={[styles.severityBox, selectedSeverity === s.label && styles.severityBoxActive]}
                  onPress={() => setSelectedSeverity(s.label)}
                >
                  <Text style={[styles.severityLabel, selectedSeverity === s.label && styles.severityLabelActive]}>
                    {s.label}
                  </Text>
                  <Text style={styles.severitySub}>{s.sub}</Text>
                </Pressable>
              ))}
            </View>
          </View>

          {/* Incident Details */}
          <View style={styles.card}>
            <View style={styles.sectionLabelRow}>
              <Text style={styles.sectionIcon}>📅</Text>
              <Text style={styles.sectionLabel}>Incident Details</Text>
            </View>

            <Text style={styles.inputLabel}>Date of Incident</Text>
            <View style={styles.inputRow}>
              <TextInput
                style={[styles.textInput, { flex: 1 }]}
                value={dateOfIncident}
                onChangeText={setDateOfIncident}
                placeholder="YYYY/MM/DD"
                placeholderTextColor="#9CA3AF"
              />
              <Text style={styles.calendarIcon}>📅</Text>
            </View>

            <Text style={[styles.inputLabel, { marginTop: 14 }]}>Location of Incident</Text>
            <TextInput
              style={styles.textInput}
              value={location}
              onChangeText={setLocation}
              placeholder="e.g Room 301, Engineering Building"
              placeholderTextColor="#9CA3AF"
            />
          </View>

          {/* Description */}
          <View style={styles.card}>
            <View style={styles.sectionLabelRow}>
              <Text style={styles.sectionIcon}>📄</Text>
              <Text style={styles.sectionLabel}>Description</Text>
              <Text style={styles.required}> *</Text>
            </View>
            <TextInput
              style={styles.textArea}
              value={description}
              onChangeText={setDescription}
              placeholder="Describe the incident in detail. Include the nature of violation, student behaviour, and any witnesses present..."
              placeholderTextColor="#9CA3AF"
              multiline
              numberOfLines={5}
              textAlignVertical="top"
            />
            <Text style={styles.charCount}>{description.length} characters</Text>
          </View>

          {/* Submit Button */}
          <Pressable style={styles.submitButton}>
            <Text style={styles.submitIcon}>✈</Text>
            <Text style={styles.submitText}>Submit Report to OSA</Text>
          </Pressable>

          {/* Disclaimer */}
          <View style={styles.disclaimer}>
            <Text style={styles.disclaimerIcon}>⚠️</Text>
            <Text style={styles.disclaimerText}>
              All submitted reports are reviewed by the Office of Student Affairs. Filing a false report is a disciplinary violation under Section 5.2 of the Student Handbook.
            </Text>
          </View>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F3F4F6" },
  scrollContent: { paddingBottom: 40 },

  /* Header */
  header: {
    paddingHorizontal: 18,
    paddingTop: 20,
    paddingBottom: 28,
  },
  topRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start" },
  titleRow: { flexDirection: "row", alignItems: "center", gap: 8 },
  appName: { color: "#fff", fontSize: 18, fontWeight: "800" },
  adminBadge: {
    backgroundColor: "#7C3AED",
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 10,
  },
  adminBadgeText: { color: "#fff", fontSize: 10, fontWeight: "700" },
  school: { color: "#C7D2FE", fontSize: 11, marginTop: 2 },
  profileCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: "rgba(255,255,255,0.2)",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.4)",
  },
  profileInitial: { color: "#fff", fontWeight: "700", fontSize: 14 },
  pageTitle: { color: "#fff", fontSize: 30, fontWeight: "800", marginTop: 22 },
  pageSubtitle: { color: "#C7D2FE", fontSize: 12, marginTop: 4 },
  reporterBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.15)",
    alignSelf: "flex-start",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginTop: 12,
    gap: 6,
  },
  reporterIcon: { fontSize: 12 },
  reporterText: { color: "#E0E7FF", fontSize: 12, fontWeight: "600" },

  /* Body */
  body: { paddingHorizontal: 16, paddingTop: 18, gap: 14 },

  /* Card */
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
  },
  sectionLabelRow: { flexDirection: "row", alignItems: "center", marginBottom: 12 },
  sectionIcon: { fontSize: 15, marginRight: 6 },
  sectionLabel: { fontSize: 15, fontWeight: "700", color: "#111827" },
  required: { fontSize: 15, color: "#EF4444", fontWeight: "700" },

  /* Dropdown */
  dropdown: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    backgroundColor: "#F9FAFB",
  },
  dropdownText: { color: "#6B7280", fontSize: 13 },
  dropdownChevron: { color: "#6B7280", fontSize: 18 },

  /* Violation Chips */
  chipGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  chip: {
    width: "47%",
    paddingVertical: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#D1D5DB",
    backgroundColor: "#F9FAFB",
    alignItems: "center",
  },
  chipActive: {
    backgroundColor: "#EEF2FF",
    borderColor: "#6366F1",
  },
  chipText: { color: "#374151", fontSize: 13, fontWeight: "600" },
  chipTextActive: { color: "#4F46E5", fontWeight: "700" },

  /* Severity */
  severityRow: { flexDirection: "row", gap: 10 },
  severityBox: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: "center",
    backgroundColor: "#F9FAFB",
  },
  severityBoxActive: {
    backgroundColor: "#EEF2FF",
    borderColor: "#6366F1",
  },
  severityLabel: { fontSize: 13, fontWeight: "700", color: "#374151" },
  severityLabelActive: { color: "#4F46E5" },
  severitySub: { fontSize: 10, color: "#9CA3AF", marginTop: 3, textAlign: "center" },

  /* Inputs */
  inputLabel: { fontSize: 12, fontWeight: "600", color: "#6B7280", marginBottom: 6 },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 10,
    paddingHorizontal: 12,
    backgroundColor: "#F9FAFB",
  },
  textInput: {
    paddingVertical: 11,
    fontSize: 13,
    color: "#111827",
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 10,
    paddingHorizontal: 12,
    backgroundColor: "#F9FAFB",
  },
  calendarIcon: { fontSize: 16, marginLeft: 8 },

  /* Text Area */
  textArea: {
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 10,
    padding: 12,
    fontSize: 13,
    color: "#111827",
    backgroundColor: "#F9FAFB",
    minHeight: 110,
  },
  charCount: { color: "#9CA3AF", fontSize: 10, marginTop: 6, textAlign: "right" },

  /* Submit */
  submitButton: {
    backgroundColor: "#1E3A8A",
    borderRadius: 14,
    paddingVertical: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    marginTop: 4,
  },
  submitIcon: { color: "#fff", fontSize: 16 },
  submitText: { color: "#fff", fontSize: 15, fontWeight: "700" },

  /* Disclaimer */
  disclaimer: {
    backgroundColor: "#FFFBEB",
    borderRadius: 12,
    padding: 14,
    flexDirection: "row",
    gap: 10,
    borderWidth: 1,
    borderColor: "#FDE68A",
    marginTop: 4,
  },
  disclaimerIcon: { fontSize: 14 },
  disclaimerText: { flex: 1, color: "#92400E", fontSize: 11, lineHeight: 16 },
});