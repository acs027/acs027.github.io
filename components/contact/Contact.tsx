import React, { useState } from "react";
import {
  Linking,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  useWindowDimensions,
} from "react-native";
import { Entypo, Feather } from "@expo/vector-icons";
import { useThemeColors } from "../utils/useThemeColors"; // Optional: replace with your theme system
import { ThemedText } from "../utils/ThemedText";
import { ThemedView } from "../utils/ThemedView";
import { useTranslation } from "react-i18next";

export default function Contact() {
  const { width } = useWindowDimensions();
  const isLargeScreen = width >= 750;
  const colors = useThemeColors();
  const { t } = useTranslation();

  const accessKey = "371da1cf-d6e9-485e-928d-ebce5f9dc12c"; //Public Key

  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
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
    if (!isFormReady) {
      return;
    }

    setResult(t("contact.form.button_sending"));

    const formData = new FormData();
    formData.append("access_key", accessKey);
    formData.append("name", name);
    formData.append("lastName", lastName);
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
        setName("");
        setLastName("");
        setEmail("");
        setSubject("");
        setMessage("");
      } else {
        setResult(data.message || t("contact.form.error_generic"));
      }
    } catch (error) {
      setResult(t("contact.form.error_network"));
    }
  };

  const contactInfo = [
    {
      icon: <Feather name="mail" size={24} color={colors.text} />,
      label: t("contact.info.email_label"),
      value: "alicihansarac@gmail.com",
      href: "mailto:alicihansarac@gmail.com",
    },
    {
      icon: <Feather name="map-pin" size={24} color={colors.text} />,
      label: t("contact.info.location_label"),
      value: "Kocaeli, Türkiye",
      href: "",
    },
  ];

  const socialLinks = [
    {
      icon: <Feather name="github" size={24} color={colors.text} />,
      label: t("contact.social.github"),
      href: "https://github.com/acs027",
      username: "@acs027",
    },
    {
      icon: <Feather name="linkedin" size={24} color={colors.text} />,
      label: t("contact.social.linkedin"),
      href: "https://www.linkedin.com/in/alicihansarac/",
      username: "/in/alicihansarac",
    },
    {
      icon: <Entypo name="medium" size={24} color={colors.text} />,
      label: t("contact.social.medium"),
      href: "https://medium.com/@alicihansarac",
      username: "@alicihansarac",
    },
  ];

  return (
    <ThemedView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <ThemedText style={styles.header}>{t("contact.header")}</ThemedText>
      <ThemedText style={styles.subheader}>{t("contact.subheader")}</ThemedText>

      <ThemedView
        color={colors.background}
        style={[
          styles.contentWrapper,
          { flexDirection: isLargeScreen ? "row" : "column" },
        ]}
      >
        {/* Contact Form */}
        <ThemedView
          color={colors.projectCardBg}
          style={[styles.card, isLargeScreen && styles.cardHalf]}
        >
          <ThemedText style={styles.cardTitle}>
            {t("contact.form.title")}
          </ThemedText>

          <ThemedView color={colors.projectCardBg} style={styles.row}>
            {/* First Name */}
            <ThemedView color={colors.projectCardBg} style={{ width: "50%" }}>
              <ThemedText style={styles.inputLabel}>
                {t("contact.form.firstName")}
              </ThemedText>
              <TextInput
                style={[
                  styles.input,
                  { backgroundColor: colors.textInputBgColor },
                ]}
                placeholder={t("contact.form.firstName_placeholder")}
                placeholderTextColor={colors.placeholder}
                onChangeText={setName}
                value={name}
              />
            </ThemedView>

            {/* Last Name */}
            <ThemedView color={colors.projectCardBg} style={{ width: "50%" }}>
              <ThemedText style={styles.inputLabel}>
                {" "}
                {t("contact.form.lastName")}{" "}
              </ThemedText>
              <TextInput
                style={[
                  styles.input,
                  { backgroundColor: colors.textInputBgColor },
                ]}
                placeholder={t("contact.form.lastName_placeholder")}
                placeholderTextColor={colors.placeholder}
                value={lastName}
                onChangeText={setLastName}
              />
            </ThemedView>
          </ThemedView>

          {/* Email */}
          <ThemedText style={styles.inputLabel}>
            {" "}
            {t("contact.form.email")}{" "}
          </ThemedText>
          <ThemedView color={colors.projectCardBg} style={styles.row}>
            <TextInput
              style={[
                styles.input,
                { backgroundColor: colors.textInputBgColor },
              ]}
              placeholder={t("contact.form.email_placeholder")}
              placeholderTextColor={colors.placeholder}
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
            />
          </ThemedView>

          {/* Subject */}
          <ThemedText style={styles.inputLabel}>
            {" "}
            {t("contact.form.subject")}{" "}
          </ThemedText>
          <ThemedView color={colors.projectCardBg} style={styles.row}>
            <TextInput
              style={[
                styles.input,
                { backgroundColor: colors.textInputBgColor },
              ]}
              placeholder={t("contact.form.subject_placeholder")}
              placeholderTextColor={colors.placeholder}
              value={subject}
              onChangeText={setSubject}
            />
          </ThemedView>

          {/* Message */}
          <ThemedText style={styles.inputLabel}>
            {" "}
            {t("contact.form.message")}{" "}
          </ThemedText>
          <ThemedView style={styles.row}>
            <TextInput
              style={[
                styles.input,
                { backgroundColor: colors.textInputBgColor, height: 120 },
              ]}
              placeholder={t("contact.form.message_placeholder")}
              placeholderTextColor={colors.placeholder}
              multiline
              value={message}
              onChangeText={setMessage}
            />
          </ThemedView>

          <TouchableOpacity
            style={[
              styles.button,
              { backgroundColor: isInvalidInput ? "#C40233" : "#007AFF" },
            ]}
            onPress={handleSubmit}
          >
            <ThemedText style={styles.buttonText}>{result}</ThemedText>
          </TouchableOpacity>
        </ThemedView>

        {/* Contact Info */}
        <ThemedView style={[styles.card, isLargeScreen && styles.cardHalf]}>
          <ThemedText style={styles.cardTitle}>
            {t("contact.info.title")}
          </ThemedText>
          <ThemedText style={styles.subheader}>
            {t("contact.info.description")}
          </ThemedText>

          {contactInfo.map((info, index) => (
            <TouchableOpacity
              key={index}
              style={styles.infoRow}
              onPress={() => Linking.openURL(info.href)}
            >
              {info.icon}
              <ThemedView style={styles.infoText}>
                <ThemedText style={styles.infoLabel}>{info.label}</ThemedText>
                <ThemedText style={styles.infoValue}>{info.value}</ThemedText>
              </ThemedView>
            </TouchableOpacity>
          ))}

          <ThemedText style={styles.socialTitle}>
            {t("contact.social.title")}
          </ThemedText>
          {socialLinks.map((social, index) => (
            <TouchableOpacity
              key={index}
              style={styles.socialRow}
              onPress={() => Linking.openURL(social.href)}
            >
              {social.icon}
              <ThemedText style={styles.socialText}>
                {social.username}
              </ThemedText>
            </TouchableOpacity>
          ))}
        </ThemedView>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: "center",
    margin: 5,
    width: "100%",
    maxWidth: 1000,
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 8,
  },
  subheader: {
    fontSize: 16,
    marginBottom: 20,
  },
  contentWrapper: {
    justifyContent: "space-between",
    gap: 24,
    width: "100%",
  },
  card: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
    width: "100%",
  },
  cardHalf: {
    flex: 1,
    minWidth: 0,
    width: "100%",
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 16,
  },
  row: {
    flexDirection: "row",
    gap: 8,
    justifyContent: "space-between",
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 12,
  },
  input: {
    flex: 1,
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    marginHorizontal: 4,
  },
  button: {
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 8,
  },
  buttonText: {
    fontWeight: "600",
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    gap: 12,
  },
  infoText: {
    flexDirection: "column",
  },
  infoLabel: {
    fontWeight: "600",
  },
  infoValue: {},
  socialTitle: {
    marginTop: 16,
    fontWeight: "600",
    fontSize: 16,
  },
  socialRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    gap: 12,
  },
  socialText: {
    fontSize: 14,
  },
});
