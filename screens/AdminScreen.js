import React, { useState, useEffect } from "react"; 
import { View, Text, Pressable, StyleSheet, SafeAreaView, ScrollView, TextInput, Platform } from "react-native";

import AdminDashboard from "./AdminDashboard";
import AdminStudents from "./AdminStudents";
import AdminScanner from "./AdminScanner";
import AdminPolicy from "./AdminPolicy";
import AdminProfile from "./AdminProfile";
 
export default function AdminScreen({ user, onLogout }) {
  const [tab, setTab] = useState("dashboard");
  const [activeSegment, setActiveSegment] = useState("students");
  const [activeFilter, setActiveFilter] = useState("All");

  

  function renderTabContent() {
    switch (tab) {
      case "students":
        return <AdminStudents />;
      case "report":
        return <View style={styles.placeholderContainer}><Text>Reports Screen</Text></View>;
      case "scanner":
        return <AdminScanner />;
      case "policy":
        return <AdminPolicy />;
      case "profile":
        return <AdminProfile />;
      default:
        // Dashboard Tab
        return (
          <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollContainer}>
            {/* Toggle Segment Bar */}
            <View style={styles.segmentContainer}>
              <Pressable 
                style={[styles.segmentButton, activeSegment === "students" && styles.segmentActiveButton]} 
                onPress={() => setActiveSegment("students")}
              >
                <Text style={[styles.segmentText, activeSegment === "students" && styles.segmentActiveText]}>👥 Students</Text>
              </Pressable>
              <Pressable 
                style={[styles.segmentButton, activeSegment === "stats" && styles.segmentActiveButton]} 
                onPress={() => setActiveSegment("stats")}
              >
                <Text style={[styles.segmentText, activeSegment === "stats" && styles.segmentActiveText]}>📊 Students</Text>
              </Pressable>
            </View>

            {/* Search Input Bar */}
            <TextInput 
              style={styles.searchBar} 
              placeholder="🔍 Search student name or ID..." 
              placeholderTextColor="#A9A9AC"
            />

            {/* Department Filters List */}
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterRow}>
              {["All", "CICS", "CEA", "COA", "CAS", "CMT"].map((dept) => (
                <Pressable 
                  key={dept} 
                  style={[styles.filterBadge, activeFilter === dept && styles.filterActiveBadge]}
                  onPress={() => setActiveFilter(dept)}
                >
                  <Text style={[styles.filterText, activeFilter === dept && styles.filterActiveText]}>{dept}</Text>
                </Pressable>
              ))}
            </ScrollView>

            {/* Total Indicator */}
            <View style={styles.resultHeader}>
              <Text style={styles.resultCountText}>⏳ 7 student found</Text>
              <Pressable><Text style={styles.viewAllText}>View all &gt;</Text></Pressable>
            </View>

            {/* Student Card 1 */}
            <View style={styles.studentCard}>
              <View style={styles.cardTopRow}>
                <View style={styles.avatarCircle}><Text style={styles.avatarText}>JM</Text></View>
                <View style={styles.studentMeta}>
                  <Text style={styles.studentName}>John Mendoza</Text>
                  <Text style={styles.studentId}>22-10203-535</Text>
                  <Text style={styles.studentCourse}>Computer Science • 3rd Year</Text>
                </View>
                <View style={styles.pendingTag}><Text style={styles.pendingTagText}>Pending</Text></View>
              </View>
              <View style={styles.cardInfoRow}>
                <Text style={styles.violationText}>🛑 3 violations</Text>
                <Text style={styles.timeText}>🕒 0/12h</Text>
                <Text style={styles.dateText}>18d ago</Text>
              </View>
              <View style={styles.progressBarBg}><View style={[styles.progressBarFill, { width: '0%' }]} /></View>
              <Text style={styles.progressLabel}>0% service complete</Text>
            </View>

            {/* Student Card 2 */}
            <View style={styles.studentCard}>
              <View style={styles.cardTopRow}>
                <View style={[styles.avatarCircle, { backgroundColor: '#ADC6FF' }]}><Text style={styles.avatarText}>CR</Text></View>
                <View style={styles.studentMeta}>
                  <Text style={styles.studentName}>Carlos Reyes</Text>
                  <Text style={styles.studentId}>22-10203-535</Text>
                  <Text style={styles.studentCourse}>Business Administration • 2nd Year</Text>
                </View>
                <View style={styles.pendingTag}><Text style={styles.pendingTagText}>Pending</Text></View>
              </View>
              <View style={styles.cardInfoRow}>
                <Text style={styles.violationText}>🛑 2 violations</Text>
                <Text style={styles.timeText}>🕒 1/16h</Text>
                <Text style={styles.dateText}>18d ago</Text>
              </View>
              <View style={styles.progressBarBg}><View style={[styles.progressBarFill, { width: '35%', backgroundColor: '#FFA500' }]} /></View>
              <Text style={styles.progressLabel}>0% service complete</Text>
            </View>
          </ScrollView>
        );
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Blue Top Background Header block */}
      <View style={styles.blueHeaderSection}>
        <View style={styles.topRow}>
          <View>
            <View style={styles.titleContainer}>
              <Text style={styles.appName}>UniDiscipline</Text>
              <View style={styles.adminBadge}><Text style={styles.adminBadgeText}>Administrator</Text></View>
            </View>
            <Text style={styles.school}>New Era University</Text>
          </View>
          <View style={styles.profileCircle}><Text style={styles.profileInitial}>RF</Text></View>
        </View>

        <View style={styles.adminMetaBlock}>
          <Text style={styles.subLabel}>Administrator</Text>
          <View style={styles.nameBellRow}>
            <Text style={styles.adminName}>{user?.fullName || "Ramon Flores"}</Text>
            <View style={styles.bellButton}>
              <Text style={{ fontSize: 22 }}>🔔</Text>
              <View style={styles.bellDot} />
            </View>
          </View>
          <Text style={styles.roleSubtext}>Director, OSD • Office of Student Discipline</Text>
        </View>

        {/* 2x2 Metrics Dashboard Box Items */}
        <View style={styles.metricsGrid}>
          <View style={styles.metricBox}>
            <View style={styles.metricIconLabelRow}>
              <Text style={styles.metricIcon}>👥</Text>
              <Text style={styles.metricLabel}>Total Students</Text>
            </View>
            <Text style={styles.metricNumber}>3</Text>
          </View>
          <View style={styles.metricBox}>
            <View style={styles.metricIconLabelRow}>
              <Text style={styles.metricIcon}>⚠️</Text>
              <Text style={styles.metricLabel}>Open Violations</Text>
            </View>
            <Text style={[styles.metricNumber, { color: '#FF6B6B' }]}>6</Text>
          </View>
          <View style={styles.metricBox}>
            <View style={styles.metricIconLabelRow}>
              <Text style={styles.metricIcon}>⏳</Text>
              <Text style={styles.metricLabel}>Pending Review</Text>
            </View>
            <Text style={[styles.metricNumber, { color: '#F59E0B' }]}>3</Text>
          </View>
          <View style={styles.metricBox}>
            <View style={styles.metricIconLabelRow}>
              <Text style={styles.metricIcon}>✅</Text>
              <Text style={styles.metricLabel}>Resolved Cases</Text>
            </View>
            <Text style={[styles.metricNumber, { color: '#10B981' }]}>6</Text>
          </View>
        </View>
      </View>

      {/* Main Render Section */}
      <View style={styles.contentBody}>
        {renderTabContent()}
      </View>

      {/* Persistent Bottom Tab Icons Navigation */}
      <View style={styles.bottomNav}>
        <NavItem icon="📊" label="Dashboard" active={tab === "dashboard"} onPress={() => setTab("dashboard")} />
        <NavItem icon="👥" label="Students" active={tab === "students"} onPress={() => setTab("students")} />
        <NavItem icon="📝" label="Report" active={tab === "report"} onPress={() => setTab("report")} />
        <NavItem icon="📷" label="Scanner" active={tab === "scanner"} onPress={() => setTab("scanner")} />
        <NavItem icon="📜" label="Policy" active={tab === "policy"} onPress={() => setTab("policy")} />
        <NavItem icon="👤" label="Profile" active={tab === "profile"} onPress={() => setTab("profile")} />
      </View>
    </SafeAreaView>
  );
}

