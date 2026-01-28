import { askGemini } from "@/src/lib/askGemini";
import React, { useRef, useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  ScrollView,
  Animated,
  Platform,
} from "react-native";
import { ThemedView } from "../utils/ThemedView";
import { useThemeColors } from "../utils/useThemeColors";
import { useTranslation } from "react-i18next";
import { renderTextWithLinks } from "../utils/LinkTextHelper";

export default function ChatOverlay() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<{ from: string; text: string }[]>(
    []
  );
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [sessionId, setSessionId] = useState("");

  const scrollRef = useRef<ScrollView>(null);
  const animatedText = useRef(new Animated.Value(0)).current;

  const colors = useThemeColors();
  const { t } = useTranslation();

  // Smoothly scroll to bottom whenever messages update
  useEffect(() => {
    setTimeout(() => {
      scrollRef.current?.scrollToEnd({ animated: true });
    }, 150);
  }, [messages]);

  useEffect(() => {
    let id = localStorage.getItem("chat_session_id");
    if (!id) {
      id = crypto.randomUUID();
      localStorage.setItem("chat_session_id", id);
    }
    setSessionId(id);
  }, []);

  // Typewriter animation for the bot reply
  const typeWriter = (fullText: string, callback: (txt: string) => void) => {
    let index = 0;

    const interval = setInterval(() => {
      index++;
      callback(fullText.slice(0, index));

      if (index >= fullText.length) clearInterval(interval);
    }, 15);
  };

  // Handle sending message
  async function sendMessage() {
    if (!input.trim() || loading) return;

    const userText = input;
    setInput("");
    setLoading(true);

    // 1. Add user message
    setMessages((prev) => [...prev, { from: "user", text: userText }]);

    const reply = await askGemini(userText, sessionId);

    // 2. Add empty bot message at the end
    setMessages((prev) => [...prev, { from: "bot", text: "" }]);

    // 3. Stream into the *last* message (the bot bubble)
    typeWriter(reply, (partial) => {
      setMessages((prev) => {
        if (prev.length === 0) return prev;

        const updated = [...prev];
        const lastIndex = updated.length - 1;
        const last = updated[lastIndex];

        // safety check: only update if last is bot
        if (last.from !== "bot") return updated;

        updated[lastIndex] = { ...last, text: partial };
        return updated;
      });
    });

    setLoading(false);
  }

  return (
    <ThemedView
      style={{
        position: Platform.OS === "web" ? "fixed" : "absolute",
        bottom: 30,
        right: 30,
        zIndex: 9999,
      }}
      color="transparent"
    >
      {/* Floating Button */}
      {!open && (
        <Pressable
          onPress={() => setOpen(true)}
          style={{
            width: 60,
            height: 60,
            borderRadius: 30,
            backgroundColor: colors.card,
            justifyContent: "center",
            alignItems: "center",
            boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.45)",
          }}
        >
          <Text style={{ color: "#fff", fontSize: 28 }}>💬</Text>
        </Pressable>
      )}

      {/* Chat Window */}
      {open && (
        <View
          style={{
            width: 360,
            height: 480,
            backgroundColor: "#fff",
            borderRadius: 16,
            padding: 12,
            boxShadow: "0 4px 30px rgba(0,0,0,0.25)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          {/* Header */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              paddingBottom: 8,
              borderBottomWidth: 1,
              borderColor: "#eee",
            }}
          >
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>
              {t("chatbot.header")}
            </Text>

            <Pressable onPress={() => setOpen(false)}>
              <Text style={{ fontSize: 20 }}>✖</Text>
            </Pressable>
          </View>

          {/* Scrollable Messages */}
          <ScrollView
            ref={scrollRef}
            style={{ flex: 1, marginVertical: 12 }}
            contentContainerStyle={{ gap: 8 }}
          >
            {messages.map((msg, i) => (
              <View
                key={i}
                style={{
                  alignSelf: msg.from === "user" ? "flex-end" : "flex-start",
                  backgroundColor: msg.from === "user" ? "#111" : "#eee",
                  padding: 10,
                  borderRadius: 10,
                  maxWidth: "80%",
                }}
              >
                <Text
                    style={{
                      fontSize: 15,
                      lineHeight: 20,
                    }}
                  >
                    {renderTextWithLinks(
                      msg.text,
                      msg.from === "user" ? "#fff" : "#000",
                      "#1e90ff" // link color
                    )}
</Text>
                {/* <Text
                  style={{
                    color: msg.from === "user" ? "#fff" : "#000",
                    fontSize: 15,
                    lineHeight: 20,
                  }}
                >
                  {msg.text}
                </Text> */}
              </View>
            ))}

            {loading && (
              <Text style={{ fontSize: 14, color: "#555" }}>
                {t("chatbot.typing")}
              </Text>
            )}
          </ScrollView>

          {/* Input */}
          <View style={{ flexDirection: "row", gap: 8 }}>
            <TextInput
              style={{
                flex: 1,
                padding: 10,
                borderWidth: 1,
                borderColor: "#ccc",
                borderRadius: 10,
              }}
              placeholder={t("chatbot.placeholder")}
              value={input}
              onChangeText={setInput}
              onSubmitEditing={sendMessage}
            />

            <Pressable
              onPress={sendMessage}
              style={{
                backgroundColor: "#111",
                paddingHorizontal: 16,
                borderRadius: 10,
                justifyContent: "center",
              }}
            >
              <Text style={{ color: "#fff" }}>{t("chatbot.send_button")}</Text>
            </Pressable>
          </View>
        </View>
      )}
    </ThemedView>
  );
}
