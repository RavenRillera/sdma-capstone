import { AdminPalette } from "../constants/theme";

export const adminStyles = {
  header: {
    backgroundColor: AdminPalette.primaryDark,
    paddingHorizontal: 18,
    paddingTop: 20,
    paddingBottom: 22,
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
  school: { color: AdminPalette.muted, fontSize: 11, marginTop: 2 },
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
  statLabel: { color: AdminPalette.muted, fontSize: 11, marginTop: 4, textAlign: "center" },

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

  scannerBox: {
    backgroundColor: AdminPalette.primaryDark,
    borderRadius: 20,
    height: 300,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    overflow: "hidden",
  },
};

export default adminStyles;