function NavItem({ icon, label, active, onPress }) {
  return (
    <Pressable style={styles.navItem} onPress={onPress}>
      <Text style={[{ fontSize: 20, opacity: active ? 1 : 0.5 }]}>{icon}</Text>
      <Text style={[styles.navLabel, active && styles.activeNavLabel]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#EFEFEF" },
  blueHeaderSection: { backgroundColor: "#3F64F6", paddingHorizontal: 20, paddingTop: 24, paddingBottom: 20, borderBottomLeftRadius: 24, borderBottomRightRadius: 24 },
  topRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  titleContainer: { flexDirection: "row", alignItems: "center" },
  appName: { color: "#fff", fontSize: 22, fontWeight: "800" },
  adminBadge: { backgroundColor: "rgba(255,255,255,0.25)", paddingHorizontal: 8, paddingVertical: 2, borderRadius: 12, marginLeft: 8 },
  adminBadgeText: { color: "#fff", fontSize: 10, fontWeight: "600" },
  school: { color: "#C6D3FF", fontSize: 13, marginTop: 2 },
  profileCircle: { width: 38, height: 38, borderRadius: 19, backgroundColor: "rgba(255,255,255,0.3)", alignItems: "center", justifyContent: "center" },
  profileInitial: { color: "#fff", fontWeight: "700", fontSize: 14 },
  adminMetaBlock: { marginTop: 24 },
  subLabel: { color: "#C6D3FF", fontSize: 12, textTransform: "uppercase", letterSpacing: 0.5 },
  nameBellRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 2 },
  adminName: { color: "#fff", fontSize: 28, fontWeight: "800" },
  bellButton: { position: "relative", padding: 4 },
  bellDot: { width: 10, height: 10, borderRadius: 5, backgroundColor: "#FFA500", position: "absolute", top: 2, right: 2, borderWidth: 1.5, borderColor: "#3F64F6" },
  roleSubtext: { color: "#FFF066", fontSize: 12, fontWeight: "600", marginTop: 4 },
  metricsGrid: { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between", marginTop: 18 },
  metricBox: { width: "48%", backgroundColor: "rgba(255,255,255,0.15)", borderRadius: 16, padding: 12, marginBottom: 12, borderWidth: 1, borderColor: "rgba(255,255,255,0.1)" },
  metricIconLabelRow: { flexDirection: "row", alignItems: "center", marginBottom: 6 },
  metricIcon: { fontSize: 14 },
  metricLabel: { color: "#C6D3FF", fontSize: 11, marginLeft: 6, fontWeight: "600" },
  metricNumber: { color: "#fff", fontSize: 26, fontWeight: "800" },
  contentBody: { flex: 1, paddingHorizontal: 16 },
  scrollContainer: { flex: 1, paddingTop: 14 },
  segmentContainer: { flexDirection: "row", backgroundColor: "#D8D9DE", padding: 3, borderRadius: 10, marginBottom: 14 },
  segmentButton: { flex: 1, flexDirection: "row", justifyContent: "center", alignItems: "center", paddingVertical: 8, borderRadius: 8 },
  segmentActiveButton: { backgroundColor: "#000" },
  segmentText: { color: "#666", fontWeight: "700", fontSize: 13 },
  segmentActiveText: { color: "#fff" },
  searchBar: { backgroundColor: "#FFF", borderRadius: 12, paddingVertical: 10, paddingHorizontal: 16, fontSize: 14, color: "#000", borderWidth: 1, borderColor: "#E2E2E6", marginBottom: 14 },
  filterRow: { flexDirection: "row", marginBottom: 14 },
  filterBadge: { paddingHorizontal: 18, paddingVertical: 8, backgroundColor: "#FFF", borderRadius: 20, marginRight: 8, borderWidth: 1, borderColor: "#E2E2E6" },
  filterActiveBadge: { backgroundColor: "#312E55", borderColor: "#312E55" },
  filterText: { color: "#000", fontWeight: "700", fontSize: 13 },
  filterActiveText: { color: "#fff" },
  resultHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 12 },
  resultCountText: { fontSize: 13, color: "#444", fontWeight: "600" },
  viewAllText: { fontSize: 12, color: "#3F64F6", fontWeight: "700" },
  studentCard: { backgroundColor: "#FFF", borderRadius: 16, padding: 14, marginBottom: 12, borderWidth: 1, borderColor: "#E6E6EA" },
  cardTopRow: { flexDirection: "row", alignItems: "center" },
  avatarCircle: { width: 44, height: 44, borderRadius: 22, backgroundColor: "#84A9FF", alignItems: "center", justifyContent: "center" },
  avatarText: { color: "#FFF", fontWeight: "700", fontSize: 15 },
  studentMeta: { flex: 1, marginLeft: 12 },
  studentName: { fontSize: 16, fontWeight: "700", color: "#222" },
  studentId: { fontSize: 11, color: "#777", marginTop: 1 },
  studentCourse: { fontSize: 11, color: "#666", marginTop: 2 },
  pendingTag: { backgroundColor: "#ADC6FF", paddingHorizontal: 12, paddingVertical: 4, borderRadius: 12 },
  pendingTagText: { color: "#3F64F6", fontSize: 11, fontWeight: "700" },
  cardInfoRow: { flexDirection: "row", marginTop: 12, paddingVertical: 4 },
  violationText: { fontSize: 12, color: "#D93838", fontWeight: "600", marginRight: 16 },
  timeText: { fontSize: 12, color: "#555", fontWeight: "600" },
  dateText: { fontSize: 11, color: "#999", marginLeft: "auto" },
  progressBarBg: { height: 6, backgroundColor: "#ECECEF", borderRadius: 3, marginTop: 10 },
  progressBarFill: { height: 6, backgroundColor: "#D93838", borderRadius: 3 },
  progressLabel: { fontSize: 10, color: "#888", marginTop: 6, fontWeight: "600" },
  bottomNav: { flexDirection: "row", backgroundColor: "#F8F8FA", borderTopWidth: 1, borderTopColor: "#E2E2E6", paddingVertical: 10, paddingBottom: 14, justifyContent: "space-around" },
  navItem: { alignItems: "center", flex: 1 },
  navLabel: { fontSize: 10, color: "#8E8E93", marginTop: 4, fontWeight: "600" },
  activeNavLabel: { color: "#4B6EF6", fontWeight: "700" },
  placeholderContainer: { flex: 1, justifyContent: "center", alignItems: "center" }
});