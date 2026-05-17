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

const STUDENTS = [
  {
    id: "22-10203-535",
    name: "John Mendoza",
    initials: "JM",
    avatarColor: "#5B8DEF",
    course: "Computer Science • 3rd Year",
    department: "Computer",
    violations: 3,
    served: 0,
    total: 12,
    progress: 0,
    daysAgo: 18,
    status: "Pending",
    statusColor: "#A78BFA",
    statusText: "#fff",
  },
  {
    id: "22-10203-536",
    name: "Carlos Reyes",
    initials: "CR",
    avatarColor: "#F59E0B",
    course: "Business Administration • 2nd Year",
    department: "Business",
    violations: 2,
    served: 1,
    total: 16,
    progress: 35,
    daysAgo: 18,
    status: "Pending",
    statusColor: "#A78BFA",
    statusText: "#fff",
  },
  {
    id: "21-11134-114",
    name: "Joshua Tindoy",
    initials: "JM",
    avatarColor: "#5B8DEF",
    course: "Engineering • 2nd Year",
    department: "Engineering",
    violations: 0,
    served: 8,
    total: 8,
    progress: 100,
    daysAgo: 18,
    status: "Cleared",
    statusColor: "#10B981",
    statusText: "#fff",
  },
  {
    id: "23-10984-209",
    name: "Bato Dela Rosa",
    initials: "CR",
    avatarColor: "#F59E0B",
    course: "Criminology • 3rd Year",
    department: "Liberal",
    violations: 40,
    served: 4,
    total: 6,
    progress: 20,
    daysAgo: 18,
    status: "Pending",
    statusColor: "#A78BFA",
    statusText: "#fff",
  },
];

const FILTERS = ["All", "Computer", "Engineering", "Business", "Liberal", "Education"];

export default function AdminStudents() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [search, setSearch] = useState("");

  const filtered = STUDENTS.filter((s) => {
    const matchesDept = activeFilter === "All" || s.department === activeFilter;
    const matchesSearch =
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.id.includes(search);
    return matchesDept && matchesSearch;
  });

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
            <Text style={styles.reporterText}>Reporting as: Sir. Ramon Flores</Text>
          </View>

          {/* Stat Boxes */}
          <View style={[adminStyles.statsRow, styles.statsRow]}>
            <StatBox value="7" label="Total" color="#5B8DEF" />
            <StatBox value="0" label="Active" color="#6B7280" />
            <StatBox value="1" label="Pending" color="#A78BFA" />
            <StatBox value="4" label="Cleared" color="#10B981" />
          </View>
        </View>

        {/* ── Search + Sort ── */}
        <View style={styles.searchRow}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search student name or ID..."
            placeholderTextColor="#9CA3AF"
            value={search}
            onChangeText={setSearch}
          />
          <Pressable style={styles.sortButton}>
            <Text style={styles.sortText}>⇅ Sort</Text>
          </Pressable>
        </View>

        {/* ── Department Filter Chips ── */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.filterScroll}
          contentContainerStyle={styles.filterContent}
        >
          {FILTERS.map((f) => (
            <Pressable
              key={f}
              style={[styles.filterChip, activeFilter === f && styles.filterChipActive]}
              onPress={() => setActiveFilter(f)}
            >
              <Text style={[styles.filterChipText, activeFilter === f && styles.filterChipTextActive]}>
                {f}
              </Text>
            </Pressable>
          ))}
        </ScrollView>

        {/* ── Result Count ── */}
        <View style={styles.resultRow}>
          <Text style={styles.resultText}>⚑ {filtered.length} student found</Text>
          <Pressable>
            <Text style={styles.viewAllText}>View all &gt;</Text>
          </Pressable>
        </View>

        {/* ── Student Cards ── */}
        {filtered.map((s) => (
          <StudentCard key={s.id} student={s} />
        ))}

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

