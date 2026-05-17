import React, { useState } from "react";
import { View, Text, Pressable, StyleSheet, SafeAreaView } from "react-native";

import AdminDashboard from "./AdminDashboard";
import AdminStudents from "./AdminStudents";
import AdminReport from "./AdminReport";
import AdminScanner from "./AdminScanner";
import AdminPolicy from "./AdminPolicy";
import AdminProfile from "./AdminProfile";
import { AdminPalette } from "../constants/theme";

export default function AdminScreen({ user, onLogout }) {
  const [tab, setTab] = useState("dashboard");

  function renderTabContent() {
    switch (tab) {
      case "dashboard":
        return <AdminDashboard user={user} />;
      case "students":
        return <AdminStudents />;
      case "report":
        return <AdminReport />;
      case "scanner":
        return <AdminScanner />;
      case "policy":
        return <AdminPolicy />;
      case "profile":
        return <AdminProfile user={user} onLogout={onLogout} />;
      default:
        return <AdminDashboard user={user} />;
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contentBody}>{renderTabContent()}</View>

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
      <Text style={{ fontSize: 20, opacity: active ? 1 : 0.5 }}>{icon}</Text>
      <Text style={[styles.navLabel, active && { color: AdminPalette.primary, fontWeight: "700" }]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#EFEFEF" },
  contentBody: { flex: 1 },
  bottomNav: {
    flexDirection: "row",
    backgroundColor: "#F8F8FA",
    borderTopWidth: 1,
    borderTopColor: "#E2E2E6",
    paddingVertical: 10,
    paddingBottom: 14,
    justifyContent: "space-around",
  },
  navItem: { alignItems: "center", flex: 1 },
  navLabel: { fontSize: 10, color: "#8E8E93", marginTop: 4, fontWeight: "600" },
  activeNavLabel: { color: "#4B6EF6", fontWeight: "700" },
});