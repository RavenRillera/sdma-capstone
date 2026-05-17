import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Switch,
} from "react-native";
import { AdminPalette } from "../constants/theme";
import adminStyles from "../styles/adminStyles";

export default function AdminProfileScreen({ user, onLogout }) {
  const fullName = user?.fullName || "Sir. Ramon Flores";
  const initials = fullName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>

      {/* ── Blue Header ── */}
      <View style={[adminStyles.header, styles.header]}>
        <View style={[adminStyles.topRow, styles.topRow]}>
          <View style={styles.titleBlock}>
            <Text style={[adminStyles.appName, styles.appName]}>UniDiscipline</Text>
            <View style={[adminStyles.adminBadge, styles.adminBadge]}>
              <Text style={[adminStyles.adminBadgeText, styles.adminBadgeText]}>Administrator</Text>
            </View>
          </View>
          <View style={[adminStyles.profileCircle, styles.profileCircle]}>
            <Text style={[adminStyles.profileInitial, styles.profileCircleText]}>{initials}</Text>
          </View>
        </View>
        <Text style={[adminStyles.school, styles.schoolName]}>New Era University</Text>

        <Text style={styles.pageTitle}>My Profile</Text>

        <View style={styles.identityCard}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{initials}</Text>
          </View>
          <View>
            <Text style={styles.identityName}>{fullName}</Text>
            <Text style={styles.identityId}>{user?.admin_id || "ADM-001"}</Text>
            <View style={styles.identityBadge}>
              <Text style={styles.identityBadgeText}>Administrator</Text>
            </View>
          </View>
        </View>
      </View>

      {/* ── Personal Information ── */}
      <View style={styles.card}>
        <Text style={styles.cardLabel}>PERSONAL INFORMATION</Text>
        <InfoRow icon="👤" label="Full Name" value={fullName} />
        <InfoRow icon="✉️" label="Email" value={user?.email || "ramon.flores@neu.edu.ph"} />
        <InfoRow icon="📞" label="Phone" value={user?.phone || "+63 912 345 6789"} />
        <InfoRow icon="🏢" label="Department" value={user?.department || "Engineering"} />
        <InfoRow icon="💼" label="Position" value={user?.position || "Associate Professor"} last />
      </View>

      {/* ── Notification Preferences ── */}
      <View style={styles.card}>
        <Text style={styles.cardLabel}>NOTIFICATION PREFERENCES</Text>
        <SettingRow icon="🔔" title="Push Notification" subtitle="Violation update and alerts" />
        <SettingRow icon="✉️" title="Email Alerts" subtitle="Receive emails for case updates" last />
      </View>

      {/* ── Settings & Help ── */}
      <View style={styles.card}>
        <Text style={styles.cardLabel}>SETTINGS & HELP</Text>
        <MenuRow icon="🔒" title="Change Password" />
        <MenuRow icon="❓" title="Help & FAQ" />
        <MenuRow icon="🛡️" title="Privacy Policy" last />
      </View>

      {/* ── Sign Out ── */}
      <TouchableOpacity style={styles.signOutButton} onPress={onLogout}>
        <Text style={styles.signOutText}>↪  Sign Out</Text>
      </TouchableOpacity>

    </ScrollView>
  );
}

function InfoRow({ icon, label, value, last }) {
  return (
    <View style={[styles.row, last && styles.rowLast]}>
      <View style={styles.rowIcon}>
        <Text style={styles.rowIconText}>{icon}</Text>
      </View>
      <View>
        <Text style={styles.rowLabel}>{label}</Text>
        <Text style={styles.rowValue}>{value}</Text>
      </View>
    </View>
  );
}

function SettingRow({ icon, title, subtitle, last }) {
  return (
    <View style={[styles.row, last && styles.rowLast]}>
      <View style={styles.rowIcon}>
        <Text style={styles.rowIconText}>{icon}</Text>
      </View>
      <View style={{ flex: 1 }}>
        <Text style={styles.rowValue}>{title}</Text>
        <Text style={styles.rowLabel}>{subtitle}</Text>
      </View>
      <Switch value={true} trackColor={{ true: "#4869D8" }} />
    </View>
  );
}

function MenuRow({ icon, title, last }) {
  return (
    <TouchableOpacity style={[styles.row, last && styles.rowLast]}>
      <View style={styles.rowIcon}>
        <Text style={styles.rowIconText}>{icon}</Text>
      </View>
      <Text style={styles.rowValue}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  scrollView: { flex: 1 },
  scrollContent: { paddingBottom: 30 },

  /* Header */
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 20,
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  titleBlock: { flexDirection: "row", alignItems: "center", gap: 8 },
  appName: { color: "#FFFFFF", fontSize: 18, fontWeight: "800" },
  adminBadge: {
    backgroundColor: AdminPalette.badge,
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 12,
  },
  adminBadgeText: { color: "#FFFFFF", fontSize: 10, fontWeight: "600" },
  profileCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: AdminPalette.accent,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1.5,
    borderColor: "rgba(255,255,255,0.6)",
  },
  profileCircleText: { color: "#FFFFFF", fontWeight: "700", fontSize: 14 },
  schoolName: { color: AdminPalette.muted, fontSize: 11, marginTop: 2 },

  pageTitle: {
    color: AdminPalette.surface,
    fontSize: 32,
    fontWeight: "800",
    marginTop: 24,
    marginBottom: 14,
  },

  identityCard: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.5)",
    borderRadius: 16,
    padding: 14,
  },
  avatar: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: AdminPalette.accent,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },
  avatarText: { color: "#FFFFFF", fontSize: 20, fontWeight: "700" },
  identityName: { color: "#FFFFFF", fontSize: 16, fontWeight: "700" },
  identityId: { color: AdminPalette.muted, fontSize: 12, marginTop: 2 },
  identityBadge: {
    marginTop: 6,
    backgroundColor: AdminPalette.badge,
    alignSelf: "flex-start",
    paddingHorizontal: 12,
    paddingVertical: 3,
    borderRadius: 8,
  },
  identityBadgeText: { color: AdminPalette.surface, fontSize: 10, fontWeight: "600" },

  /* Cards */
  card: {
    backgroundColor: AdminPalette.surface,
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 4,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  cardLabel: {
    color: "#AAAAAA",
    fontSize: 11,
    fontWeight: "600",
    letterSpacing: 0.5,
    marginBottom: 6,
  },

  /* Rows */
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  rowLast: { borderBottomWidth: 0 },
  rowIcon: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: "#F3F4F6",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  rowIconText: { fontSize: 15 },
  rowLabel: { color: "#999999", fontSize: 11 },
  rowValue: { color: AdminPalette.text, fontSize: 13, fontWeight: "600" },

  /* Sign Out */
  signOutButton: {
    backgroundColor: "rgba(229,62,62,0.08)",
    marginHorizontal: 16,
    marginTop: 20,
    marginBottom: 10,
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: "center",
  },
  signOutText: { color: AdminPalette.danger, fontWeight: "700", fontSize: 15 },
});