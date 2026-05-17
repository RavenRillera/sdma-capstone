import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Pressable,
  SafeAreaView,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { AdminPalette } from "../constants/theme";
import adminStyles from "../styles/adminStyles";

const FAQS = [
  "How many community service hours do I need per violation?",
  "What happens if I don't complete my community service?",
  "Can I appeal a violation report?",
  "What counts as Academic Dishonesty?",
  "How do I check my violation status?",
  "What are the dress code requirements?",
];

const QUICK_QUESTIONS = [
  "How many hours per violation?",
  "How do I appeal a report?",
];

const SYSTEM_PROMPT = `You are the Policy Assistant for New Era University's UniDiscipline student discipline management system. You help administrators and students understand NEU's student handbook policies.

You are knowledgeable about:
- Community service hour requirements per violation type (Minor: 1-2h, Moderate: 5-10h, Major: 11-20h)
- Violation types: Tardiness, Absence, Dress Code, Misconduct, Academic Dishonesty, Disrespect, Property Damage
- Appeal processes for violation reports
- Dress code requirements
- Checking violation status
- Community service completion procedures

Keep responses concise (2-4 sentences), helpful, and professional. If asked something outside school policy, politely redirect to policy topics.`;

export default function AdminPolicy() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Hi! I'm the Policy Assistant powered by AI. Ask me anything about NEU's student handbook: violations, community service, appeals, dress code, and more.",
      time: "02:12PM",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef(null);

  async function sendMessage(text) {
    const userText = text || input.trim();
    if (!userText) return;

    const now = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    const newMessages = [...messages, { role: "user", content: userText, time: now }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    setTimeout(() => scrollRef.current?.scrollToEnd({ animated: true }), 100);

    try {
      const apiMessages = newMessages
        .filter((m) => m.role !== "assistant" || newMessages.indexOf(m) > 0)
        .map((m) => ({ role: m.role, content: m.content }));

      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          system: SYSTEM_PROMPT,
          messages: apiMessages,
        }),
      });

      const data = await response.json();
      const replyText = data.content?.[0]?.text || "Sorry, I couldn't process that. Please try again.";
      const replyTime = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

      setMessages((prev) => [...prev, { role: "assistant", content: replyText, time: replyTime }]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Network error. Please check your connection and try again.", time: "" },
      ]);
    } finally {
      setLoading(false);
      setTimeout(() => scrollRef.current?.scrollToEnd({ animated: true }), 100);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={80}
      >
        <ScrollView
          ref={scrollRef}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
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

            {/* Policy Assistant Card */}
            <View style={styles.assistantCard}>
              <View style={styles.assistantLeft}>
                <View style={styles.assistantIconBox}>
                  <Text style={styles.assistantIconText}>🖥</Text>
                </View>
                <View>
                  <Text style={styles.assistantName}>Policy Assistant</Text>
                  <View style={styles.onlineRow}>
                    <View style={styles.onlineDot} />
                    <Text style={styles.onlineText}>Online • Powered by OpenAI</Text>
                  </View>
                </View>
              </View>
              <Text style={styles.sparkle}>✦</Text>
            </View>

            {/* Quick Question Chips */}
            <View style={styles.quickRow}>
              {QUICK_QUESTIONS.map((q) => (
                <Pressable key={q} style={styles.quickChip} onPress={() => sendMessage(q)}>
                  <Text style={styles.quickChipText}>{q}</Text>
                </Pressable>
              ))}
            </View>
          </View>

          {/* ── Chat Bubble Area ── */}
          <View style={styles.chatArea}>
            {messages.map((m, i) => (
              <View key={i} style={[styles.bubble, m.role === "user" ? styles.bubbleUser : styles.bubbleBot]}>
                <Text style={[styles.bubbleText, m.role === "user" && styles.bubbleTextUser]}>
                  {m.content}
                </Text>
                {m.time ? (
                  <Text style={[styles.bubbleTime, m.role === "user" && { color: "rgba(255,255,255,0.6)" }]}>
                    {m.time}
                  </Text>
                ) : null}
              </View>
            ))}
            {loading && (
              <View style={[styles.bubble, styles.bubbleBot]}>
                <ActivityIndicator size="small" color="#6366F1" />
              </View>
            )}
          </View>

          {/* ── FAQ Section ── */}
          <View style={styles.faqSection}>
            <Text style={styles.faqTitle}>FREQUENTLY ASKED QUESTIONS</Text>
            {FAQS.map((q) => (
              <Pressable key={q} style={styles.faqItem} onPress={() => sendMessage(q)}>
                <Text style={styles.faqText}>{q}</Text>
                <Text style={styles.faqChevron}>›</Text>
              </Pressable>
            ))}
          </View>
        </ScrollView>

        {/* ── Input Bar ── */}
        <View style={styles.inputBar}>
          <TextInput
            style={styles.inputField}
            value={input}
            onChangeText={setInput}
            placeholder="Ask about policies..."
            placeholderTextColor="#9CA3AF"
            onSubmitEditing={() => sendMessage()}
            returnKeyType="send"
          />
          <Pressable style={styles.sendBtn} onPress={() => sendMessage()}>
            <Text style={styles.sendIcon}>✈</Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F3F4F6" },
  scrollContent: { paddingBottom: 20 },

  /* Header */
  header: {
    paddingHorizontal: 18,
    paddingTop: 20,
    paddingBottom: 24,
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

  /* Assistant Card */
  assistantCard: {
    backgroundColor: "rgba(255,255,255,0.15)",
    borderRadius: 14,
    padding: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 20,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.2)",
  },
  assistantLeft: { flexDirection: "row", alignItems: "center", gap: 12 },
  assistantIconBox: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: "#5B6FE8",
    alignItems: "center",
    justifyContent: "center",
  },
  assistantIconText: { fontSize: 18 },
  assistantName: { color: "#fff", fontSize: 15, fontWeight: "700" },
  onlineRow: { flexDirection: "row", alignItems: "center", gap: 5, marginTop: 2 },
  onlineDot: { width: 7, height: 7, borderRadius: 4, backgroundColor: "#10B981" },
  onlineText: { color: "#C7D2FE", fontSize: 11 },
  sparkle: { color: "#C7D2FE", fontSize: 18 },

  /* Quick chips */
  quickRow: { flexDirection: "row", gap: 10, marginTop: 14 },
  quickChip: {
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.4)",
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  quickChipText: { color: "#fff", fontSize: 12, fontWeight: "600" },

  /* Chat */
  chatArea: { paddingHorizontal: 16, paddingTop: 16, gap: 10 },
  bubble: {
    maxWidth: "85%",
    borderRadius: 14,
    padding: 12,
  },
  bubbleBot: {
    backgroundColor: "#fff",
    alignSelf: "flex-start",
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  bubbleUser: {
    backgroundColor: "#4F46E5",
    alignSelf: "flex-end",
  },
  bubbleText: { fontSize: 13, color: "#111827", lineHeight: 19 },
  bubbleTextUser: { color: "#fff" },
  bubbleTime: { fontSize: 10, color: "#9CA3AF", marginTop: 6, textAlign: "right" },

  /* FAQ */
  faqSection: { paddingHorizontal: 16, marginTop: 24 },
  faqTitle: {
    fontSize: 11,
    fontWeight: "700",
    color: "#9CA3AF",
    letterSpacing: 1,
    marginBottom: 12,
    textAlign: "center",
  },
  faqItem: {
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  faqText: { fontSize: 13, color: "#111827", flex: 1 },
  faqChevron: { fontSize: 20, color: "#9CA3AF", marginLeft: 8 },

  /* Input */
  inputBar: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
    gap: 10,
  },
  inputField: {
    flex: 1,
    backgroundColor: "#F9FAFB",
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 13,
    color: "#111827",
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  sendBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#4F46E5",
    alignItems: "center",
    justifyContent: "center",
  },
  sendIcon: { color: "#fff", fontSize: 16 },
});