function StudentCard({ student: s }) {
  const progressColor =
    s.progress === 100 ? "#10B981" : s.progress > 0 ? "#F59E0B" : "#EF4444";

  return (
    <View style={styles.card}>
      <View style={styles.cardTop}>
        <View style={[styles.avatar, { backgroundColor: s.avatarColor }]}>
          <Text style={styles.avatarText}>{s.initials}</Text>
        </View>

        <View style={styles.cardInfo}>
          <Text style={styles.studentName}>{s.name}</Text>
          <Text style={styles.studentId}>{s.id}</Text>
          <Text style={styles.studentCourse}>{s.course}</Text>
        </View>

        <View style={styles.cardRight}>
          <View style={[styles.statusBadge, { backgroundColor: s.statusColor }]}>
            <Text style={[styles.statusText, { color: s.statusText }]}>{s.status}</Text>
          </View>
          <Text style={styles.daysAgo}>{s.daysAgo}d ago</Text>
        </View>
      </View>

      <View style={styles.cardMeta}>
        <Text style={styles.metaViolation}>🛑 {s.violations} violations</Text>
        <Text style={styles.metaTime}>🕒 {s.served}/{s.total}h</Text>
      </View>

      <View style={styles.progressBg}>
        <View style={[styles.progressFill, { width: `${s.progress}%`, backgroundColor: progressColor }]} />
      </View>
      <Text style={styles.progressLabel}>{s.progress}% service complete</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#ffffff" },
  scrollContent: { paddingBottom: 30 },

  /* Header */
  header: {
    paddingHorizontal: 18,
    paddingTop: 20,
    paddingBottom: 22,
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
  school: { color: "#93C5FD", fontSize: 11, marginTop: 2 },
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

  pageTitle: { color: "#fff", fontSize: 30, fontWeight: "800", marginTop: 20 },
  pageSubtitle: { color: "#93C5FD", fontSize: 12, marginTop: 4 },

  reporterBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.12)",
    alignSelf: "flex-start",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginTop: 12,
    gap: 6,
  },
  reporterIcon: { fontSize: 12 },
  reporterText: { color: "#E0E7FF", fontSize: 12, fontWeight: "600" },

  statsRow: { flexDirection: "row", justifyContent: "space-between", marginTop: 18 },
  statBox: {
    flex: 1,
    marginHorizontal: 4,
    borderWidth: 1.5,
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.06)",
  },
  statValue: { fontSize: 22, fontWeight: "800" },
  statLabel: { color: "#9CA3AF", fontSize: 11, marginTop: 2 },

  /* Search */
  searchRow: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 16,
    marginTop: 16,
    gap: 10,
  },
  searchInput: {
    flex: 1,
    backgroundColor: "#1F2937",
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
    color: "#fff",
    fontSize: 13,
    borderWidth: 1,
    borderColor: "#374151",
  },
  sortButton: {
    backgroundColor: "#1F2937",
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: "#374151",
  },
  sortText: { color: "#D1D5DB", fontWeight: "700", fontSize: 13 },

  /* Filters */
  filterScroll: { marginTop: 12 },
  filterContent: { paddingHorizontal: 16, gap: 8 },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 7,
    borderRadius: 20,
    backgroundColor: "#1F2937",
    borderWidth: 1,
    borderColor: "#374151",
  },
  filterChipActive: { backgroundColor: "#1D4ED8", borderColor: "#3B82F6" },
  filterChipText: { color: "#9CA3AF", fontWeight: "600", fontSize: 13 },
  filterChipTextActive: { color: "#fff" },

  /* Result row */
  resultRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 16,
    marginTop: 14,
    marginBottom: 10,
  },
  resultText: { color: "#9CA3AF", fontSize: 13, fontWeight: "600" },
  viewAllText: { color: "#60A5FA", fontSize: 12, fontWeight: "700" },

  /* Student Card */
  card: {
    backgroundColor: "#1F2937",
    borderRadius: 16,
    padding: 14,
    marginHorizontal: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#374151",
  },
  cardTop: { flexDirection: "row", alignItems: "flex-start" },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: { color: "#fff", fontWeight: "700", fontSize: 15 },
  cardInfo: { flex: 1, marginLeft: 12 },
  studentName: { color: "#F9FAFB", fontSize: 15, fontWeight: "700" },
  studentId: { color: "#6B7280", fontSize: 11, marginTop: 1 },
  studentCourse: { color: "#9CA3AF", fontSize: 11, marginTop: 2 },
  cardRight: { alignItems: "flex-end", gap: 6 },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
  },
  statusText: { fontSize: 11, fontWeight: "700" },
  daysAgo: { color: "#6B7280", fontSize: 11 },

  cardMeta: { flexDirection: "row", gap: 16, marginTop: 12 },
  metaViolation: { color: "#F87171", fontSize: 12, fontWeight: "600" },
  metaTime: { color: "#9CA3AF", fontSize: 12, fontWeight: "600" },

  progressBg: { height: 5, backgroundColor: "#374151", borderRadius: 4, marginTop: 10 },
  progressFill: { height: 5, borderRadius: 4 },
  progressLabel: { color: "#6B7280", fontSize: 10, marginTop: 5, fontWeight: "600" },
});