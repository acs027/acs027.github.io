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

export default function Contact() {
  const { width } = useWindowDimensions();
  const isLargeScreen = width >= 750;
  const colors = useThemeColors();

  const accessKey = "371da1cf-d6e9-485e-928d-ebce5f9dc12c"; //Public Key

  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [result, setResult] = useState("Send Message");
  const [isInvalidInput, setIsInvalidInput] = useState(false);

  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const checkForm = () => {
    if (!name || !lastName || !email || !subject || !message) {
      setResult("Please fill in all fields.");
      return false;
    }

    if (!isValidEmail(email)) {
      setResult("Please enter a valid email address.");
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

    setResult("Sending...");

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
        setResult("Form Submitted Successfully");
        setName("");
        setLastName("");
        setEmail("");
        setSubject("");
        setMessage("");
      } else {
        console.error("Submission error:", data);
        setResult(data.message || "Submission failed");
      }
    } catch (error) {
      console.error("Network error:", error);
      setResult("Network error");
    }
  };

  const contactInfo = [
    {
      icon: <Feather name="mail" size={24} color={colors.text} />,
      label: "Email",
      value: "alicihansarac@gmail.com",
      href: "mailto:alicihansarac@gmail.com",
    },
    {
      icon: <Feather name="map-pin" size={24} color={colors.text} />,
      label: "Location",
      value: "Kocaeli, Türkiye",
      href: "",
    },
  ];

  const socialLinks = [
    {
      icon: <Feather name="github" size={24} color={colors.text} />,
      label: "GitHub",
      href: "https://github.com/acs027",
      username: "@acs027",
    },
    {
      icon: <Feather name="linkedin" size={24} color={colors.text} />,
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/alicihansarac/",
      username: "/in/alicihansarac",
    },
    {
      icon: <Entypo name="medium" size={24} color={colors.text} />,
      label: "Medium",
      href: "https://medium.com/@alicihansarac",
      username: "@alicihansarac",
    },
  ];

  return (
    <ThemedView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <ThemedText style={styles.header}>Let's Work Together</ThemedText>
      <ThemedText style={styles.subheader}>
        Have a project in mind? I'd love to hear about it and discuss how we can
        bring your iOS app idea to life.
      </ThemedText>

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
          <ThemedText style={styles.cardTitle}>Send me a message</ThemedText>

          <ThemedView color={colors.projectCardBg} style={styles.row}>
            {/* First Name */}
            <ThemedView color={colors.projectCardBg} style={{ width: "50%" }}>
              <ThemedText style={styles.inputLabel}> First Name </ThemedText>
              <TextInput
                style={[
                  styles.input,
                  { backgroundColor: colors.textInputBgColor },
                ]}
                placeholder="Deckard"
                placeholderTextColor={colors.placeholder}
                onChangeText={setName}
                value={name}
              />
            </ThemedView>

            {/* Last Name */}
            <ThemedView color={colors.projectCardBg} style={{ width: "50%" }}>
              <ThemedText style={styles.inputLabel}> Last Name </ThemedText>
              <TextInput
                style={[
                  styles.input,
                  { backgroundColor: colors.textInputBgColor },
                ]}
                placeholder="Cain"
                placeholderTextColor={colors.placeholder}
                value={lastName}
                onChangeText={setLastName}
              />
            </ThemedView>
          </ThemedView>

          {/* Email */}
          <ThemedText style={styles.inputLabel}> Email </ThemedText>
          <ThemedView color={colors.projectCardBg} style={styles.row}>
            <TextInput
              style={[
                styles.input,
                { backgroundColor: colors.textInputBgColor },
              ]}
              placeholder="deckardcain@gmail.com"
              placeholderTextColor={colors.placeholder}
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
            />
          </ThemedView>

          {/* Subject */}
          <ThemedText style={styles.inputLabel}> Subject </ThemedText>
          <ThemedView color={colors.projectCardBg} style={styles.row}>
            <TextInput
              style={[
                styles.input,
                { backgroundColor: colors.textInputBgColor },
              ]}
              placeholder="..."
              placeholderTextColor={colors.placeholder}
              value={subject}
              onChangeText={setSubject}
            />
          </ThemedView>

          {/* Message */}
          <ThemedText style={styles.inputLabel}> Message </ThemedText>
          <ThemedView style={styles.row}>
            <TextInput
              style={[
                styles.input,
                { backgroundColor: colors.textInputBgColor, height: 120 },
              ]}
              placeholder="..."
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
          <ThemedText style={styles.cardTitle}>Get in touch</ThemedText>
          <ThemedText style={styles.subheader}>
            I'm always excited to work on new iOS projects and collaborate with
            amazing teams. Whether you need a new app built from scratch or want
            to improve an existing one, let's discuss how I can help bring your
            vision to life.
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

          <ThemedText style={styles.socialTitle}>Follow me</ThemedText>
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
