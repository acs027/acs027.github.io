import React, { useRef, useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  ScrollView,
  Platform,
  StyleSheet,
  TouchableWithoutFeedback,
  useWindowDimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { askGemini } from "@/src/lib/askGemini";
import { useThemeColors } from "../utils/useThemeColors";
import { useTranslation } from "react-i18next";
import { renderTextWithLinks } from "../utils/LinkTextHelper";

export default function ChatOverlay() {
  const { width: screenWidth, height: screenHeight } = useWindowDimensions();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<{ from: string; text: string }[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [sessionId, setSessionId] = useState("");

  const scrollRef = useRef<ScrollView>(null);
  const colors = useThemeColors();
  const { t } = useTranslation();

  // Dynamic sizing based on screen width
  const isSmallScreen = screenWidth < 450;
  const chatWidth = isSmallScreen ? screenWidth - 40 : 360;
  const chatBottom = isSmallScreen ? 20 : 40;
  const chatRight = isSmallScreen ? 20 : 40;

  useEffect(() => {
    let id = localStorage.getItem("chat_session_id");
    if (!id) {
      id = crypto.randomUUID();
      localStorage.setItem("chat_session_id", id);
    }
    setSessionId(id);
  }, []);

  useEffect(() => {
    if (open) {
      setTimeout(() => {
        scrollRef.current?.scrollToEnd({ animated: true });
      }, 150);
    }
  }, [messages, open]);

  const typeWriter = (fullText: string, callback: (txt: string) => void) => {
    let index = 0;
    const interval = setInterval(() => {
      index++;
      callback(fullText.slice(0, index));
      if (index >= fullText.length) clearInterval(interval);
    }, 12);
  };

  async function sendMessage() {
    if (!input.trim() || loading) return;

    const userText = input;
    setInput("");
    setLoading(true);

    setMessages((prev) => [...prev, { from: "user", text: userText }]);
    
    const reply = await askGemini(userText, sessionId);
    
    setMessages((prev) => [...prev, { from: "bot", text: "" }]);

    typeWriter(reply, (partial) => {
      setMessages((prev) => {
        if (prev.length === 0) return prev;
        const updated = [...prev];
        const lastIndex = updated.length - 1;
        if (updated[lastIndex].from === "bot") {
          updated[lastIndex] = { ...updated[lastIndex], text: partial };
        }
        return updated;
      });
    });

    setLoading(false);
  }

  return (
    <>
      {/* 1. Backdrop to handle "Click Outside" minimize */}
      {open && (
        <Pressable 
          style={styles.backdrop} 
          onPress={() => setOpen(false)} 
        />
      )}

      <View 
        style={[
          styles.anchor, 
          { bottom: chatBottom, right: chatRight }
        ]} 
        pointerEvents="box-none"
      >
        {!open ? (
          <Pressable 
            onPress={() => setOpen(true)} 
            style={({ hovered, pressed }) => [
              styles.targetPill, 
              hovered && Platform.OS === 'web' && styles.targetPillHovered,
              pressed && { transform: [{ scale: 0.96 }] }
            ]}
          >
            {({ hovered }) => (
              <>
                <Ionicons 
                  name="sparkles" 
                  size={18} 
                  color={hovered && Platform.OS === 'web' ? "#000" : "#0A84FF"} 
                />
                <Text style={[
                  styles.targetPillText, 
                  hovered && Platform.OS === 'web' && { color: '#000' }
                ]}>
                  Ask AI
                </Text>
              </>
            )}
          </Pressable>
        ) : (
          /* 2. Chat Window */
          <TouchableWithoutFeedback>
            <View style={[
              styles.chatWindow, 
              { 
                width: chatWidth, 
                maxHeight: screenHeight - 100, 
                backgroundColor: 'rgba(28, 28, 30, 0.95)' 
              }
            ]}>
              <View style={styles.header}>
                <View style={styles.headerLeft}>
                  <View style={styles.botAvatar}>
                    <Text style={styles.avatarText}>ACS</Text>
                  </View>
                  <View>
                    <Text style={[styles.headerTitle, { color: '#fff' }]}>Assistant</Text>
                    <View style={styles.statusContainer}>
                      <View style={styles.statusDot} />
                      <Text style={styles.headerSubtitle}>{loading ? "Thinking..." : 'Online'}</Text>
                    </View>
                  </View>
                </View>
                <Pressable onPress={() => setOpen(false)}>
                  <Ionicons name="close" size={22} color="#8E8E93" />
                </Pressable>
              </View>

              <ScrollView 
                ref={scrollRef} 
                style={styles.messageArea}
                contentContainerStyle={{ paddingBottom: 20 }}
              >
                {messages.map((msg, i) => {
                  const isList = msg.text.includes('* **');
                  return (
                    <View 
                      key={i} 
                      style={[
                        styles.bubble, 
                        msg.from === "user" ? styles.userBubble : styles.botBubble,
                        isList && msg.from === "bot" && styles.listBubble
                      ]}
                    >
                      <Text style={[styles.messageText, { color: '#fff' }]}>
                        {renderTextWithLinks(
                          msg.text,
                          "#fff",
                          msg.from === "user" ? "#fff" : "#0A84FF"
                        )}
                      </Text>
                    </View>
                  );
                })}
              </ScrollView>

              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="Message..."
                  placeholderTextColor="#636366"
                  value={input}
                  onChangeText={setInput}
                  onSubmitEditing={sendMessage}
                />
                <Pressable onPress={sendMessage} disabled={!input.trim()}>
                  <Ionicons 
                    name="arrow-up-circle" 
                    size={32} 
                    color={input.trim() ? "#0A84FF" : "#2C2C2E"} 
                  />
                </Pressable>
              </View>
            </View>
          </TouchableWithoutFeedback>
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    position: Platform.OS === 'web' ? 'fixed' : 'absolute',
    backgroundColor: 'transparent', 
    zIndex: 9998,
  },
  anchor: {
    position: Platform.OS === "web" ? "fixed" : "absolute",
    zIndex: 9999,
  },
  targetPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 24,
    paddingVertical: 12,
    backgroundColor: 'rgba(28, 28, 30, 0.8)',
    borderRadius: 100,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    ...Platform.select({
      web: { backdropFilter: 'blur(10px)', transition: 'all 0.3s ease' }
    })
  },
  targetPillHovered: {
    backgroundColor: '#FFFFFF',
    borderColor: '#FFFFFF',
    transform: [{ translateY: -4 }],
  },
  targetPillText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
    letterSpacing: -0.2,
  },
  chatWindow: {
    height: 520,
    borderRadius: 28,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    overflow: 'hidden',
    ...Platform.select({
      web: { 
        backdropFilter: 'blur(20px)', 
        boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
      }
    })
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.05)',
  },
  headerLeft: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  botAvatar: {
    width: 34,
    height: 34,
    borderRadius: 10,
    backgroundColor: '#0A84FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: { color: '#fff', fontSize: 9, fontWeight: '900' },
  headerTitle: { fontSize: 15, fontWeight: "700", letterSpacing: -0.3 },
  statusContainer: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  statusDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: '#34C759' },
  headerSubtitle: { fontSize: 11, color: '#8E8E93' },
  messageArea: { flex: 1, padding: 16 },
  bubble: { 
    paddingHorizontal: 16, 
    paddingVertical: 10, 
    borderRadius: 20, 
    marginBottom: 12, 
    maxWidth: "85%" 
  },
  userBubble: { 
    alignSelf: "flex-end", 
    backgroundColor: "#0A84FF",
    borderBottomRightRadius: 4,
  },
  botBubble: { 
    alignSelf: "flex-start", 
    backgroundColor: "rgba(255,255,255,0.08)",
    borderBottomLeftRadius: 4,
  },
  listBubble: {
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderWidth: 1,
    borderColor: "rgba(10, 132, 255, 0.3)",
    width: '95%', 
  },
  messageText: { fontSize: 15, lineHeight: 22 },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    gap: 10,
    backgroundColor: 'rgba(0,0,0,0.3)'
  },
  input: {
    flex: 1,
    height: 42,
    backgroundColor: '#000',
    borderRadius: 21,
    paddingHorizontal: 16,
    color: '#fff',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    fontSize: 15,
  },
});