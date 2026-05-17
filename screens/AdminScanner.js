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

export default function AdminScanner() {
  const [mode, setMode] = useState("form"); // "form" | "scanner"
  const [studentName, setStudentName] = useState("");
  const [studentNumber, setStudentNumber] = useState("");
  const [scanType, setScanType] = useState("Time In");
  const [location, setLocation] = useState("");

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>

        {/* ── Blue Header (shared) ── */}
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

          <Text style={[adminStyles.pageTitle, styles.pageTitle]}>QR Scanner</Text>
          <Text style={[adminStyles.pageSubtitle, styles.pageSubtitle]}>Log community service time-in &amp; time-out</Text>

          {/* Stat Boxes */}
          <View style={[adminStyles.statsRow, styles.statsRow]}>
            <StatBox value="4" label="Today's Scans" color="#5B8DEF" />
            <StatBox value="3" label="Time Ins" color="#10B981" />
            <StatBox value="1" label="Time outs" color="#F59E0B" />
          </View>
        </View>

        {/* ── Form Mode ── */}
        {mode === "form" ? (
          <View style={styles.body}>
            <View style={styles.card}>
              <Text style={styles.fieldLabel}>Enter Student Name:</Text>
              <TextInput
                style={styles.textInput}
                value={studentName}
                onChangeText={setStudentName}
                placeholder="Juan Dela Cruz"
                placeholderTextColor="#BDBDBD"
              />
            </View>

            <View style={styles.card}>
              <Text style={styles.fieldLabel}>Enter Student Number:</Text>
              <TextInput
                style={styles.textInput}
                value={studentNumber}
                onChangeText={setStudentNumber}
                placeholder="22-10203-535"
                placeholderTextColor="#BDBDBD"
              />
            </View>

            <View style={styles.card}>
              <Text style={styles.fieldLabel}>Scan Type:</Text>
              <View style={styles.scanTypeRow}>
                <Pressable
                  style={[styles.scanTypeBtn, scanType === "Time In" && styles.scanTypeBtnBlue]}
                  onPress={() => setScanType("Time In")}
                >
                  <Text style={[styles.scanTypeTxt, scanType === "Time In" && styles.scanTypeTxtBlue]}>
                    Time In
                  </Text>
                </Pressable>
                <Pressable
                  style={[styles.scanTypeBtn, scanType === "Time Out" && styles.scanTypeBtnGreen]}
                  onPress={() => setScanType("Time Out")}
                >
                  <Text style={[styles.scanTypeTxt, scanType === "Time Out" && styles.scanTypeTxtGreen]}>
                    Time In
                  </Text>
                </Pressable>
              </View>
            </View>

            <View style={styles.card}>
              <Text style={styles.fieldLabel}>Community Service Location:</Text>
              <TextInput
                style={styles.textInput}
                value={location}
                onChangeText={setLocation}
                placeholder="OSD Office"
                placeholderTextColor="#BDBDBD"
              />
            </View>

            <Pressable style={styles.generateBtn} onPress={() => setMode("scanner")}>
              <Text style={styles.generateIcon}>⚡</Text>
              <Text style={styles.generateText}>Generate QR Code</Text>
            </Pressable>
          </View>

        ) : (
          /* ── Scanner Mode ── */
          <View style={styles.body}>
            {/* Scanner Box */}
            <View style={styles.scannerBox}>
              {/* Corner brackets */}
              <View style={[styles.corner, styles.cornerTL]} />
              <View style={[styles.corner, styles.cornerTR]} />
              <View style={[styles.corner, styles.cornerBL]} />
              <View style={[styles.corner, styles.cornerBR]} />

              {/* QR placeholder icon */}
              <View style={styles.qrIconGrid}>
                <View style={styles.qrRow}>
                  <View style={styles.qrSquare} />
                  <View style={styles.qrSquare} />
                </View>
                <View style={styles.qrRow}>
                  <View style={styles.qrSquare} />
                  <View style={styles.qrSquare} />
                </View>
              </View>

              <Pressable style={styles.generateBtnOverlay} onPress={() => setMode("form")}>
                <Text style={styles.generateIcon}>⚡</Text>
                <Text style={styles.generateTextDark}>Generate QR Code</Text>
              </Pressable>
              <Text style={styles.cameraHint}>Tap the button to allow camera access</Text>
            </View>

            {/* Recent Violations */}
            <View style={styles.recentHeader}>
              <Text style={styles.recentIcon}>◷</Text>
              <Text style={styles.recentTitle}>Recent Violations</Text>
            </View>

            <ScanCard
              initials="PL"
              name="John Mendoza"
              location="Library"
              time="08:02AM"
              date="Apr 22, 2026"
              tag="Time In"
              tagColor="#5B8DEF"
            />
            <ScanCard
              initials="PL"
              name="Carlos Reyes"
              location="Campus Grounds"
              time="06:15AM"
              date="Apr 22, 2026"
              tag="Time In"
              tagColor="#5B8DEF"
            />
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

function StatBox({ value, label, color }) {
  return (
    <View style={[styles.statBox, { borderColor: color }]}>
      <Text style={[styles.statValue, { color }]}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

function ScanCard({ initials, name, location, time, date, tag, tagColor }) {
  return (
    <View style={styles.scanCard}>
      <View style={[styles.scanAvatar, { backgroundColor: "#5B8DEF" }]}>
        <Text style={styles.scanAvatarText}>{initials}</Text>
      </View>
      <View style={styles.scanInfo}>
        <Text style={styles.scanName}>{name}</Text>
        <Text style={styles.scanLocation}>📍 {location}</Text>
        <View style={styles.scanMeta}>
          <Text style={styles.scanMetaText}>🕐 {time}</Text>
          <Text style={styles.scanMetaText}>  📅 {date}</Text>
        </View>
      </View>
      <View style={[styles.scanTag, { backgroundColor: tagColor }]}>
        <Text style={styles.scanTagText}>{tag}</Text>
      </View>
    </View>
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
    backgroundColor: AdminPalette.badge,
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
    backgroundColor: AdminPalette.accent,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.4)",
  },
  profileInitial: { color: "#fff", fontWeight: "700", fontSize: 14 },
  pageTitle: { color: "#fff", fontSize: 30, fontWeight: "800", marginTop: 22 },
  pageSubtitle: { color: AdminPalette.muted, fontSize: 12, marginTop: 4 },

  statsRow: { flexDirection: "row", justifyContent: "space-between", marginTop: 20, gap: 10 },
  statBox: {
    flex: 1,
    borderWidth: 1.5,
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.1)",
  },
  statValue: { fontSize: 26, fontWeight: "800" },
  statLabel: { color: "#C7D2FE", fontSize: 11, marginTop: 4, textAlign: "center" },

  /* Body */
  body: { paddingHorizontal: 16, paddingTop: 18, gap: 12 },

  /* Form Cards */
  card: {
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    shadowColor: "#000",
    shadowOpacity: 0.03,
    shadowRadius: 4,
    elevation: 1,
  },
  fieldLabel: { fontSize: 14, fontWeight: "700", color: "#111827", marginBottom: 10 },
  textInput: {
    borderBottomWidth: 1.5,
    borderBottomColor: "#D1D5DB",
    paddingVertical: 6,
    fontSize: 13,
    color: "#374151",
  },

  /* Scan Type */
  scanTypeRow: { flexDirection: "row", gap: 12 },
  scanTypeBtn: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: "#D1D5DB",
    alignItems: "center",
    backgroundColor: "#F9FAFB",
  },
  scanTypeBtnBlue: { backgroundColor: "#EEF2FF", borderColor: "#6366F1" },
  scanTypeBtnGreen: { backgroundColor: "#ECFDF5", borderColor: "#10B981" },
  scanTypeTxt: { fontSize: 14, fontWeight: "700", color: "#9CA3AF" },
  scanTypeTxtBlue: { color: "#4F46E5" },
  scanTypeTxtGreen: { color: "#10B981" },

  /* Generate Button */
  generateBtn: {
    backgroundColor: AdminPalette.primary,
    borderRadius: 14,
    paddingVertical: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    marginTop: 4,
  },
  generateIcon: { fontSize: 15, color: "#fff" },
  generateText: { color: "#fff", fontSize: 15, fontWeight: "700" },

  /* Scanner Box */
  scannerBox: {
    backgroundColor: AdminPalette.primaryDark,
    borderRadius: 20,
    height: 300,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    overflow: "hidden",
  },
  corner: {
    position: "absolute",
    width: 36,
    height: 36,
    borderColor: "#fff",
  },
  cornerTL: { top: 20, left: 20, borderTopWidth: 4, borderLeftWidth: 4, borderRadius: 4 },
  cornerTR: { top: 20, right: 20, borderTopWidth: 4, borderRightWidth: 4, borderRadius: 4 },
  cornerBL: { bottom: 70, left: 20, borderBottomWidth: 4, borderLeftWidth: 4, borderRadius: 4 },
  cornerBR: { bottom: 70, right: 20, borderBottomWidth: 4, borderRightWidth: 4, borderRadius: 4 },

  qrIconGrid: { gap: 6, marginBottom: 24 },
  qrRow: { flexDirection: "row", gap: 6 },
  qrSquare: {
    width: 28,
    height: 28,
    borderWidth: 2,
    borderColor: "rgba(255,255,255,0.4)",
    borderRadius: 4,
  },

  generateBtnOverlay: {
    backgroundColor: "#fff",
    borderRadius: 20,
    paddingHorizontal: 18,
    paddingVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  generateTextDark: { color: "#1E2A5E", fontSize: 13, fontWeight: "700" },
  cameraHint: { color: "rgba(255,255,255,0.5)", fontSize: 11, marginTop: 10 },

  /* Recent Violations */
  recentHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 6,
    marginBottom: 4,
  },
  recentIcon: { fontSize: 16, color: "#374151" },
  recentTitle: { fontSize: 15, fontWeight: "700", color: "#111827" },

  scanCard: {
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 14,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    gap: 12,
  },
  scanAvatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: "center",
    justifyContent: "center",
  },
  scanAvatarText: { color: "#fff", fontWeight: "700", fontSize: 14 },
  scanInfo: { flex: 1 },
  scanName: { fontSize: 14, fontWeight: "700", color: "#111827" },
  scanLocation: { fontSize: 12, color: "#6B7280", marginTop: 2 },
  scanMeta: { flexDirection: "row", marginTop: 4 },
  scanMetaText: { fontSize: 11, color: "#9CA3AF" },
  scanTag: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    alignSelf: "flex-start",
  },
  scanTagText: { color: "#fff", fontSize: 11, fontWeight: "700" },
});