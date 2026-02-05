import React, { useState } from "react";
import {
  Linking,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import { Entypo, Feather } from "@expo/vector-icons";
import { useThemeColors } from "../utils/useThemeColors";
import { ThemedText } from "../utils/ThemedText";
import { ThemedView } from "../utils/ThemedView";
import { useTranslation } from "react-i18next";

export default function Contact() {
  const { width } = useWindowDimensions();
  const isLargeScreen = width >= 850;
  const colors = useThemeColors();
  const { t } = useTranslation();

  const accessKey = "371da1cf-d6e9-485e-928d-ebce5f9dc12c";

  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("aCsWEBForm");
  const [message, setMessage] = useState("");
  const [result, setResult] = useState(t("contact.form.button_send"));
  const [isInvalidInput, setIsInvalidInput] = useState(false);

  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const checkForm = () => {
    if (!name || !lastName || !email || !subject || !message) {
      setResult(t("contact.form.validation.fillAll"));
      return false;
    }
    if (!isValidEmail(email)) {
      setResult(t("contact.form.validation_invalidEmail"));
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    const isFormReady = checkForm();
    setIsInvalidInput(!isFormReady);
    if (!isFormReady) return;

    setResult(t("contact.form.button_sending"));

    const formData = new FormData();
    formData.append("access_key", accessKey);
    formData.append("name", `${name} ${lastName}`);
    formData.append("email", email);
    formData.append("subject", subject);
    formData.append("message", message);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      if (data.success) {
        setResult(t("contact.form.success"));
        setName(""); setLastName(""); setEmail(""); setSubject("aCsWEBForm"); setMessage("");
      } else {
        setResult(data.message || t("contact.form.error_generic"));
      }
    } catch (error) {
      setResult(t("contact.form.error_network"));
    }
  };

  return (
    <ThemedView color={colors.background} style={styles.outerContainer}>
      <View style={styles.headerWrapper}>
        <ThemedText style={styles.sectionLabel}>GET IN TOUCH</ThemedText>
        <ThemedText style={styles.mainTitle}>{t("contact.header")}</ThemedText>
      </View>

      <View style={[styles.contentWrapper, { flexDirection: isLargeScreen ? "row" : "column" }]}>
        
        {/* Left Side: Info & Socials */}
        <View style={[styles.infoSide, isLargeScreen && { flex: 0.7 }]}>
           <View style={styles.glassCard}>
             <ThemedText style={styles.cardHeaderSmall}>CONTACT INFO</ThemedText>
             
             <TouchableOpacity style={styles.systemRow} onPress={() => Linking.openURL("mailto:alicihansarac@gmail.com")}>
               <View style={[styles.iconBox, { backgroundColor: '#007AFF' }]}><Feather name="mail" size={18} color="white" /></View>
               <View style={styles.rowTextStack}>
                 <ThemedText style={styles.rowLabel}>{t("contact.info.email_label")}</ThemedText>
                 <ThemedText style={styles.rowValue}>alicihansarac@gmail.com</ThemedText>
               </View>
             </TouchableOpacity>

             <View style={styles.systemRow}>
               <View style={[styles.iconBox, { backgroundColor: '#34C759' }]}><Feather name="map-pin" size={18} color="white" /></View>
               <View style={styles.rowTextStack}>
                 <ThemedText style={styles.rowLabel}>{t("contact.info.location_label")}</ThemedText>
                 <ThemedText style={styles.rowValue}>Kocaeli, Türkiye</ThemedText>
               </View>
             </View>

             <ThemedText style={[styles.cardHeaderSmall, { marginTop: 32 }]}>SOCIALS</ThemedText>
             
             <TouchableOpacity style={styles.systemRow} onPress={() => Linking.openURL("https://github.com/acs027")}>
               <View style={[styles.iconBox, { backgroundColor: '#333' }]}><Feather name="github" size={18} color="white" /></View>
               <ThemedText style={styles.rowValue}>@acs027</ThemedText>
             </TouchableOpacity>

             <TouchableOpacity style={[styles.systemRow, { borderBottomWidth: 0 }]} onPress={() => Linking.openURL("https://linkedin.com/in/alicihansarac")}>
               <View style={[styles.iconBox, { backgroundColor: '#0077B5' }]}><Feather name="linkedin" size={18} color="white" /></View>
               <ThemedText style={styles.rowValue}>/in/alicihansarac</ThemedText>
             </TouchableOpacity>
           </View>
        </View>

        {/* Right Side: Contact Form */}
        <View style={[styles.formSide, isLargeScreen && { flex: 1.3 }]}>
          <View style={styles.glassCard}>
            <View style={[styles.inputGrid, { flexDirection: width < 600 ? 'column' : 'row' }]}>
              <View style={{ flex: 1 }}>
                <ThemedText style={styles.formLabel}>{t("contact.form.firstName")}</ThemedText>
                <TextInput 
                  style={styles.iosInput} 
                  placeholder={t("contact.form.firstName_placeholder")}
                  placeholderTextColor="#666"
                  value={name} onChangeText={setName}
                />
              </View>
              <View style={{ flex: 1 }}>
                <ThemedText style={styles.formLabel}>{t("contact.form.lastName")}</ThemedText>
                <TextInput 
                  style={styles.iosInput} 
                  placeholder={t("contact.form.lastName_placeholder")}
                  placeholderTextColor="#666"
                  value={lastName} onChangeText={setLastName}
                />
              </View>
            </View>

            <ThemedText style={styles.formLabel}>{t("contact.form.email")}</ThemedText>
            <TextInput 
              style={styles.iosInput} 
              placeholder="email@example.com"
              placeholderTextColor="#666"
              keyboardType="email-address"
              value={email} onChangeText={setEmail}
            />

            <ThemedText style={styles.formLabel}>{t("contact.form.message")}</ThemedText>
            <TextInput 
              style={[styles.iosInput, { height: 120, paddingTop: 12, textAlignVertical: 'top' }]} 
              multiline 
              placeholder={t("contact.form.message_placeholder")}
              placeholderTextColor="#666"
              value={message} onChangeText={setMessage}
            />

            <TouchableOpacity 
              activeOpacity={0.8}
              style={[styles.appleButton, { backgroundColor: isInvalidInput ? "#FF3B30" : "#007AFF" }]}
              onPress={handleSubmit}
            >
              <ThemedText style={styles.buttonText}>{result}</ThemedText>
            </TouchableOpacity>
          </View>
        </View>

      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    paddingVertical: 60,
    width: "100%",
    alignItems: "center",
  },
  headerWrapper: {
    alignItems: "center",
    marginBottom: 40,
  },
  sectionLabel: {
    fontSize: 12,
    letterSpacing: 4,
    color: "#0A84FF",
    fontWeight: "700",
    marginBottom: 8,
  },
  mainTitle: {
    fontSize: 34,
    fontWeight: "800",
    letterSpacing: -1,
    textAlign: 'center',
  },
  contentWrapper: {
    width: "95%",
    maxWidth: 1100,
    gap: 20,
  },
  infoSide: {
    width: '100%',
  },
  formSide: {
    width: '100%',
  },
  glassCard: {
    backgroundColor: "rgba(28, 28, 30, 0.6)",
    borderRadius: 24,
    padding: 24,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  cardHeaderSmall: {
    fontSize: 11,
    fontWeight: "700",
    color: "#8E8E93",
    letterSpacing: 1.2,
    marginBottom: 16,
  },
  systemRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.05)",
  },
  iconBox: {
    width: 36,
    height: 36,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  rowTextStack: {
    flex: 1,
  },
  rowLabel: {
    fontSize: 12,
    color: "#8E8E93",
    fontWeight: "500",
    marginBottom: 2,
  },
  rowValue: {
    fontSize: 15,
    fontWeight: "600",
  },
  inputGrid: {
    gap: 12,
    marginBottom: 4,
  },
  formLabel: {
    fontSize: 13,
    fontWeight: "600",
    color: "#8E8E93",
    marginBottom: 8,
    paddingLeft: 4,
  },
  iosInput: {
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: 12,
    padding: 14,
    fontSize: 15,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
    marginBottom: 16,
    color: '#FFF',
  },
  appleButton: {
    height: 52,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  buttonText: {
    color: "#FFF",
    fontWeight: "700",
    fontSize: 16,
  },
});